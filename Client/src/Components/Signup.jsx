const API_URL = import.meta.env.VITE_API_URL;

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowRight,
  faLock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import DotSpinner from "../assets/svg/dot.svg?react";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import gsap from "gsap";

function Signup() {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const owlGlowRef = useRef(null);

  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
  });

  const [types, SetTypes] = useState("password");
  const [loading, setLoading] = useState(false);

  // =========================================================
  // GSAP INTRO
  // =========================================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".signup-logo", {
        y: -20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".signup-title",
          {
            y: 25,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.3"
        )
        .from(
          ".signup-subtitle",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.35"
        )
        .from(
          cardRef.current,
          {
            y: 40,
            opacity: 0,
            scale: 0.97,
            duration: 0.8,
          },
          "-=0.25"
        )
        .from(
          ".signup-field",
          {
            y: 15,
            opacity: 0,
            duration: 0.45,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .from(
          ".signup-submit",
          {
            y: 15,
            opacity: 0,
            duration: 0.45,
          },
          "-=0.25"
        )
        .set(
          [
            ".signup-logo",
            ".signup-title",
            ".signup-subtitle",
            cardRef.current,
            ".signup-field",
            ".signup-submit",
          ],
          { clearProps: "opacity,transform" }
        );

      // Floating glow
      gsap.to(owlGlowRef.current, {
        y: -20,
        x: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // =========================================================
  // INPUT
  // =========================================================

  const handleInput = (e) => {
    setSignUp((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================================================
  // SIGNUP
  // =========================================================

  const handleOnsubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/v1/users/register`,
        signUp,
        { withCredentials: true }
      );

      toast.success(res.data.message, {
        duration: 3000,
        removeDelay: 1000,
        toasterId: "loginPageForSignup",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Signup failed",
        {
          toasterId: "signUpError",
        }
      );

      setLoading(false);

      return;
    }

    setLoading(false);
    navigate("/login", { replace: true });
  };

  // =========================================================
  // BUTTON HOVER
  // =========================================================

  const handleButtonEnter = (e) => {
    if (loading) return;

    gsap.to(e.currentTarget, {
      y: -2,
      scale: 1.01,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div
      ref={pageRef}
      className="
        relative
        min-h-screen

        overflow-hidden

        bg-[#010617]
        text-white
      "
    >
      {/* =====================================================
          TOASTS
      ====================================================== */}

      <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  toasterId="loginPageForSignup"
  toastOptions={{
    duration: 3000,
    removeDelay: 1000,

    style: {
      marginTop: "70px",
      background: "rgba(25, 21, 57, 0.95)",
      color: "#F5F3FF",
      border: "1px solid rgba(166, 132, 255, 0.25)",
      borderRadius: "14px",
      padding: "14px 18px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow:
        "0 10px 40px rgba(0, 0, 0, 0.35), 0 0 20px rgba(139, 92, 246, 0.12)",
      backdropFilter: "blur(12px)",
    },

    success: {
      iconTheme: {
        primary: "#A684FF",
        secondary: "#191539",
      },

      style: {
        marginTop: "70px",
        background: "linear-gradient(135deg, #191539, #211A4A)",
        color: "#F5F3FF",
        border: "1px solid rgba(166, 132, 255, 0.35)",
        borderRadius: "14px",
        padding: "14px 18px",
        boxShadow:
          "0 10px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(166, 132, 255, 0.15)",
      },
    },
  }}
/>


      <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  toasterId="signUpError"
  toastOptions={{
    duration: 4000,
    removeDelay: 1000,

    style: {
      marginTop: "70px",
      background: "rgba(25, 21, 57, 0.96)",
      color: "#FFECEF",
      border: "1px solid rgba(255, 107, 129, 0.35)",
      borderRadius: "16px",
      padding: "14px 18px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow:
        "0 12px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(255, 107, 129, 0.12)",
      backdropFilter: "blur(14px)",
    },

    error: {
      style: {
        background: "linear-gradient(135deg, #24111A, #321421)",
        color: "#FFECEF",
        border: "1px solid rgba(255, 107, 129, 0.35)",
        boxShadow:
          "0 12px 40px rgba(0, 0, 0, 0.45), 0 0 25px rgba(255, 107, 129, 0.15)",
      },

      iconTheme: {
        primary: "#FF6B81",
        secondary: "#24111A",
      },
    },
  }}
/>

      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 pointer-events-none">
        {/* Top violet glow */}

        <div
          className="
            absolute
            -top-52
            left-1/2
            -translate-x-1/2

            w-[600px]
            h-[600px]

            rounded-full

            bg-violet-600/[0.09]

            blur-[150px]
          "
        />

        {/* Left glow */}

        <div
          className="
            absolute
            top-[35%]
            -left-60

            w-[450px]
            h-[450px]

            rounded-full

            bg-purple-600/[0.06]

            blur-[130px]
          "
        />

        {/* Right glow */}

        <div
          ref={owlGlowRef}
          className="
            absolute
            top-[25%]
            -right-60

            w-[500px]
            h-[500px]

            rounded-full

            bg-indigo-600/[0.07]

            blur-[140px]
          "
        />
      </div>

      {/* =====================================================
          TOP ACCENT
      ====================================================== */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-violet-500/50
          to-transparent
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10

          min-h-screen

          flex
          flex-col
          items-center

          px-5
          py-12
          sm:py-16
        "
      >
        {/* =================================================
            BRAND
        ================================================== */}

        <div
          className="
            signup-logo

            flex
            items-center
            gap-2

            select-none
          "
        >
          <div
            className="
              w-9
              h-9

              rounded-xl

              bg-gradient-to-br
              from-violet-500/20
              to-indigo-500/10

              border
              border-violet-400/15

              flex
              items-center
              justify-center

              shadow-[0_0_25px_rgba(124,58,237,0.12)]
            "
          >
            <FontAwesomeIcon
              icon={faLock}
              className="
                text-violet-400
                text-sm
              "
            />
          </div>

          <span
            className="
              text-lg
              font-bold
              tracking-tight
            "
          >
            Vocab
            <span
              className="
                bg-gradient-to-r
                from-violet-400
                to-indigo-400

                bg-clip-text
                text-transparent
              "
            >
              ly
            </span>
          </span>
        </div>

        {/* =================================================
            TITLE
        ================================================== */}

        <div
          className="
            signup-title

            text-center

            mt-10
          "
        >
          <h1
            className="
              text-3xl
              sm:text-4xl

              font-bold

              tracking-tight

              text-white
            "
          >
            Create your account
          </h1>
        </div>

        <p
          className="
            signup-subtitle

            mt-3

            text-sm
            sm:text-base

            text-slate-500

            text-center
          "
        >
          Start building your vocabulary today.
        </p>

        {/* =================================================
            SIGNUP CARD
        ================================================== */}

        <div
          ref={cardRef}
          className="
            relative

            w-full
            max-w-[430px]

            mt-8

            rounded-[24px]

            bg-white/[0.035]

            border
            border-white/[0.08]

            backdrop-blur-2xl

            shadow-[0_30px_100px_rgba(0,0,0,0.4)]

            overflow-hidden
          "
        >
          {/* Card top glow */}

          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2

              w-64
              h-32

              bg-violet-600/[0.08]

              blur-[60px]

              pointer-events-none
            "
          />

          {/* Top border highlight */}

          <div
            className="
              absolute
              top-0
              left-[15%]
              right-[15%]

              h-px

              bg-gradient-to-r
              from-transparent
              via-violet-400/30
              to-transparent
            "
          />

          <form
            onSubmit={handleOnsubmit}
            className="
              relative

              p-6
              sm:p-8

              space-y-5
            "
          >
            {/* =================================================
                EMAIL
            ================================================== */}

            <div className="signup-field">
              <label
                className="
                  block

                  mb-2

                  text-xs
                  font-medium

                  tracking-wide

                  text-slate-400
                "
              >
                Email
              </label>

              <div className="relative">
                <div
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2

                    text-slate-600

                    pointer-events-none
                  "
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-sm"
                  />
                </div>

                <input
                  type="email"
                  onChange={handleInput}
                  name="email"
                  value={signUp.email}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="
                    w-full

                    h-12

                    pl-11
                    pr-4

                    rounded-xl

                    bg-[#030819]

                    border
                    border-white/[0.08]

                    text-sm
                    text-white

                    placeholder:text-slate-600

                    outline-none

                    transition-all
                    duration-200

                    focus:border-violet-400/40

                    focus:ring-4
                    focus:ring-violet-500/[0.07]

                    hover:border-white/[0.14]
                  "
                />
              </div>
            </div>

            {/* =================================================
                PASSWORD
            ================================================== */}

            <div className="signup-field">
              <label
                className="
                  block

                  mb-2

                  text-xs
                  font-medium

                  tracking-wide

                  text-slate-400
                "
              >
                Password
              </label>

              <div className="relative">
                <div
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2

                    text-slate-600

                    pointer-events-none
                  "
                >
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-sm"
                  />
                </div>

                <input
                  type={types}
                  onChange={handleInput}
                  name="password"
                  value={signUp.password}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  required
                  className="
                    w-full

                    h-12

                    pl-11
                    pr-12

                    rounded-xl

                    bg-[#030819]

                    border
                    border-white/[0.08]

                    text-sm
                    text-white

                    placeholder:text-slate-600

                    outline-none

                    transition-all
                    duration-200

                    focus:border-violet-400/40

                    focus:ring-4
                    focus:ring-violet-500/[0.07]

                    hover:border-white/[0.14]
                  "
                />

                <button
                  onClick={() =>
                    types === "password"
                      ? SetTypes("text")
                      : SetTypes("password")
                  }
                  type="button"
                  aria-label={
                    types === "password"
                      ? "Show password"
                      : "Hide password"
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2

                    w-8
                    h-8

                    rounded-lg

                    flex
                    items-center
                    justify-center

                    text-slate-500
                    hover:text-violet-300

                    hover:bg-white/[0.05]

                    transition-all
                    duration-200
                  "
                >
                  <FontAwesomeIcon
                    icon={
                      types === "password"
                        ? faEye
                        : faEyeSlash
                    }
                    className="text-sm"
                  />
                </button>
              </div>
            </div>

            {/* =================================================
                SIGNUP BUTTON
            ================================================== */}

            <button
              type="submit"
              disabled={loading}
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
              className="
                signup-submit

                group

                relative

                w-full
                h-12

                overflow-hidden

                rounded-xl

                bg-gradient-to-r
                from-violet-600
                via-purple-600
                to-indigo-600

                border
                border-violet-400/20

                text-white

                font-semibold
                text-sm

                shadow-[0_0_30px_rgba(124,58,237,0.18)]

                transition-all
                duration-200

                hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]

                disabled:opacity-70
                disabled:cursor-not-allowed
              "
            >
              {/* Shine */}

              <span
                className="
                  absolute
                  inset-0

                  -translate-x-full

                  group-hover:translate-x-full

                  transition-transform
                  duration-500

                  bg-gradient-to-r
                  from-transparent
                  via-white/15
                  to-transparent
                "
              />

              <span
                className="
                  relative

                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                {loading ? (
                  <DotSpinner />
                ) : (
                  <>
                    <span>Sign Up</span>

                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="
                        text-xs

                        transition-transform
                        duration-200

                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}
              </span>
            </button>

            {/* =================================================
                BOTTOM INFO
            ================================================== */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-2

                pt-1

                text-[11px]
                text-slate-600
              "
            >
              <FontAwesomeIcon
                icon={faLock}
                className="text-[9px]"
              />

              Your account is securely protected.
            </div>
          </form>
        </div>

        {/* =================================================
            FOOTER TEXT
        ================================================== */}

        <p
          className="
            mt-7

            text-xs

            text-slate-600

            text-center
          "
        >
          Learn smarter with{" "}
          <span className="text-violet-400">
            Vocably
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;