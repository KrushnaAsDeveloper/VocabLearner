import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import axios from "axios"
import HistoryPageCard from './HistoryPageCard'
function HistoryPage() {
  
  const [historyData, setHistoryData] = useState([])

  useEffect(()=>{
    const fetchHistoryData =  async (params) => {
      const res = await axios.get("http://localhost:8080/api/v1/history/histroy-data", {withCredentials : true})
      setHistoryData(res.data.data)
    }
    fetchHistoryData() 

  }, [])

  
  return (
    <>
   <div className='flex justify-center items-center flex-wrap'>
     {
      historyData.map((obj) =>(
        
      <HistoryPageCard key={obj._id} historyData={obj}/>
      ))
    }
   </div>
    </>
  )
}

export default HistoryPage