'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TrainWindow from './train/TrainWindow'
import LocationDescription from './LocationDescription'
import Typewriter from './Typewriter'

const MESSAGES = [
  { text: 'thanks for stopping by, you’re always welcome to have a seat', pauses: [23] },
  { text: 'i heard special creatures roam these lands . . .', pauses: [43] },
  { text: 'i wonder where we’re going ?', pauses: [27] },
]

export default function Train() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [typed, setTyped] = useState(false)
  const [finished, setFinished] = useState(false)
  const [hovers, setHovers] = useState(0)

  const stop = () => {
    setPlaying(false)
    setTyped(false)
    setFinished(false)
    if (typed) setIndex((index + 1) % MESSAGES.length)
  }

  return (
    <section className="flex w-full flex-col gap-[6px] text-[15.86px] font-normal break-words text-main-text">
      <div className="flex min-h-lh items-end justify-end">
        <AnimatePresence mode="wait">
          {playing && !finished && (
            <motion.div
              key={hovers}
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 26 } }}
              exit={{ opacity: 0, scale: 0.85, y: 4, transition: { duration: 0.18, ease: 'easeOut' } }}
              className="max-w-full origin-bottom-right text-right"
            >
              <Typewriter start_pause={300} pauses={MESSAGES[index].pauses} onTyped={() => setTyped(true)} onDone={() => setFinished(true)}>
                {MESSAGES[index].text}
              </Typewriter>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        onMouseEnter={() => {
          setPlaying(true)
          setHovers(hovers + 1)
        }}
        onMouseLeave={stop}
      >
        <TrainWindow className="aspect-[4/3] w-full sm:aspect-[1416/638]" />
      </div>
      <LocationDescription className="text-center italic" />
    </section>
  )
}
