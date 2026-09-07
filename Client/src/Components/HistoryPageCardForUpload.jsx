import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Videoloader from "../assets/svg/videoloader.svg?react";
import { useState } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function HistoryPageCardForUpload({ uploadHistory = "", index, onDelete }) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const cardRef = useRef(null);
  const deleteRef = useRef(null);

  const navigateToLearn = () => {
    navigate("/video-player");
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent card's onClick from firing
    onDelete?.(uploadHistory._id);
  };

  let date = new Date(uploadHistory.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
  let time = new Date(uploadHistory.createdAt).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", timeStyle: "short", hour12: true })

  useEffect(() => {
    const card = cardRef.current;
    const deleteBtn = deleteRef.current;
    if (!card) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(card, {
      backgroundColor: "rgba(255,255,255,0.6)",
      x: 4,
      duration: 0.2,
      ease: "power2.out",
    }, 0).to(deleteBtn, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "back.out(2)",
    }, 0);

    const enter = () => tl.play();
    const leave = () => tl.reverse();
    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={navigateToLearn}
      className="
        history-card
        group flex items-center gap-4
        px-2 py-3 rounded-xl cursor-pointer
        my-2
        dark:hover:bg-white/5
      "
    >
      <span className="w-5 shrink-0 text-center text-sm text-slate-500 dark:text-slate-400">
        {index}
      </span>

      <div
        className="
          relative shrink-0 w-40 h-24 overflow-hidden rounded-lg
          border border-white/60 bg-white/40 backdrop-blur-sm
          dark:border-white/10 dark:bg-black/30
          flex items-center justify-center
        "
      >
        {!loaded && <Videoloader />}
        <img
          className="w-full h-full object-cover"
          src={uploadHistory.thumbnail}
          alt=""
          onLoad={() => setLoaded(true)}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-white">
          {uploadHistory.title}
        </p>
        <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
          {`${date} | ${time}`}
        </p>
      </div>

      <button
        ref={deleteRef}
        onClick={handleDelete}
        className="
          shrink-0 h-10 w-10 flex items-center justify-center rounded-full
          text-slate-700 hover:text-red-500 hover:bg-red-500/10
          opacity-0 scale-90 transition-colors
        "
        aria-label="Delete"
      >
        <FontAwesomeIcon icon={faTrash} className="text-lg cursor-pointer" />
      </button>
    </div>
  );
}

export default HistoryPageCardForUpload;