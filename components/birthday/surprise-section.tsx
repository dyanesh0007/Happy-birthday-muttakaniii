"use client"

import { useState, useRef, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Gift, Sparkles, Heart } from "lucide-react"
import confetti from "canvas-confetti"

export function SurpriseSection() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isHolding, setIsHolding] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerConfetti = useCallback(() => {
    // Fire confetti from both sides
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFB6C1", "#DDA0DD", "#FFDAB9", "#FF69B4", "#FFE4E1"],
    }

    confetti({
      ...defaults,
      particleCount: 100,
      origin: { x: 0.2, y: 0.5 },
    })

    confetti({
      ...defaults,
      particleCount: 100,
      origin: { x: 0.8, y: 0.5 },
    })

    // Heart shaped confetti
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        origin: { x: 0.5, y: 0.3 },
        shapes: ["circle"],
        scalar: 2,
      })
    }, 300)
  }, [])

  const handleReveal = useCallback(() => {
    if (!isRevealed) {
      setIsRevealed(true)
      triggerConfetti()
    }
  }, [isRevealed, triggerConfetti])

  const handleHoldStart = useCallback(() => {
    setIsHolding(true)
    holdTimeout.current = setTimeout(() => {
      handleReveal()
    }, 1000) // Hold for 1 second to reveal
  }, [handleReveal])

  const handleHoldEnd = useCallback(() => {
    setIsHolding(false)
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current)
    }
  }, [])

  return (
    <section className="relative min-h-screen py-20 px-4 bg-background flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 floating-hearts" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary">
            A Little Surprise
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-4 text-balance">
            {isRevealed ? "A Special Memory" : "There’s Something Here For You"}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-pretty">
            {isRevealed 
              ? "A moment captured just for you. Turn up the volume 🎵"
              : "Hold the gift to reveal your special surprise..."
            }
          </p>
        </motion.div>

        {/* Surprise button/reveal */}
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="gift"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0, rotate: 15 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Pulsing ring */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary/20 -z-10"
                style={{ margin: "-20px" }}
              />

              <motion.button
                onMouseDown={handleHoldStart}
                onMouseUp={handleHoldEnd}
                onMouseLeave={handleHoldEnd}
                onTouchStart={handleHoldStart}
                onTouchEnd={handleHoldEnd}
                onClick={handleReveal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 transition-all duration-300 ${
                  isHolding ? "ring-4 ring-primary/50 ring-offset-4 ring-offset-background" : ""
                }`}
              >
                <motion.div
                  animate={isHolding ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.5, repeat: isHolding ? Infinity : 0 }}
                >
                  <Gift className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground" />
                </motion.div>

                {/* Sparkles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-8 h-8 text-accent" />
                </motion.div>
              </motion.button>

              {/* Hold indicator */}
              {isHolding && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary rounded-full origin-left"
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="video-reveal"
              initial={{ scale: 0.4, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: "spring",
                stiffness: 80,
                damping: 20
              }}
              className="relative w-full max-w-2xl mx-auto rounded-[2rem] glass p-4 md:p-6 shadow-2xl ring-4 ring-primary/30"
            >
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-inner bg-black aspect-[9/16] sm:aspect-video w-full flex items-center justify-center">
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Heart className="w-12 h-12 text-primary fill-primary" />
                    </motion.div>
                    <p className="mt-4 text-primary/80 tracking-widest text-sm uppercase font-semibold animate-pulse">
                      Unwrapping...
                    </p>
                  </div>
                )}
                <video
                  src="/surprise-video/VID_20260415_2119215652.mp4"
                  autoPlay
                  controls
                  playsInline
                  onCanPlay={() => setIsVideoLoaded(true)}
                  className={`w-full h-full object-contain transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-6 flex justify-center items-center gap-3 text-primary md:text-xl font-semibold italic"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-6 h-6 fill-primary" />
                </motion.div>
                <span>For you, with all my love</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <Heart className="w-6 h-6 fill-primary" />
                </motion.div>
              </motion.div>

              {/* Magical sparkles */}
              <motion.div
                animate={{ rotate: 360, opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 text-accent z-10"
              >
                <Sparkles className="w-12 h-12" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360, opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -left-6 text-accent z-10"
              >
                <Sparkles className="w-10 h-10" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
