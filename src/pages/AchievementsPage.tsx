import { useState } from 'react'
import { motion } from 'framer-motion'
import achievementBg from '../assets/achivement_web.png'

// Import all achievement images
import anshShahu from '../assets/Ansh Shahu.jpeg'
import arya1st from '../assets/Arya 1stt.jpg'
import arya2nd from '../assets/Arya 2nd.jpg'
import arya3rd from '../assets/Arya 3rd.jpeg'
import arya4th from '../assets/Arya 4th.jpeg'
import arya5th from '../assets/Arya 5th.jpg'
import arya6th from '../assets/Arya 6th.jpg'
import aryan1 from '../assets/Aryan 1.jpeg'
import aryanDeogade1st from '../assets/Aryan Deogade 1st.jpeg'
import aryanDeogade3rd from '../assets/Aryan Deogade 3rd.jpeg'
import aryanDeogade5th from '../assets/Aryan Deogade 5th.jpeg'
import aryanDeogade6th from '../assets/Aryan Deogade 6th.jpeg'
import aryanDeogade8th from '../assets/Aryan Deogade 8th.jpeg'
import gayatriRutuja from '../assets/Gayatri Sen and Rutuja Karemore.jpeg'
import kumarilBorkute from '../assets/Kumaril Borkute.jpeg'
import mahekHarwani from '../assets/Mahek Harwani.jpeg'
import maithili1st from '../assets/Maithili khuje 1st.jpeg'
import maithili2nd from '../assets/Maithili Khuje 2nd.jpeg'
import maithili3rd from '../assets/Maithili Khuje 3rd.jpeg'
import maithili4th from '../assets/Maithili Khuje 4th.jpeg'
import pranay2nd from '../assets/Pranay Tondhare 2nd.png'
import pranayTondhare from '../assets/Pranay Tondhare.jpg'
import sarah from '../assets/Sarah.jpeg'
import shraddha1st from '../assets/Shraddha Allewar 1st.jpeg'

// Achiever data
interface Achiever {
  id: number
  name: string
  field: string
  image: string | null
}

const achieversData: Achiever[] = [
  { id: 1, name: 'Ansh Shahu', field: 'Represented Ramdeobaba College as well as RTMNU University at All India Level Shooting Championship, Meerut', image: anshShahu },
  { id: 2, name: 'Arya Dongre', field: 'Best Player of the Year', image: arya1st },
  { id: 3, name: 'Arya Dongre', field: 'Secured 2nd position in Ashwamedh State Level Basketball Championship', image: arya2nd },
  { id: 4, name: 'Arya Dongre', field: 'Received Award for Representing RTMNU in West Zone State Level Basketball Championship', image: arya3rd },
  { id: 5, name: 'Arya Dongre', field: 'Received Award for Representing RTMNU in Ashwamedh State Level Basketball Championship', image: arya4th },
  { id: 6, name: 'Arya Dongre', field: 'Secured 2nd position in Aagaaz 6.0 Basketball Tournament', image: arya5th },
  { id: 7, name: 'Arya Dongre', field: 'Received "Best Player" Award in Udghosh 6.0 Basketball Tournament', image: arya6th },
  { id: 8, name: 'Aryan Deogade', field: 'Represented RTMNU at All India Inter University Chess Championship', image: aryan1 },
  { id: 9, name: 'Aryan Deogade', field: 'Runner Up at Run-neeti Cricket Tournament', image: aryanDeogade1st },
  { id: 10, name: 'Aryan Deogade', field: 'RTMNU Inter-collegiate Chess Champion 2024', image: aryanDeogade3rd },
  { id: 11, name: 'Aryan Deogade', field: "RCOEM's Sportsperson of the Year 2023", image: aryanDeogade5th },
  { id: 12, name: 'Aryan Deogade', field: 'Best All-rounder in DNC Cricket Tournament', image: aryanDeogade6th },
  { id: 13, name: 'Aryan Deogade', field: 'Represented RTMNU in West Zone Inter-University Chess Tournament 2025', image: aryanDeogade8th },
  { id: 14, name: 'Gayatri Sen & Rutuja Karemore', field: 'Won first prize on Tech Talk at MRSAC Nagpur', image: gayatriRutuja },
  { id: 15, name: 'Kumaril Borkute', field: 'Runner up in National Level Project Competition organised by JD College', image: kumarilBorkute },
  { id: 16, name: 'Mahek Harwani', field: 'Secured 3rd Position in the RTMNU Inter-collegiate Shooting Tournament, Air Pistol Women\'s Category for RBU', image: mahekHarwani },
  { id: 17, name: 'Maithili Khuje', field: 'Intercollegiate Chess Championship Winner', image: maithili1st },
  { id: 18, name: 'Maithili Khuje', field: 'DNC Chess Winner', image: maithili2nd },
  { id: 19, name: 'Maithili Khuje', field: 'West Zone Chess Intercollegiate Winner', image: maithili3rd },
  { id: 20, name: 'Maithili Khuje', field: 'National Level Chess Intercollegiate Tournament', image: maithili4th },
  { id: 21, name: 'Pranay Tondhare', field: 'Secured 1st position at District Level Badminton Tournament', image: pranay2nd },
  { id: 22, name: 'Pranay Tondhare', field: 'Secured 1st position at State Level Badminton Tournament', image: pranayTondhare },
  { id: 23, name: 'Sarah Farooqui', field: 'Represented India and won a Gold Medal in 7th South Asian SQAY Championship 2023 held at Nepal', image: sarah },
  { id: 24, name: 'Shraddha Allewar', field: 'Secured 3rd position in KIO (Karate India Organization) Nationals Tournament', image: shraddha1st },
]

