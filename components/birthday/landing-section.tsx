"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Heart, Sparkles, Star, Gift, PartyPopper } from "lucide-react"
import confetti from "canvas-confetti"

interface LandingSectionProps {
  onBegin: () => void
}

export function LandingSection({ onBegin }: LandingSectionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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

    // Delay the burst slightly for dramatic effect
    setTimeout(() => {
      frame()
    }, 500)
  }, [])

  const handleBegin = () => {
    onBegin()
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 romantic-gradient overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 floating-hearts opacity-50" />

      {/* Floating hearts animation */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
      
      {/* Animated sparkles */}
      <motion.div
        className="absolute top-20 left-10 text-primary/40"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-10 text-accent/40"
        animate={{ 
          rotate: -360,
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      {/* Welcome Surprise Animations */}
      <motion.div
        className="absolute top-32 right-12 md:top-40 md:right-24 text-accent/60 z-20"
        initial={{ opacity: 0, scale: 0, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: [0, 10, -10, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 0.8 },
          scale: { delay: 1.5, duration: 0.8, type: "spring", bounce: 0.5 },
          y: { delay: 1.5, duration: 1.5, ease: "easeOut" },
          rotate: { delay: 3, duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Gift className="w-10 h-10 md:w-16 md:h-16" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-12 md:bottom-48 md:left-24 text-primary/60 z-20"
        initial={{ opacity: 0, scale: 0, x: -60, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, x: 0, rotate: [0, -15, 15, 0] }}
        transition={{ 
          opacity: { delay: 1.8, duration: 0.8 },
          scale: { delay: 1.8, duration: 0.8, type: "spring", bounce: 0.5 },
          x: { delay: 1.8, duration: 1.5, ease: "easeOut" },
          rotate: { delay: 3.5, duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <PartyPopper className="w-12 h-12 md:w-16 md:h-16" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 left-1/4 md:left-1/3 text-yellow-500/60 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 180 }}
        transition={{ delay: 2.2, duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
      >
        <Star className="w-6 h-6 md:w-8 md:h-8 fill-yellow-500/40" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 md:right-1/3 text-yellow-400/60 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: -180 }}
        transition={{ delay: 3.1, duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <Star className="w-5 h-5 md:w-7 md:h-7 fill-yellow-400/40" />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-24 h-0.5 bg-primary/50 mx-auto mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-muted-foreground text-sm md:text-base uppercase tracking-[0.3em] mb-4"
        >
          A Kutty Surprise For My Thangakutty
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance"
        >
          Happy birthday thangameyy
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="inline-block ml-2"
          >
            <Heart className="w-8 h-8 md:w-12 md:h-12 inline text-primary fill-primary" />
          </motion.span>
        </motion.h1>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-muted-foreground italic mb-8"
        >
          To My Baby Gurl
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-24 h-0.5 bg-primary/50 mx-auto mb-12"
        />

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBegin}
          className="group px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
        >
          Begin the Kutty Surprise  
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block ml-2"
          >
            <Sparkles className="w-5 h-5 inline" />
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
