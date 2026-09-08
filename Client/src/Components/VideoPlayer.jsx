import React, { useState, useEffect } from 'react'
import { useVideo } from '../Context/VideoContext'
import Vedioloader from "../assets/svg/videoloader.svg?react"
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
            toasterId='video-player'
            toastOptions={{
              className : "mt-15", 
              duration : 3000,
              removeDelay : 1000, 
              style :{
                backgroundColor: "green", 
                color : "white"
              }
            }}
          />
      <div className='flex justify-center items-center h-full flex-col bg-white dark:bg-slate-950'>
        <h1 className='text-amber-600 dark:text-[#FDC700] font-bold text-3xl italic mt-10'>{object.title}</h1>

        <div className="mt-20 p-10 rounded-2xl shadow-2xl shadow-slate-300 dark:shadow-slate-900 border bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 md:w-2xl w-sm flex justify-center items-center">
          {object.url ? (
            <div className="relative w-full flex justify-center items-center" style={{ minHeight: 315 }}>
              {!loaded && (
               <Vedioloader/>
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