import React, { useState } from "react";
import axios from "axios";
import { useVideo } from "../Context/VideoContext";
import { useNavigate } from "react-router-dom";
function GettingVedioPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("url"); // "url" | "upload"
  const [form, setForm] = useState({ url: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { currentVideoUrl, setCurrentVideoUrl, object, setObject } = useVideo();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "url") {
        try {
          const res = await axios.post(
            "http://localhost:8080/api/v1/url/convert",
            form,
            { withCredentials: true },
          );
          setObject({ url: res.data.data.url, title: res.data.data.title });
          setCurrentVideoUrl(res.data.data.url);
          navigate("/video-player");

          console.log(url);
          console.log(currentVideoUrl);
        } catch (err) {
          if (err.response?.status == 401) {
            await axios.get("http://localhost:8080/api/v1/users/re-login", {
              withCredentials: true,
            });
            {
              setSuccess(
                "Click Again ! We re-login you again because token expires",
              );
              setInterval(() => {
                setSuccess("");
              }, 3000);
            }
          } else {
            setError(
              err.response?.data?.message || "Something went wrong. Try again.",
            );
          }
        }
      } else {
        if (!file) {
          setError("Please select a video file first");
          setLoading(false);
          return;
        }
        const formData = new FormData();
        formData.append("video", file);
        const res = await axios.post(
          "http://localhost:8080/api/v1/url/upload",
          formData,
          { withCredentials: true },
        );
        setUrl(res.data.data.url);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again.",
      );
      alert("Please Login first !");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] bg-slate-950 text-slate-100 flex flex-col items-center py-30">
      <div className="w-full md:w-xl w-sm">
        <h1 className="text-3xl font-bold text-center mb-2">Get Your Video</h1>
        <p className="text-slate-400 text-center mb-8">
          Paste a YouTube URL or upload a video file to get started.
        </p>

        {/* Mode toggle */}
        <div className="flex bg-slate-900 border cursor-pointer border-slate-800 rounded-full p-1 mb-6 w-fit mx-auto">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-5 cursor-pointer py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "url"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-slate-200"
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
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Upload Video
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl"
        >
          {mode === "url" ? (
            <input
              type="text"
              name="url"
              value={form.url}
              onChange={handleInput}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm
                         placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          ) : (
            <label
              htmlFor="video-upload"
              className="flex flex-col items-center justify-center w-full border-2 border-dashed
                         border-slate-800 rounded-lg py-10 cursor-pointer hover:border-indigo-600 transition-colors"
            >
              <svg
                className="w-8 h-8 text-slate-500 mb-2"
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
              <span className="text-sm text-slate-400">
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

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-3">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer mt-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700
                       disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
          >
            {loading ? "Processing..." : "Get Video"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default GettingVedioPage;
