"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import Image from "next/image"

interface Memory {
  id: number
  caption: string
  message: string
  color: string
  image: string
}

// Placeholder memories - these would be replaced with actual photos
const memories: Memory[] = [
  {
    id: 1,
    caption: "Our First Photo Together",
    message: "This is where our story began. I remember feeling so nervous, but your smile made everything feel right.",
    color: "from-pink-200 to-rose-300",
    image: "/gallery-section/1.jpg",
  },
  {
    id: 2,
    caption: "That Perfect Sunset",
    message: "Watching the sun set with you made me realize that the most beautiful views are the ones shared with you.",
    color: "from-orange-200 to-amber-300",
    image: "/gallery-section/2.jpg",
  },
  {
    id: 3,
    caption: "Adventures Together",
    message: "Every adventure with you is my favorite adventure. You make ordinary moments extraordinary.",
    color: "from-purple-200 to-violet-300",
    image: "/gallery-section/3.jpg",
  },
  {
    id: 4,
    caption: "Your Beautiful Smile",
    message: "This smile lights up my world. I fall in love with you more every time I see it.",
    color: "from-teal-200 to-cyan-300",
    image: "/gallery-section/4.jpg",
  },
  {
    id: 5,
    caption: "Cozy Moments",
    message: "The quiet moments with you are my favorite. Just being together is enough.",
    color: "from-rose-200 to-pink-300",
    image: "/gallery-section/5.jpg",
  },
  {
    id: 6,
    caption: "Celebrating Us",
    message: "Every celebration with you becomes a treasured memory. Here is to many more!",
    color: "from-amber-200 to-yellow-300",
    image: "/gallery-section/6.jpg",
  },
]

