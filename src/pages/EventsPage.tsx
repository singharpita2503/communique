import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import eventBgImage from '../assets/event_web.png'
import ekatraVideo from '../assets/ekatra25.mp4'

// Event Images
import ekatra25_1 from '../assets/ekatra.JPG'
import ekatra25_2 from '../assets/ekatra1.JPG'
import ekatra25_3 from '../assets/cultural3.JPG'
import cultural1 from '../assets/cultural.JPG'
import cultural2 from '../assets/cultural1.JPG'
import cultural3 from '../assets/cultural2.JPG'
import music1 from '../assets/music.JPG'
import music2 from '../assets/music1.JPG'
import music3 from '../assets/music2.JPG'
import sentient1 from '../assets/sentient.JPG'
import sentient2 from '../assets/sentient1.JPG'
import sentient3 from '../assets/sentient2.JPG'
import installation1 from '../assets/installation.JPG'
import installation2 from '../assets/installation1.jpg'
import installation3 from '../assets/installation2.jpg'
import mrnmiss1 from '../assets/mrnmiss.JPG'
import mrnmiss2 from '../assets/mrnmiss1.JPG'
import mrnmiss3 from '../assets/cultural4.JPG'
import drone1 from '../assets/drone1.jpg'
import drone2 from '../assets/drone2.jpg'
import drone3 from '../assets/drone3.jpg'
import ecpl24_1 from '../assets/ecpl241.JPG'
import ecpl24_2 from '../assets/ecpl242.JPG'
import ecpl24_3 from '../assets/ecpl243.JPG'
import traditional1 from '../assets/traditional1.JPG'
import traditional2 from '../assets/traditional2.JPG'
import traditional3 from '../assets/traditional3.JPG'
import ecpl23_1 from '../assets/ecpl231.JPG'
import ecpl23_2 from '../assets/ecpl232.JPG'
import ecpl23_3 from '../assets/ecpl233.JPG'
import bollywood1 from '../assets/cultural5.JPG'
import bollywood2 from '../assets/cultural6.JPG'
import bollywood3 from '../assets/cultural4.JPG'
import ekatra23_1 from '../assets/ekatra231.jpg'
import ekatra23_2 from '../assets/ekatra232.jpg'
import ekatra23_3 from '../assets/ekatra233.jpg'

// Particle component for the video section
interface Particle {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  size: number
  delay: number
}

const generateParticles = (count: number, containerWidth: number, containerHeight: number): Particle[] => {
  const particles: Particle[] = []
  
  // Define rectangle border positions (where particles will end up) - smaller rectangle
  const rectWidth = Math.min(containerWidth * 0.75, 650)
  const rectHeight = rectWidth * 0.5625 // 16:9 aspect ratio
  const rectLeft = (containerWidth - rectWidth) / 2
  const rectTop = (containerHeight - rectHeight) / 2
  
  // Create particles along the rectangle border
  const particlesPerSide = Math.floor(count / 4)
  
  for (let i = 0; i < count; i++) {
    let endX: number, endY: number
    const sideIndex = i % 4
    const posOnSide = (i / 4) / particlesPerSide
    
    // Distribute particles along rectangle edges
    switch (sideIndex) {
      case 0: // Top edge
        endX = rectLeft + posOnSide * rectWidth
        endY = rectTop
        break
      case 1: // Right edge
        endX = rectLeft + rectWidth
        endY = rectTop + posOnSide * rectHeight
        break
      case 2: // Bottom edge
        endX = rectLeft + rectWidth - posOnSide * rectWidth
        endY = rectTop + rectHeight
        break
      case 3: // Left edge
        endX = rectLeft
        endY = rectTop + rectHeight - posOnSide * rectHeight
        break
      default:
        endX = rectLeft
        endY = rectTop
    }
    
    // Random start positions (scattered far from center)
    const angle = Math.random() * Math.PI * 2
    const distance = 250 + Math.random() * 450
    const startX = containerWidth / 2 + Math.cos(angle) * distance
    const startY = containerHeight / 2 + Math.sin(angle) * distance
    
    particles.push({
      id: i,
      startX,
      startY,
      endX,
      endY,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 1.0 // More spread out delays
    })
  }
  
  return particles
}

