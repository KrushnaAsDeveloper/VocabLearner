import React, { useState, useEffect } from 'react'
import { useVideo } from '../Context/VideoContext'
function VideoPlyer() {
  const [loaded, setLoaded] = useState(false)
  const { object, setObject, curretUrl } = useVideo()

  // reset loader whenever a new video url comes in
  useEffect(() => {
    setLoaded(false)
  }, [object.url])

  return (
    <>
      <div className='flex justify-center items-center h-full flex-col bg-white dark:bg-slate-950'>
        <h1 className='text-amber-600 dark:text-[#FDC700] font-bold text-3xl italic mt-10'>{object.title}</h1>

        <div className="mt-20 p-10 rounded-2xl shadow-2xl shadow-slate-300 dark:shadow-slate-900 border bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 md:w-2xl w-sm flex justify-center items-center">
          {object.url ? (
            <div className="relative w-full flex justify-center items-center" style={{ minHeight: 315 }}>
              {!loaded && (
                <svg className='absolute' width={40} fill="#FDC700FF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="6" width="2.8" height="12"><animate id="spinner_CcmT" begin="0;spinner_IzZB.end-0.1s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/><animate begin="0;spinner_IzZB.end-0.1s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/></rect><rect x="5.8" y="6" width="2.8" height="12"><animate begin="spinner_CcmT.begin+0.1s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/><animate begin="spinner_CcmT.begin+0.1s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/></rect><rect x="10.6" y="6" width="2.8" height="12"><animate begin="spinner_CcmT.begin+0.2s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/><animate begin="spinner_CcmT.begin+0.2s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/></rect><rect x="15.4" y="6" width="2.8" height="12"><animate begin="spinner_CcmT.begin+0.3s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/><animate begin="spinner_CcmT.begin+0.3s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/></rect><rect x="20.2" y="6" width="2.8" height="12"><animate id="spinner_IzZB" begin="spinner_CcmT.begin+0.4s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/><animate begin="spinner_CcmT.begin+0.4s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/></rect></svg>
              )}
              <iframe
                width="100%"
                height="315"
                src={object.url}
                onLoad={() => setLoaded(true)}
                frameBorder="0"
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
              frameBorder="0"
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