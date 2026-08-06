import React from "react";
import { useNavigate } from "react-router-dom";
import Videoloader from "../assets/svg/videoloader.svg?react";
import { useState } from "react";

function HistoryPageCard({ historyData }) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const navigateToLearn = () => {
    navigate("/video-player");
  };

  return (
    <div
      className="
            w-[25vw]
            min-h-100
            h-80
            p-2
            m-10
            rounded-2xl
            border
            border-slate-200
            bg-white
            text-slate-900
            shadow-xl
            transition-colors

            dark:border-slate-800
            dark:bg-[#0f172a]
            dark:text-white
            dark:shadow-2xl
        "
    >
      <div
        className="
                px-2
                py-2
                text-lg
                font-semibold
                text-slate-900

                dark:text-white
            "
      >
        {historyData.title}
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
                border-slate-200
                bg-slate-50

                dark:border-slate-700
                dark:bg-[#020617]
            "
      >
        {!loaded && <Videoloader />}

        <img
          className="
                        w-[20vw]
                        rounded-lg
                    "
          src={historyData.thumbnail}
          alt=""
          onLoad={() => setLoaded(true)}
        />
      </div>

      <li
        className="
                mt-3
                truncate
                px-2
                text-sm
                text-slate-500

                dark:text-slate-400
            "
      >
        {historyData.url}
      </li>

      <button
        onClick={navigateToLearn}
        className="
                    mt-4
                    w-full
                    cursor-pointer
                    rounded-xl
                    bg-violet-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-200

                    hover:bg-violet-500
                    active:scale-[0.99]
                "
      >
        Learn
      </button>
    </div>
  );
}

export default HistoryPageCard;
