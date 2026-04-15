"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Lock, Volume2, VolumeX } from "lucide-react"
import { useBirthday } from "./birthday-context"

// Password can be customized - default is "22" for 22nd birthday
const CORRECT_PASSWORD = "22"

export function PasswordGate() {
  const { isUnlocked, setIsUnlocked, isAudioPlaying, setIsAudioPlaying } = useBirthday()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isShaking, setIsShaking] = useState(false)

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    if (password.toLowerCase() !== CORRECT_PASSWORD.toLowerCase()) {
      setError("Hmm, that's not quite right...")
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      setTimeout(() => setError(""), 2000)
      return
    }

    if (!isAudioPlaying) {
      setError("Please enable background music first ♪")
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      setTimeout(() => setError(""), 2000)
      return
    }
    
    setIsUnlocked(true)
  }, [password, setIsUnlocked, isAudioPlaying])

  if (isUnlocked) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center min-h-screen romantic-gradient floating-hearts"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0,
            x: isShaking ? [0, -10, 10, -10, 10, 0] : 0 
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            x: { duration: 0.5 }
          }}
          className="relative p-8 md:p-12 mx-4 max-w-md w-full glass rounded-3xl text-center"
        >
          {/* Decorative hearts */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-6 left-1/2 -translate-x-1/2"
          >
            <Heart className="w-12 h-12 text-primary fill-primary" />
          </motion.div>

          <div className="mt-4 mb-8">
            <Lock className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
              A Special Gift Awaits
            </h1>
            <p className="text-muted-foreground text-sm md:text-base text-pretty">
              Enter the magic number to unlock your surprise
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the magic number..."
                className={`w-full px-6 py-4 text-center text-lg rounded-2xl border-2 transition-all duration-300 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  error 
                    ? "border-destructive text-destructive" 
                    : "border-border focus:border-primary"
                }`}
                autoFocus
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -bottom-6 left-0 right-0 text-sm text-destructive"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 text-muted-foreground mb-6">
              <button
                type="button"
                onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                className={`p-3 rounded-full transition-colors ${
                  isAudioPlaying ? 'bg-primary/20 text-primary' : 'bg-secondary/80 text-secondary-foreground hover:bg-secondary'
                }`}
                aria-label={isAudioPlaying ? "Mute audio" : "Play audio"}
              >
                {isAudioPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <div 
                className="flex flex-col text-left cursor-pointer select-none" 
                onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              >
                <span className="text-sm font-medium text-foreground">
                  {isAudioPlaying ? "Audio enabled" : "Enable background music"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isAudioPlaying ? "Music will play throughout" : "Tap to allow audio playback"}
                </span>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-8 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              Unlock My Gift
            </motion.button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            Hint: How old are you turning?
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
