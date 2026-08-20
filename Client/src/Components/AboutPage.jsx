import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faGlobe, faClock, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";

gsap.registerPlugin(ScrollTrigger);

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
  const navigate = useNavigate()
  const {userStatus} = useAuthContext()

  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const featureRefs = useRef([]);
  const stepRefs = useRef([]);
  const whoRef = useRef(null);
  const buttonRef = useRef(null);

  featureRefs.current = [];
  stepRefs.current = [];

  const addFeatureRef = (el) => {
    if (el && !featureRefs.current.includes(el)) featureRefs.current.push(el);
  };
  const addStepRef = (el) => {
    if (el && !stepRefs.current.includes(el)) stepRefs.current.push(el);
  };

  function navigateToPage() {
    if (userStatus) {
      navigate("/fetch-video")
    }else{
      navigate("/login")
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
      });

      gsap.from(featureRefs.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: featureRefs.current[0]?.closest("section"),
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(stepRefs.current, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: stepRefs.current[0]?.closest("section"),
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(whoRef.current.children, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: whoRef.current,
          start: "top 85%",
          once: true,
        },
      });

      featureRefs.current.forEach((card) => {
        const icon = card.querySelector(".feature-icon");
        const tl = gsap.timeline({ paused: true });
        tl.to(card, { y: -6, boxShadow: "0 12px 24px -8px rgba(139,92,246,0.25)", duration: 0.25, ease: "power2.out" }, 0)
          .to(icon, { scale: 1.15, rotate: -8, duration: 0.25, ease: "back.out(2)" }, 0);

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });

      stepRefs.current.forEach((card) => {
        const badge = card.querySelector(".step-badge");
        const tl = gsap.timeline({ paused: true });
        tl.to(card, { x: 6, duration: 0.25, ease: "power2.out" }, 0)
          .to(badge, { scale: 1.15, duration: 0.25, ease: "back.out(2)" }, 0);

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });

      if (buttonRef.current) {
        const btn = buttonRef.current;
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(btn, {
          scale: 1.06,
          boxShadow: "0 10px 24px -6px rgba(139,92,246,0.45)",
          duration: 0.2,
          ease: "power2.out",
        });
        btn.addEventListener("mouseenter", () => hoverTl.play());
        btn.addEventListener("mouseleave", () => hoverTl.reverse());
        btn.addEventListener("mousedown", () => gsap.to(btn, { scale: 0.94, duration: 0.1 }));
        btn.addEventListener("mouseup", () => gsap.to(btn, { scale: 1.06, duration: 0.1 }));
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-white dark:bg-[#010617] text-slate-900 dark:text-white">

      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-4 pt-20 pb-14">
        <div ref={heroRef}>
          <h1 className="text-4xl font-bold mb-4">
            Learn vocabulary from any video
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Paste a video, get its vocabulary extracted, and learn it without ever leaving the video.
          </p>
        </div>
      </section>

      {/* Why it's different */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              ref={addFeatureRef}
              className="bg-slate-50 dark:bg-[#0b0f1a] border border-slate-200 dark:border-white/10 rounded-2xl p-6"
            >
              <FontAwesomeIcon icon={f.icon} className="feature-icon text-violet-500 dark:text-violet-400 text-lg mb-3 inline-block" />
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
              ref={addStepRef}
              className="flex gap-4 bg-slate-50 dark:bg-[#0b0f1a] border border-slate-200 dark:border-white/10 rounded-2xl p-5"
            >
              <div className="step-badge shrink-0 w-8 h-8 rounded-full bg-violet-500/20 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center text-sm font-medium">
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
        <div ref={whoRef}>
          <h2 className="text-xl font-bold mb-3">Who it's for</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Language learners, students prepping for exams, and anyone who picks up
            new words faster from real content than from word lists.
          </p>
          <button
            ref={buttonRef}
            onClick={navigateToPage}
            className="inline-block mt-6 bg-violet-500 hover:bg-violet-400 transition-colors px-6 py-2.5 rounded-lg font-medium text-white"
          >
            Get started
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage