import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBookOpen,
  faChartLine,
  faTag,
  faCircleInfo,
  faEnvelope,
  faShieldHalved,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

function Footer() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 90%",
        },
      });

      gsap.from(".footer-column", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 85%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const productLinks = [
    {
      name: "Learn",
      path: "/fetch-video",
      icon: faBookOpen,
    },
    {
      name: "Progress",
      path: "/dashboard",
      icon: faChartLine,
    },
    {
      name: "Pricing",
      path: "/about",
      icon: faTag,
    },
  ];

  const companyLinks = [
    {
      name: "About",
      path: "/about",
      icon: faCircleInfo,
    },
    {
      name: "Contact",
      path: "/about",
      icon: faEnvelope,
    },
  ];

  const legalLinks = [
    {
      name: "Privacy",
      path: "/",
      icon: faShieldHalved,
    },
    {
      name: "Terms",
      path: "/",
      icon: faFileContract,
    },
  ];

  return (
    <footer
      className="
        footer-section
        relative
        overflow-hidden
        border-t
        border-white/[0.08]
        bg-[#010617]
        text-gray-400
      "
    >
      {/* ==========================================
          AMBIENT GLOW
      ========================================== */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main glow */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[350px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.07]
            blur-[120px]
          "
        />

        {/* Left glow */}
        <div
          className="
            absolute
            -left-40
            bottom-0
            h-[300px]
            w-[300px]
            rounded-full
            bg-indigo-600/[0.05]
            blur-[120px]
          "
        />

        {/* Right glow */}
        <div
          className="
            absolute
            -right-40
            top-20
            h-[300px]
            w-[300px]
            rounded-full
            bg-purple-600/[0.05]
            blur-[120px]
          "
        />
      </div>

      {/* ==========================================
          TOP GRADIENT LINE
      ========================================== */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-px
          w-1/2
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-violet-500/50
          to-transparent
        "
      />

      {/* ==========================================
          FOOTER CONTENT
      ========================================== */}
      <div
        className="
          footer-content
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          py-14
          sm:px-8
          lg:px-10
          lg:py-16
        "
      >
        <div
          className="
            grid
            grid-cols-2
            gap-x-8
            gap-y-12
            md:grid-cols-4
            lg:gap-x-16
          "
        >
          {/* ========================================
              BRAND
          ======================================== */}
          <div className="footer-column col-span-2 md:col-span-1">
            <Link
              to="/"
              className="
                group
                inline-flex
                items-center
                gap-2
              "
            >
              {/* Logo */}
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-violet-400/20
                  bg-violet-500/10
                  transition-all
                  duration-300
                  group-hover:border-violet-400/40
                  group-hover:bg-violet-500/20
                  group-hover:shadow-[0_0_25px_rgba(139,92,246,0.20)]
                "
              >
                <span className="text-sm font-bold text-violet-400">V</span>
              </div>

              {/* Brand */}
              <h2
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                Vocab
                <span className="text-violet-400">ly</span>
              </h2>
            </Link>

            <p
              className="
                mt-5
                max-w-xs
                text-sm
                leading-6
                text-gray-500
              "
            >
              Learn new words straight from the videos you watch.
            </p>

            {/* Small tagline */}
            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-3
                py-1.5
                text-xs
                text-gray-500
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-violet-400
                  shadow-[0_0_8px_rgba(167,139,250,0.8)]
                "
              />
              Learn smarter. Every day.
            </div>
          </div>

          {/* ========================================
              PRODUCT
          ======================================== */}
          <div className="footer-column">
            <h3
              className="
                mb-5
                text-sm
                font-semibold
                text-white
              "
            >
              Product
            </h3>

            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-gray-500
                      transition-all
                      duration-300
                      hover:translate-x-1
                      hover:text-violet-300
                    "
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="
                        w-3
                        text-gray-600
                        transition-colors
                        duration-300
                        group-hover:text-violet-400
                      "
                    />

                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================
              COMPANY
          ======================================== */}
          <div className="footer-column">
            <h3
              className="
                mb-5
                text-sm
                font-semibold
                text-white
              "
            >
              Company
            </h3>

            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-gray-500
                      transition-all
                      duration-300
                      hover:translate-x-1
                      hover:text-violet-300
                    "
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="
                        w-3
                        text-gray-600
                        transition-colors
                        duration-300
                        group-hover:text-violet-400
                      "
                    />

                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================
              LEGAL
          ======================================== */}
          <div className="footer-column">
            <h3
              className="
                mb-5
                text-sm
                font-semibold
                text-white
              "
            >
              Legal
            </h3>

            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-gray-500
                      transition-all
                      duration-300
                      hover:translate-x-1
                      hover:text-violet-300
                    "
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="
                        w-3
                        text-gray-600
                        transition-colors
                        duration-300
                        group-hover:text-violet-400
                      "
                    />

                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ==========================================
            CTA STRIP
        ========================================== */}
        <div
          className="
            mt-14
            rounded-2xl
            border
            border-white/[0.07]
            bg-white/[0.025]
            p-5
            backdrop-blur-xl
            sm:p-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Ready to build your vocabulary?
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Turn the content you already watch into a learning experience.
              </p>
            </div>

            <Link
              to="/fetch-video"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-[0_8px_25px_rgba(124,58,237,0.20)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_12px_30px_rgba(124,58,237,0.30)]
              "
            >
              Start Learning
              <FontAwesomeIcon
                icon={faArrowRight}
                className="
                  text-xs
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ==========================================
          COPYRIGHT
      ========================================== */}
      <div
        className="
          relative
          z-10
          border-t
          border-white/[0.06]
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-3
            px-5
            py-5
            text-center
            sm:px-8
            md:flex-row
            md:text-left
            lg:px-10
          "
        >
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Vocably. All rights reserved.
          </p>

          <p className="text-xs text-gray-700">
            Learn something new every day.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
