const API_URL = import.meta.env.VITE_API_URL; 
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import axios from "axios"

import Buttons from "./Buttons";
import { useOverlayProps } from "../../Context/overlayContext";

import thinkingOwl from "../../assets/mascot/thinking_owl.png";
import welldone from "../../assets/mascot/well_done_owl.png";
import gotit from "../../assets/mascot/got_it_owl.png";

function Test({ skipOverlay }) {
  const { puauseTimeData, counter, setCounter } = useOverlayProps();

  const [answer, setAnswer] = useState({ ans: "" });
  const [allAnswers, setAllAnswers] = useState([])
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const owlRef = useRef(null);
  const questionRef = useRef(null);
  const inputRef = useRef(null);
  const buttonsRef = useRef(null);
  const progressRef = useRef(null);
  const bubbleRef = useRef(null);

  const questions = puauseTimeData?.revisionQuestions ?? [];
  const currentQuestion = questions[counter];

  const isLast = counter === questions.length - 1;

  // Choose owl based on the current state
  const owlImage = isLast
    ? welldone
    : answer.ans.trim()
      ? gotit
      : thinkingOwl;

  const owlMessage = isLast
    ? {
        title: "Well done!",
        subtitle: "You've reached the final question!",
      }
    : answer.ans.trim()
      ? {
          title: "Got it!",
          subtitle: "Keep going, you're doing great!",
        }
      : {
          title: "Think carefully!",
          subtitle: "Take your time. You got this!",
        };

  const progress = questions.length
    ? ((counter + 1) / questions.length) * 100
    : 0;

  // Main entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35 }
      )
        .fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
          },
          "-=0.1"
        )
        .fromTo(
          owlRef.current,
          {
            opacity: 0,
            x: -45,
            rotation: -12,
            scale: 0.7,
          },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.35"
        )
        .fromTo(
          bubbleRef.current,
          { opacity: 0, y: 12, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
          },
          "-=0.35"
        )
        .fromTo(
          questionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.45 },
          "-=0.2"
        )
        .fromTo(
          inputRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        );

      // Gentle floating animation
      gsap.to(owlRef.current, {
        y: -8,
        rotation: 2,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  // Animate owl when the mascot changes
  useEffect(() => {
    if (!owlRef.current) return;

    gsap.fromTo(
      owlRef.current,
      {
        opacity: 0,
        scale: 0.65,
        rotation: -12,
        y: 15,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 0.55,
        ease: "back.out(1.7)",
      }
    );

    if (bubbleRef.current) {
      gsap.fromTo(
        bubbleRef.current,
        {
          opacity: 0,
          y: 10,
          scale: 0.85,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.5)",
        }
      );
    }
  }, [owlImage]);

  useEffect(()=>{
console.log(allAnswers)
    
  }, [allAnswers])
  // Animate question and progress
  useEffect(() => {
    if (!questionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        questionRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        progressRef.current,
        { scaleX: 0.85, opacity: 0.5 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, [counter]);

  const handleInput = (e) => {
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value,
    });
  };

  const increase = () => {
    if (isLast) {
      skipOverlay();
      return;
    }

    setCounter((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
    question: currentQuestion,
    ans: answer.ans,
    questionIndex: counter,
  };
    setAllAnswers(prev => [...prev, newItem])
    setAnswer({ ans: "" });
    increase();
  };


  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-50 flex items-center
      justify-center overflow-y-auto bg-black/70
      p-4 backdrop-blur-md sm:p-6"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2
        h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2
        rounded-full bg-purple-500/15 blur-[130px]"
      />

      {/* Main Card */}
      <div
        ref={cardRef}
        className="relative flex w-full max-w-5xl flex-col
        items-center gap-6 overflow-hidden rounded-3xl
        border border-purple-300/15
        bg-gradient-to-br from-[#17152f]
        via-[#201b42] to-[#111025]
        p-5 shadow-2xl shadow-purple-950/50
        sm:p-8 md:flex-row md:gap-8 md:p-9"
      >
        {/* Top accent */}
        <div
          className="absolute left-0 top-0 h-1 w-full
          bg-gradient-to-r from-purple-400
          via-violet-400 to-fuchsia-400"
        />

        {/* Owl Section */}
        <div
          className="relative flex w-full shrink-0
          flex-col items-center justify-center
          md:w-56"
        >
          {/* Owl glow */}
          <div
            className="pointer-events-none absolute
            h-44 w-44 rounded-full
            bg-purple-500/20 blur-3xl"
          />

          {/* Owl image */}
          <img
            ref={owlRef}
            src={owlImage}
            alt={
              isLast
                ? "Well done owl"
                : answer.ans.trim()
                  ? "Got it owl"
                  : "Thinking owl"
            }
            className="relative z-10 w-36 object-contain
            drop-shadow-[0_15px_30px_rgba(167,139,250,0.3)]
            sm:w-44 md:w-56"
          />

          {/* Speech Bubble */}
          <div
            ref={bubbleRef}
            className="relative mt-3 w-full max-w-[240px]
            rounded-2xl border border-purple-300/20
            bg-gradient-to-br from-[#30275a] to-[#211c42]
            px-5 py-4 text-center
            shadow-lg shadow-purple-950/30"
          >
            {/* Bubble pointer */}
            <div
              className="absolute -top-2 left-1/2
              h-4 w-4 -translate-x-1/2 rotate-45
              border-l border-t border-purple-300/20
              bg-[#30275a]"
            />

            <p className="relative text-sm font-bold text-purple-200">
              {owlMessage.title}
            </p>

            <p className="relative mt-1 text-xs leading-relaxed text-gray-400">
              {owlMessage.subtitle}
            </p>
          </div>

          {/* Mascot status */}
          <div
            className="mt-4 flex items-center gap-2
            rounded-full border border-white/10
            bg-white/[0.04] px-3 py-1.5"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isLast
                  ? "bg-emerald-400"
                  : answer.ans.trim()
                    ? "bg-purple-400"
                    : "animate-pulse bg-violet-300"
              }`}
            />

            <span className="text-[11px] font-medium text-gray-400">
              {isLast
                ? "Almost finished"
                : answer.ans.trim()
                  ? "Answering..."
                  : "Thinking mode"}
            </span>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">

          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p
                className="text-xs font-semibold uppercase
                tracking-[0.2em] text-purple-300"
              >
                Vocabulary practice
              </p>

              <h1
                className="mt-2 text-2xl font-bold
                tracking-tight text-white sm:text-3xl"
              >
                Quick Revision
              </h1>

              <p className="mt-2 text-sm text-gray-400">
                Test what you've learned.
              </p>
            </div>

            <div
              className="flex h-12 w-12 shrink-0
              items-center justify-center rounded-2xl
              border border-purple-300/20
              bg-purple-500/10 text-purple-300"
            >
              <i className="fa-regular fa-lightbulb text-xl" />
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Question {questions.length ? counter + 1 : 0}
                {" "}of {questions.length}
              </span>

              <span className="text-sm font-semibold text-purple-300">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                ref={progressRef}
                className="h-full origin-left rounded-full
                bg-gradient-to-r from-purple-400 to-violet-500
                shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div
            ref={questionRef}
            className="relative rounded-3xl
            border border-purple-300/20
            bg-gradient-to-br from-[#30275a] to-[#211c42]
            p-5 shadow-lg shadow-purple-950/20 sm:p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center
                justify-center rounded-xl
                bg-purple-500/20 text-purple-300"
              >
                <i className="fa-solid fa-circle-question" />
              </span>

              <span className="text-sm font-semibold text-purple-300">
                Think and answer
              </span>
            </div>

            <p className="text-lg font-medium leading-relaxed text-white sm:text-xl">
              {currentQuestion || "No questions available."}
            </p>
          </div>

          {/* Answer Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <label
              htmlFor="ans"
              className="text-xs font-semibold
              uppercase tracking-[0.2em] text-purple-300"
            >
              Your answer
            </label>

            {/* Input */}
            <div
              className="group flex items-center gap-3
              rounded-2xl border border-white/10
              bg-[#111025]/80 px-4
              transition-all duration-300
              hover:border-purple-300/30
              focus-within:border-purple-400/60
              focus-within:bg-[#211c42]
              focus-within:ring-4
              focus-within:ring-purple-500/10"
            >
              <i
                className="fa-solid fa-pen-to-square
                text-purple-300 transition-colors
                group-focus-within:text-purple-200"
              />

              <input
                ref={inputRef}
                id="ans"
                required
                autoComplete="off"
                className="w-full bg-transparent
                py-4 text-base text-white
                outline-none placeholder:text-gray-500"
                type="text"
                name="ans"
                onChange={handleInput}
                placeholder="Write your answer..."
                value={answer.ans}
              />

              {answer.ans.trim() && (
                <i className="fa-solid fa-check text-purple-300" />
              )}
            </div>

            {/* Footer */}
            <div
              ref={buttonsRef}
              className="mt-2 flex flex-wrap
              items-center justify-between gap-4
              border-t border-white/10 pt-5"
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-sparkles text-purple-300" />

                <p className="text-xs text-gray-400">
                  {isLast
                    ? "Finish your revision!"
                    : "One word at a time. Keep learning."}
                </p>
              </div>

              <Buttons
                testSubmit={isLast ? "submit" : "next"}
                skipOverlay={skipOverlay}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Test;