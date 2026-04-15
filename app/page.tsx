"use client"

import { useRef, useCallback, useEffect } from "react"
import { useInView } from "framer-motion"
import { BirthdayProvider, useBirthday } from "@/components/birthday/birthday-context"
import { FloatingParticles } from "@/components/birthday/floating-particles"
import { AudioControl } from "@/components/birthday/audio-control"
import { PasswordGate } from "@/components/birthday/password-gate"
import { LandingSection } from "@/components/birthday/landing-section"
import { TimelineSection } from "@/components/birthday/timeline-section"
import { GallerySection } from "@/components/birthday/gallery-section"
import { SurpriseSection } from "@/components/birthday/surprise-section"
import { LoveLetterSection } from "@/components/birthday/love-letter-section"
import { FinaleSection } from "@/components/birthday/finale-section"

interface SectionWrapperProps {
  index: number
  children: React.ReactNode
}

function SectionWrapper({ index, children }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" })
  const { setCurrentSection } = useBirthday()

  useEffect(() => {
    if (isInView) {
      setCurrentSection(index)
    }
  }, [isInView, index, setCurrentSection])

  return <div ref={ref} className="w-full">{children}</div>
}
function BirthdayExperience() {
  const { isUnlocked } = useBirthday()
  const timelineRef = useRef<HTMLDivElement>(null)

  const scrollToTimeline = useCallback(() => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <>
      {/* Password gate - shows first */}
      <PasswordGate />

      {/* Audio control - always mounted to allow audio initialization */}
      <AudioControl />

      {/* Main experience - only visible after unlock */}
      {isUnlocked && (
        <main className="relative">
          {/* Floating particles background */}
          <FloatingParticles count={25} />

          {/* Sections */}
          {/* Sections */}
          <SectionWrapper index={0}>
            <LandingSection onBegin={scrollToTimeline} />
          </SectionWrapper>

          <SectionWrapper index={1}>
            <div ref={timelineRef}>
              <TimelineSection />
            </div>
          </SectionWrapper>

          <SectionWrapper index={2}>
            <GallerySection />
          </SectionWrapper>

          <SectionWrapper index={3}>
            <SurpriseSection />
          </SectionWrapper>

          <SectionWrapper index={4}>
            <LoveLetterSection />
          </SectionWrapper>

          <SectionWrapper index={5}>
            <FinaleSection />
          </SectionWrapper>
        </main>
      )}
    </>
  )
}

export default function BirthdayPage() {
  return (
    <BirthdayProvider>
      <BirthdayExperience />
    </BirthdayProvider>
  )
}
