import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import axios from "axios"
import HistoryPageCardForYoutube from './HistoryPageCardForYoutube'
import HistoryPageCardForUpload from './HistoryPageCardForUpload'
function HistoryPage() {
  
  const [youtubeHistoryData, setYoutubeHistoryData] = useState([])
  const [uploadHistoryData, setUploadHistoryData] = useState([])
  useEffect(()=>{
    const fetchHistoryData =  async (params) => {
      const youtubeHistory = await axios.get("http://localhost:8080/api/v1/history/youtube", {withCredentials : true})
      setYoutubeHistoryData(youtubeHistory.data.data)
      const uploadHistory = await axios.get("http://localhost:8080/api/v1/history/upload", {withCredentials : true})
      setUploadHistoryData(uploadHistory.data.data)
    }
    fetchHistoryData() 

  }, [])

  
  return (
    <>
   <div className='flex justify-center items-center flex-wrap'>

     {
      youtubeHistoryData.map((obj) =>(
        
      <HistoryPageCardForYoutube key={obj._id} youtubeHistoy={obj}/>
      ))
    }
   </div>
    </>
  )
}

export default HistoryPage