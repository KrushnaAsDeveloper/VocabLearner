
const API_URL = import.meta.env.VITE_API_URL;

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import toast, { Toaster } from "react-hot-toast";

import HistoryPageCardForYoutube from "./HistoryPageCardForYoutube";
import HistoryPageCardForUpload from "./HistoryPageCardForUpload";

function HistoryPage() {
  const [youtubeHistoryData, setYoutubeHistoryData] = useState([]);
  const [uploadHistoryData, setUploadHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState([]);

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const youtubeSectionRef = useRef(null);
  const uploadSectionRef = useRef(null);
  const youtubeListRef = useRef(null);
  const uploadListRef = useRef(null);

  // =====================================
  // FETCH HISTORY
  // =====================================

  useEffect(() => {
    let active = true;

    const fetchHistory = async () => {
      try {
        const [youtubeRes, uploadRes] = await Promise.all([
          axios.get(`${API_URL}/api/v1/history/youtube`, {
            withCredentials: true,
          }),
          axios.get(`${API_URL}/api/v1/history/upload`, {
            withCredentials: true,
          }),
        ]);

        if (!active) return;

        setYoutubeHistoryData(youtubeRes.data.data || []);
        setUploadHistoryData(uploadRes.data.data || []);
      } catch (error) {
        console.error("Fetch history error:", error);

        if (active) {
          toast.error(
            error.response?.data?.message ||
              "Unable to load history",
            { toasterId: "history-del" }
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchHistory();

    return () => {
      active = false;
    };
  }, []);

  // =====================================
  // DELETE HISTORY
  // =====================================

  const handleDelete = async (id, type) => {
    if (!id) {
      toast.error("Invalid history ID", {
        toasterId: "history-del",
      });
      return;
    }

    const key = String(id);

    if (deletingIds.includes(key)) return;

    setDeletingIds((prev) => [...prev, key]);

    try {
      await axios.delete(
        `${API_URL}/api/v1/history/delete-history/${encodeURIComponent(key)}`,
        {
          withCredentials: true,
        }
      );

      if (type === "youtube") {
        setYoutubeHistoryData((prev) =>
          prev.filter((item) => String(item._id) !== key)
        );
      } else {
        setUploadHistoryData((prev) =>
          prev.filter((item) => String(item._id) !== key)
        );
      }

      toast.success("Video deleted successfully", {
        toasterId: "history-del",
      });
    } catch (error) {
      console.error("Delete error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete video",
        {
          toasterId: "history-del",
        }
      );
    } finally {
      setDeletingIds((prev) =>
        prev.filter((item) => item !== key)
      );
    }
  };

  const handleDeleteForYoutube = (id) =>
    handleDelete(id, "youtube");

  const handleDeleteForUpload = (id) =>
    handleDelete(id, "upload");

  // =====================================
  // GSAP PAGE ANIMATIONS
  // =====================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(
        [
          youtubeSectionRef.current,
          uploadSectionRef.current,
        ],
        {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.25,
          ease: "power3.out",
        }
      );

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
        y: -40,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // =====================================
  // CARD ANIMATIONS
  // =====================================

  useEffect(() => {
    const containers = [
      youtubeListRef.current,
      uploadListRef.current,
    ];

    const animations = containers
      .filter(Boolean)
      .map((container) => {
        const cards =
          container.querySelectorAll(".history-card");

        if (!cards.length) return null;

        return gsap.fromTo(
          cards,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
          }
        );
      });

    return () => {
      animations.forEach((animation) => animation?.kill());
    };
  }, [youtubeHistoryData, uploadHistoryData]);

  // =====================================
  // STATISTICS
  // =====================================

  const totalVideos =
    youtubeHistoryData.length + uploadHistoryData.length;

  const stats = [
    {
      label: "Total Videos",
      value: totalVideos,
      color: "text-white",
    },
    {
      label: "YouTube Videos",
      value: youtubeHistoryData.length,
      color: "text-violet-300",
    },
    {
      label: "Uploaded Videos",
      value: uploadHistoryData.length,
      color: "text-indigo-300",
    },
  ];

  return (
    <>
      {/* =====================================
          TOAST NOTIFICATIONS
      ===================================== */}

      <Toaster
        position="top-center"
        toasterId="history-del"
        toastOptions={{
          duration: 3500,
          style: {
            marginTop: "70px",
            background: "rgba(25, 21, 57, 0.96)",
            color: "#F5F3FF",
            border:
              "1px solid rgba(166,132,255,0.25)",
            borderRadius: "14px",
            padding: "14px 18px",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.4)",
            backdropFilter: "blur(12px)",
          },
          success: {
            iconTheme: {
              primary: "#A684FF",
              secondary: "#191539",
            },
          },
          error: {
            iconTheme: {
              primary: "#FF6B81",
              secondary: "#24111A",
            },
          },
        }}
      />

      {/* =====================================
          MAIN PAGE
      ===================================== */}

      <div
        ref={pageRef}
        className="
          relative min-h-screen overflow-hidden
          bg-[#010617] text-white
          px-4 pt-20 pb-24
        "
      >
        {/* BACKGROUND GLOWS */}

        <div
          className="
            pointer-events-none absolute
            -top-44 left-1/2 -translate-x-1/2
            h-[450px] w-[450px] rounded-full
            bg-violet-500/[0.09] blur-[120px]
          "
        />

        <div
          className="
            history-glow-one pointer-events-none
            absolute top-[25%] left-[-180px]
            h-[350px] w-[350px] rounded-full
            bg-violet-500/[0.08] blur-[110px]
          "
        />

        <div
          className="
            history-glow-two pointer-events-none
            absolute bottom-[5%] right-[-180px]
            h-[400px] w-[400px] rounded-full
            bg-indigo-500/[0.07] blur-[120px]
          "
        />

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* =====================================
              HERO
          ===================================== */}

          <div
            ref={headerRef}
            className="mb-10 text-center"
          >
            <div
              className="
                mb-5 inline-flex items-center gap-2
                rounded-full border border-violet-500/20
                bg-violet-500/[0.06] px-4 py-2
                text-[11px] font-semibold uppercase
                tracking-[0.15em] text-violet-300
              "
            >
              <span
                className="
                  h-1.5 w-1.5 rounded-full
                  bg-violet-500 animate-pulse
                "
              />
              Your Learning Activity
            </div>

            <h1
              className="
                text-4xl sm:text-5xl font-bold
                tracking-[-0.04em] leading-tight
              "
            >
              Learning{" "}
              <span
                className="
                  bg-gradient-to-r from-violet-500
                  via-purple-500 to-indigo-500
                  bg-clip-text text-transparent
                "
              >
                History
              </span>
            </h1>

            <p
              className="
                mx-auto mt-4 max-w-xl
                text-sm sm:text-base leading-7
                text-slate-400
              "
            >
              Revisit your previously processed videos
              and continue your vocabulary learning
              journey.
            </p>
          </div>

          {/* =====================================
              STATISTICS
          ===================================== */}

          <div
            className="
              mb-8 grid grid-cols-1 gap-4
              sm:grid-cols-3
            "
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="
                  rounded-2xl border border-white/[0.08]
                  bg-white/[0.035] backdrop-blur-2xl
                  p-5 transition-all duration-300
                  hover:border-violet-500/25
                  hover:bg-white/[0.055]
                "
              >
                <p className="text-xs text-slate-400">
                  {stat.label}
                </p>

                <h3
                  className={`mt-2 text-3xl font-bold ${stat.color}`}
                >
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>

          {/* =====================================
              YOUTUBE HISTORY
          ===================================== */}

          <section
            ref={youtubeSectionRef}
            className="
              relative mb-8 overflow-hidden
              rounded-[1.75rem]
              border border-white/[0.08]
              bg-white/[0.035] backdrop-blur-2xl
              p-5 sm:p-7
              shadow-[0_20px_60px_rgba(0,0,0,0.3)]
            "
          >
            <div
              className="
                absolute top-0 left-10 right-10 h-px
                bg-gradient-to-r from-transparent
                via-violet-500/50 to-transparent
              "
            />

            <div
              className="
                mb-6 flex items-center
                justify-between gap-4
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-11 w-11 items-center
                    justify-center rounded-2xl
                    border border-violet-500/20
                    bg-violet-500/10
                    font-bold text-violet-300
                  "
                >
                  YT
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    YouTube History
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Previously processed videos
                  </p>
                </div>
              </div>

              <span
                className="
                  shrink-0 rounded-full
                  border border-violet-500/20
                  bg-violet-500/10 px-3 py-1.5
                  text-xs font-semibold text-violet-300
                "
              >
                {youtubeHistoryData.length} items
              </span>
            </div>

            <div
              ref={youtubeListRef}
              className="
                flex flex-col
                divide-y divide-white/[0.06]
              "
            >
              {loading ? (
                <div className="py-12 text-center text-slate-400">
                  Loading YouTube history...
                </div>
              ) : youtubeHistoryData.length > 0 ? (
                youtubeHistoryData.map((obj, index) => (
                  <div
                    key={obj._id}
                    className="history-card py-4"
                  >
                    <HistoryPageCardForYoutube
                      index={index + 1}
                      youtubeHistory={obj}
                      onDelete={() =>
                        handleDeleteForYoutube(obj._id)
                      }
                    />
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="font-medium text-slate-300">
                    No YouTube history yet
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Your processed videos will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* =====================================
              UPLOAD HISTORY
          ===================================== */}

          <section
            ref={uploadSectionRef}
            className="
              relative overflow-hidden
              rounded-[1.75rem]
              border border-white/[0.08]
              bg-white/[0.035] backdrop-blur-2xl
              p-5 sm:p-7
              shadow-[0_20px_60px_rgba(0,0,0,0.3)]
            "
          >
            <div
              className="
                absolute top-0 left-10 right-10 h-px
                bg-gradient-to-r from-transparent
                via-indigo-500/50 to-transparent
              "
            />

            <div
              className="
                mb-6 flex items-center
                justify-between gap-4
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-11 w-11 items-center
                    justify-center rounded-2xl
                    border border-indigo-500/20
                    bg-indigo-500/10
                    font-bold text-indigo-300
                  "
                >
                  UP
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Upload History
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Videos uploaded from your device
                  </p>
                </div>
              </div>

              <span
                className="
                  shrink-0 rounded-full
                  border border-indigo-500/20
                  bg-indigo-500/10 px-3 py-1.5
                  text-xs font-semibold text-indigo-300
                "
              >
                {uploadHistoryData.length} items
              </span>
            </div>

            <div
              ref={uploadListRef}
              className="
                flex flex-col
                divide-y divide-white/[0.06]
              "
            >
              {loading ? (
                <div className="py-12 text-center text-slate-400">
                  Loading upload history...
                </div>
              ) : uploadHistoryData.length > 0 ? (
                uploadHistoryData.map((obj, index) => (
                  <div
                    key={obj._id}
                    className="history-card py-4"
                  >
                    <HistoryPageCardForUpload
                      index={index + 1}
                      uploadHistory={obj}
                      onDelete={() =>
                        handleDeleteForUpload(obj._id)
                      }
                    />
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="font-medium text-slate-300">
                    No uploaded videos yet
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Your uploaded videos will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* FOOTER */}

          <p
            className="
              mt-8 text-center text-[11px]
              text-slate-600
            "
          >
            Your learning journey, all in one place.
          </p>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
