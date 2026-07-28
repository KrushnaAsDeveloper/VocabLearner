import React from 'react'
import { useState } from 'react'
import axios from 'axios'
function App() {
  const [form , setForm] = useState({
    url: ""
  })

  const [url, setUrl] = useState("")
  const handleInput = (e) =>{
     setForm({...form, [e.target.name]:e.target.value})
  }

  

  const handelSubmit = async (e)=>{
    e.preventDefault();
    const res = await axios.post("http://localhost:8080/api/v1/url/convert", form)
    await setUrl(res.data.data.url)
    console.log(res.data.data.url)
    console.log(url)
  }

  return (
    <>
    <form onSubmit={handelSubmit}>
      <input type="text" name="url"onChange={handleInput} />
      <button type='submit'>Get Vedio</button>
    </form>

    {
      url ?  <iframe 
  width="560" height="315"
  src={url}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen>
</iframe> : null

    }
    </>
  )
}

export default App