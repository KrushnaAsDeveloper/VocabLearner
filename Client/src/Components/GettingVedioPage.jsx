const API_URL = import.meta.env.VITE_API_URL;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useVideo } from "../Context/VideoContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../Context/authContext";
import gsap from "gsap";

function GettingVedioPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("url");
  const [form, setForm] = useState({ url: "" });
  const [title, setTitle] = useState({ title: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const toggleRef = useRef(null);
  const formRef = useRef(null);
  const modeIndicatorRef = useRef(null);
  const submitRef = useRef(null);
  const uploadBoxRef = useRef(null);
  const fileIconRef = useRef(null);
  const formContentRef = useRef(null);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInputTitle = (e) => {
    setTitle({ ...title, [e.target.name]: e.target.value });
  };

  // video context
  const { currentVideoUrl, setCurrentVideoUrl, object, setObject } = useVideo();

  // auth context
  const { userStatus } = useAuthContext();

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
            `${API_URL}/api/v1/video/youtube`,
            form,
            { withCredentials: true },
          );

          setObject({
            url: res.data.data.url,
            title: res.data.data.title,
          });

          localStorage.setItem("url", res.data.data.url);

          navigate("/video-player");

          toast.success(res.data.message, {
            toasterId: "video-player",
          });
        } catch (error) {
          if (userStatus == false) {
            toast.error("Login first !", {
              toasterId: "login-first",
            });

            navigate("/login");
            return;
          }

          if (error.response.status == 401) {
            toast.success("Click Again ! We re-login you !", {
              toasterId: "getting-video",
            });

            const res = await axios.get(`${API_URL}/api/v1/users/re-login`, {
              withCredentials: true,
            });
          } else {
            toast.error(error.response.data.message, {
              toasterId: "getting-video-error",
            });
          }
        }
      } else {
        try {
          if (!file) {
            setLoading(false);
            return;
          }

          const formData = new FormData();

          formData.append("video", file);
          formData.append("title", title.title);

          const res = await axios.post(
            `${API_URL}/api/v1/video/upload`,
            formData,
            { withCredentials: true },
          );

          setObject({
            url: res.data.data.url,
            title: res.data.data.title,
          });

          await localStorage.setItem("url", res.data.data.url);

          navigate("/video-player");

          toast.success(res.data.message, {
            toasterId: "video-player",
          });
        } catch (error) {
          if (userStatus == false) {
            toast.error("Login first !", {
              toasterId: "login-first",
            });

            navigate("/login");
            return;
          }

          if (error.response.status == 401) {
            toast.success("Click Again ! We re-login you !", {
              toasterId: "getting-video",
            });

            const res = await axios.get(`${API_URL}/api/v1/users/re-login`, {
              withCredentials: true,
            });
          } else {
            toast.error(error.response.data.message, {
              toasterId: "getting-video-error",
            });
          }
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        toasterId: "geting-video",
      });
    }

    setLoading(false);
  };

  /* =====================================
     GSAP
  ===================================== */

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* -----------------------------
         Initial page animation
      ----------------------------- */

      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(toggleRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.96,
        duration: 0.6,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(formRef.current, {
        opacity: 0,
        y: 35,
        scale: 0.98,
        duration: 0.8,
        delay: 0.45,
        ease: "power3.out",
      });

      /* -----------------------------
         Ambient background
      ----------------------------- */

      gsap.to(".video-glow-one", {
        x: 70,
        y: 40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".video-glow-two", {
        x: -60,
        y: -40,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* -----------------------------
         Button hover
      ----------------------------- */

      const button = submitRef.current;

      if (button) {
        const buttonTl = gsap.timeline({ paused: true });

        buttonTl.to(button, {
          y: -2,
          scale: 1.015,
          boxShadow: "0 18px 45px -12px rgba(139,92,246,0.6)",
          duration: 0.25,
          ease: "power2.out",
        });

        const enter = () => {
          if (!loading) buttonTl.play();
        };

        const leave = () => {
          buttonTl.reverse();
        };

        button.addEventListener("mouseenter", enter);
        button.addEventListener("mouseleave", leave);

        return () => {
          button.removeEventListener("mouseenter", enter);
          button.removeEventListener("mouseleave", leave);
        };
      }
    }, pageRef);

    return () => ctx.revert();
  }, [loading]);

  /* =====================================
     MODE CHANGE ANIMATION
  ===================================== */

  useEffect(() => {
    const indicator = modeIndicatorRef.current;

    if (!indicator) return;

    gsap.to(indicator, {
      x: mode === "url" ? 0 : "100%",
      duration: 0.35,
      ease: "power3.out",
    });

    if (formContentRef.current) {
      gsap.fromTo(
        formContentRef.current,
        {
          opacity: 0,
          y: 8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
      );
    }
  }, [mode]);

  /* =====================================
     UPLOAD BOX HOVER
  ===================================== */

  useEffect(() => {
    const box = uploadBoxRef.current;
    const icon = fileIconRef.current;

    if (!box || !icon) return;

    const enter = () => {
      gsap.to(box, {
        borderColor: "rgba(139,92,246,0.55)",
        backgroundColor: "rgba(139,92,246,0.05)",
        duration: 0.25,
      });

      gsap.to(icon, {
        y: -5,
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(2)",
      });
    };

    const leave = () => {
      gsap.to(box, {
        borderColor: "",
        backgroundColor: "",
        duration: 0.25,
      });

      gsap.to(icon, {
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    box.addEventListener("mouseenter", enter);
    box.addEventListener("mouseleave", leave);

    return () => {
      box.removeEventListener("mouseenter", enter);
      box.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      {/* =================================
          TOASTS
      ================================= */}

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toasterId="getting-video"
        toastOptions={{
          className: "mt-15",
          duration: 3000,
          removeDelay: 1000,
          style: {
            backgroundColor: "green",
            color: "white",
          },
        }}
      />

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toasterId="getting-video-error"
        toastOptions={{
          className: "mt-15",
          duration: 3000,
          removeDelay: 1000,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        }}
      />

      {/* =================================
          PAGE
      ================================= */}

      <div
        ref={pageRef}
        className="
          relative
          min-h-screen
          overflow-hidden

          bg-white
          dark:bg-[#010617]

          text-slate-900
          dark:text-white

          flex
          flex-col
          items-center

          px-4
          pt-20
          pb-24

          transition-colors
        "
      >
        {/* =================================
            BACKGROUND GLOWS
        ================================= */}

        <div
          className="
            pointer-events-none
            absolute
            top-[-180px]
            left-1/2
            -translate-x-1/2

            h-[450px]
            w-[450px]

            rounded-full

            bg-violet-500/10
            dark:bg-violet-500/[0.09]

            blur-[120px]
          "
        />

        <div
          className="
            video-glow-one
            pointer-events-none
            absolute

            top-[25%]
            left-[-180px]

            h-[350px]
            w-[350px]

            rounded-full

            bg-violet-500/5
            dark:bg-violet-500/[0.08]

            blur-[110px]
          "
        />

        <div
          className="
            video-glow-two
            pointer-events-none
            absolute

            bottom-[5%]
            right-[-180px]

            h-[400px]
            w-[400px]

            rounded-full

            bg-indigo-500/5
            dark:bg-indigo-500/[0.07]

            blur-[120px]
          "
        />

        {/* =================================
            MAIN CONTENT
        ================================= */}

        <div className="relative w-full max-w-xl">
          {/* =================================
              HERO
          ================================= */}

          <div ref={heroRef} className="text-center mb-9">
            <div
              className="
                inline-flex
                items-center
                gap-2

                mb-5
                px-4
                py-2

                rounded-full

                border
                border-violet-200
                dark:border-violet-500/20

                bg-violet-50
                dark:bg-violet-500/[0.06]

                text-violet-600
                dark:text-violet-300

                text-[11px]
                font-semibold
                tracking-[0.15em]
                uppercase
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-violet-500
                  animate-pulse
                "
              />
              Video vocabulary
            </div>

            <h1
              className="
                text-4xl
                sm:text-5xl

                font-bold
                tracking-[-0.04em]
                leading-tight
              "
            >
              Get Your{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-violet-500
                  via-purple-500
                  to-indigo-500

                  bg-clip-text
                  text-transparent
                "
              >
                Video
              </span>
            </h1>

            <p
              className="
                mt-4
                text-sm
                sm:text-base

                leading-7

                text-slate-500
                dark:text-slate-400
              "
            >
              Paste a YouTube URL or upload a video file to get started.
            </p>
          </div>

          {/* =================================
              MODE TOGGLE
          ================================= */}

          <div
            ref={toggleRef}
            className="
              relative

              flex
              p-1

              mx-auto
              mb-6

              w-fit

              rounded-2xl

              border
              border-slate-200
              dark:border-white/[0.08]

              bg-slate-100
              dark:bg-white/[0.04]

              shadow-sm
              dark:shadow-none
            "
          >
            {/* Animated indicator */}

            <div
              ref={modeIndicatorRef}
              className="
                absolute
                top-1
                bottom-1
                left-1

                w-[calc(50%-4px)]

                rounded-xl

                bg-gradient-to-r
                from-violet-600
                to-indigo-600

                shadow-[0_5px_20px_-6px_rgba(139,92,246,0.7)]
              "
            />

            <button
              type="button"
              onClick={() => setMode("url")}
              className={`
                relative z-10

                px-5
                sm:px-7
                py-2.5

                rounded-xl

                text-xs
                sm:text-sm
                font-semibold

                cursor-pointer

                transition-colors

                ${
                  mode === "url"
                    ? "text-white"
                    : "text-slate-500 dark:text-slate-400"
                }
              `}
            >
              YouTube URL
            </button>

            <button
              type="button"
              onClick={() => setMode("upload")}
              className={`
                relative z-10

                px-5
                sm:px-7
                py-2.5

                rounded-xl

                text-xs
                sm:text-sm
                font-semibold

                cursor-pointer

                transition-colors

                ${
                  mode === "upload"
                    ? "text-white"
                    : "text-slate-500 dark:text-slate-400"
                }
              `}
            >
              Upload Video
            </button>
          </div>

          {/* =================================
              FORM
          ================================= */}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="
              relative
              overflow-hidden

              rounded-[1.75rem]

              border
              border-slate-200
              dark:border-white/[0.08]

              bg-white/80
              dark:bg-white/[0.035]

              backdrop-blur-2xl

              shadow-[0_20px_60px_rgba(15,23,42,0.08)]
              dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]

              p-5
              sm:p-7
            "
          >
            {/* Top accent */}

            <div
              className="
                absolute
                top-0
                left-10
                right-10
                h-px

                bg-gradient-to-r
                from-transparent
                via-violet-500/50
                to-transparent
              "
            />

            <div ref={formContentRef}>
              {/* =================================
                  URL MODE
              ================================= */}

              {mode === "url" ? (
                <div>
                  <label
                    className="
                      block
                      mb-2

                      text-xs
                      font-semibold

                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    YouTube URL
                  </label>

                  <div className="relative group">
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0

                        rounded-xl

                        bg-violet-500/10

                        opacity-0
                        group-focus-within:opacity-100

                        blur-xl

                        transition-opacity
                      "
                    />

                    <input
                      type="text"
                      name="url"
                      value={form.url}
                      onChange={handleInput}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="
                        relative

                        w-full

                        bg-slate-50
                        dark:bg-[#050a18]

                        border
                        border-slate-200
                        dark:border-white/[0.08]

                        rounded-xl

                        px-4
                        py-3.5

                        text-sm

                        placeholder:text-slate-400
                        dark:placeholder:text-slate-600

                        focus:outline-none
                        focus:border-violet-500/50
                        focus:ring-4
                        focus:ring-violet-500/10

                        transition-all
                        duration-200
                      "
                    />
                  </div>
                </div>
              ) : (
                /* =================================
                   UPLOAD MODE
                ================================= */

                <div>
                  <label
                    className="
                      block
                      mb-2

                      text-xs
                      font-semibold

                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    Video details
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={title.title}
                    onChange={handleInputTitle}
                    placeholder="Enter title for your video"
                    className="
                      w-full

                      mb-4

                      bg-slate-50
                      dark:bg-[#050a18]

                      border
                      border-slate-200
                      dark:border-white/[0.08]

                      rounded-xl

                      px-4
                      py-3.5

                      text-sm

                      placeholder:text-slate-400
                      dark:placeholder:text-slate-600

                      focus:outline-none
                      focus:border-violet-500/50
                      focus:ring-4
                      focus:ring-violet-500/10

                      transition-all
                      duration-200
                    "
                  />

                  <label
                    ref={uploadBoxRef}
                    htmlFor="video-upload"
                    className="
                      group

                      relative

                      flex
                      flex-col
                      items-center
                      justify-center

                      w-full

                      border-2
                      border-dashed

                      border-slate-200
                      dark:border-white/[0.09]

                      rounded-2xl

                      py-10
                      px-5

                      cursor-pointer

                      bg-slate-50/60
                      dark:bg-white/[0.02]

                      transition-all
                      duration-300
                    "
                  >
                    {/* Upload icon container */}

                    <div
                      ref={fileIconRef}
                      className="
                        flex
                        items-center
                        justify-center

                        w-14
                        h-14

                        mb-4

                        rounded-2xl

                        bg-violet-500/10
                        dark:bg-violet-500/[0.08]

                        border
                        border-violet-500/10

                        text-violet-500
                        dark:text-violet-400
                      "
                    >
                      <svg
                        className="w-7 h-7"
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
                    </div>

                    <span
                      className="
                        max-w-full
                        truncate

                        text-sm
                        font-medium

                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      {file ? file.name : "Click to select a video file"}
                    </span>

                    <span
                      className="
                        mt-2

                        text-xs

                        text-slate-400
                        dark:text-slate-500
                      "
                    >
                      Select a video from your device
                    </span>

                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* =================================
                  SUBMIT
              ================================= */}

              <button
                ref={submitRef}
                type="submit"
                disabled={loading}
                className="
                  relative
                  overflow-hidden

                  w-full

                  cursor-pointer

                  mt-5

                  py-3.5

                  rounded-xl

                  bg-gradient-to-r
                  from-violet-600
                  to-indigo-600

                  hover:from-violet-500
                  hover:to-indigo-500

                  disabled:bg-slate-300
                  dark:disabled:bg-slate-700

                  disabled:cursor-not-allowed

                  text-white

                  font-semibold
                  text-sm

                  shadow-[0_10px_30px_-10px_rgba(139,92,246,0.55)]

                  transition-colors
                "
              >
                {/* Button shine */}

                {!loading && (
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0

                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent

                      -translate-x-full
                      hover:translate-x-full

                      transition-transform
                      duration-700
                    "
                  />
                )}

                <span className="relative">
                  {loading ? "Processing..." : "Get Video"}
                </span>
              </button>
            </div>
          </form>

          {/* Bottom hint */}

          <p
            className="
              mt-5
              text-center

              text-[11px]

              text-slate-400
              dark:text-slate-600
            "
          >
            Your video will be processed and prepared for vocabulary learning.
          </p>
        </div>
      </div>
    </>
  );
}

export default GettingVedioPage;
