import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faL, faTextWidth } from "@fortawesome/free-solid-svg-icons";
import { replace, useNavigate } from 'react-router-dom';
import axios from "axios"
import DotSpinner from "../assets/svg/dot.svg?react"

function Signup() {
  let navigate = useNavigate()
  const [signUp, setSignUp] = useState({
    email: "",
    password: ""
  })
  const [types, SetTypes] = useState("password")
  const [loading, setLoading] = useState(false)
  const handleInput = (e) => {
    setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleOnsubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const res = await axios.post("http://localhost:8080/api/v1/users/register", signUp, {withCredentials:true})
      console.log(res.data)
    } catch (error) {
      
      alert(error)
      setLoading(false)
      
    }finally{
      setLoading(false)
      navigate("/login", {replace : true})
    }
    
  }
  return (
    <div className="h-full bg-[#010617] flex items-center justify-center flex-col px-4">
      <div className='text-center text-[#FDC700] text-4xl font-bold my-4'>Sign Up</div>
      <form
        onSubmit={handleOnsubmit}
        className="w-full max-w-md bg-[#0F172C] border border-white/10 rounded-2xl p-8 space-y-4 text-white"
      >
        <input
          type="text"
          onChange={handleInput}
          name='email'
          placeholder="you@example.com"
          className="w-full bg-[#05070d] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-400"
        />
        <div className="relative">
          <input
            type={types}
            onChange={handleInput}
            name='password'
            placeholder="At least 6 characters"
            className="w-full bg-[#05070d] border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-400"
          />
          <button
            onClick={() => types == "password" ? SetTypes("text") : SetTypes("password")}
            type='button'
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {types == "password" ? <FontAwesomeIcon icon={faEye} className="text-gray-400 text-sm" /> : <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400 text-sm" />}
          </button>
        </div>
        <button
          type='submit'
          className={`w-full bg-indigo-500 hover:bg-indigo-400 transition rounded-lg py-2.5 font-medium flex justify-center items-center`}
        >
          {loading ? <DotSpinner/> : "SignUp"}
        </button>
      </form>
    </div>
  )
}

export default Signup