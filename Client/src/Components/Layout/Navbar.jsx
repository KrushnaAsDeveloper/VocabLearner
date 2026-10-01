const API_URL = import.meta.env.VITE_API_URL;

import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DarkModeButton from "../Layout/DarkModeButton";
import axios from "axios";
import { useAuthContext } from "../../Context/authContext";
import owl from "../../assets/mascot/owl-mascot-transparent.png";
import gsap from "gsap";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const { userStatus, setUserStatus } = useAuthContext();

  const [open, setOpen] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const rightRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/fetch-video" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "History", path: "/history" },
    { name: "About", path: "/about" },
  ];

  // =========================================================
  // NAVBAR INTRO
  // =========================================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -15,
        duration: 0.55,
        ease: "power3.out",
      });

      gsap.from(logoRef.current, {
        x: -12,
        duration: 0.45,
        delay: 0.1,
        ease: "power3.out",
      });

      gsap.from(rightRef.current, {
        x: 12,
        duration: 0.45,
        delay: 0.1,
        ease: "power3.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  // =========================================================
  // MOBILE MENU
  // =========================================================

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (open) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".mobile-link"),
        {
          y: -8,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  // =========================================================
  // RE-LOGIN
  // =========================================================

  const reLogin = async () => {
    try {
      await axios.get(`${API_URL}/api/v1/users/re-login`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const logoutUser = async () => {
    try {
      setUserStatus(false);

      const res = await axios.get(`${API_URL}/api/v1/users/logout`, {
        withCredentials: true,
      });

      toast.success(res.data.message, {
        toasterId: "loginPageForLogout",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================================
  // LOGO HOVER
  // =========================================================

  const handleLogoEnter = () => {
    if (!logoRef.current) return;

    const image = logoRef.current.querySelector("img");

    gsap.to(image, {
      y: -2,
      rotate: -5,
      scale: 1.08,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLogoLeave = () => {
    if (!logoRef.current) return;

    const image = logoRef.current.querySelector("img");

    gsap.to(image, {
      y: 0,
      rotate: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  // =========================================================
  // NAV LINK HOVER
  // =========================================================

  const handleLinkEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // =========================================================
  // SIGNUP HOVER
  // =========================================================

  const handleSignupEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -1,
      scale: 1.03,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleSignupLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // =========================================================
  // NAV LINK CLASS
  // =========================================================

  const navLinkClass = ({ isActive }) => `
    relative

    px-3
    py-2

    rounded-lg

    text-[14px]
    font-medium
    tracking-wide

    transition-colors
    duration-300

    ${
      isActive
        ? "text-white"
        : "text-slate-400 hover:text-slate-100"
    }

    after:absolute
    after:left-1/2
    after:-translate-x-1/2
    after:-bottom-[1px]

    after:h-[2px]

    after:rounded-full

    after:bg-gradient-to-r
    after:from-violet-400
    after:to-indigo-400

    after:transition-all
    after:duration-300

    ${
      isActive
        ? "after:w-5 after:opacity-100"
        : "after:w-0 after:opacity-0 hover:after:w-4 hover:after:opacity-70"
    }
  `;

  return (
    <nav
      ref={navRef}
      className="
        sticky
        top-0
        z-50
        w-full

        bg-[#010617]

        border-b
        border-white/[0.07]

        shadow-[0_4px_25px_rgba(0,0,0,0.18)]

        transition-colors
        duration-300
      "
    >
      {/* =====================================================
          TOP ACCENT LINE
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
          via-violet-500/40
          to-transparent

          pointer-events-none
        "
      />

      {/* =====================================================
          NAV CONTAINER
      ====================================================== */}

      <div
        className="
          max-w-7xl
          mx-auto

          px-5
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            h-[68px]

            flex
            items-center
            justify-between
          "
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            ref={logoRef}
            to="/"
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
            className="
              flex
              items-center
              shrink-0
              select-none
            "
          >
            <img
              src={owl}
              alt="Vocably"
              className="
                w-10
                h-10

                object-contain

                mr-2
              "
            />

            <span
              className="
                text-[21px]
                font-bold
                tracking-tight

                text-white

                transition-colors
                duration-300
              "
            >
              Vocab
              <span
                className="
                  bg-gradient-to-r
                  from-violet-400
                  via-purple-400
                  to-indigo-400

                  bg-clip-text
                  text-transparent
                "
              >
                ly
              </span>
            </span>
          </Link>

          {/* =================================================
              DESKTOP NAV LINKS
          ================================================= */}

          <div
            className="
              hidden
              md:flex
              items-center

              ml-10
              mr-auto
            "
          >
            <div
              className="
                flex
                items-center
                gap-1
              "
            >
              {userStatus
                ? navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      end={link.path === "/"}
                      className={navLinkClass}
                      onClick={reLogin}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                    >
                      {link.name}
                    </NavLink>
                  ))
                : navLinks
                    .filter(
                      (elem) =>
                        elem.name !== "History" &&
                        elem.name !== "Dashboard"
                    )
                    .map((link) => (
                      <NavLink
                        key={link.name}
                        to={link.path}
                        end={link.path === "/"}
                        className={navLinkClass}
                      >
                        {link.name}
                      </NavLink>
                    ))}
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div
            ref={rightRef}
            className="
              hidden
              md:flex
              items-center
              gap-1
            "
          >
            {/* Login / Logout */}

            {userStatus ? (
              <button
                onClick={logoutUser}
                className="
                  px-3
                  py-2

                  rounded-lg

                  text-[14px]
                  font-medium

                  text-slate-400
                  hover:text-white
                  hover:bg-white/[0.04]

                  transition-all
                  duration-300
                "
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="
                  px-3
                  py-2

                  rounded-lg

                  text-[14px]
                  font-medium

                  text-slate-400
                  hover:text-white
                  hover:bg-white/[0.04]

                  transition-all
                  duration-300
                "
              >
                Log in
              </Link>
            )}

            {/* Signup */}

            <Link
              to="/signup"
              onMouseEnter={handleSignupEnter}
              onMouseLeave={handleSignupLeave}
              className="
                ml-1

                px-4
                py-2

                rounded-lg

                text-[14px]
                font-semibold

                text-white

                bg-gradient-to-r
                from-violet-600
                to-indigo-600

                border
                border-violet-400/20

                shadow-[0_0_20px_rgba(124,58,237,0.18)]

                transition-all
                duration-300
              "
            >
              Sign up
            </Link>

            {/* Divider */}

            <div
              className="
                ml-2
                pl-3

                border-l
                border-white/[0.08]
              "
            >
            </div>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="
              md:hidden

              w-9
              h-9

              flex
              items-center
              justify-center

              rounded-lg

              text-slate-300
              hover:text-white

              bg-white/[0.04]
              hover:bg-white/[0.08]

              border
              border-white/[0.08]

              transition-all
              duration-300
            "
          >
            <svg
              className={`
                w-5
                h-5

                transition-transform
                duration-300

                ${open ? "rotate-90" : ""}
              `}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        ref={mobileMenuRef}
        className="
          md:hidden

          h-0
          opacity-0

          overflow-hidden

          bg-[#010617]

          border-t
          border-white/[0.06]

          transition-colors
          duration-300
        "
      >
        <div
          className="
            px-5
            py-4
          "
        >
          {/* Links */}

          <div className="flex flex-col gap-1">
            {userStatus
              ? navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => {
                      setOpen(false);
                      reLogin();
                    }}
                    className={({ isActive }) => `
                      mobile-link

                      px-4
                      py-3

                      rounded-lg

                      text-[14px]
                      font-medium

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "text-white bg-violet-500/10 border border-violet-400/10"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                      }
                    `}
                  >
                    {link.name}
                  </NavLink>
                ))
              : navLinks
                  .filter(
                    (link) =>
                      link.name !== "History" &&
                      link.name !== "Dashboard"
                  )
                  .map((elem) => (
                    <NavLink
                      key={elem.name}
                      to={elem.path}
                      end={elem.path === "/"}
                      className={({ isActive }) => `
                        mobile-link

                        px-4
                        py-3

                        rounded-lg

                        text-[14px]
                        font-medium

                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "text-white bg-violet-500/10 border border-violet-400/10"
                            : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                        }
                      `}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      {elem.name}
                    </NavLink>
                  ))}
          </div>

          {/* Mobile bottom */}

          <div
            className="
              mt-4
              pt-4

              border-t
              border-white/[0.06]

              flex
              flex-col
              gap-2
            "
          >

            {/* Login / Logout */}

            {userStatus ? (
              <button
                onClick={() => {
                  setOpen(false);
                  logoutUser();
                }}
                className="
                  mobile-link

                  w-full
                  text-left

                  px-4
                  py-3

                  rounded-lg

                  text-[14px]
                  font-medium

                  text-slate-400
                  hover:text-white
                  hover:bg-white/[0.04]

                  transition-all
                  duration-300
                "
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="
                  mobile-link

                  px-4
                  py-3

                  rounded-lg

                  text-[14px]
                  font-medium

                  text-slate-400
                  hover:text-white
                  hover:bg-white/[0.04]

                  transition-all
                  duration-300
                "
              >
                Log in
              </Link>
            )}

            {/* Signup */}

            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="
                mobile-link

                mt-1

                px-4
                py-3

                rounded-lg

                text-center

                text-[14px]
                font-semibold

                text-white

                bg-gradient-to-r
                from-violet-600
                to-indigo-600

                border
                border-violet-400/20

                transition-all
                duration-300
              "
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
