
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import Buttons from "./Buttons";
import { useOverlayProps } from "../../Context/overlayContext";

function Test({ skipOverlay }) {
  const { puauseTimeData, counter, setCounter } = useOverlayProps();

  const [answer, setAnswer] = useState({ ans: "" });

  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const questionRef = useRef(null);
  const inputRef = useRef(null);
  const buttonsRef = useRef(null);
  const progressRef = useRef(null);

  const questions = puauseTimeData?.revisionQuestions ?? [];
  const isLast = counter === questions.length - 1;

  // Entrance animation
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
          { opacity: 0, y: 35, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.15"
        )
        .fromTo(
          questionRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.25"
        )
        .fromTo(
          inputRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        );
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  // Question and progress animations
  useEffect(() => {
    if (!questionRef.current) return;

    gsap.fromTo(
      questionRef.current,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      }
    );

    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0.8, opacity: 0.5 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, [counter]);

  const handelInput = (e) => {
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

  const handelSubmit = (e) => {
    e.preventDefault();

    console.log(answer);

    setAnswer({ ans: "" });
    increase();
  };

  const progress = questions.length
    ? ((counter + 1) / questions.length) * 100
    : 0;

  return (
  <>
  
{/* Overlay */}
<div
  ref={overlayRef}
  className="absolute inset-0 z-50 flex items-center justify-center
  overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-6"
>
  {/* Background glow */}
  <div
    className="pointer-events-none absolute left-1/2 top-1/2
    h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2
    rounded-full bg-purple-500/15 blur-[120px]"
  />

  {/* Main card */}
  <div
    ref={cardRef}
    className="relative w-full max-w-xl overflow-hidden
    rounded-3xl bg-gradient-to-br from-[#17152f]
    via-[#201b42] to-[#111025] p-6
    shadow-2xl shadow-purple-950/40 sm:p-9"
  >
    {/* Top accent */}
    <div
      className="absolute left-0 top-0 h-1 w-full
      bg-gradient-to-r from-purple-400
      via-violet-400 to-fuchsia-400"
    />

    {/* Header */}
    <div className="mb-8 flex items-center justify-between">
      <div>
        <p
          className="text-xs font-semibold uppercase
          tracking-[0.25em] text-purple-300"
        >
          Revision time
        </p>

        <h1
          className="mt-2 text-2xl font-bold
          tracking-tight text-white sm:text-3xl"
        >
          Your Question
        </h1>
      </div>

      <div
        className="flex h-12 w-12 items-center justify-center
        rounded-2xl bg-purple-500/15 text-xl text-purple-300"
      >
        <i className="fa-regular fa-lightbulb" />
      </div>
    </div>

    {/* Progress */}
    <div className="mb-7">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-gray-400">
          Question {questions.length ? counter + 1 : 0}
          {" "}of {questions.length}
        </span>

        <span className="text-sm font-semibold text-purple-300">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          ref={progressRef}
          className="h-full origin-left rounded-full
          bg-gradient-to-r from-purple-400 to-violet-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>

    {/* Question */}
    <div
      ref={questionRef}
      className="mb-7 rounded-2xl
      border border-purple-300/20
      bg-gradient-to-br from-[#30275a] to-[#211c42]
      p-5 shadow-lg shadow-purple-950/20 sm:p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center
          rounded-xl bg-purple-500/20 text-purple-300"
        >
          <i className="fa-solid fa-circle-question" />
        </span>

        <span className="text-sm font-medium text-purple-300">
          Think and answer
        </span>
      </div>

      <p className="text-lg font-medium leading-relaxed text-white sm:text-xl">
        {questions[counter] || "No questions available."}
      </p>
    </div>

    {/* Answer form */}
    <form onSubmit={handelSubmit}>
      <label
        htmlFor="ans"
        className="mb-3 block text-sm font-semibold text-gray-300"
      >
        Your answer
      </label>

      <div
        className="group flex items-center gap-3 rounded-2xl
        bg-[#111025] px-4 transition-all duration-300
        focus-within:bg-[#211c42]
        focus-within:ring-2 focus-within:ring-purple-400/50"
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
          className="w-full bg-transparent py-4 text-base
          text-white outline-none placeholder:text-gray-500"
          type="text"
          name="ans"
          onChange={handelInput}
          placeholder="Write your answer..."
          value={answer.ans}
          autoComplete="off"
        />
      </div>

      {/* Existing Buttons component */}
      <div
        ref={buttonsRef}
        className="mt-7 flex justify-end"
      >
        <Buttons
          testSubmit={isLast ? "submit" : "next"}
          skipOverlay={skipOverlay}
        />
      </div>
    </form>
  </div>
</div>
  </>
  );
}

export default Test;