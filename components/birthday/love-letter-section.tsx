"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Feather, Heart } from "lucide-react"

const letterLines = [
  "My Love,",
  "",
  "Happy Birthday thangamayileyyy, 22 vayasu aaitu enn kutty thangathuku, idhey mari sandhoshama neryaa varshamm enoda vazhanum okyyy",
  "",
  "Jollyyy ahh irungaa ongalaaa naa batharamaaa pathukuren endha kavalayum padatheenga",
  "",
  "Ongaluku pudichadha ellam pannunga",
  "Indhey marii sirichineyy thona thona nu pesitu irukanum",
  "Epayum ipdiye neenga neengala cutieee ah irukkanummmm cheryaaa",
  "",
  "Every moment with you feels like a dream I didn’t know could be this perfect.",
  "",
  "On this special day, I just want you to know my love for you never fades, it only grows stronger with time.",
  "",
  "Avolo dha mudinchuuuu😘🤍",
  "",
  "Happy Birthday, my love.",
  "",
  "Forever and always yours,",
  "With all my heart"
]

function TypewriterLine({ 
  text, 
  delay, 
  isVisible 
}: { 
  text: string
  delay: number
  isVisible: boolean 
}) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isVisible || text === "") {
      setDisplayedText(text)
      setIsComplete(true)
      return
    }

    setDisplayedText("")
    setIsComplete(false)

    const timeout = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, 30) // Speed of typing

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay, isVisible])

  if (text === "") {
    return <div className="h-4" />
  }

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="text-foreground/90 text-base md:text-lg leading-relaxed"
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
        />
      )}
    </motion.p>
  )
}

export function LoveLetterSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 romantic-gradient"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 floating-hearts" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Feather className="w-10 h-10 mx-auto text-primary mb-4" />
          </motion.div>
          <span className="text-sm uppercase tracking-[0.3em] text-primary">
            To My Alagi
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-4 text-balance">
            A Kutty Letter For You
          </h2>
        </motion.div>

        {/* Letter container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          {/* Decorative corner */}
          <div className="absolute top-4 right-4 text-primary/30">
            <Heart className="w-6 h-6" />
          </div>

          {/* Letter content */}
          <div className="space-y-2 font-serif">
            {letterLines.map((line, index) => (
              <TypewriterLine
                key={index}
                text={line}
                delay={index * 800} // Stagger each line
                isVisible={isInView}
              />
            ))}
          </div>

          {/* Signature decoration */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: letterLines.length * 0.8 + 1 }}
            className="mt-8 pt-6 border-t border-border"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: letterLines.length * 0.8 + 1.5 }}
              className="flex items-center justify-end gap-2 text-primary"
            >
              <Heart className="w-5 h-5 fill-primary" />
              <span className="font-semibold italic">xoxo</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
