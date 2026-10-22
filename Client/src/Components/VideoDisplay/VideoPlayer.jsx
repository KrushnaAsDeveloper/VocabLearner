
const API_URL = import.meta.env.VITE_API_URL;

import { useState, useEffect, useRef } from "react";
import { useVideo } from "../../Context/VideoContext";
import Videoloader from "../../assets/svg/videoloader.svg?react";
import { Toaster } from "react-hot-toast";
import Overlay from "../VocabularyDisplayOverlay/Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { faBrain, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useOverlayProps } from "../../Context/overlayContext";

function VideoPlyer() {
  const [loaded, setLoaded] = useState(false);
  const { object, curretUrl } = useVideo();
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const vocabRef = useRef([]);
  const toggleRef = useRef(null);
  const iconRef = useRef(null);
  const intervelRef = useRef(null);

  const [mode, setMode] = useState("Normal");
  const isSerious = mode === "Serious Mode";

  const {
    setPauseTimeData,
    setSkipButtonStatus,
    overlayStatus,
    setOverlayStatus,
    setNext,
    setCounter,
  } = useOverlayProps();

  const toggleModeFn = () => {
    setSkipButtonStatus((prev) => !prev);
    setMode((prev) =>
      prev === "Normal" ? "Serious Mode" : "Normal"
    );
  };

  useEffect(() => {
    if (!window.YT || !window.YT.Player) {
      const scriptTag = document.createElement("script");
      scriptTag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(scriptTag);
    }
  }, []);

  const skipOverlay = async (final) => {
    setNext(true);
    setOverlayStatus(false);
    playerRef.current?.playVideo();
  };

  useEffect(() => {
    const vocab = async () => {
      const res = await axios.get(
        `${API_URL}/api/v1/video/fetch_data`,
        { withCredentials: true }
      );

      vocabRef.current = res.data.data.map((v) => ({
        ...v,
        shown: false,
      }));
    };

    vocab();
  }, [object.url]);

  const createPlayerOnLoadOfiframe = () => {
    if (intervelRef.current) {
      clearInterval(intervelRef.current);
      intervelRef.current = null;
    }

    if (playerRef.current?.destroy) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    const createPlayer = () => {
      playerRef.current = new YT.Player(iframeRef.current, {
        events: {
          onReady: () => {},

          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setOverlayStatus(false);

              intervelRef.current = setInterval(() => {
                const currentTimeInSeconds =
                  playerRef.current.getCurrentTime();

                const match = vocabRef.current.find(
                  (v) =>
                    !v.shown &&
                    currentTimeInSeconds >= v.start
                );

                if (match) {
                  match.shown = true;
                  setCounter(0);
                  setPauseTimeData(match);
                  playerRef.current.pauseVideo();
                  setOverlayStatus(true);
                }
              }, 1000);
            } else {
              clearInterval(intervelRef.current);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  };

  useEffect(() => {
    setLoaded(false);
  }, [object.url]);

  useEffect(() => {
    return () => {
      if (intervelRef.current) {
        clearInterval(intervelRef.current);
      }

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    gsap.to(toggleRef.current, {
      x: isSerious ? 35 : 4,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.fromTo(
      iconRef.current,
      { scale: 0.5, rotation: -30 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "back.out(2)",
      }
    );
  }, [isSerious]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#080712] text-white">

      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-indigo-600/5 blur-[120px]" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-16 pt-20 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* Video title */}
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
              Vocably Learning Experience
            </p>

            <h1 className="break-words bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-2xl font-bold leading-tight text-transparent sm:text-3xl">
              {object.title || "Your Learning Video"}
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              Learn vocabulary naturally while watching your video.
            </p>
          </div>

          {/* Learning mode toggle */}
          <div className="flex shrink-0 items-center gap-4 self-start rounded-2xl border border-purple-400/15 bg-[#151126]/90 px-5 py-4 shadow-lg shadow-purple-950/20 md:self-auto">

            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                ref={iconRef}
                icon={isSerious ? faBrain : faFaceSmile}
                className={`text-xl ${
                  isSerious
                    ? "text-purple-400"
                    : "text-slate-300"
                }`}
              />

              <div className="flex flex-col">
                <span className="text-xs text-slate-500">
                  Learning Mode
                </span>

                <span className="text-sm font-semibold text-white">
                  {mode}
                </span>
              </div>
            </div>

            <button
              onClick={toggleModeFn}
              aria-label="Toggle serious mode"
              aria-pressed={isSerious}
              className={`relative h-8 w-16 shrink-0 cursor-pointer rounded-full border transition-all duration-300 ${
                isSerious
                  ? "border-purple-400/50 bg-purple-600/30 shadow-[0_0_18px_rgba(168,85,247,0.3)]"
                  : "border-slate-600 bg-slate-800"
              }`}
            >
              <span
                ref={toggleRef}
                className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full shadow-lg ${
                  isSerious
                    ? "bg-purple-400"
                    : "bg-slate-300"
                }`}
              >
                <FontAwesomeIcon
                  icon={isSerious ? faBrain : faFaceSmile}
                  className="text-xs text-[#080712]"
                />
              </span>
            </button>
          </div>
        </div>

        {/* Video container */}
        <div className="relative rounded-3xl border border-purple-400/15 bg-[#100E1D] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:p-5">

          {/* Video frame */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-black shadow-inner">

            {object.url ? (
              <div className="relative aspect-video w-full">

                {!loaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#100E1D]">
                    <Videoloader />
                  </div>
                )}

                <iframe
                  key={object.url}
                  ref={iframeRef}
                  src={object.url}
                  onLoad={() => {
                    createPlayerOnLoadOfiframe();
                    setLoaded(true);
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="video-player"
                  className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ) : (
              <div className="relative aspect-video w-full">

                {!loaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#100E1D]">
                    <Videoloader />
                  </div>
                )}

                <iframe
                  key={curretUrl}
                  ref={iframeRef}
                  onLoad={() => {
                    createPlayerOnLoadOfiframe();
                    setLoaded(true);
                  }}
                  src={curretUrl || undefined}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="video-player"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            )}
          </div>

          {/* Bottom information */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 pt-5">

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />

              <p className="text-xs font-medium text-slate-400 sm:text-sm">
                Interactive Vocabulary Learning
              </p>
            </div>

            <div className="rounded-full border border-purple-400/15 bg-purple-500/10 px-3 py-1.5">
              <span className="text-xs font-medium text-purple-300">
                {isSerious ? "Serious Mode" : "Normal Mode"}
              </span>
            </div>
          </div>
        </div>

        {/* Learning tip */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-purple-400/10 bg-purple-500/5 px-5 py-4">

          <FontAwesomeIcon
            icon={faBrain}
            className="mt-1 text-lg text-purple-400"
          />

          <p className="text-sm leading-relaxed text-slate-400">
            Your video will pause automatically when a new
            vocabulary word appears, helping you understand
            and practice words in context.
          </p>
        </div>
      </div>

      {/* Vocabulary overlay */}
      {overlayStatus && (
        <Overlay skipOverlay={skipOverlay} />
      )}

      {/* Toast notifications */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toasterId="video-player"
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
              background:
                "linear-gradient(135deg, #191539, #211A4A)",
              color: "#F5F3FF",
              border:
                "1px solid rgba(166, 132, 255, 0.35)",
              borderRadius: "14px",
              padding: "14px 18px",
              boxShadow:
                "0 10px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(166, 132, 255, 0.15)",
            },
          },
        }}
      />
    </div>
  );
}

export default VideoPlyer;
