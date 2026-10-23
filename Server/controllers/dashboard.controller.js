// controllers/dashboard.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Vocab } from "../models/vocabulary.model.js";
import { Answer } from "../models/answers.model.js";
import { Video } from "../models/video.model.js";

const dayKey = (d) => new Date(d).toISOString().slice(0, 10);

// existing: stats (videos watched + answered words)
export const dashboad_data = asyncHandler(async (req, res) => {
    const watched = await Answer.distinct("videoId", { user: req.user._id });
    const words = await Answer.find({ user: req.user._id }).select(
        "-_id -questions -user -videoId"
    );

    res.status(200).json(
        new ApiResponse(
            200,
            { watched: watched.length, words },
            "we got the join data of the vocab and answers"
        )
    );
});

// new: recent words, review words, weekly chart, streak, latest video
export const getDashboardOverview = asyncHandler(async (req, res) => {
    const videos = await Video.find({ user: req.user._id }).sort({ createdAt: -1 });
    const videoIds = videos.map((v) => v.VideoId).filter(Boolean);
    const match = { videoId: { $in: videoIds } };

    const [recentWords, reviewWords, counts, totalWordsAvailable] = await Promise.all([
        Vocab.find(match).sort({ _id: -1 }).limit(4).select("vocabulary type meaning"),
        Vocab.aggregate([
            { $match: match },
            { $sample: { size: 3 } },
            { $project: { vocabulary: 1, meaning: 1 } },
        ]),
        Vocab.aggregate([{ $match: match }, { $group: { _id: "$videoId", n: { $sum: 1 } } }]),
        Vocab.countDocuments(match),
    ]);

    const countMap = new Map(counts.map((c) => [c._id, c.n]));

    // last 7 days
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push({
            key: dayKey(d),
            day: d.toLocaleDateString("en-US", { weekday: "short" }),
            value: 0,
        });
    }
    for (const v of videos) {
        const slot = days.find((d) => d.key === dayKey(v.createdAt));
        if (slot) slot.value += countMap.get(v.VideoId) || 0;
    }

    // streak: consecutive days with a video added, ending today or yesterday
    const active = new Set(videos.map((v) => dayKey(v.createdAt)));
    let streak = 0;
    const cursor = new Date();
    if (!active.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    while (active.has(dayKey(cursor))) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
    }

    const latest = videos[0] || null;

    res.status(200).json(
        new ApiResponse(
            200,
            {
                email: req.user.email,
                recentWords,
                reviewWords,
                weeklyActivity: days.map(({ day, value }) => ({ day, value })),
                weeklyTotal: days.reduce((s, d) => s + d.value, 0),
                streak,
                totalWordsAvailable,
                latestVideo: latest && {
                    title: latest.title || "Your latest video",
                    url: latest.url,
                    videoId: latest.VideoId,
                    thumbnail: latest.thumbnail,
                    duration: latest.videoDuration,
                },
            },
            "overview"
        )
    );
});