// Flip Card Component
function FlipCard({ achiever }: { achiever: Achiever }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="relative w-64 h-64 md:w-72 md:h-72 cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side - Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          {achiever.image ? (
            <img 
              src={achiever.image} 
              alt={achiever.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex flex-col items-center justify-center text-slate-500">
              <svg className="w-20 h-20 md:w-24 md:h-24 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm md:text-base">Add Photo</p>
            </div>
          )}
        </div>

        {/* Back Side - Info */}
        <div 
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 text-center"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          }}
        >
          {/* Decorative gradient border effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(168, 85, 247, 0.5))',
            }}
          ></div>
          
          <div className="relative z-10">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-white font-bold text-lg md:text-xl mb-3">{achiever.name}</h3>
            <p className="text-cyan-400 text-sm md:text-base leading-relaxed">{achiever.field}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function AchievementsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={achievementBg} 
            alt="Achievements Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/70 to-slate-950/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Achievements</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Celebrating excellence and innovation in Electronics & Communication Engineering
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hexagonal Gallery Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

        {/* Hexagonal Gallery */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pb-20 hidden lg:block" style={{ minHeight: '1800px' }}>
            {/* Desktop Honeycomb Layout */}
            {achieversData.map((achiever, index) => {
              const animations = [
                { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
                { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 } },
                { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
                { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
              ]
              const animation = animations[index % animations.length]
              
              // Honeycomb pattern calculations
              const itemsPerRow = 4
              const row = Math.floor(index / itemsPerRow)
              const col = index % itemsPerRow
              const isOffsetRow = row % 2 === 1
              
              // Hexagon dimensions
              const hexWidth = 288
              const hexHeight = 288
              const horizontalGap = 80
              const verticalSpacing = hexHeight * 0.80
              
              // Calculate position
              const offsetX = isOffsetRow ? (hexWidth / 2 + horizontalGap / 2) : 0
              const xPos = col * (hexWidth + horizontalGap) + offsetX
              const yPos = row * verticalSpacing
              
              // Center the entire grid
              const containerWidth = 1280
              const rowWidth = isOffsetRow 
                ? (itemsPerRow - 0.5) * (hexWidth + horizontalGap)
                : itemsPerRow * (hexWidth + horizontalGap) - horizontalGap
              const centerOffset = (containerWidth - rowWidth) / 2 - 30

              return (
                <motion.div
                  key={achiever.id}
                  initial={animation.initial}
                  whileInView={animation.animate}
                  viewport={{ once: false, margin: "-50px", amount: 0.3 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: (index % 4) * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute"
                  style={{
                    left: `${xPos + centerOffset}px`,
                    top: `${yPos}px`,
                  }}
                >
                  <FlipCard achiever={achiever} />
                </motion.div>
              )
            })}
          </div>

          {/* Mobile/Tablet Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-24 md:gap-28 place-items-center pb-20">
            {achieversData.map((achiever, index) => {
              const animations = [
                { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
                { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 } },
                { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
                { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
              ]
              const animation = animations[index % animations.length]

              return (
                <motion.div
                  key={achiever.id}
                  initial={animation.initial}
                  whileInView={animation.animate}
                  viewport={{ once: false, margin: "-50px", amount: 0.3 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: (index % 2) * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <FlipCard achiever={achiever} />
                </motion.div>
              )
            })}
          </div>
        </div>

      </section>

    </div>
  )
}

export default AchievementsPage