// Ekatra Video Section Component
function EkatraVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // Animation resets when scrolled away (once: false)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [particles, setParticles] = useState<Particle[]>([])
  const [showVideo, setShowVideo] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 450 })
  
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: 450 })
      }
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  // Reset animation when scrolled out of view
  useEffect(() => {
    if (!isInView) {
      setShowVideo(false)
      setIsPlaying(false)
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
      // Regenerate particles with new random positions
      setAnimationKey(prev => prev + 1)
    }
  }, [isInView])
  
  useEffect(() => {
    if (containerSize.width > 0) {
      setParticles(generateParticles(80, containerSize.width, containerSize.height))
    }
  }, [containerSize, animationKey])
  
  useEffect(() => {
    if (isInView) {
      // Show video 2 seconds after particles converge (particles take ~3s)
      const timer = setTimeout(() => {
        setShowVideo(true)
      }, 5000) // 3s particles + 2s delay
      return () => clearTimeout(timer)
    }
  }, [isInView, animationKey])
  
  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }
  
  // Smaller rectangle
  const rectWidth = Math.min(containerSize.width * 0.75, 650)
  const rectHeight = rectWidth * 0.5625
  
  return (
    <section className="relative py-10 bg-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/30 via-slate-950 to-slate-950"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Ekatra <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">2025</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Experience the magic of innovation and creativity
          </p>
        </motion.div>
        
        {/* Particle Animation Container */}
        <div 
          ref={containerRef}
          className="relative mx-auto"
          style={{ height: '450px', maxWidth: '750px' }}
        >
          {/* Particles - All white glow */}
          {particles.map((particle) => (
            <motion.div
              key={`${animationKey}-${particle.id}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: '#ffffff',
                boxShadow: `0 0 ${particle.size * 3}px #ffffff, 0 0 ${particle.size * 6}px rgba(255,255,255,0.5)`,
              }}
              initial={{
                x: particle.startX,
                y: particle.startY,
                scale: 0,
                opacity: 0,
              }}
              animate={isInView ? {
                x: [particle.startX, particle.endX],
                y: [particle.startY, particle.endY],
                scale: [0, 1.2, 0.8],
                opacity: [0, 1, showVideo ? 0 : 0.9],
              } : {
                x: particle.startX,
                y: particle.startY,
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 3, // Slower particle animation
                delay: particle.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
          
          {/* Glowing rectangle border that forms */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl"
            style={{
              width: rectWidth,
              height: rectHeight,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? {
              opacity: [0, 0, 1],
              scale: [0.9, 0.9, 1],
            } : { opacity: 0, scale: 0.9 }}
            transition={{
              duration: 3.5,
              times: [0, 0.7, 1],
              ease: "easeOut"
            }}
          >
            {/* White glowing border */}
            <div 
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4), rgba(255,255,255,0.8))',
                backgroundSize: '200% 100%',
                padding: '2px',
                animation: showVideo ? 'borderGlow 2s linear infinite' : 'none',
              }}
            >
              <div className="w-full h-full bg-slate-950 rounded-xl" />
            </div>
            
            {/* Video Container */}
            <motion.div
              className="absolute inset-0.5 rounded-lg overflow-hidden bg-slate-900 group"
              initial={{ opacity: 0 }}
              animate={showVideo ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handlePlayClick}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover cursor-pointer"
                src={ekatraVideo}
                playsInline
                onEnded={handleVideoEnded}
              />
              
              {/* Play Button Overlay - Only visible on hover */}
              <div 
                className={`absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-all duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <motion.button
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center transition-all"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isHovered ? 1 : 0.8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* CSS for border glow animation */}
      <style>{`
        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </section>
  )
}

// Event data
interface Event {
  id: number
  title: string
  date: string
  year: number
  category: 'Technical' | 'Cultural' | 'Outreach'
  description: string
  icon: string
  images: string[]
}

const eventsData: Event[] = [
  { id: 1, title: "EKATRA'25", date: 'January 10-12, 2025', year: 2025, category: 'Cultural', description: 'A vibrant celebration of art, music, dance, and traditions, showcasing creativity and cultural diversity.', icon: '🎭', images: [ekatra25_1, ekatra25_2, ekatra25_3] },
  { id: 2, title: 'Cultural Night', date: 'January 12th, 2025', year: 2025, category: 'Cultural', description: 'An enchanting evening celebrating diverse traditions, art, and cultural expressions through music, dance, and performances.', icon: '🌟', images: [cultural1, cultural2, cultural3] },
  { id: 3, title: 'Musical Event and Open Mic', date: 'January 11th, 2025', year: 2025, category: 'Cultural', description: 'An enchanting Musical Eve and Open Mic night, where talent meets harmony, offering a stage to express, inspire, and celebrate creativity.', icon: '🎤', images: [music1, music2, music3] },
  { id: 4, title: 'Sentient Circuits', date: 'January 11th, 2025', year: 2025, category: 'Technical', description: 'Explore the world of intelligent electronics by building and programming interactive circuits in this hands-on bot workshop.', icon: '🤖', images: [sentient1, sentient2, sentient3] },
  { id: 5, title: 'Installation Ceremony', date: 'January 11th, 2025', year: 2025, category: 'Outreach', description: 'An enchanting rite of passage, where tradition meets new beginnings, illuminating the path to a promising journey ahead.', icon: '✨', images: [installation1, installation2, installation3] },
  { id: 6, title: 'Mr. and Miss. EC', date: 'January 10th & 12th, 2025', year: 2025, category: 'Cultural', description: 'Where brilliance meets elegance, Mr. and Miss EC embody the perfect fusion of intellect, charm, and charisma.', icon: '👑', images: [mrnmiss1, mrnmiss2, mrnmiss3] },
  { id: 7, title: 'IETE X Communique', date: 'December 18-20, 2024', year: 2024, category: 'Technical', description: "Soaring into innovation, our branch's drone workshop unlocked the skies of creativity and technology for aspiring minds!", icon: '🚁', images: [drone1, drone2, drone3] },
  { id: 8, title: "ECPL'24", date: 'October 03-06, 2024', year: 2024, category: 'Cultural', description: 'Beyond Boundaries: The Ultimate Cricket Showdown!', icon: '🏏', images: [ecpl24_1, ecpl24_2, ecpl24_3] },
  { id: 9, title: 'TRADITIONAL DAY', date: 'November 04, 2023', year: 2023, category: 'Cultural', description: 'Our branch celebrated Traditional Day with vibrant attire, cultural performances, and a beautiful blend of heritage and unity, making it a day to cherish our roots.', icon: '🪔', images: [traditional1, traditional2, traditional3] },
  { id: 10, title: "ECPL'23", date: 'October 06-09, 2023', year: 2023, category: 'Cultural', description: 'ECPL: Where passion meets precision, and the spirit of cricket unites the champions of ECE!', icon: '🏏', images: [ecpl23_1, ecpl23_2, ecpl23_3] },
  { id: 11, title: 'Bollywood Day', date: 'February 10, 2023', year: 2023, category: 'Cultural', description: 'Step into the glitz and glamour of Bollywood, where every step is a scene and every outfit tells a story!', icon: '🎬', images: [bollywood1, bollywood2, bollywood3] },
  { id: 12, title: "EKATRA'23", date: 'February 09, 2023', year: 2023, category: 'Cultural', description: 'A vibrant celebration of diversity and talent, Ekatra brought our branch together in a symphony of traditions, colors, and creativity.', icon: '🎪', images: [ekatra23_1, ekatra23_2, ekatra23_3] },
]

function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Technical' | 'Cultural' | 'Outreach'>('All')

  // Filter events
  const filteredEvents = selectedFilter === 'All' 
    ? eventsData 
    : eventsData.filter(event => event.category === selectedFilter)

  // Group events by year
  const eventsByYear = filteredEvents.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = []
    }
    acc[event.year].push(event)
    return acc
  }, {} as Record<number, Event[]>)

  const years = Object.keys(eventsByYear).map(Number).sort((a, b) => b - a)

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={eventBgImage} 
            alt="Events Background" 
            className="w-full h-full object-cover opacity-40"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-slate-900/70 to-slate-950/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-purple-900/30"></div>
        </div>
        
        {/* Animated Glow Effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Events <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Timeline</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto drop-shadow-lg">
              Journey through our incredible events, workshops, and milestones that shape the future of ECE students
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Timeline Section */}
      <section className="relative py-20 bg-slate-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          {/* Event Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {(['All', 'Technical', 'Cultural', 'Outreach'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Timeline Container */}
          <div className="max-w-7xl mx-auto">
            {years.map((year) => (
              <div key={year} className="mb-20">
                {/* Year Separator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center mb-12"
                >
                  <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-500"></div>
                  <div className="mx-6 px-8 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full shadow-lg shadow-cyan-500/50">
                    <span className="text-3xl font-bold text-white">{year}</span>
                  </div>
                  <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-500"></div>
                </motion.div>

                {/* Events for this year */}
                <div className="relative">
                  {/* Vertical Timeline Line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 transform -translate-x-1/2 hidden lg:block shadow-lg shadow-cyan-500/50"></div>

                  {/* Events */}
                  {eventsByYear[year].map((event, index) => {
                    const isLeft = index % 2 === 0

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`relative mb-40 lg:mb-52 ${
                          isLeft ? 'lg:pr-[50%]' : 'lg:pl-[50%] lg:ml-auto'
                        }`}
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-1/2 top-8 hidden lg:block transform -translate-x-1/2 z-20">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 shadow-lg shadow-cyan-500/50 ring-4 ring-slate-950"></div>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 animate-ping opacity-75"></div>
                        </div>

                         {/* Event Card */}
                          <motion.div
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className={`relative ${isLeft ? 'lg:mr-12' : 'lg:ml-12'}`}
                          >
                           <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20">
                              {/* Neon Glow Effect */}
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                              
                              {/* Hanging Image Placeholders Attached to Bottom of Card */}
                              
                              {/* Left Placeholder */}
                              <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 translate-y-full flex flex-col items-center">
                                {/* Unified Hole & Grommet at Card Bottom */}
                                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-600 shadow-inner z-10"></div>
                                
                                {/* String/Chain */}
                                <div className="w-0.5 h-8 bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700 shadow-sm"></div>
                                
                                {/* Image Frame */}
                                <div 
                                  className="w-40 h-48 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-slate-600 shadow-2xl overflow-hidden group-hover:animate-[swing_1s_ease-in-out_infinite] relative"
                                  style={{ transformOrigin: 'top center' }}
                                >
                                  {event.images[0] ? (
                                    <img 
                                      src={event.images[0]} 
                                      alt={`${event.title} - 1`}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-center p-3">
                                      <div className="text-4xl mb-2">📷</div>
                                      <div className="text-xs opacity-70 leading-tight">Add Photo</div>
                                    </div>
                                  )}
                                  {/* Frame inner border */}
                                  <div className="absolute inset-2 border border-white/20 rounded pointer-events-none"></div>
                                </div>
                              </div>
                              
                              {/* Center Placeholder */}
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex flex-col items-center">
                                {/* Unified Hole & Grommet at Card Bottom */}
                                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-600 shadow-inner z-10"></div>
                                
                                {/* String/Chain */}
                                <div className="w-0.5 h-8 bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700 shadow-sm"></div>
                                
                                {/* Image Frame */}
                                <div 
                                  className="w-40 h-48 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-slate-600 shadow-2xl overflow-hidden group-hover:animate-[swing_1.2s_ease-in-out_infinite] relative"
                                  style={{ transformOrigin: 'top center', animationDelay: '0.1s' }}
                                >
                                  {event.images[1] ? (
                                    <img 
                                      src={event.images[1]} 
                                      alt={`${event.title} - 2`}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-center p-3">
                                      <div className="text-4xl mb-2">📷</div>
                                      <div className="text-xs opacity-70 leading-tight">Add Photo</div>
                                    </div>
                                  )}
                                  {/* Frame inner border */}
                                  <div className="absolute inset-2 border border-white/20 rounded pointer-events-none"></div>
                                </div>
                              </div>
                              
                              {/* Right Placeholder */}
                              <div className="absolute bottom-0 right-1/4 transform translate-x-1/2 translate-y-full flex flex-col items-center">
                                {/* Unified Hole & Grommet at Card Bottom */}
                                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-600 shadow-inner z-10"></div>
                                
                                {/* String/Chain */}
                                <div className="w-0.5 h-8 bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700 shadow-sm"></div>
                                
                                {/* Image Frame */}
                                <div 
                                  className="w-40 h-48 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-slate-600 shadow-2xl overflow-hidden group-hover:animate-[swing_1.1s_ease-in-out_infinite] relative"
                                  style={{ transformOrigin: 'top center', animationDelay: '0.2s' }}
                                >
                                  {event.images[2] ? (
                                    <img 
                                      src={event.images[2]} 
                                      alt={`${event.title} - 3`}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-center p-3">
                                      <div className="text-4xl mb-2">📷</div>
                                      <div className="text-xs opacity-70 leading-tight">Add Photo</div>
                                    </div>
                                  )}
                                  {/* Frame inner border */}
                                  <div className="absolute inset-2 border border-white/20 rounded pointer-events-none"></div>
                                </div>
                              </div>
                            
                            <div className="relative z-10">
                              {/* Event Icon & Category */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="text-4xl">{event.icon}</div>
                                  <div>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                      event.category === 'Technical' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' :
                                      event.category === 'Cultural' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' :
                                      'bg-pink-500/20 text-pink-400 border border-pink-500/50'
                                    }`}>
                                      {event.category}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-sm text-slate-400 font-mono">{event.date}</div>
                              </div>

                              {/* Event Title & Description */}
                              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all">
                                {event.title}
                              </h3>
                              <p className="text-slate-300 leading-relaxed">
                                {event.description}
                              </p>

                              {/* Decorative Corner */}
                              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-3xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                          </div>

                          {/* Connector Line (Desktop) */}
                          <div className={`hidden lg:block absolute top-8 ${
                            isLeft ? 'left-full' : 'right-full'
                          } w-12 h-px bg-gradient-to-r ${
                            isLeft ? 'from-slate-700' : 'to-slate-700 from-transparent'
                          } ${isLeft ? '' : 'right-0'}`}></div>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Ekatra Video Section */}
      <EkatraVideoSection />
    </div>
  )
}

export default EventsPage

