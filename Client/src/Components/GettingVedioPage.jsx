import React, { useState } from "react";
import axios from "axios";
import { useVideo } from "../Context/VideoContext";
import { useNavigate } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

function GettingVedioPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("url");
  const [form, setForm] = useState({ url: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { currentVideoUrl, setCurrentVideoUrl, object, setObject } = useVideo();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "url") {
        try {
          const res = await axios.post(
            "http://localhost:8080/api/v1/url/convert",
            form,
            { withCredentials: true },

          );
          toast.success(res.data.message , {
            toasterId : "video-player"
          })
          setObject({ url: res.data.data.url, title: res.data.data.title });
          await localStorage.setItem("url", res.data.data.url)
          navigate("/video-player");
        } catch (err) {
          if (err.response?.status == 401) {
            await axios.get("http://localhost:8080/api/v1/users/re-login", {
              withCredentials: true,
            });
            setSuccess(
              "Click Again ! We re-login you again because token expires",
            );
            setInterval(() => {
              setSuccess("");
            }, 3000);
          } else {
          }
        }
      } else {
        if (!file) {
          setLoading(false);
          return;
        }
        const formData = new FormData();
        formData.append("video", file);
        const res = await axios.post(
          "http://localhost:8080/api/v1/url/upload",// Pending : Make it funtional using multer and cloudinary
          formData,
          { withCredentials: true },
        );
        setUrl(res.data.data.url);
      }
    } catch (err) {
      
      toast.error("Please Login First !", {toasterId : "getting-video"})
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
    <div className="h-[100vh] bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center py-30 transition-colors">
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed top-5 right-5 cursor-pointer bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div className="w-full md:w-xl w-sm">
        <h1 className="text-3xl font-bold text-center mb-2">Get Your Video</h1>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
          Paste a YouTube URL or upload a video file to get started.
        </p>

        {/* Mode toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-900 border cursor-pointer border-slate-300 dark:border-slate-800 rounded-full p-1 mb-6 w-fit mx-auto">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-5 cursor-pointer py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "url"
                ? "bg-indigo-600 text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            YouTube URL
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-5 cursor-pointer py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "upload"
                ? "bg-indigo-600 text-white"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Upload Video
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-6 shadow-xl"
        >
          {mode === "url" ? (
            <input
              type="text"
              name="url"
              value={form.url}
              onChange={handleInput}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg px-4 py-3 text-sm
                         placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          ) : (
            <label
              htmlFor="video-upload"
              className="flex flex-col items-center justify-center w-full border-2 border-dashed
                         border-slate-300 dark:border-slate-800 rounded-lg py-10 cursor-pointer hover:border-indigo-600 transition-colors"
            >
              <svg
                className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 16.5V9m0 0l-3 3m3-3l3 3M4.5 19.5h15a1.5 1.5 0 001.5-1.5V9a1.5 1.5 0 00-1.5-1.5h-3.879a1.5 1.5 0 01-1.06-.44L13.44 5.44a1.5 1.5 0 00-1.06-.44H9.62a1.5 1.5 0 00-1.06.44L6.94 7.06a1.5 1.5 0 01-1.06.44H4.5A1.5 1.5 0 003 9v9a1.5 1.5 0 001.5 1.5z"
                />
              </svg>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {file ? file.name : "Click to select a video file"}
              </span>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer mt-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-700
                       disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
          >
            {loading ? "Processing..." : "Get Video"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default GettingVedioPage;