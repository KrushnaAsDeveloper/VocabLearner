import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faL } from "@fortawesome/free-solid-svg-icons";
import { replace, useNavigate } from "react-router-dom";
import DotSpinner from "../assets/svg/dot.svg?react";
import { useAuthContext } from "../Context/authContext";
import toast , {Toaster} from "react-hot-toast"
import axios from "axios";
function Login() {
  
  let navigate = useNavigate();
  const { setUserStatus } = useAuthContext();
  const [error, SetError] = useState("");
  const [login, setSignUp] = useState({
    email: "",
    password: "",
  });
  const [types, SetTypes] = useState("password");
  const [loading, setLoading] = useState(false);
  const handleInput = (e) => {
    setSignUp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleOnsubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        login,
        { withCredentials: true },

      );
      toast.success(res.data.message, {
        duration : 3000, 
        removeDelay : 1000, 
        toasterId : "afterLogin"
      })
    } catch (error) {
      toast.error(error.response.data.message, {toasterId : "wrongPass"})
      setLoading(false);
      return
    } 
    
    setUserStatus(true);
    navigate("/", { replace: true });
    
  };
  return (
    <div className="bg-white dark:bg-[#010617]">
       <Toaster
                  position="top-center"
                  reverseOrder={false}
                  gutter={8}
                  toasterId="loginPageForLogout"
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
       <Toaster
                  position="top-center"
                  reverseOrder={false}
                  gutter={8}
                  toasterId="loginPageForSignup"
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
                <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toasterId="login-first"
            toastOptions={{
              className : "mt-15", 
              duration : 3000,
              removeDelay : 1000, 
              style :{
                backgroundColor: "red", 
                color : "white"
              }
            }}
          />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toasterId="wrongPass"
            toastOptions={{
              className : "", 
              duration : 3000,
              removeDelay : 1000, 
              style :{
                backgroundColor: "red", 
                color : "white"
              }
            }}
          />
      <div className="h-screen flex items-center pt-30 flex-col px-4">
        <div className="text-center text-amber-600 dark:text-[#FDC700] text-4xl font-bold my-4">
          Login
        </div>
        <form
          onSubmit={handleOnsubmit}
          className="w-full max-w-md bg-slate-50 dark:bg-[#0F172C] border border-slate-200 dark:border-white/10 rounded-2xl p-8 space-y-4 text-slate-900 dark:text-white"
        >
          <input
            type="text"
            onChange={handleInput}
            name="email"
            placeholder="you@example.com"
            className="w-full bg-white dark:bg-[#05070d] border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400"
          />
          <div className="relative">
            <input
              type={types}
              onChange={handleInput}
              name="password"
              placeholder="At least 6 characters"
              className="w-full bg-white dark:bg-[#05070d] border border-slate-300 dark:border-white/10 rounded-lg px-4 py-2.5 pr-10 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-400"
            />
            <button
              onClick={() =>
                types == "password" ? SetTypes("text") : SetTypes("password")
              }
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {types == "password" ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-gray-500 dark:text-gray-400 text-sm"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="text-gray-500 dark:text-gray-400 text-sm"
                />
              )}
            </button>
          </div>
          <div className="text-red-500 text-sm">
            {error}
          </div>
          <button
            type="submit"
            className={`w-full bg-indigo-500 hover:bg-indigo-400 transition rounded-lg py-2.5 font-medium flex justify-center items-center`}
          >
            {loading ? <DotSpinner /> : "Login"}
          </button>
         
        </form>
      </div>
    </div>
  );
}

export default Login;
