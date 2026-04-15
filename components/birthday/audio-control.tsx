"use client"
import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { useBirthday } from "./birthday-context"
const AUDIO_TRACKS: (string | null)[] = [
  "/audio/landing2.mp3",
  "/audio/timeline.mp3",
  "/audio/gallery.mp3",
  null, // Surprise section has no background audio, video plays its own audio
  "/audio/love-letter.mp3",
  "/audio/finale.mp3"
];

export function AudioControl() {
  const { isAudioPlaying, toggleAudio, isUnlocked, currentSection } = useBirthday()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const effectAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = 0.3
    }
    if (!effectAudioRef.current) {
      effectAudioRef.current = new Audio("/audio/landing.mp3")
      effectAudioRef.current.volume = 0.6 // Slightly louder for the pop effect
      effectAudioRef.current.loop = false
    }
  }, [])

  // Update loop behavior depending on section
  useEffect(() => {
    if (audioRef.current) {
      // All main background tracks should loop
      audioRef.current.loop = true
    }
  }, [currentSection])

  // Handle play/pause toggle
  useEffect(() => {
    if (audioRef.current) {
      if (isAudioPlaying && isUnlocked) {
        audioRef.current.play().catch(() => {})
        // Play the effect audio if we're on the landing section
        if (currentSection === 0 && effectAudioRef.current) {
          effectAudioRef.current.play().catch(() => {})
        }
      } else {
        audioRef.current.pause()
        if (effectAudioRef.current) {
          effectAudioRef.current.pause()
        }
      }
    }
  }, [isAudioPlaying, isUnlocked, currentSection])

  // Handle section changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (currentSection === 0 && isUnlocked && isAudioPlaying && effectAudioRef.current) {
      // Play the party popper blast when entering the landing section
      effectAudioRef.current.currentTime = 0;
      effectAudioRef.current.play().catch(() => {});
    }

    const newSrc = AUDIO_TRACKS[currentSection];

    if (newSrc === null) {
      // Fade out completely for sections without audio
      if (!isAudioPlaying || !isUnlocked) {
        audio.pause();
        audio.src = "";
        return;
      }
      
      let fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          clearInterval(fadeOutInterval);
          audio.pause();
          audio.src = "";
        }
      }, 100);
      return () => clearInterval(fadeOutInterval);
    }

    // Check if source matches (browser appends origin to src)
    if (audio.src && audio.src.includes(newSrc)) return;

    if (!isAudioPlaying || !isUnlocked) {
      audio.src = newSrc;
      return;
    }

    // Crossfade logic
    let fadeOutInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        clearInterval(fadeOutInterval);
        audio.pause();
        audio.src = newSrc;
        audio.load();
        
        audio.play().catch(() => {});
        
        let fadeInInterval = setInterval(() => {
          if (audio.volume < 0.25) {
            audio.volume += 0.05;
          } else {
            audio.volume = 0.3;
            clearInterval(fadeInInterval);
          }
        }, 100);
      }
    }, 100);

    return () => clearInterval(fadeOutInterval);
  }, [currentSection, isAudioPlaying, isUnlocked]);
  return (
    <AnimatePresence>
      {isUnlocked && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleAudio}
          className="fixed top-6 right-6 z-50 p-3 rounded-full glass text-foreground/80 hover:text-primary transition-colors"
          aria-label={isAudioPlaying ? "Mute audio" : "Play audio"}
        >
          {isAudioPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
