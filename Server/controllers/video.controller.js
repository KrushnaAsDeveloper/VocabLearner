import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";
import { fetchTranscript } from "youtube-transcript";
import { Transcript } from "../models/transcript.model.js";
import { Vocab } from "../models/vocabulary.model.js";
import { chunkArray, chunkSize } from "../utils/ChunkArray.js";
import { callLLM } from "../utils/callLLm.js";
import { isValidVocab } from "../utils/validateVocab.js";

const extractVideoId = (url) => {
    const patterns = [
        /youtu\.be\/([^?&/]+)/,
        /[?&]v=([^?&/]+)/,
        /youtube\.com\/embed\/([^?&/]+)/,
        /youtube\.com\/shorts\/([^?&/]+)/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
};

export const converUrlToEmbed = asyncHandler(async (req, res) => {
    const { url } = req.body;

    if (!url) throw new ApiError(400, "Please enter the url");

    if (!url.includes("youtu.be") && !url.includes("youtube.com")) {
        throw new ApiError(400, "Enter the valid youtube link");
    }

    const videoId = extractVideoId(url);
    if (!videoId) throw new ApiError(400, "Invalid youtube url");

    let existed = await Video.findOne({ videoId, user: req.user._id });
    const transExisted = await Transcript.findOne({ videoId });

    let vocabulary = [];

    if (!transExisted) {
        // 1. Fetch transcript
        const transcript = await fetchTranscript(videoId);

        const store = transcript.map((elem, idx) => ({
            segmentId: idx,
            start: Math.round((elem.offset / 1000) * 100) / 100,
            end: Math.round(((elem.offset + elem.duration) / 1000) * 100) / 100,
            text: elem.text,
            sourceType: "youtube",
            videoId,
        }));

        const partialData = store.map(({ segmentId, text }) => ({ segmentId, text }));
        const timestamps = new Map(
            store.map(({ segmentId, start, end }) => [segmentId, { start, end }])
        );

        // 2. Chunk + call LLM (nothing saved yet, so a failure leaves no half-state)
        const chunks = chunkArray(partialData, chunkSize);

        for (const chunk of chunks) {
            const outputLLM = await callLLM(chunk);

            for (const e of outputLLM) {
                const matched = timestamps.get(e.segmentId);
                if (!matched) continue; // skip bad segmentId

                vocabulary.push({
                    segmentId: e.segmentId,
                    vocabulary: e.vocabulary,
                    meaning: e.meaning,
                    type: e.type,
                    example: e.example,
                    revisionQuestions: e.revisionQuestions,
                    start: matched.start,
                    end: matched.end,
                    videoId,
                });
            }
        }

        // 3. Validate
        vocabulary = vocabulary.filter(isValidVocab);

        // 4. Save vocab, then transcript (transcript = "already processed" marker)
        if (vocabulary.length) {
            try {
                await Vocab.insertMany(vocabulary, { ordered: false });
            } catch (err) {
                // 11000 = duplicate key (e.g. two users submitted the same video at once)
                if (err.code !== 11000) throw err;
            }
        }
        await Transcript.insertMany(store, { ordered: true });
    } else {
        vocabulary = await Vocab.find({ videoId });
    }

    // 5. Save the video for this user
    if (!existed) {
        existed = await Video.create({
            url,
            videoId, // make sure Video schema has: videoId: { type: String }
            user: req.user._id,
            resourceType: "url",
        });
    }

    res.status(201).json(
        new ApiResponse(201, { video: existed, vocabulary }, "Url converted successfully")
    );
});

export const uploadVideo = asyncHandler(async (req, res) => {
    const { title } = req.body;
    if (!title) throw new ApiError(400, "Enter title for your video");
    if (!req.file) throw new ApiError(400, "Upload The File First");

    const response = await uploadFileOnCloudinary(req.file.buffer, "video");
    if (!response) throw new ApiError(501, "Error while uploading on cloudinary");

    const videoThumbnail = response.url.replace(".mp4", ".jpg");

    let vMetaData = await Video.findOne({
        etag: response.etag,
        user: req.user._id,
    });

    if (!vMetaData) {
        vMetaData = await Video.create({
            url: response.url,
            videoDuration: response.duration,
            etag: response.etag,
            resourceType: "upload",
            user: req.user._id,
            title,
            thumbnail: videoThumbnail,
        });
    }

    res.status(200).json(
        new ApiResponse(200, vMetaData, "Video Uploaded Successfully !")
    );
});

export const getData = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const data = await Vocab.find({ videoId }).sort({ start: 1 });
    res.json(new ApiResponse(200, data, "data"));
});