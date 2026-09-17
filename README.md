# Vocab Learner — Project Notes

## The Core Idea
An app that turns video content into active vocabulary learning — paste a video link (YouTube first, any video later), extract useful vocab words from the transcript, and learn them through multiple active skills (not just flashcards).

## Why This Project (Not Just Another Clone)
Researched existing tools:
- **Vocablii** — closest competitor. Paste YouTube link → auto vocab deck → spaced-repetition flashcards → rewatch video. YouTube-only. Free tier: 5 decks/month, paid ~$1.99/month.
- **to-teach.ai** — teacher-focused, rewrites transcript vocab to match student proficiency level. Also YouTube-only, explicitly AI-powered.
- Others (YouSumm, TurboScribe, YouTube To Transcript, YouGlish) — transcript/summary tools, not vocab/flashcard-focused.

**Key gap found: every competitor is YouTube-only.** None support non-YouTube video sources (Whisper-based transcription) or file uploads. This is a genuine differentiator, not just a spin on an existing feature.

## Core Tech Pipeline
1. **Transcript source**
   - YouTube: pull existing captions via `youtube-transcript` (or similar npm lib) — free, fast, no API cost.
   - Non-YouTube: extract audio → send to OpenAI Whisper API (`whisper-1`, $0.006/min, or `gpt-4o-mini-transcribe` at $0.003/min) — this is the differentiator feature.
   - YouTube Data API v3 (via Google Cloud Console) only needed for video metadata (title, thumbnail, duration) — NOT needed for transcripts.
2. **Vocab extraction**: LLM API call (OpenAI/Claude) on the transcript text — extract ~10-15 useful words with definitions, example usage, and difficulty tagging (Easy/Medium/Hard), plus the **timestamp** each word occurs at (critical for the video-overlay feature below).
3. **Storage/backend**: Node/Express + MongoDB (same stack as cosy_cloud) — models needed: User, Video, VocabWord, FlashcardReview/Progress.

## Feature Ideas (Prioritized Roadmap)

### v1 (MVP)
- Paste YouTube link → transcript → LLM extracts vocab words with definitions
- Basic flashcard review
- **Reading mode**: fill-in-the-blank using the real sentence from the transcript (reuses data already fetched, no extra API cost)

