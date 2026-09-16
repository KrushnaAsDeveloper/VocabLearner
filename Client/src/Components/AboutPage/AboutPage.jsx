
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  faGlobe,
  faClock,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/authContext";

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
  const navigate = useNavigate();
  const { userStatus } = useAuthContext();

  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const featureRefs = useRef([]);
  const stepRefs = useRef([]);
  const whoRef = useRef(null);
  const buttonRef = useRef(null);

  featureRefs.current = [];
  stepRefs.current = [];

  const addFeatureRef = (el) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  const addStepRef = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  function navigateToPage() {
    if (userStatus) {
      navigate("/fetch-video");
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================
         HERO ANIMATION
      ========================= */

      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 35,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      /* =========================
         BACKGROUND GLOW
      ========================= */

      gsap.to(".about-glow-one", {
        x: 80,
        y: 40,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".about-glow-two", {
        x: -60,
        y: -40,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =========================
         FEATURE CARDS
      ========================= */

      gsap.from(featureRefs.current, {
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: featureRefs.current[0]?.closest("section"),
          start: "top 82%",
          once: true,
        },
      });

      featureRefs.current.forEach((card) => {
        const icon = card.querySelector(".feature-icon");
        const glow = card.querySelector(".card-glow");

        const tl = gsap.timeline({ paused: true });

        tl.to(
          card,
          {
            y: -8,
            scale: 1.015,
            duration: 0.3,
            ease: "power2.out",
          },
          0
        )
          .to(
            icon,
            {
              scale: 1.18,
              rotate: -7,
              duration: 0.3,
              ease: "back.out(2)",
            },
            0
          )
          .to(
            glow,
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
            },
            0
          );

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });

      /* =========================
         STEPS
      ========================= */

      gsap.from(stepRefs.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: stepRefs.current[0]?.closest("section"),
          start: "top 82%",
          once: true,
        },
      });

      stepRefs.current.forEach((card) => {
        const badge = card.querySelector(".step-badge");

        const tl = gsap.timeline({ paused: true });

        tl.to(
          card,
          {
            x: 7,
            duration: 0.25,
            ease: "power2.out",
          },
          0
        ).to(
          badge,
          {
            scale: 1.15,
            duration: 0.25,
            ease: "back.out(2)",
          },
          0
        );

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });

      /* =========================
         WHO SECTION
      ========================= */

      gsap.from(whoRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: whoRef.current,
          start: "top 85%",
          once: true,
        },
      });

      /* =========================
         BUTTON
      ========================= */

      if (buttonRef.current) {
        const btn = buttonRef.current;

        const hoverTl = gsap.timeline({ paused: true });

        hoverTl.to(btn, {
          scale: 1.05,
          y: -2,
          boxShadow:
            "0 15px 45px -10px rgba(139,92,246,0.65)",
          duration: 0.25,
          ease: "power2.out",
        });

        btn.addEventListener("mouseenter", () => hoverTl.play());
        btn.addEventListener("mouseleave", () => hoverTl.reverse());

        btn.addEventListener("mousedown", () => {
          gsap.to(btn, {
            scale: 0.96,
            duration: 0.1,
          });
        });

        btn.addEventListener("mouseup", () => {
          gsap.to(btn, {
            scale: 1.05,
            duration: 0.15,
          });
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="
        relative min-h-screen overflow-hidden
        bg-white dark:bg-[#010617]
        text-slate-900 dark:text-white
      "
    >

      {/* =========================
          BACKGROUND EFFECTS
      ========================= */}

      <div
        className="
          pointer-events-none absolute
          top-[-180px] left-1/2
          h-[450px] w-[450px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/10 dark:bg-violet-500/10
          blur-[120px]
        "
      />

      <div
        className="
          about-glow-one
          pointer-events-none absolute
          top-[25%] left-[-120px]
          h-[300px] w-[300px]
          rounded-full
          bg-violet-500/5
          dark:bg-violet-500/10
          blur-[100px]
        "
      />

      <div
        className="
          about-glow-two
          pointer-events-none absolute
          top-[55%] right-[-120px]
          h-[350px] w-[350px]
          rounded-full
          bg-indigo-500/5
          dark:bg-indigo-500/10
          blur-[110px]
        "
      />

      {/* =========================
          HERO
      ========================= */}

      <section className="relative max-w-4xl mx-auto px-4 pt-28 pb-20">
        <div ref={heroRef} className="text-center">

          <div
            className="
              inline-flex items-center gap-2
              mb-6 px-4 py-2
              rounded-full
              border border-violet-200
              dark:border-violet-500/20
              bg-violet-50
              dark:bg-violet-500/[0.07]
              text-violet-600
              dark:text-violet-300
              text-xs font-medium
              tracking-wide
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
            VOCABULARY FROM REAL CONTENT
          </div>

          <h1
            className="
              text-5xl sm:text-6xl
              font-bold
              tracking-[-0.04em]
              leading-[1.05]
              mb-6
            "
          >
            Learn vocabulary
            <span
              className="
                block mt-2
                bg-gradient-to-r
                from-violet-500
                via-purple-500
                to-indigo-500
                bg-clip-text
                text-transparent
              "
            >
              from any video
            </span>
          </h1>

          <p
            className="
              max-w-2xl mx-auto
              text-base sm:text-lg
              leading-8
              text-gray-600
              dark:text-gray-400
            "
          >
            Paste a video, get its vocabulary extracted, and learn it without ever leaving the video.
          </p>

        </div>
      </section>

      {/* =========================
          FEATURES
      ========================= */}

      <section className="relative max-w-6xl mx-auto px-4 pb-24">

        <div className="grid md:grid-cols-3 gap-5">

          {features.map((f) => (
            <div
              key={f.title}
              ref={addFeatureRef}
              className="
                group relative overflow-hidden
                rounded-3xl
                border
                border-slate-200
                dark:border-white/[0.08]
                bg-slate-50/80
                dark:bg-white/[0.035]
                backdrop-blur-xl
                p-7
                transition-colors
                duration-300
              "
            >

              {/* Card glow */}
              <div
                className="
                  card-glow
                  pointer-events-none
                  absolute -top-20 -right-20
                  h-40 w-40
                  rounded-full
                  bg-violet-500/20
                  blur-[60px]
                  opacity-0
                  scale-75
                "
              />

              {/* Top shine */}
              <div
                className="
                  absolute top-0 left-8 right-8
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-violet-400/40
                  to-transparent
                "
              />

              <div
                className="
                  relative
                  flex items-center justify-center
                  w-12 h-12
                  mb-6
                  rounded-2xl
                  bg-violet-500/10
                  dark:bg-violet-500/10
                  border border-violet-500/10
                "
              >
                <FontAwesomeIcon
                  icon={f.icon}
                  className="
                    feature-icon
                    text-violet-500
                    dark:text-violet-400
                    text-xl
                  "
                />
              </div>

              <h3 className="relative text-lg font-semibold mb-3 tracking-tight">
                {f.title}
              </h3>

              <p
                className="
                  relative
                  text-sm
                  leading-7
                  text-gray-600
                  dark:text-gray-400
                "
              >
                {f.desc}
              </p>

            </div>
          ))}

        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================= */}

      <section className="relative max-w-3xl mx-auto px-4 pb-24">

        <div className="text-center mb-10">
          <span
            className="
              text-xs font-semibold
              uppercase tracking-[0.2em]
              text-violet-500
              dark:text-violet-400
            "
          >
            Simple workflow
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold mt-3 tracking-tight">
            How it works
          </h2>
        </div>

        <div className="relative space-y-4">

          {/* Timeline */}
          <div
            className="
              absolute
              left-[21px]
              top-8 bottom-8
              w-px
              bg-gradient-to-b
              from-violet-500/40
              via-violet-500/15
              to-transparent
            "
          />

          {steps.map((s, i) => (
            <div
              key={s.title}
              ref={addStepRef}
              className="
                relative
                flex gap-5
                rounded-3xl
                border
                border-slate-200
                dark:border-white/[0.08]
                bg-slate-50/80
                dark:bg-white/[0.035]
                backdrop-blur-xl
                p-6
                transition-colors
                duration-300
              "
            >

              <div
                className="
                  step-badge
                  relative z-10
                  shrink-0
                  w-10 h-10
                  rounded-full
                  bg-violet-500/10
                  dark:bg-violet-500/10
                  border border-violet-500/20
                  text-violet-600
                  dark:text-violet-300
                  flex items-center justify-center
                  text-sm font-bold
                  shadow-[0_0_20px_rgba(139,92,246,0.08)]
                "
              >
                {i + 1}
              </div>

              <div className="pt-1">
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  {s.title}
                </h3>

                <p
                  className="
                    text-sm
                    leading-7
                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  {s.desc}
                </p>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* =========================
          WHO IT'S FOR
      ========================= */}

      <section className="relative max-w-3xl mx-auto text-center px-4 pb-32">

        <div
          ref={whoRef}
          className="
            relative overflow-hidden
            rounded-[2rem]
            border
            border-violet-200
            dark:border-violet-500/15
            bg-violet-50/70
            dark:bg-violet-500/[0.045]
            backdrop-blur-xl
            px-6 sm:px-12
            py-14
          "
        >

          {/* Decorative glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2 top-0
              -translate-x-1/2
              h-40 w-72
              rounded-full
              bg-violet-500/15
              blur-[80px]
            "
          />

          <div className="relative">

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
              Who it's for
            </h2>

            <p
              className="
                max-w-xl mx-auto
                text-gray-600
                dark:text-gray-400
                leading-7
              "
            >
              Language learners, students prepping for exams, and anyone who picks up
              new words faster from real content than from word lists.
            </p>

            <button
              ref={buttonRef}
              onClick={navigateToPage}
              className="
                group
                relative
                inline-flex items-center justify-center
                mt-8
                px-7 py-3
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                hover:from-violet-500
                hover:to-indigo-500
                text-white
                font-semibold
                text-sm
                shadow-[0_8px_30px_-10px_rgba(139,92,246,0.5)]
                transition-all
                duration-300
                overflow-hidden
              "
            >
              <span
                className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-white/0
                  via-white/20
                  to-white/0
                  -translate-x-full
                  group-hover:translate-x-full
                  transition-transform
                  duration-700
                "
              />

              <span className="relative">
                Get started
              </span>
            </button>

          </div>
        </div>

      </section>

    </div>
  );
}

export default AboutPage;
