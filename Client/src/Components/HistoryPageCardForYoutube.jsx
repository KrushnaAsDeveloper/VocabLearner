import React from "react";
import { useNavigate } from "react-router-dom";
import Videoloader from "../assets/svg/videoloader.svg?react";
import { useState } from "react";

function HistoryPageCardForYoutube({ youtubeHistory }) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const navigateToLearn = () => {
    navigate("/video-player");
  };

  return (
    <div
      className="
        relative
        w-[30rem]
        h-[30rem]
        p-2
        m-10
        overflow-hidden
        rounded-2xl
        border
        border-white/60
        bg-white/70
        backdrop-blur-xl
        text-slate-900
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
        hover:-translate-y-1

        dark:border-white/10
        dark:bg-slate-900/60
        dark:text-white
        dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
      "
    >
      {/* glossy sheen overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          bg-gradient-to-b
          from-white/50
          via-white/0
          to-transparent
          dark:from-white/10
        "
      />

      <div
        className="
        h-20
        flex justify-center items-center
          relative
          px-2
          py-2
          text-lg
          font-semibold
          text-slate-900

          dark:text-white
        "
      >
        {youtubeHistory.title}
      </div>

      <div
        className="
          relative
          flex
          min-h-40  
          items-center
          justify-center
          overflow-hidden
          rounded-xl
          border
          border-white/60
          bg-white/40
          backdrop-blur-sm

          dark:border-white/10
          dark:bg-black/30
        "
      >
        {!loaded && <Videoloader />}

        <img
          className="
            w-[30rem]
            rounded-lg
          "
          src={youtubeHistory.thumbnail}
          alt=""
          onLoad={() => setLoaded(true)}
        />
      </div>

      <li
        className="
          relative
          mt-3
          truncate
          px-2
          text-sm
          text-slate-500

          dark:text-slate-400
        "
      >
        {youtubeHistory.url}
      </li>

      <button
        onClick={navigateToLearn}
        className="
    relative
    mt-4
    w-full
    cursor-pointer
    overflow-hidden 
    rounded-xl
    bg-gradient-to-b
    from-[#6a5cf8]
    to-[#4F39F6] 
    px-5
    py-3
    font-semibold
    text-white
    shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_14px_rgba(79,57,246,0.45)]
    transition-all
    duration-200

    hover:from-[#7d70fa]
    hover:to-[#5c47f7]
    active:scale-[0.99]

    before:absolute
    before:inset-x-0
    before:top-0
    before:h-1/2
    before:rounded-t-xl
    before:bg-gradient-to-b
    before:from-white/30
    before:to-transparent
  "
      >
        Learn
      </button>
    </div>
  );
}

export default HistoryPageCardForYoutube;
