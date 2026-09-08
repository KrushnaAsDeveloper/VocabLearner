import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Videoloader from "../assets/svg/videoloader.svg?react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function HistoryPageCardForYoutube({ youtubeHistory, index, onDelete }) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const cardRef = useRef(null);
  const deleteRef = useRef(null);
  const imageRef = useRef(null);
  const indexRef = useRef(null);

  const navigateToLearn = () => {
    navigate(`/video-player`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(youtubeHistory._id);
  };

  let date = new Date(youtubeHistory.createdAt).toLocaleDateString(
    "en-IN",
    { timeZone: "Asia/Kolkata" }
  );

  let time = new Date(youtubeHistory.createdAt).toLocaleTimeString(
    "en-IN",
    {
      timeZone: "Asia/Kolkata",
      timeStyle: "short",
      hour12: true,
    }
  );

  useEffect(() => {
    const card = cardRef.current;
    const deleteBtn = deleteRef.current;
    const image = imageRef.current;
    const indexEl = indexRef.current;

    if (!card) return;

    const ctx = gsap.context(() => {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(
          card,
          {
            x: 6,
            y: -2,
            duration: 0.25,
            ease: "power2.out",
          },
          0
        )
        .to(
          deleteBtn,
          {
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: "back.out(2)",
          },
          0
        )
        .to(
          image,
          {
            scale: 1.06,
            duration: 0.4,
            ease: "power2.out",
          },
          0
        )
        .to(
          indexEl,
          {
            scale: 1.08,
            color: "#8b5cf6",
            duration: 0.2,
          },
          0
        );

      const enter = () => hoverTl.play();
      const leave = () => hoverTl.reverse();

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);

      return () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      };
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={navigateToLearn}
      className="
        history-card
        group relative
        flex items-center gap-4
        px-3 sm:px-4 py-4
        rounded-2xl
        cursor-pointer

        border border-transparent
        hover:border-violet-500/10

        transition-colors duration-300

        hover:bg-violet-500/[0.035]
        dark:hover:bg-violet-500/[0.055]
      "
    >
      {/* Subtle hover glow */}
      <div
        className="
          pointer-events-none
          absolute left-0 top-1/2
          -translate-y-1/2
          w-1 h-10
          rounded-full
          bg-violet-500
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      {/* Index */}
      <span
        ref={indexRef}
        className="
          w-6 shrink-0
          text-center
          text-xs
          font-semibold
          text-slate-400
          dark:text-slate-500
          transition-colors
        "
      >
        {index}
      </span>

      {/* Thumbnail */}
      <div
        className="
          relative shrink-0
          w-28 h-[68px]
          sm:w-40 sm:h-24

          overflow-hidden
          rounded-xl

          border border-slate-200
          dark:border-white/[0.08]

          bg-slate-100
          dark:bg-white/[0.035]

          shadow-sm
          dark:shadow-none
        "
      >
        {/* Thumbnail gradient */}
        <div
          className="
            absolute inset-0 z-10
            pointer-events-none
            bg-gradient-to-t
            from-black/30
            via-transparent
            to-transparent
            opacity-60
          "
        />

        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Videoloader />
          </div>
        )}

        <img
          ref={imageRef}
          className="
            w-full h-full
            object-cover
            transition-opacity duration-300
          "
          src={youtubeHistory.thumbnail}
          alt=""
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className="
            line-clamp-2
            text-sm
            font-semibold
            leading-5

            text-slate-900
            dark:text-white

            group-hover:text-violet-600
            dark:group-hover:text-violet-300

            transition-colors duration-200
          "
        >
          {youtubeHistory.title}
        </p>

        <p
          className="
            mt-2
            truncate
            text-[11px]
            sm:text-xs
            font-medium
            text-slate-400
            dark:text-slate-500
          "
        >
          {`${date} | ${time}`}
        </p>
      </div>

      {/* Delete */}
      <button
        ref={deleteRef}
        onClick={handleDelete}
        className="
          shrink-0
          h-9 w-9
          sm:h-10 sm:w-10

          flex items-center justify-center
          rounded-xl

          text-slate-400
          dark:text-slate-500

          hover:text-red-500
          hover:bg-red-500/10

          opacity-0
          scale-90

          transition-colors duration-200
        "
        aria-label="Delete"
      >
        <FontAwesomeIcon
          icon={faTrash}
          className="text-sm sm:text-base"
        />
      </button>
    </div>
  );
}

export default HistoryPageCardForYoutube;

