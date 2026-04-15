"use client"

import { useRef, useCallback, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Heart, Sparkles, ArrowUp, PartyPopper } from "lucide-react"
import confetti from "canvas-confetti"

export function FinaleSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hasTriggered, setHasTriggered] = useState(false)

  const triggerCelebration = useCallback(() => {
    // Confetti burst
    const duration = 3000
    const end = Date.now() + duration

    const colors = ["#FFB6C1", "#DDA0DD", "#FFDAB9", "#FF69B4", "#FFE4E1"]

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true)
      setTimeout(triggerCelebration, 500)
    }
  }, [isInView, hasTriggered, triggerCelebration])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 bg-background flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 floating-hearts opacity-50" />

      {/* Floating hearts animation */}
      {isInView && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${Math.random() * 100}vw`,
                y: "100vh",
                scale: Math.random() * 0.5 + 0.5,
                opacity: 0.6,
              }}
              animate={{
                y: "-100vh",
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "linear",
              }}
              className="absolute"
            >
              <Heart
                className={`w-${Math.floor(Math.random() * 3) + 4} h-${
                  Math.floor(Math.random() * 3) + 4
                } text-primary fill-primary/50`}
                style={{
                  width: `${Math.random() * 20 + 16}px`,
                  height: `${Math.random() * 20 + 16}px`,
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Celebration icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PartyPopper className="w-16 h-16 md:w-20 md:h-20 mx-auto text-primary" />
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
        >
          <span className="block">Once Again</span>
          <motion.span
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="block text-primary"
          >
            Happy Birthday Dii Thangameyy
          </motion.span>
        </motion.h1>

        {/* Hearts decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Heart
                className={`text-primary fill-primary ${
                  i === 2 ? "w-8 h-8" : "w-5 h-5 opacity-70"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl mx-auto text-pretty"
        >
          May this year bring you endless sandhosham, Mera Love, and all My Tortures.
        </motion.p>

        {/* Sparkles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-8 mb-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-lg text-primary font-semibold italic"
          >
            Signing of my love
          </motion.span>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
        </motion.div>

        {/* Back to top button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-foreground hover:text-primary transition-colors"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Experience Again</span>
        </motion.button>
      </div>
    </section>
  )
}
