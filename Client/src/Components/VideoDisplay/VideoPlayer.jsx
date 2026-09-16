import React, { useState, useEffect } from 'react'
import { useVideo } from '../../Context/VideoContext'
import Videoloader from "../../assets/svg/videoloader.svg?react";
import { Toaster } from 'react-hot-toast'
function VideoPlyer() {
  const [loaded, setLoaded] = useState(false)
  const { object, setObject, curretUrl } = useVideo()

  // reset loader whenever a new video url comes in
  useEffect(() => {
    setLoaded(false)
  }, [object.url])

  return (
    <>
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
      <div className='flex justify-center items-center h-full flex-col bg-white dark:bg-slate-950'>
        <h1 className='text-amber-600 dark:text-[#FDC700] font-bold text-3xl italic mt-10'>{object.title}</h1>

        <div className="mt-20 p-10 rounded-2xl shadow-2xl shadow-slate-300 dark:shadow-slate-900 border bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 md:w-2xl w-sm flex justify-center items-center">
          {object.url ? (
            <div className="relative w-full flex justify-center items-center" style={{ minHeight: 315 }}>
              {!loaded && (
               <Videoloader/>
              )}
              <iframe
                width="100%"
                height="315"
                src={object.url}
                onLoad={() => setLoaded(true)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="video-player"
                className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
              ></iframe>
            </div>
          ) : (
            <iframe
              width="100%"
              height="315"
              src={curretUrl ? curretUrl : null}
              
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="video-player"
            ></iframe>
          )}
        </div>
      </div>
    </>
  )
}

export default VideoPlyer