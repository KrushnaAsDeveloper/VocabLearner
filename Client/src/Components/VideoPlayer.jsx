import React from 'react'
import { useVideo } from '../Context/VideoContext'
function VideoPlyer() {
  const {currentVideoUrl, setCurrentVideoUrl ,object, setObject}= useVideo()
  return (
    <>
   <div className='flex justify-center items-center h-full flex-col bg-white dark:bg-slate-950'>
     <h1 className='text-amber-600 dark:text-[#FDC700] font-bold text-3xl italic mt-10'>{object.title}</h1>
     {object.url  ? 
          <div className="mt-20 p-10 rounded-2xl shadow-2xl shadow-slate-300 dark:shadow-slate-900 border bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 md:w-2xl w-sm ">
             <iframe
              width="100%"
              height="315"
              src={object.url ? object.url : null}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="video-player"
            ></iframe>
          </div>
        : <div className="mt-8 rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
            <iframe
              width="100%"
              height="315"
              src={currentVideoUrl ? currentVideoUrl : null}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="video-player"
            ></iframe>
          </div> }
   </div>
    </>
  )
}

export default VideoPlyer