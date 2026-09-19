
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import explaining from "../../assets/mascot/explaining_owl.png"

function Overlay({ data, skip }) {
  const owlRef = useRef(null)
  const cloudRef = useRef(null)
  const wordRef = useRef(null)
  const meaningRef = useRef(null)
  const exampleRef = useRef(null)

  const [typedWord, setTypedWord] = useState('')
  const [typedMeaning, setTypedMeaning] = useState('')
  const [typedExample, setTypedExample] = useState('')
  const [showQuestions, setShowQuestions] = useState(false)

  const vocabulary = data?.vocabulary || ''
  const meaning = data?.meaning || ''
  const example = data?.example || ''
  const questions = data?.revisionQuestions || []

  useEffect(() => {
    setTypedWord('')
    setTypedMeaning('')
    setTypedExample('')
    setShowQuestions(false)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        owlRef.current,
        {
          x: -160,
          y: 50,
          opacity: 0,
          scale: 0.6,
          rotation: -15
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.9,
          ease: 'back.out(1.7)'
        }
      )

      tl.fromTo(
        cloudRef.current,
        {
          scale: 0.5,
          y: 25,
          opacity: 0
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.5)'
        },
        '-=0.3'
      )

      tl.fromTo(
        wordRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.1'
      )
    })

    // Gentle idle movement after entering
    gsap.to(owlRef.current, {
      y: -6,
      rotation: 2,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    })

    return () => ctx.revert()
  }, [data])

  // Type the vocabulary first, then meaning, then example
  useEffect(() => {
    let cancelled = false
    let timers = []

    const typeText = (text, setter, delay, onComplete) => {
      let index = 0

      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          if (cancelled) {
            clearInterval(interval)
            return
          }

          index++
          setter(text.slice(0, index))

          if (index >= text.length) {
            clearInterval(interval)
            onComplete?.()
          }
        }, 35)

        timers.push(interval)
      }, delay)

      timers.push(timer)
    }

    typeText(vocabulary, setTypedWord, 700, () => {
      typeText(meaning, setTypedMeaning, 250, () => {
        typeText(example, setTypedExample, 250, () => {
          setShowQuestions(true)
        })
      })
    })

    return () => {
      cancelled = true
      timers.forEach(timer => {
        clearTimeout(timer)
        clearInterval(timer)
      })
    }
  }, [data, vocabulary, meaning, example])

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="relative flex w-full max-w-5xl flex-col items-center gap-5 rounded-3xl border border-white/10 bg-gradient-to-br from-[#17152f] via-[#201b42] to-[#111025] p-5 shadow-2xl shadow-purple-950/40 md:flex-row md:items-center md:gap-8 md:p-8">

        {/* Owl */}
        <div className="flex w-full shrink-0 justify-center md:w-56">
          <img
            ref={owlRef}
            src={explaining}
            alt="Owl explaining vocabulary"
            className="w-36 object-contain drop-shadow-[0_12px_25px_rgba(167,139,250,0.25)] md:w-52"
          />
        </div>

        {/* Speech cloud + explanation */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">

          {/* Speech cloud */}
          <div
            ref={cloudRef}
            className="relative rounded-3xl border border-purple-300/20 bg-gradient-to-br from-[#30275a] to-[#211c42] p-5 shadow-lg shadow-purple-950/20 md:p-6"
          >
            {/* Cloud tail */}
            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-purple-300/20 bg-[#30275a] md:-left-3 md:top-10 md:translate-x-0" />

            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-purple-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                Owl's explanation
              </span>
            </div>

            <div ref={wordRef} className="min-h-12">
              <p className="mb-1 text-sm text-purple-200">
                Today's vocabulary
              </p>

              <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                {typedWord}
                <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-purple-300 align-middle" />
              </h2>
            </div>
          </div>

          {/* Meaning */}
          {typedMeaning && (
            <div
              ref={meaningRef}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-purple-300">
                Meaning
              </p>

              <p className="text-base leading-relaxed text-gray-200">
                {typedMeaning}
                {typedMeaning.length < meaning.length && (
                  <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-purple-300 align-middle" />
                )}
              </p>
            </div>
          )}

          {/* Example */}
          {typedExample && (
            <div
              ref={exampleRef}
              className="rounded-2xl border border-purple-400/15 bg-purple-500/[0.08] p-4"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-purple-300">
                Example
              </p>

              <p className="text-sm italic leading-relaxed text-gray-200">
                “{typedExample}”
                {typedExample.length < example.length && (
                  <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-purple-300 align-middle" />
                )}
              </p>
            </div>
          )}

         
          <div className='flex w-full  justify-end
           items-center'>
            <button className='text-xl mx-2 hover:bg-purple-500 cursor-pointer  text-white font-bold w-20 h-10 border p-2 border-[text-purple-300"] flex justify-center items-center rounded-xl' >Next</button>
            <button className='text-xl mx-2 hover:bg-purple-500 cursor-pointer  text-white font-bold w-20 h-10 border p-2 border-[text-purple-300"] flex justify-center items-center rounded-xl' onClick={skip} >skip</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overlay