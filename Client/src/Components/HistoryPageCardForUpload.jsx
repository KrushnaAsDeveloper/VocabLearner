import React from "react";
import { useNavigate } from "react-router-dom";
import Videoloader from "../assets/svg/videoloader.svg?react";
import { useState } from "react";

function HistoryPageCardForUpload({ uploadHistory = "", index }) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const navigateToLearn = () => {
    navigate("/video-player");
  };

  return (
    <div
      onClick={navigateToLearn}
      className="
        group flex items-center gap-4
        px-2 py-3 rounded-xl cursor-pointer
        transition-colors duration-200
        hover:bg-white/60 dark:hover:bg-white/5
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
          {uploadHistory.url}
        </p>
      </div>

      <span
        className="
          shrink-0 h-2 w-2 rounded-full
          bg-gradient-to-b from-[#6a5cf8] to-[#4F39F6]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
        "
      />
    </div>
  );
}

export default HistoryPageCardForUpload;