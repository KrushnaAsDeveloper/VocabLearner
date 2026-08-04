// Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Vocab<span className="text-indigo-500">ly</span>
          </h2>
          <p className="text-sm text-slate-500">
            Learn new words straight from the videos you watch.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/learn" className="hover:text-slate-900 dark:hover:text-white transition-colors">Learn</Link></li>
            <li><Link to="/progress" className="hover:text-slate-900 dark:hover:text-white transition-colors">Progress</Link></li>
            <li><Link to="/pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 py-4 text-center text-xs text-slate-400 dark:text-slate-600">
        © {new Date().getFullYear()} Vocably. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer