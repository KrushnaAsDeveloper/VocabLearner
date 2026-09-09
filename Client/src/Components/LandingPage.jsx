
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlay,
  faArrowRight,
  faUpload,
  faBookOpen,
  faBrain,
  faBolt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { faYoutube } from "@fortawesome/free-brands-svg-icons";

import owl from "../assets/mascot/owl-mascot-transparent.png";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const owlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ==========================================
      // HERO ENTRANCE
      // ==========================================

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .from(".hero-badge", {
          y: 25,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".hero-title-line",
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.35"
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-buttons",
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35"
        )
        .from(
          ".hero-note",
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".hero-visual",
          {
            x: 80,
            opacity: 0,
            scale: 0.9,
            duration: 1,
          },
          "-=0.8"
        );

      // ==========================================
      // OWL FLOAT ANIMATION
      // ==========================================

      gsap.to(owlRef.current, {
        y: -14,
        rotation: 2,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ==========================================
      // SECTION REVEAL
      // ==========================================

      gsap.utils.toArray(".reveal-section").forEach((element) => {
        gsap.from(element, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
        });
      });

      // ==========================================
      // FEATURE CARDS
      // ==========================================

      gsap.from(".feature-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 78%",
          once: true,
        },
      });

      // ==========================================
      // STEPS
      // ==========================================

      gsap.from(".step-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".steps-grid",
          start: "top 80%",
          once: true,
        },
      });

      // ==========================================
      // STATS
      // ==========================================

      gsap.from(".stat-item", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 82%",
          once: true,
        },
      });

      // ==========================================
      // HERO PARALLAX
      // ==========================================

      gsap.to(".hero-glow", {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // ==========================================
  // CARD HOVER
  // ==========================================

  const cardEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -7,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const cardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <main
      ref={pageRef}
      className="
        min-h-screen
        bg-[#010617]
        text-white
        overflow-hidden
      "
    >
      {/* =====================================================
          GLOBAL AMBIENT LIGHT
      ====================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="
            absolute
            -top-60
            left-[10%]
            w-[500px]
            h-[500px]
            rounded-full
            bg-violet-600/[0.08]
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            top-[35%]
            -right-60
            w-[500px]
            h-[500px]
            rounded-full
            bg-indigo-600/[0.07]
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-[35%]
            w-[400px]
            h-[400px]
            rounded-full
            bg-purple-600/[0.05]
            blur-[130px]
          "
        />
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        ref={heroRef}
        className="
          relative
          min-h-[calc(100vh-68px)]
          flex
          items-center
          pt-14
          pb-20
        "
      >
        {/* Hero glow */}

        <div
          className="
            hero-glow
            absolute
            left-[40%]
            top-[10%]
            w-[450px]
            h-[450px]
            rounded-full
            bg-violet-600/[0.10]
            blur-[120px]
            pointer-events-none
          "
        />

        <div
          className="
            relative
            max-w-7xl
            mx-auto
            px-5
            sm:px-6
            lg:px-8
            w-full
          "
        >
          <div
            className="
              grid
              lg:grid-cols-[1.05fr_0.95fr]
              gap-12
              lg:gap-8
              items-center
            "
          >
            {/* =================================================
                HERO CONTENT
            ================================================== */}

            <div className="relative z-10">
              {/* Badge */}

              <div
                className="
                  hero-badge
                  inline-flex
                  items-center
                  gap-2
                  px-3.5
                  py-2
                  rounded-full
                  bg-white/[0.04]
                  border
                  border-violet-400/15
                  backdrop-blur-xl
                  text-sm
                  text-slate-300
                  mb-7
                "
              >
                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-violet-400
                    shadow-[0_0_12px_rgba(167,139,250,0.8)]
                  "
                />

                Learn smarter. Remember longer.
              </div>

              {/* Heading */}

              <h1
                className="
                  text-5xl
                  sm:text-6xl
                  lg:text-[72px]
                  xl:text-[78px]
                  leading-[0.98]
                  font-bold
                  tracking-[-0.04em]
                  max-w-3xl
                "
              >
                <span className="hero-title-line block">
                  Turn videos
                </span>

                <span
                  className="
                    hero-title-line
                    block
                    bg-gradient-to-r
                    from-violet-300
                    via-purple-400
                    to-indigo-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  into vocabulary.
                </span>
              </h1>

              {/* Description */}

              <p
                className="
                  hero-description
                  mt-7
                  text-base
                  sm:text-lg
                  leading-8
                  text-slate-400
                  max-w-xl
                "
              >
                Learn new words naturally from the videos you already
                watch. Paste a YouTube link or upload a video and let
                Vocably turn it into an interactive vocabulary-learning
                experience.
              </p>

              {/* Buttons */}

              <div
                className="
                  hero-buttons
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                  mt-9
                "
              >
                <Link
                  to="/fetch-video"
                  className="
                    group
                    relative
                    overflow-hidden
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    px-6
                    py-3.5
                    rounded-xl
                    bg-gradient-to-r
                    from-violet-600
                    via-purple-600
                    to-indigo-600
                    text-white
                    font-semibold
                    shadow-[0_0_35px_rgba(124,58,237,0.25)]
                    border
                    border-violet-400/20
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      group-hover:translate-x-full
                      transition-transform
                      duration-700
                      bg-gradient-to-r
                      from-transparent
                      via-white/15
                      to-transparent
                    "
                  />

                  <FontAwesomeIcon
                    icon={faPlay}
                    className="relative text-xs"
                  />

                  <span className="relative">
                    Start Learning
                  </span>

                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="
                      relative
                      text-xs
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>

                <Link
                  to="/about"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-3.5
                    rounded-xl
                    bg-white/[0.04]
                    hover:bg-white/[0.07]
                    border
                    border-white/[0.09]
                    text-slate-200
                    font-medium
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  Explore Vocably
                </Link>
              </div>

              {/* Small note */}

              <div
                className="
                  hero-note
                  flex
                  items-center
                  gap-5
                  mt-6
                  text-xs
                  text-slate-500
                "
              >
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-violet-400"
                  />
                  Simple to use
                </span>

                <span className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-violet-400"
                  />
                  Learn from videos
                </span>
              </div>
            </div>

            {/* =================================================
                HERO VISUAL
            ================================================== */}

            <div
              className="
                hero-visual
                relative
                min-h-[480px]
                flex
                items-center
                justify-center
              "
            >
              {/* Outer glow */}

              <div
                className="
                  absolute
                  w-[360px]
                  h-[360px]
                  rounded-full
                  bg-violet-600/[0.12]
                  blur-[90px]
                "
              />

              {/* Orbital rings */}

              <div
                className="
                  absolute
                  w-[390px]
                  h-[390px]
                  rounded-full
                  border
                  border-violet-400/[0.08]
                "
              />

              <div
                className="
                  absolute
                  w-[300px]
                  h-[300px]
                  rounded-full
                  border
                  border-indigo-400/[0.08]
                "
              />

              {/* Main card */}

              <div
                className="
                  relative
                  w-[330px]
                  sm:w-[390px]
                  min-h-[400px]
                  rounded-[32px]
                  bg-white/[0.035]
                  border
                  border-white/[0.09]
                  backdrop-blur-2xl
                  shadow-[0_30px_100px_rgba(0,0,0,0.35)]
                  flex
                  flex-col
                  items-center
                  justify-center
                  overflow-hidden
                "
              >
                {/* Card gradient */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-violet-500/[0.07]
                    via-transparent
                    to-indigo-500/[0.04]
                  "
                />

                {/* Window dots */}

                <div
                  className="
                    absolute
                    top-5
                    left-6
                    flex
                    gap-1.5
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                </div>

                {/* Owl */}

                <div
                  ref={owlRef}
                  className="
                    relative
                    z-10
                    w-52
                    h-52
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      absolute
                      inset-5
                      rounded-full
                      bg-violet-500/[0.10]
                      blur-2xl
                    "
                  />

                  <img
                    src={owl}
                    alt="Vocably owl mascot"
                    className="
                      relative
                      w-48
                      h-48
                      object-contain
                      drop-shadow-[0_15px_35px_rgba(139,92,246,0.35)]
                    "
                  />
                </div>

                {/* Card text */}

                <div
                  className="
                    relative
                    z-10
                    text-center
                    mt-2
                    px-6
                  "
                >
                  <div className="text-xl font-semibold text-white">
                    Your learning companion
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Watch. Discover. Remember.
                  </p>
                </div>

                {/* Floating vocabulary */}

                <div
                  className="
                    absolute
                    top-20
                    -left-5
                    px-3
                    py-2
                    rounded-xl
                    bg-[#0a1025]/90
                    border
                    border-violet-400/15
                    shadow-xl
                    text-xs
                    text-violet-300
                    rotate-[-6deg]
                  "
                >
                  Vocabulary
                </div>

                <div
                  className="
                    absolute
                    bottom-24
                    -right-5
                    px-3
                    py-2
                    rounded-xl
                    bg-[#0a1025]/90
                    border
                    border-indigo-400/15
                    shadow-xl
                    text-xs
                    text-indigo-300
                    rotate-[5deg]
                  "
                >
                  Learn naturally
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section
        className="
          stats-section
          relative
          border-y
          border-white/[0.06]
          bg-white/[0.015]
        "
      >
        <div
          className="
            max-w-5xl
            mx-auto
            px-5
            py-8
            grid
            grid-cols-2
            md:grid-cols-4
            gap-6
          "
        >
          <div className="stat-item text-center">
            <div className="text-2xl font-bold text-white">
              01
            </div>

            <div className="text-xs text-slate-500 mt-1">
              Learning platform
            </div>
          </div>

          <div className="stat-item text-center">
            <div className="text-2xl font-bold text-white">
              ∞
            </div>

            <div className="text-xs text-slate-500 mt-1">
              Videos to learn from
            </div>
          </div>

          <div className="stat-item text-center">
            <div className="text-2xl font-bold text-white">
              AI
            </div>

            <div className="text-xs text-slate-500 mt-1">
              Powered learning
            </div>
          </div>

          <div className="stat-item text-center">
            <div className="text-2xl font-bold text-white">
              24/7
            </div>

            <div className="text-xs text-slate-500 mt-1">
              Learn at your pace
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section className="relative py-28 reveal-section">
        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-6
            lg:px-8
          "
        >
          <div className="max-w-2xl mb-14">
            <span
              className="
                text-sm
                font-semibold
                tracking-wider
                uppercase
                text-violet-400
              "
            >
              Why Vocably
            </span>

            <h2
              className="
                mt-3
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                tracking-tight
              "
            >
              Learn vocabulary
              <span className="text-slate-500">
                {" "}without forcing it.
              </span>
            </h2>

            <p
              className="
                mt-5
                text-slate-400
                leading-7
                max-w-xl
              "
            >
              Vocably makes vocabulary learning part of your
              everyday content instead of another boring study
              session.
            </p>
          </div>

          <div
            className="
              features-grid
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-5
            "
          >
            {/* =================================================
                FEATURE 1
            ================================================== */}

            <div
              className="
                feature-card
                group
                relative
                p-7
                rounded-2xl
                bg-white/[0.025]
                border
                border-white/[0.07]
                hover:border-violet-400/20
                transition-all
                duration-300
                overflow-hidden
              "
              onMouseEnter={cardEnter}
              onMouseLeave={cardLeave}
            >
              <div
                className="
                  absolute
                  -top-20
                  -right-20
                  w-40
                  h-40
                  bg-violet-600/[0.08]
                  blur-3xl
                  rounded-full
                  group-hover:bg-violet-600/[0.14]
                  transition-all
                "
              />

              <div
                className="
                  relative
                  w-12
                  h-12
                  rounded-xl
                  bg-violet-500/10
                  border
                  border-violet-400/10
                  flex
                  items-center
                  justify-center
                  text-violet-400
                  text-lg
                "
              >
                <FontAwesomeIcon icon={faYoutube} />
              </div>

              <h3 className="relative mt-6 text-lg font-semibold">
                Learn from YouTube
              </h3>

              <p className="relative mt-3 text-sm text-slate-500 leading-6">
                Use videos you already enjoy and turn them into
                useful vocabulary-learning material.
              </p>
            </div>

            {/* =================================================
                FEATURE 2
            ================================================== */}

            <div
              className="
                feature-card
                group
                relative
                p-7
                rounded-2xl
                bg-white/[0.025]
                border
                border-white/[0.07]
                hover:border-purple-400/20
                transition-all
                duration-300
                overflow-hidden
              "
              onMouseEnter={cardEnter}
              onMouseLeave={cardLeave}
            >
              <div
                className="
                  absolute
                  -top-20
                  -right-20
                  w-40
                  h-40
                  bg-purple-600/[0.08]
                  blur-3xl
                  rounded-full
                "
              />

              <div
                className="
                  relative
                  w-12
                  h-12
                  rounded-xl
                  bg-purple-500/10
                  border
                  border-purple-400/10
                  flex
                  items-center
                  justify-center
                  text-purple-400
                  text-lg
                "
              >
                <FontAwesomeIcon icon={faUpload} />
              </div>

              <h3 className="relative mt-6 text-lg font-semibold">
                Upload your videos
              </h3>

              <p className="relative mt-3 text-sm text-slate-500 leading-6">
                Have your own content? Upload it and build your
                learning experience around it.
              </p>
            </div>

            {/* =================================================
                FEATURE 3
            ================================================== */}

            <div
              className="
                feature-card
                group
                relative
                p-7
                rounded-2xl
                bg-white/[0.025]
                border
                border-white/[0.07]
                hover:border-indigo-400/20
                transition-all
                duration-300
                overflow-hidden
              "
              onMouseEnter={cardEnter}
              onMouseLeave={cardLeave}
            >
              <div
                className="
                  absolute
                  -top-20
                  -right-20
                  w-40
                  h-40
                  bg-indigo-600/[0.08]
                  blur-3xl
                  rounded-full
                "
              />

              <div
                className="
                  relative
                  w-12
                  h-12
                  rounded-xl
                  bg-indigo-500/10
                  border
                  border-indigo-400/10
                  flex
                  items-center
                  justify-center
                  text-indigo-400
                  text-lg
                "
              >
                <FontAwesomeIcon icon={faBrain} />
              </div>

              <h3 className="relative mt-6 text-lg font-semibold">
                Build your vocabulary
              </h3>

              <p className="relative mt-3 text-sm text-slate-500 leading-6">
                Discover useful words from real-world content and
                make them easier to remember.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section
        className="
          relative
          py-28
          border-y
          border-white/[0.06]
          bg-white/[0.012]
          reveal-section
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-6
            lg:px-8
          "
        >
          <div className="text-center max-w-2xl mx-auto">
            <span
              className="
                text-sm
                font-semibold
                tracking-wider
                uppercase
                text-violet-400
              "
            >
              How it works
            </span>

            <h2
              className="
                mt-3
                text-3xl
                sm:text-4xl
                font-bold
              "
            >
              Three steps.
              <span className="text-slate-500">
                {" "}One better way to learn.
              </span>
            </h2>
          </div>

          <div
            className="
              steps-grid
              grid
              md:grid-cols-3
              gap-6
              mt-16
            "
          >
            {/* Step 1 */}

            <div className="step-card relative">
              <div
                className="
                  relative
                  p-7
                  rounded-2xl
                  bg-[#060b20]
                  border
                  border-white/[0.07]
                "
              >
                <span className="text-5xl font-bold text-white/[0.06]">
                  01
                </span>

                <div
                  className="
                    mt-8
                    w-12
                    h-12
                    rounded-xl
                    bg-violet-500/10
                    border
                    border-violet-400/10
                    flex
                    items-center
                    justify-center
                    text-violet-400
                  "
                >
                  <FontAwesomeIcon icon={faPlay} />
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  Choose a video
                </h3>

                <p className="mt-3 text-sm text-slate-500 leading-6">
                  Paste a YouTube link or upload your own video.
                </p>
              </div>
            </div>

            {/* Step 2 */}

            <div className="step-card relative">
              <div
                className="
                  relative
                  p-7
                  rounded-2xl
                  bg-[#060b20]
                  border
                  border-white/[0.07]
                "
              >
                <span className="text-5xl font-bold text-white/[0.06]">
                  02
                </span>

                <div
                  className="
                    mt-8
                    w-12
                    h-12
                    rounded-xl
                    bg-purple-500/10
                    border
                    border-purple-400/10
                    flex
                    items-center
                    justify-center
                    text-purple-400
                  "
                >
                  <FontAwesomeIcon icon={faBrain} />
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  Discover vocabulary
                </h3>

                <p className="mt-3 text-sm text-slate-500 leading-6">
                  Explore words and expressions found within the
                  content you are watching.
                </p>
              </div>
            </div>

            {/* Step 3 */}

            <div className="step-card relative">
              <div
                className="
                  relative
                  p-7
                  rounded-2xl
                  bg-[#060b20]
                  border
                  border-white/[0.07]
                "
              >
                <span className="text-5xl font-bold text-white/[0.06]">
                  03
                </span>

                <div
                  className="
                    mt-8
                    w-12
                    h-12
                    rounded-xl
                    bg-indigo-500/10
                    border
                    border-indigo-400/10
                    flex
                    items-center
                    justify-center
                    text-indigo-400
                  "
                >
                  <FontAwesomeIcon icon={faBookOpen} />
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  Learn & remember
                </h3>

                <p className="mt-3 text-sm text-slate-500 leading-6">
                  Review what you discover and gradually build a
                  stronger vocabulary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT PREVIEW
      ====================================================== */}

      <section className="relative py-28 reveal-section">
        <div
          className="
            max-w-6xl
            mx-auto
            px-5
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              relative
              rounded-[28px]
              overflow-hidden
              border
              border-white/[0.08]
              bg-white/[0.025]
              backdrop-blur-xl
              p-6
              sm:p-10
            "
          >
            <div
              className="
                absolute
                -top-32
                left-1/2
                -translate-x-1/2
                w-96
                h-96
                rounded-full
                bg-violet-600/[0.08]
                blur-[100px]
              "
            />

            <div
              className="
                relative
                grid
                lg:grid-cols-2
                gap-12
                items-center
              "
            >
              <div>
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-violet-400
                  "
                >
                  <FontAwesomeIcon icon={faBolt} />
                  Learning made simple
                </span>

                <h2
                  className="
                    mt-4
                    text-3xl
                    sm:text-4xl
                    font-bold
                    leading-tight
                  "
                >
                  Your content.
                  <br />
                  Your vocabulary.
                  <br />

                  <span
                    className="
                      bg-gradient-to-r
                      from-violet-300
                      to-indigo-400
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Your progress.
                  </span>
                </h2>

                <p
                  className="
                    mt-5
                    text-slate-400
                    leading-7
                    max-w-lg
                  "
                >
                  Stop separating entertainment from learning.
                  Vocably brings the two together so every video
                  can become an opportunity to learn.
                </p>

                <Link
                  to="/fetch-video"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-8
                    text-sm
                    font-semibold
                    text-white
                    hover:text-violet-300
                    transition-colors
                  "
                >
                  Try it yourself

                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs"
                  />
                </Link>
              </div>

              {/* Fake UI preview */}

              <div
                className="
                  relative
                  rounded-2xl
                  bg-[#03081b]
                  border
                  border-white/[0.08]
                  p-4
                  shadow-2xl
                "
              >
                {/* Window bar */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    pb-4
                    border-b
                    border-white/[0.06]
                  "
                >
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/15" />
                    <span className="w-2 h-2 rounded-full bg-white/10" />
                    <span className="w-2 h-2 rounded-full bg-white/10" />
                  </div>

                  <div className="text-[10px] text-slate-600">
                    VOCABLY
                  </div>
                </div>

                {/* Video */}

                <div
                  className="
                    mt-4
                    h-40
                    sm:h-52
                    rounded-xl
                    bg-gradient-to-br
                    from-violet-950/60
                    via-[#0b1330]
                    to-indigo-950/50
                    border
                    border-white/[0.05]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      rounded-full
                      bg-white/[0.08]
                      border
                      border-white/[0.12]
                      flex
                      items-center
                      justify-center
                      text-white
                    "
                  >
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Vocabulary */}

                <div className="mt-4 space-y-2">
                  <div
                    className="
                      p-3
                      rounded-xl
                      bg-white/[0.025]
                      border
                      border-white/[0.05]
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div>
                      <div className="text-sm font-medium">
                        Fascinating
                      </div>

                      <div className="text-[11px] text-slate-600 mt-1">
                        extremely interesting
                      </div>
                    </div>

                    <span className="text-[10px] text-violet-400">
                      NEW
                    </span>
                  </div>

                  <div
                    className="
                      p-3
                      rounded-xl
                      bg-white/[0.025]
                      border
                      border-white/[0.05]
                    "
                  >
                    <div className="text-sm font-medium">
                      Curious
                    </div>

                    <div className="text-[11px] text-slate-600 mt-1">
                      wanting to know or learn something
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative py-32 reveal-section">
        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            top-1/2
            -translate-y-1/2
            w-[500px]
            h-[300px]
            rounded-full
            bg-violet-600/[0.10]
            blur-[120px]
            pointer-events-none
          "
        />

        <div
          className="
            relative
            max-w-3xl
            mx-auto
            px-5
            text-center
          "
        >
          <img
            src={owl}
            alt=""
            className="
              w-20
              h-20
              object-contain
              mx-auto
              mb-7
              drop-shadow-[0_10px_25px_rgba(139,92,246,0.3)]
            "
          />

          <h2
            className="
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-bold
              tracking-tight
            "
          >
            Start learning

            <span
              className="
                block
                bg-gradient-to-r
                from-violet-300
                via-purple-400
                to-indigo-400
                bg-clip-text
                text-transparent
              "
            >
              from what you love.
            </span>
          </h2>

          <p
            className="
              mt-6
              text-slate-400
              leading-7
              max-w-xl
              mx-auto
            "
          >
            Your next vocabulary lesson might already be sitting
            inside the next video you watch.
          </p>

          <Link
            to="/fetch-video"
            className="
              inline-flex
              items-center
              gap-3
              mt-9
              px-7
              py-3.5
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              via-purple-600
              to-indigo-600
              border
              border-violet-400/20
              text-white
              font-semibold
              shadow-[0_0_40px_rgba(124,58,237,0.25)]
              hover:shadow-[0_0_50px_rgba(124,58,237,0.35)]
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="text-xs"
            />

            Start Learning

            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs"
            />
          </Link>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer
        className="
          border-t
          border-white/[0.06]
          py-8
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-6
            lg:px-8

            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >
          <Link
            to="/"
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-white
            "
          >
            <img
              src={owl}
              alt=""
              className="w-7 h-7 object-contain"
            />

           <div><span> Vocab</span>
            <span className="text-violet-400">
            ly
            </span>
            </div>
          </Link>

          <p className="text-xs text-slate-600">
            Learn from the content you love.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