function PolaroidCard({ memory, index, onClick }: { memory: Memory, index: number, onClick: () => void }) {
  // calculate pseudo-random base rotation
  const baseRotate = (index % 2 === 0 ? -1 : 1) * (2 + (index % 3) * 1.5)
  // peg colors mimicking colored wooden clips
  const pegColors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400']
  const pegColor = pegColors[index % pegColors.length]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: (index % 2) * 0.2,
        type: "spring",
        bounce: 0.4
      }}
      className="relative flex-1 max-w-[150px] md:max-w-[220px] z-10 hover:z-20 cursor-pointer"
      onClick={onClick}
      style={{ perspective: "1000px" }}
    >
      <motion.div 
        animate={{ 
          rotateZ: [baseRotate - 1.5, baseRotate + 1.5, baseRotate - 1.5],
        }}
        transition={{ 
          duration: 3.5 + (index % 3), 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{ transformOrigin: "top center" }}
        className="bg-white p-2.5 pb-4 md:p-3 md:pb-6 shadow-[0_10px_20px_rgba(0,0,0,0.15)] rounded-sm relative mt-4 md:mt-8 flex flex-col will-change-transform"
      >
        {/* Peg / Clip */}
        <div 
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-6 md:w-3.5 md:h-8 ${pegColor} rounded-[2px] shadow-md z-10 flex flex-col justify-between py-[3px] border border-black/5`}
        >
           {/* little metal spring line on peg */}
           <div className="w-full h-[2px] bg-black/20 mt-[1px]" />
           <div className="w-full h-[1px] bg-black/10 mb-[1px]" />
        </div>
        
        {/* Image Frame */}
        <div className={`aspect-square w-full bg-gradient-to-br ${memory.color} flex items-center justify-center overflow-hidden border border-black/5 relative`}>
          {memory.image ? (
            <Image src={memory.image} alt={memory.caption} fill className="object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 md:w-12 md:h-12 text-black/20" />
          )}
        </div>
        
      </motion.div>
    </motion.div>
  )
}

function LightboxModal({ 
  memory, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  memory: Memory
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-2xl w-full glass rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation buttons */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Image placeholder */}
        <div className={`aspect-[4/3] md:aspect-[3/2] bg-gradient-to-br ${memory.color} relative`}>
          {memory.image ? (
            <Image src={memory.image} alt={memory.caption} fill className="object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-foreground/20" />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function GallerySection() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const handlePrev = () => {
    if (!selectedMemory) return
    const currentIndex = memories.findIndex(m => m.id === selectedMemory.id)
    const prevIndex = currentIndex === 0 ? memories.length - 1 : currentIndex - 1
    setSelectedMemory(memories[prevIndex])
  }

  const handleNext = () => {
    if (!selectedMemory) return
    const currentIndex = memories.findIndex(m => m.id === selectedMemory.id)
    const nextIndex = currentIndex === memories.length - 1 ? 0 : currentIndex + 1
    setSelectedMemory(memories[nextIndex])
  }

  // Split memories into chunks of 2 for rows
  const memoriesChunks = []
  for (let i = 0; i < memories.length; i += 2) {
    memoriesChunks.push(memories.slice(i, i + 2))
  }

  return (
    <section className="relative min-h-screen py-20 px-4 romantic-gradient overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary">
            Memories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-4 text-balance">
            Our Beautiful Moments
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-pretty">
            Just a glimpse of the wonderful times we&#39;ve shared together.
          </p>
        </motion.div>

        {/* Hanging Gallery Rows */}
        <div className="flex flex-col gap-10 md:gap-20 w-full items-center">
          {memoriesChunks.map((chunk, i) => {
            const isEvenRow = i % 2 === 0
            return (
              <div key={i} className="relative w-full max-w-3xl flex justify-center gap-6 md:gap-24 pt-6 px-4">
                
                {/* Fairy Lights String (Background Wire) */}
                <div className="absolute top-2 left-[-15%] right-[-15%] h-24 md:h-40 -z-0 pointer-events-none">
                  {/* The Wire Path */}
                  <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 20" className="overflow-visible">
                    <path 
                      d={`M0,${isEvenRow ? 2 : 5} Q50,${isEvenRow ? 18 : 22} 100,${isEvenRow ? 6 : 3}`} 
                      stroke="rgba(253,224,71,0.5)" 
                      strokeWidth="0.4" 
                      fill="none" 
                    />
                    <path 
                      d={`M0,${isEvenRow ? 2 : 5} Q50,${isEvenRow ? 18 : 22} 100,${isEvenRow ? 6 : 3}`} 
                      stroke="rgba(253,224,71,0.2)" 
                      strokeWidth="1" 
                      fill="none" 
                      style={{ filter: "blur(2px)" }} 
                    />
                  </svg>
                  
                  {/* Glowing Fairy Light Bulbs along the wire */}
                  <div className="absolute inset-0 flex justify-evenly items-start pt-[2%]">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => {
                      // Parabolic approximation of the sine wave for dangling dots
                      const dropPercentage = Math.sin((j / 7) * Math.PI) * (isEvenRow ? 18 : 22)
                      // Base vertical offset depending on row 
                      const baseOffset = isEvenRow ? 2 : 5
                      
                      const lightThemes = [
                        "bg-primary shadow-[0_0_8px_3px] shadow-primary/60",
                        "bg-accent shadow-[0_0_8px_3px] shadow-accent/60",
                        "bg-pink-400 shadow-[0_0_8px_3px] shadow-pink-400/60",
                        "bg-rose-400 shadow-[0_0_8px_3px] shadow-rose-400/60"
                      ]
                      const bulbTheme = lightThemes[j % lightThemes.length]
                      
                      return (
                        <motion.div 
                          key={j}
                          animate={{ opacity: [0.3, 1, 0.4], scale: [0.8, 1.2, 0.9] }}
                          transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                          className={`relative rounded-full ${bulbTheme}`}
                          style={{ 
                            width: `${4 + Math.random() * 3}px`,
                            height: `${4 + Math.random() * 3}px`,
                            marginTop: `${baseOffset + dropPercentage}%`,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Polaroids */}
                {chunk.map((memory, j) => (
                  <PolaroidCard 
                    key={memory.id} 
                    memory={memory} 
                    index={i * 2 + j} 
                    onClick={() => setSelectedMemory(memory)}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selectedMemory && (
          <LightboxModal
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
