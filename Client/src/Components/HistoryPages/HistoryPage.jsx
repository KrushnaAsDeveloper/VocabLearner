const API_URL = import.meta.env.VITE_API_URL;

import React from "react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";

import HistoryPageCardForYoutube from "./HistoryPageCardForYoutube";
import HistoryPageCardForUpload from "./HistoryPageCardForUpload";

import { toast, Toaster } from "react-hot-toast";

function HistoryPage() {
  const [youtubeHistoryData, setYoutubeHistoryData] = useState([]);
  const [uploadHistoryData, setUploadHistoryData] = useState([]);

  const youtubeListRef = useRef(null);
  const uploadListRef = useRef(null);
  const pageRef = useRef(null);

  const youtubeSectionRef = useRef(null);
  const uploadSectionRef = useRef(null);

  const headerRef = useRef(null);
  const youtubeCountRef = useRef(null);
  const uploadCountRef = useRef(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      const youtubeHistory = await axios.get(
        `${API_URL}/api/v1/history/youtube`,
        { withCredentials: true }
      );

      setYoutubeHistoryData(youtubeHistory.data.data);

      const uploadHistory = await axios.get(
        `${API_URL}/api/v1/history/upload`,
        { withCredentials: true }
      );

      setUploadHistoryData(uploadHistory.data.data);
    };

    fetchHistoryData();
  }, []);

  /* =========================
     PAGE INTRO
  ========================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 25,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(
        [youtubeSectionRef.current, uploadSectionRef.current],
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.2,
          ease: "power3.out",
        }
      );

      /* Floating ambient glow */
      gsap.to(".history-glow-one", {
        x: 70,
        y: 40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".history-glow-two", {
        x: -60,
        y: -50,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  /* =========================
     YOUTUBE ROW ANIMATION
  ========================= */

  useEffect(() => {
    if (youtubeHistoryData.length && youtubeListRef.current) {
      gsap.from(youtubeListRef.current.querySelectorAll(".history-card"), {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.07,
      });
    }
  }, [youtubeHistoryData]);

  /* =========================
     UPLOAD ROW ANIMATION
  ========================= */

  useEffect(() => {
    if (uploadHistoryData.length && uploadListRef.current) {
      gsap.from(uploadListRef.current.querySelectorAll(".history-card"), {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.07,
      });
    }
  }, [uploadHistoryData]);

  /* =========================
     COUNTER ANIMATION
  ========================= */

  useEffect(() => {
    if (youtubeCountRef.current) {
      gsap.fromTo(
        youtubeCountRef.current,
        {
          scale: 0.7,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
        }
      );
    }

    if (uploadCountRef.current) {
      gsap.fromTo(
        uploadCountRef.current,
        {
          scale: 0.7,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.1,
          ease: "back.out(2)",
        }
      );
    }
  }, [youtubeHistoryData.length, uploadHistoryData.length]);

  /* =========================
     DELETE
  ========================= */

  const handleDeleteForYoutube = async (id) => {
    const res = axios.delete(
      `${API_URL}/api/v1/history/delete-history/${id}`
    );

    toast.success("Deleted Succesfully", {
      toasterId: "history-del",
    });

    setYoutubeHistoryData((prev) =>
      prev.filter((item) => item._id != id)
    );
  };

  const handleDeleteForUpload = async (id) => {
    const res = axios.delete(
      `${API_URL}/api/v1/history/delete-history/${id}`
    );

    toast.success("Deleted Succesfully", {
      toasterId: "history-del",
    });

    setUploadHistoryData((prev) =>
      prev.filter((item) => item._id != id)
    );
  };

  return (
    <>
      <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  toasterId="history-del"
  toastOptions={{
    duration: 3000,
    removeDelay: 1000,

    style: {
      marginTop: "70px",
      background: "rgba(25, 21, 57, 0.95)",
      color: "#F5F3FF",
      border: "1px solid rgba(166, 132, 255, 0.25)",
      borderRadius: "14px",
      padding: "14px 18px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow:
        "0 10px 40px rgba(0, 0, 0, 0.35), 0 0 20px rgba(139, 92, 246, 0.12)",
      backdropFilter: "blur(12px)",
    },

    success: {
      iconTheme: {
        primary: "#A684FF",
        secondary: "#191539",
      },

      style: {
        marginTop: "70px",
        background: "linear-gradient(135deg, #191539, #211A4A)",
        color: "#F5F3FF",
        border: "1px solid rgba(166, 132, 255, 0.35)",
        borderRadius: "14px",
        padding: "14px 18px",
        boxShadow:
          "0 10px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(166, 132, 255, 0.15)",
      },
    },
  }}
/>

      <div
        ref={pageRef}
        className="
          relative
          min-h-screen
          overflow-hidden

          bg-white
          dark:bg-[#010617]

          text-slate-900
          dark:text-white

          px-4
          py-10
          sm:py-14
        "
      >
        {/* =========================
            BACKGROUND GLOWS
        ========================= */}

        <div
          className="
            pointer-events-none
            absolute
            top-[-160px]
            left-1/2
            -translate-x-1/2

            h-[420px]
            w-[420px]

            rounded-full
            bg-violet-500/10
            dark:bg-violet-500/[0.08]

            blur-[120px]
          "
        />

        <div
          className="
            history-glow-one
            pointer-events-none
            absolute
            top-[25%]
            left-[-180px]

            h-[350px]
            w-[350px]

            rounded-full
            bg-violet-500/5
            dark:bg-violet-500/[0.08]

            blur-[110px]
          "
        />

        <div
          className="
            history-glow-two
            pointer-events-none
            absolute
            bottom-[10%]
            right-[-180px]

            h-[400px]
            w-[400px]

            rounded-full
            bg-indigo-500/5
            dark:bg-indigo-500/[0.07]

            blur-[120px]
          "
        />

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="relative max-w-5xl mx-auto">

          {/* HEADER */}

          <div
            ref={headerRef}
            className="
              mb-10
              text-center
              sm:text-left
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2

                mb-4
                px-3.5
                py-1.5

                rounded-full

                border
                border-violet-200
                dark:border-violet-500/20

                bg-violet-50
                dark:bg-violet-500/[0.06]

                text-violet-600
                dark:text-violet-300

                text-[11px]
                font-semibold
                tracking-[0.12em]
                uppercase
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-violet-500
                  animate-pulse
                "
              />

              Your learning activity
            </div>

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                tracking-[-0.035em]
              "
            >
              History
            </h1>

            <p
              className="
                mt-2
                max-w-xl

                text-sm
                sm:text-base

                leading-7

                text-slate-500
                dark:text-slate-400
              "
            >
              Your recently processed videos in one place.
            </p>
          </div>

          {/* =========================
              YOUTUBE HISTORY
          ========================= */}

          <div
            ref={youtubeSectionRef}
            className="
              relative
              overflow-hidden

              rounded-[1.75rem]

              border
              border-slate-200
              dark:border-white/[0.08]

              bg-white/75
              dark:bg-white/[0.035]

              backdrop-blur-2xl

              shadow-[0_15px_50px_rgba(15,23,42,0.06)]
              dark:shadow-[0_15px_50px_rgba(0,0,0,0.25)]

              p-4
              sm:p-6

              mb-7
            "
          >
            {/* Top accent */}
            <div
              className="
                absolute
                top-0
                left-10
                right-10
                h-px

                bg-gradient-to-r
                from-transparent
                via-violet-500/40
                to-transparent
              "
            />

            {/* Section Header */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                px-2
                mb-4
              "
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="
                      flex
                      items-center
                      justify-center

                      w-8 h-8

                      rounded-xl

                      bg-red-500/10
                      dark:bg-red-500/[0.08]

                      text-red-500

                      text-xs
                      font-bold
                    "
                  >
                    YT
                  </span>

                  <h2
                    className="
                      text-base
                      sm:text-lg
                      font-semibold
                    "
                  >
                    Youtube History
                  </h2>
                </div>

                <p
                  className="
                    mt-1
                    ml-[42px]
                    text-[11px]
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Previously watched and processed videos
                </p>
              </div>

              <span
                ref={youtubeCountRef}
                className="
                  shrink-0

                  px-3
                  py-1.5

                  rounded-full

                  bg-violet-500/10
                  dark:bg-violet-500/[0.08]

                  border
                  border-violet-500/10

                  text-xs
                  font-semibold

                  text-violet-600
                  dark:text-violet-300
                "
              >
                {youtubeHistoryData.length} items
              </span>
            </div>

            {/* Rows */}

            <div
              ref={youtubeListRef}
              className="
                flex
                flex-col

                divide-y
                divide-slate-200/70
                dark:divide-white/[0.06]
              "
            >
              {youtubeHistoryData.map((obj, i) => (
                <HistoryPageCardForYoutube
                  key={obj._id}
                  index={i + 1}
                  youtubeHistory={obj}
                  onDelete={handleDeleteForYoutube}
                />
              ))}
            </div>
          </div>

          {/* =========================
              UPLOAD HISTORY
          ========================= */}

          <div
            ref={uploadSectionRef}
            className="
              relative
              overflow-hidden

              rounded-[1.75rem]

              border
              border-slate-200
              dark:border-white/[0.08]

              bg-white/75
              dark:bg-white/[0.035]

              backdrop-blur-2xl

              shadow-[0_15px_50px_rgba(15,23,42,0.06)]
              dark:shadow-[0_15px_50px_rgba(0,0,0,0.25)]

              p-4
              sm:p-6
            "
          >
            {/* Top accent */}
            <div
              className="
                absolute
                top-0
                left-10
                right-10
                h-px

                bg-gradient-to-r
                from-transparent
                via-indigo-500/40
                to-transparent
              "
            />

            {/* Header */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                px-2
                mb-4
              "
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="
                      flex
                      items-center
                      justify-center

                      w-8 h-8

                      rounded-xl

                      bg-indigo-500/10
                      dark:bg-indigo-500/[0.08]

                      text-indigo-500

                      text-xs
                      font-bold
                    "
                  >
                    UP
                  </span>

                  <h2
                    className="
                      text-base
                      sm:text-lg
                      font-semibold
                    "
                  >
                    Upload History
                  </h2>
                </div>

                <p
                  className="
                    mt-1
                    ml-[42px]
                    text-[11px]
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Videos uploaded from your device
                </p>
              </div>

              <span
                ref={uploadCountRef}
                className="
                  shrink-0

                  px-3
                  py-1.5

                  rounded-full

                  bg-violet-500/10
                  dark:bg-violet-500/[0.08]

                  border
                  border-violet-500/10

                  text-xs
                  font-semibold

                  text-violet-600
                  dark:text-violet-300
                "
              >
                {uploadHistoryData.length} items
              </span>
            </div>

            {/* Rows */}

            <div
              ref={uploadListRef}
              className="
                flex
                flex-col

                divide-y
                divide-slate-200/70
                dark:divide-white/[0.06]
              "
            >
              {uploadHistoryData.map((obj, i) => (
                <HistoryPageCardForUpload
                  key={obj._id}
                  index={i + 1}
                  uploadHistory={obj}
                  onDelete={handleDeleteForUpload}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;

