"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface BirthdayContextType {
  isUnlocked: boolean
  setIsUnlocked: (value: boolean) => void
  isAudioPlaying: boolean
  setIsAudioPlaying: (value: boolean) => void
  toggleAudio: () => void
  currentSection: number
  setCurrentSection: (section: number) => void
}

const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined)

export function BirthdayProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  const toggleAudio = useCallback(() => {
    setIsAudioPlaying(prev => !prev)
  }, [])

  return (
    <BirthdayContext.Provider
      value={{
        isUnlocked,
        setIsUnlocked,
        isAudioPlaying,
        setIsAudioPlaying,
        toggleAudio,
        currentSection,
        setCurrentSection,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  )
}

export function useBirthday() {
  const context = useContext(BirthdayContext)
  if (context === undefined) {
    throw new Error("useBirthday must be used within a BirthdayProvider")
  }
  return context
}