### v2
- **Listening mode**: play the video clip at the word's timestamp, user identifies/types what they heard — ties directly into timestamp data from extraction step
- Non-YouTube video support via Whisper (the differentiator)
- Streaks + daily goals, instant visual reward on correct answers (engagement/dopamine loop — see "Laziness" section below)
- Passive "swipe mode" (Tinder-style: see word + meaning, swipe like/don't know) — lowest-effort entry point for casual/lazy users

### v3
- **Writing mode**: type the word from its definition, or write a sentence using it (LLM can give feedback — stretch goal)
- Progress dashboard: words learned, streaks, mastery %, "vocabulary garden" visualization

### v4 / Stretch / Resume Roadmap Item
- **Speaking mode**: record yourself saying the word/sentence, compare via Whisper speech-to-text or pronunciation-scoring API. Technically heavy (mic access, in-browser recording, per-attempt Whisper calls) — fine to describe as future work if time runs short.

## The Standout Feature: In-Video Vocab Overlay
**Scenario**: User is watching a gaming video (or any video) in English. When a flagged vocab word's timestamp comes up in playback, the app:
1. Pauses the video automatically
2. Shows a flashy overlay with the word + meaning directly on the video frame
3. Gates a quick task (e.g., one fill-in-the-blank or swipe-confirm, <10 seconds) before continuing
4. Resumes video playback exactly where it left off

**Why this matters**: Solves the "laziness" problem — learning comes *to* the user embedded in content they already want to watch, instead of requiring them to seek out a separate study session. Similar in spirit to Language Reactor (Netflix extension) but with an active task-gate instead of passive subtitles.

**Technical components needed**:
- Timestamp-tagged vocab extraction (already covered above)
- Custom video player wrapper (YouTube embed API or own `<video>` player for non-YouTube) that watches current playback time and triggers overlay when a word's timestamp approaches
- Pause → task → resume state machine

**Scoping note**: Build the standalone review flow first (validates vocab extraction + task mechanics independently) before wiring into the video player — debugging both systems simultaneously is painful. This is a v2/v3 feature, not MVP, but it's the most original/differentiated part of the whole project — worth highlighting in interviews/resume.

## Design Philosophy: Active Learning vs. Laziness
- Grounded in the four-skills language learning model: **Reading, Listening, Writing, Speaking**. Passive recognition (seeing a word) is the weakest form of retention — active production is what makes it stick.
- But audiences are increasingly lazy/dopamine-driven (Instagram-style instant gratification). The app needs to serve both:
  - **Serious learners**: full active-skill loop (reading → listening → writing → speaking)
  - **Casual/lazy users**: low-effort entry points (streaks, instant rewards, swipe-based passive mode, short bite-sized clips) that still count as engagement and can escalate into deeper learning over time
- Key tension to manage: gamification-for-engagement vs. depth-of-learning can pull against each other — keep the *reward* instant but keep the *content* real, don't dumb down what's being learned just to make it feel good.

## Cost Notes
- Whisper API: pay-as-you-go, no subscription. ~$0.006/min (~₹0.50/min, ~₹30/hour). New accounts get $5 free credit (~13.9 hours). No ₹1200/month plan exists for Whisper specifically — that figure may have come from ChatGPT Plus subscription (unrelated) or a volume estimate.
- YouTube Data API v3: free tier 10,000 units/day; only needed for metadata, not transcripts.

## Fit With Current Workload
This is a new project, separate from **cosy_cloud** (MERN Airbnb-clone, currently in active development — auth, Multer/Cloudinary uploads, deployment on Render/Vercel) and ongoing **Java DSA** practice (arrays, Kadane's algorithm, prefix sum). Recommendation: get cosy_cloud to a stable/deployed checkpoint before starting heavy build-out on Vocab Learner, to avoid splitting focus across three things at once.

## Features

- **Saving the history** users history on the home page where the main functionality of the user starts then we are going to ask the user for 2 things first is vedio title or second is url of youtube vedio then whatever work done that how much vocab we got from this vedio and then practice correct and wrong answer kind of overall activity we are going to save it in the history section


---

### what is the remaining part of the project : 

1. main function with youtube (open AI) video as well as with upload video (whisper)
2. add one feature on the video play that is to pin the timeframe and go tho that timeframe on click with pins 
----
1. We should decrease the cost of tokens for OpenAI. For that, we have to send the relevant data to the OpenAI. We have to convert our MongoDB metadata to the only two main components:
- segment ID
- text of the word that we extracted from the video
```json
  {
  "_id": "...",
  "segmentId": 42,
  "text": "Emily made a massive mistake at work.",
  "start": 125.4,
  "end": 128.2,
  "sourceType": "youtube",
  "videoId": "...",
  "__v": 0,
  "createdAt": "...",
  "updatedAt": "..."
}
// don't send this data to the open Ai insted convert this data into --

{
  "segmentId": 42,
  "text": "Emily made a massive mistake at work."
}
```
Then this document will be sent to OpenAI, which will reduce the cost of the token. 
2. And one more thing to remember: if we extract all the vocabulary for the same video, and if the user extracts the same video or pastes the same video link (whether it's YouTube or maybe a personal video), then we should keep that data in the response database. The cost of the token will reduce because we are not again sending that data to OpenAI for the same video. We are just using that data again and again from the database. 

3. Whenever we are displaying a word of vocabulary, first of all, we will automatically show the user the meaning and all the important things that it should know. It should be informative to the user. We will also do the option to explore this word more. If Explore can give him options like types and all the grammatical things, then he can explore it more. 