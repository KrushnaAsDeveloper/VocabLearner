const API_URL = import.meta.env.VITE_API_URL;
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faL, faTextWidth } from "@fortawesome/free-solid-svg-icons";
import { replace, useNavigate } from 'react-router-dom';
import axios from "axios"
import DotSpinner from "../assets/svg/dot.svg?react"
import toast from 'react-hot-toast';

function Signup() {
  let navigate = useNavigate()
  const [signUp, setSignUp] = useState({
    email: "",
    password: ""
  })
  const [types, SetTypes] = useState("password")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const handleInput = (e) => {
    setSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleOnsubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const res = await axios.post(`${API_URL}/api/v1/users/register`, signUp, {withCredentials:true})
      toast.success(res.data.message, {
        toasterId : "loginPageForSignup"
      })
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
      setInterval(() => {
        setError("")
      }, 3000);
      return
    }
      navigate("/login", {replace : true})
    
    
  }
  return (
    <div className=" bg-white dark:bg-[#010617]">
      <div  className='h-screen flex  pt-30 items-center flex-col'>
        <div className='text-center text-amber-600 dark:text-[#FDC700]  text-4xl font-bold my-4'>Sign Up</div>
      <form
        onSubmit={handleOnsubmit}
        className="w-full max-w-md bg-slate-50 dark:bg-[#0F172C] border border-slate-200 dark:border-white/10 rounded-2xl p-8 space-y-4 text-slate-900 dark:text-white"
      >
        <input
          type="text"
          onChange={handleInput}
          name='email'
          placeholder="you@example.com"
          className="w-full bg-white dark:bg-[#05070d] border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400"
        />
        <div className="relative">
          <input
            type={types}
            onChange={handleInput}
            name='password'
            placeholder="At least 6 characters"
            className="w-full bg-white dark:bg-[#05070d] border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2.5 pr-10 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400"
          />
          <button
            onClick={() => types == "password" ? SetTypes("text") : SetTypes("password")}
            type='button'
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {types == "password" ? <FontAwesomeIcon icon={faEye} className="text-gray-500 dark:text-gray-400 text-sm" /> : <FontAwesomeIcon icon={faEyeSlash} className="text-gray-500 dark:text-gray-400 text-sm" />}
          </button>
        </div>
        <div>
          <div className="text-red-500 text-sm">
            {error}
          </div>
        </div>
        <button
          type='submit'
          className={`w-full bg-indigo-500 hover:bg-indigo-400 transition rounded-lg py-2.5 font-medium flex justify-center items-center`}
        >
          {loading ? <DotSpinner/> : "SignUp"}
        </button>
      </form>
      </div>
    </div>
  )
}

export default Signup