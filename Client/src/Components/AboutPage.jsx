import { faGlobe, faClock, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom"
const steps = [
  {
    title: "Paste a link or upload a file",
    desc: "Drop in a YouTube URL, or upload any other video from your device.",
  },
  {
    title: "We pull the transcript",
    desc: "YouTube captions when available, Whisper transcription as a fallback for everything else.",
  },
  {
    title: "Vocabulary comes out, timestamped",
    desc: "Words are pulled from the real transcript with exact segment timestamps, not guessed.",
  },
];

const features = [
  {
    icon: faGlobe,
    title: "Works on any video",
    desc: "Not just YouTube. If it has audio, Vocably can pull vocabulary from it.",
  },
  {
    icon: faClock,
    title: "Learn at the right moment",
    desc: "Playback pauses right when a word appears, so you practice it in context, not later in a disconnected deck.",
  },
  {
    icon: faListCheck,
    title: "Timestamps you can trust",
    desc: "Pulled from real video segments, never AI-guessed, so review always lands on the right moment.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#010617] text-slate-900 dark:text-white">

      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-4 pt-20 pb-14">
        <h1 className="text-4xl font-bold mb-4">
          Learn vocabulary from any video
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Paste a video, get its vocabulary extracted, and learn it without ever leaving the video.
        </p>
      </section>

      {/* Why it's different */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-slate-50 dark:bg-[#0b0f1a] border border-slate-200 dark:border-white/10 rounded-2xl p-6"
            >
              <FontAwesomeIcon icon={f.icon} className="text-indigo-500 dark:text-indigo-400 text-lg mb-3" />
              <h3 className="font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-bold text-center mb-8">How it works</h2>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="flex gap-4 bg-slate-50 dark:bg-[#0b0f1a] border border-slate-200 dark:border-white/10 rounded-2xl p-5"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-medium">
                {i + 1}
              </div>
              <div>
                <h3 className="font-medium mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="max-w-2xl mx-auto text-center px-4 pb-24">
        <h2 className="text-xl font-bold mb-3">Who it's for</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Language learners, students prepping for exams, and anyone who picks up
          new words faster from real content than from word lists.
        </p>
        <Link
          to="/signup"
          className="inline-block mt-6 bg-indigo-500 hover:bg-indigo-400 transition px-6 py-2.5 rounded-lg font-medium text-white"
        >
          Get started
        </Link>
      </section>
    </div>
  );
}

export default AboutPage