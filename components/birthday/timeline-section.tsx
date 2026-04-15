"use client"

import { useRef, Fragment, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Heart, Calendar, MapPin, Star } from "lucide-react"
import Image from "next/image"

interface TimelineEvent {
  id: number
  date: string
  title: string
  description: string
  icon: "heart" | "calendar" | "map" | "star" | "scooter" | "kiss"
  image?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "The Beginning",
    title: "This isn't the first time we met",
    description: "But it's the first in the chapter of our love, One that came without a reason, yet became the foundation of a very special chapter in our lives.",
    icon: "star",
    image: "/timeline-images/1.jpg",
  },
  {
    id: 2,
    date: "First Butterfly Ride",
    title: "A Parade of Butterflies Running Through Me",
    description: "This was before any confession, no FRIENDS would have shared a ride like this. You turned my dream scenario into reality. It felt the butterflies were running through me.",
    icon: "scooter",
    image: "/timeline-images/2.png",
  },
  {
    id: 3,
    date: "Our First 💋Kiss",
    title: "The Night of Magic",
    description: "That night, under the heavy rain, we stood drenched at the bus stop, holding each other close for warmth… until the moment softly turned into a Lip Mutha we’ll always remember.",
    icon: "kiss",
    image: "/timeline-images/3.png",
  },
  {
    id: 4,
    date: "Today",
    title: "22 Years of You",
    description: "22 years of you, and I've been lucky to be part of the last 3 and I own the rest tooooooo...Aprum inum 5 masathula onna vida 1 vayasuuuu periyavan aaiduveneyy",
    icon: "heart",
    image: "/timeline-images/4.jpg",
  },
]

const iconMap = {
  heart: Heart,
  calendar: Calendar,
  map: MapPin,
  star: Star,
  scooter: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="5.5" cy="17.5" r="2.5" />
      <circle cx="18.5" cy="17.5" r="2.5" />
      <path d="M15 6h3" />
      <path d="M16 6l-2 5h-4M8 15h4" />
      <path d="M12 11v6.5" />
      <path d="M8 11h4" />
      <path d="M5.5 15v-1" />
    </svg>
  ),
  kiss: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12 Q 8 6 12 9.5 Q 16 6 21 12 Q 12 20 3 12" />
      <path d="M3 12 Q 12 15.5 21 12" />
    </svg>
  ),
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = iconMap[event.icon]
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative flex items-center gap-4 md:gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`} style={{ perspective: "1000px" }}>
        <motion.div
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
          className="relative w-full cursor-pointer h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Content */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="p-6 glass w-full rounded-2xl min-h-[220px] flex flex-col justify-center"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-medium">
                {event.date}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mt-2 mb-3">
                {event.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-pretty">
                {event.description}
              </p>
            </div>
            <div className={`mt-6 text-xs italic text-primary/60 flex items-center ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-start gap-1`}>
              <span>Click to flip ↺</span>
            </div>
          </div>

          {/* Back Content */}
          <div
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            className="absolute inset-0 p-2 glass rounded-2xl w-full h-full"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-background">
              <Image
                src={event.image || `/timeline-images/${event.id}.png`}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Center icon */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30"
        >
          <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary-foreground" />
        </motion.div>
      </div>

      {/* Empty space for opposite side on mobile */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

export function TimelineSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section className="relative min-h-screen py-20 px-4 bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 floating-hearts" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary">
            Chapter Love
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-4 text-balance">
            Moments We&apos;ve Shared
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-pretty">
            Special moments which turned us from FRIENDS to couples.
            <br />
            <span className="inline-block mt-2 text-sm opacity-80">
              Note: Ella special moments um pota application pathathu. So only konjo spl ones😂
            </span>
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          {/* Timeline events */}
          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => (
              <Fragment key={event.id}>
                <TimelineItem event={event} index={index} />
                {index === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 flex justify-center py-2 md:py-4"
                  >
                    <div className="px-6 py-3 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-sm text-primary font-medium italic text-center shadow-sm text-sm md:text-base max-w-xs md:max-w-md mx-4">
                      "The rest is history full of love and chaos"
                    </div>
                  </motion.div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
