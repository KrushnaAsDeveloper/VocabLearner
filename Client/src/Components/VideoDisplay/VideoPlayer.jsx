const API_URL = import.meta.env.VITE_API_URL;
import React, { useState, useEffect, useRef } from "react";
import { useVideo } from "../../Context/VideoContext";
import Videoloader from "../../assets/svg/videoloader.svg?react";
import { Toaster } from "react-hot-toast";
import Overlay from "../VocabularyDisplayOverlay/Overlay";
import axios from "axios"
function VideoPlyer() {
  const [loaded, setLoaded] = useState(false);
  const { object, setObject, curretUrl , data} = useVideo();
  const [currentTime, setCurrentTime] = useState(0)
  const [overlayStaus, setOverlayStaus] = useState(false)
  const [puauseTimeData, setPauseTimeData] = useState()
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const vocabRef = useRef([])
  let intervelRef = useRef(null);
  useEffect( () => {
    if (!window.YT || !window.YT.Player) {
      let scriptTag = document.createElement("script");
      scriptTag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(scriptTag);
    }
  }, []);

   const skipOveraly = ()=> {
      setOverlayStaus(false)
      playerRef.current.playVideo()
  }
  useEffect(()=>{
    const vocab = async () =>{
      const res = await axios.get(`${API_URL}/api/v1/video/fetch_data`, {withCredentials : true})
      // const res = await axios.post(`${API_URL}/api/v1/video/youtube`, {url : object.url}, {withCredentials :true})
      vocabRef.current = res.data.data.map(v=>({...v, shown:false}))
      
    }
    vocab()
  }, [object.url])

  const createPlayerOnLoadOfiframe = () => {
    const createPlayer = () => {
      playerRef.current = new YT.Player(iframeRef.current, {
        events: {
          onReady: () => {
            console.log("player is operate");
          },
          onStateChange: (e) => {
            if(e.data === window.YT.PlayerState.PLAYING){
              setOverlayStaus(false)
                  intervelRef.current = setInterval(() => {
                    const currentTimeInSeconds = playerRef.current.getCurrentTime()
                    setCurrentTime(currentTimeInSeconds)
                   const match = vocabRef.current.find(
                (v) => !v.shown && currentTimeInSeconds >= v.start
              )

                    if (match) {
                match.shown = true
                setPauseTimeData(match)
                playerRef.current.pauseVideo()
                setOverlayStaus(true)
              }
                  }, 1000);
                }else{
                  clearInterval(intervelRef.current)
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

  return (
    <>
      {overlayStaus ?  <Overlay data={puauseTimeData} skip = {skipOveraly} /> : null}
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
      <div className="flex justify-center items-center h-full flex-col bg-white dark:bg-slate-950">
        <h1 className="text-amber-600 dark:text-[#FDC700] font-bold text-3xl italic mt-10">
          {object.title}
        </h1>

        <div className="mt-20 p-10 rounded-2xl shadow-2xl shadow-slate-300 dark:shadow-slate-900 border bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 md:w-6xl w-full mx flex justify-center items-center">
          {object.url ? (
            <div
              className="relative w-full flex justify-center items-center"
              style={{ minHeight: 315 }}
            >
              {!loaded && <Videoloader />}
              <iframe
                ref={iframeRef}
                width="100%"
                height="600"
                src={object.url}
                onLoad={() => {
                  (createPlayerOnLoadOfiframe(), setLoaded(true));
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="video-player"
                className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
              ></iframe>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              width="100%"
              height="600"
              onLoad={() => {
                (createPlayerOnLoadOfiframe(), setLoaded(true));
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
