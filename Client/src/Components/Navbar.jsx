// Navbar.jsx
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/fetch-vedio" },
    { name: "Progress", path: "/progress" },
    { name: "About", path: "/about" },
    { name: "History", path: "/history" },
  ]

  const navLinkClass = ({ isActive }) =>
    `text-sm transition-all duration-200 ${
      isActive
        ? "text-white border border-white/20 rounded-md px-2 py-1"
        : "text-slate-400 hover:text-white border border-transparent px-2 py-1"
    }`

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          Vocab<span className="text-indigo-500">ly</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
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

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-slate-800">
            <Link to="/login" className="text-sm text-slate-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg text-center transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar