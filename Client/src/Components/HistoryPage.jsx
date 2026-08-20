import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import gsap from "gsap";
import HistoryPageCardForYoutube from "./HistoryPageCardForYoutube";
import HistoryPageCardForUpload from "./HistoryPageCardForUpload";

function HistoryPage() {
  const [youtubeHistoryData, setYoutubeHistoryData] = useState([]);
  const [uploadHistoryData, setUploadHistoryData] = useState([]);
  const youtubeListRef = useRef(null);
  const uploadListRef = useRef(null);

  useEffect(() => {
    const fetchHistoryData = async (params) => {
      const youtubeHistory = await axios.get(
        "http://localhost:8080/api/v1/history/youtube",
        { withCredentials: true },
      );
      setYoutubeHistoryData(youtubeHistory.data.data);
      const uploadHistory = await axios.get(
        "http://localhost:8080/api/v1/history/upload",  
        { withCredentials: true },
      );
      setUploadHistoryData(uploadHistory.data.data);
    };
    fetchHistoryData();
  }, []);

  // Stagger the youtube rows in once they've rendered
  useEffect(() => {
    if (youtubeHistoryData.length && youtubeListRef.current) {
      gsap.from(youtubeListRef.current.querySelectorAll(".history-card"), {
        opacity: 0,
        y: 16,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.06,
      });
    }
  }, [youtubeHistoryData]);

  // Stagger the upload rows in once they've rendered
  useEffect(() => {
    if (uploadHistoryData.length && uploadListRef.current) {
      gsap.from(uploadListRef.current.querySelectorAll(".history-card"), {
        opacity: 0,
        y: 16,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.06,
      });
    }
  }, [uploadHistoryData]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div
        className="
          rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl
          text-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          dark:border-white/10 dark:bg-slate-900/60 dark:text-white
          dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
          p-5 mb-10
        "
      >
        <h1 className="text-xl font-bold px-1 mb-4">
          Youtube History{" "}
          <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
            {youtubeHistoryData.length} items
          </span>
        </h1>
        <div ref={youtubeListRef} className="flex flex-col divide-y divide-slate-200/60 dark:divide-white/10">
          {youtubeHistoryData.map((obj, i) => (
            <HistoryPageCardForYoutube
              key={obj._id}
              index={i + 1}
              youtubeHistory={obj}
            />
          ))}
        </div>
      </div>

      <div
        className="
          rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl
          text-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          dark:border-white/10 dark:bg-slate-900/60 dark:text-white
          dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
          p-5
        "
      >
        <h1 className="text-xl font-bold px-1 mb-4">
          Upload History{" "}
          <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
            {uploadHistoryData.length} items
          </span>
        </h1>
        <div ref={uploadListRef} className="flex flex-col divide-y divide-slate-200/60 dark:divide-white/10">
          {uploadHistoryData.map((obj, i) => (
            <HistoryPageCardForUpload
              key={obj._id}
              index={i + 1}
              uploadHistory={obj}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;