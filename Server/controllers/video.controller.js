import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";
import { fetchTranscript } from "youtube-transcript";
import { Transcript } from "../models/transcript.model.js";
import { Vocab } from "../models/vocabulary.model.js";
import data from "../utils/SampleData.json" with { type: "json" };

export const converUrlToEmbed = asyncHandler(async (req, res) => {
    const { url } = req.body;
    if (!url) {
        throw new ApiError(404, "Please enter the url");
    }
    if (!url.includes("youtu.be") && !url.includes("youtube.com")) {
        throw new ApiError(404, "Enter the valid youtube link");
    }
    let videoId = null;
    const patterns = [
        /youtu\.be\/([^?&/]+)/,
        /[?&]v=([^?&/]+)/,
        /youtube\.com\/embed\/([^?&/]+)/,
        /youtube\.com\/shorts\/([^?&/]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            videoId = match[1];
            break;
        }
    }

    if (!videoId)
        throw new ApiError(404, "invalid youtube url || url controller");
    let existed = await Video.findOne({ VideoId: videoId, user: req.user._id });
    const transExisted = await Transcript.findOne({ videoId: videoId });
    let vocabulary; 
    if (transExisted === null) {
        const transcript = await fetchTranscript(videoId);
        const store = transcript.map((elem, idx) => ({
            segmentId: idx,
            start: Math.round((elem.offset / 1000) * 100) / 100,
            end: Math.round(((elem.offset + elem.duration) / 1000) * 100) / 100,
            text: elem.text,
            sourceType: "youtube",
            videoId: videoId,
        }));
        await Transcript.insertMany(store, { ordered: true });

        // converting the whole data into partial data for segmentId, text and for videoId
        const wholeData = await Transcript.find({
            sourceType: "youtube",
            videoId: `${videoId}`,
        });

        let partial_data = wholeData.map(({ segmentId, text }) => ({
            segmentId,
            text
        }));
        let timestamps_data = new Map(
            wholeData.map(({ segmentId, start, end}) => [
                segmentId,
                { start, end},
            ])
        );

        /// Now we are using the hardcoded JSON-type data for experimenting with this function, but now we are going to make the LLM. Call. Then data will replace The LLM response 
            vocabulary = data.map((e) => {
            const matched = timestamps_data.get(e.segmentId);
            if (!matched) {
                throw new ApiError(
                    404,
                    "Segment id's not found plz try again !"
                );
            }
            return {
                segmentId: e.segmentId,
                vocabulary: e.vocabulary,
                meaning: e.meaning,
                type: e.type,
                example: e.example,
                revisionQuestions: e.revisionQuestions,
                start: matched.start,
                end: matched.end,
                videoId
            };
        });

        // we send that partial_data to open ai llm and then we'll get the data as response that we are going to use in the getAndSaveVocabulary(data) fn
         await Vocab.insertMany(vocabulary, { ordered: true });
    } else {
        // because of the new entry of video in db the transcript is newly added to the db so that the vocab also saved in the db becuase here we Send the data to the LLM when the new entry is there, and we will save that data to the DB. We will use it again and again for the same video. If there is a new video, then we will send again to the LLM.
         vocabulary = await Vocab.find({ videoId: videoId });
    }

    if (existed === null) {
        // video not exited therefore we add the new video to db
        existed = await Video.create({
            url: url,
            user: req.user._id,
            resourceType: "url",
        });
    }

    res.status(201).json(
        new ApiResponse(201, {video : existed, vocabulary}, "Url converted successfully")
    );
});

export const uploadVideo = asyncHandler(async (req, res) => {
    const { title } = req.body;
    if (!title) {
        throw new ApiError(400, "Enter title for your video");
    }
    if (!req.file) {
        throw new ApiError(400, "Upload The File First");
    }

    const response = await uploadFileOnCloudinary(req.file.buffer, "video");
    if (!response) {
        throw new ApiError(501, "Error while uploading on cloudinery");
    }
    let videoThumbnail = await response.url.replace(".mp4", ".jpg");
    if (!videoThumbnail) {
        return;
    }
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
            title: title,
            thumbnail: videoThumbnail,
        });
    }

    res.status(200).json(
        new ApiResponse(200, vMetaData, "Video Uploaded Successfully !")
    );
});

// Rearrange the main function that we made yesterday and check for error handling and all the stuff. We are on-the-way of building` the main function.
