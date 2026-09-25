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
  const { object, setObject, curretUrl, data } = useVideo();
  const [currentTime, setCurrentTime] = useState(0);
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
    setMode((prev) => (prev === "Normal" ? "Serious Mode" : "Normal"));
  };

  useEffect(() => {
    if (!window.YT || !window.YT.Player) {
      let scriptTag = document.createElement("script");
      scriptTag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(scriptTag);
    }
  }, []);

  const skipOverlay = async (final) => {
    console.log(final)
    setNext(true);
    setOverlayStatus(false);
    playerRef.current?.playVideo();
  };

  useEffect(() => {
    const vocab = async () => {
      const res = await axios.get(`${API_URL}/api/v1/video/fetch_data`, {
        withCredentials: true,
      });
      vocabRef.current = res.data.data.map((v) => ({ ...v, shown: false }));
      console.log(vocabRef.current);
    };
    vocab();
  }, [object.url]);

  const createPlayerOnLoadOfiframe = () => {
    // clear any interval left running from a previous player instance
    if (intervelRef.current) {
      clearInterval(intervelRef.current);
      intervelRef.current = null;
    }
    // destroy any previous player before creating a new one on the same node
    if (playerRef.current?.destroy) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    const createPlayer = () => {
      playerRef.current = new YT.Player(iframeRef.current, {
        events: {
          onReady: () => {
            console.log("player is operate");
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setOverlayStatus(false);
              intervelRef.current = setInterval(() => {
                const currentTimeInSeconds = playerRef.current.getCurrentTime();
                setCurrentTime(currentTimeInSeconds);
                const match = vocabRef.current.find(
                  (v) => !v.shown && currentTimeInSeconds >= v.start,
                );

                if (match) {
                  match.shown = true;
                  setCounter(0); // reset question index for the new pause
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

  // reset loader whenever a new video url comes in
  useEffect(() => {
    setLoaded(false);
  }, [object.url]);

  // clean up interval and player on unmount
  useEffect(() => {
    return () => {
      if (intervelRef.current) clearInterval(intervelRef.current);
      if (playerRef.current?.destroy) playerRef.current.destroy();
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
      },
    );
  }, [isSerious]);

  return (
    <>
      <div className="absolute right-5 top-20 flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <FontAwesomeIcon
            ref={iconRef}
            icon={isSerious ? faBrain : faFaceSmile}
            className={`text-lg ${isSerious ? "text-purple-400" : "text-gray-300"}`}
          />
          <span>{mode}</span>
        </div>

        <button
          onClick={toggleModeFn}
          aria-label="Toggle serious mode"
          aria-pressed={isSerious}
          className={`relative h-8 w-16 cursor-pointer rounded-full border transition-colors duration-300 ${
            isSerious
              ? "border-purple-400/50 bg-purple-600/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              : "border-white/10 bg-gray-700"
          }`}
        >
          <span
            ref={toggleRef}
            className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full shadow-lg ${
              isSerious ? "bg-purple-400" : "bg-gray-200"
            }`}
          >
            <FontAwesomeIcon
              icon={isSerious ? faBrain : faFaceSmile}
              className="text-xs text-gray-900"
            />
          </span>
        </button>
      </div>

      {overlayStatus ? <Overlay skipOverlay={skipOverlay} /> : null}

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
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35), 0 0 20px rgba(139, 92, 246, 0.12)",
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
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(166, 132, 255, 0.15)",
            },
          },
        }}
      />

      <div className="flex justify-center items-center h-full flex-col bg-white dark:bg-slate-950">
        <h1 className="text-amber-600 dark:text-[#FDC700] font-bold text-3xl italic mt-10">
          {object.title}
        </h1>

        <div className="mt-20 p-10 rounded-2xl shadow-2xl shadow-slate-300 dark:shadow-slate-900 border bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 md:w-6xl w-full mx flex justify-center items-center">
          {object.url ? (
            <div className="relative w-full flex justify-center items-center" style={{ minHeight: 315 }}>
              {!loaded && <Videoloader />}
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
                className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
              ></iframe>
            </div>
          ) : (
            <iframe
              key={curretUrl}
              ref={iframeRef}
              width="100%"
              height={"550"}
              onLoad={() => {
                createPlayerOnLoadOfiframe();
                setLoaded(true);
              }}
              src={curretUrl ? curretUrl : null}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="video-player"
            ></iframe>
          )}
        </div>
      </div>
    </>
  );
}

export default VideoPlyer;