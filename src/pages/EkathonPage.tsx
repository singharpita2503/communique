import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ekathonBg from '../assets/ekathon_bg1.jpg'

// Floating ghost particles component
const GhostParticle = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100
  const randomDuration = 15 + Math.random() * 10
  
  return (
    <motion.div
      className="absolute w-2 h-2 bg-orange-400/30 rounded-full blur-sm"
      style={{ left: `${randomX}%` }}
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ 
        y: '-100vh', 
        opacity: [0, 0.8, 0.8, 0],
        x: [0, 30, -30, 0]
      }}
      transition={{
        duration: randomDuration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  )
}

// Flickering text component


// Skull decoration
const FloatingSkull = ({ delay, x, y }: { delay: number, x: number, y: number }) => (
  <motion.div
    className="absolute text-2xl sm:text-3xl md:text-4xl pointer-events-none opacity-20 hidden sm:block"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      opacity: [0.2, 0.4, 0.2]
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  >
    💀
  </motion.div>
)

// Spider web corner decoration
const SpiderWeb = ({ position }: { position: 'left' | 'right' }) => (
  <div className={`absolute top-0 ${position === 'left' ? 'left-0' : 'right-0 scale-x-[-1]'} w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 pointer-events-none opacity-30`}>
    <svg viewBox="0 0 200 200" className="w-full h-full text-slate-400">
      <defs>
        <pattern id="web" patternUnits="userSpaceOnUse" width="40" height="40">
          <path d="M0 40 L40 0 M0 0 L40 40" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        </pattern>
      </defs>
      <path d="M0 0 Q100 0 200 200 Q0 100 0 0" fill="url(#web)" opacity="0.5"/>
      <path d="M0 0 Q50 100 0 200" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M0 0 Q100 50 200 0" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M0 0 L200 200" stroke="currentColor" strokeWidth="0.5" fill="none"/>
    </svg>
  </div>
)

// Timeline item for schedule
const TimelineItem = ({ time, title, description, icon, delay }: {
  time: string
  title: string
  description: string
  icon: string
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="relative pl-6 sm:pl-8 pb-6 sm:pb-8 border-l-2 border-orange-500/30 last:border-l-0"
  >
    <div className="absolute -left-2.5 sm:-left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-900 border-2 border-orange-500 flex items-center justify-center">
      <span className="text-[10px] sm:text-xs">{icon}</span>
    </div>
    <div className="bg-slate-900/80 backdrop-blur-sm border border-orange-500/20 rounded-lg p-3 sm:p-4 hover:border-orange-500/50 transition-all group">
      <div className="text-orange-400 text-xs sm:text-sm font-mono mb-1">{time}</div>
      <h4 className="text-white font-bold text-base sm:text-lg group-hover:text-orange-400 transition-colors">{title}</h4>
      <p className="text-slate-400 text-xs sm:text-sm mt-1">{description}</p>
    </div>
  </motion.div>
)

// Prize card component
const PrizeCard = ({ place, prize, icon, color, delay }: {
  place: string
  prize: string
  icon: string
  color: string
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateY: -30 }}
    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay }}
    whileHover={{ scale: 1.05, rotateY: 10 }}
    className={`relative bg-gradient-to-br ${color} p-1 rounded-xl sm:rounded-2xl group`}
  >
    <div className="bg-slate-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full">
      <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 group-hover:animate-bounce">{icon}</div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{place}</h3>
      <p className="text-orange-400 text-xl sm:text-2xl md:text-3xl font-bold font-mono">{prize}</p>
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </motion.div>
)

function EkathonPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const fogOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.6])
  
  // Generate random particles
  const [particles] = useState(() => 
    Array.from({ length: 20 }, (_, i) => i * 2)
  )

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Handle background attachment for mobile
  useEffect(() => {
    const handleResize = () => {
      if (backgroundRef.current) {
        if (window.innerWidth < 768) {
          backgroundRef.current.style.backgroundAttachment = 'scroll'
        } else {
          backgroundRef.current.style.backgroundAttachment = 'fixed'
        }
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Set your hackathon date here - January 22, 2026 at 9:00 AM
    const hackathonDate = new Date('2026-01-22T09:00:00').getTime()
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = hackathonDate - now
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  // Scroll to section
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Fixed Background Image */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${ekathonBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay - allows content to be readable while showing the spooky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950/80" />
        
        {/* Animated fog effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"
          style={{ opacity: fogOpacity }}
        />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((delay, i) => (
          <GhostParticle key={i} delay={delay} />
        ))}
      </div>


      {/* Floating skulls */}
      <FloatingSkull delay={0} x={10} y={30} />
      <FloatingSkull delay={2} x={85} y={50} />
      <FloatingSkull delay={4} x={20} y={70} />

      {/* Scrollable Content */}
      <div className="relative z-20 pt-20">
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Spider webs */}
          <SpiderWeb position="left" />
          <SpiderWeb position="right" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Glitch effect title */}
            <div className="mb-8">
              <motion.h1 
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight"
                style={{ 
                  color: '#fb923c',
                  textShadow: '0 0 40px rgba(249, 115, 22, 0.8), 0 0 80px rgba(249, 115, 22, 0.4), 3px 3px 0 #dc2626'
                }}
                animate={{
                  textShadow: [
                    '0 0 40px rgba(249, 115, 22, 0.8), 0 0 80px rgba(249, 115, 22, 0.4), 3px 3px 0 #dc2626',
                    '0 0 20px rgba(249, 115, 22, 0.5), 0 0 40px rgba(249, 115, 22, 0.2), -3px 3px 0 #dc2626',
                    '0 0 60px rgba(249, 115, 22, 1), 0 0 100px rgba(249, 115, 22, 0.6), 3px -3px 0 #dc2626',
                    '0 0 40px rgba(249, 115, 22, 0.8), 0 0 80px rgba(249, 115, 22, 0.4), 3px 3px 0 #dc2626'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                EKATHON
              </motion.h1>
              
              <div className="mt-4 sm:mt-6">
                <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-red-500 tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] px-2">
                  CODE OF THE CURSED
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 mb-8 sm:mb-12 max-w-2xl mx-auto font-mono drop-shadow-lg px-4">
              Enter the realm of darkness where only the <span className="text-red-500 font-bold">bravest coders</span> survive. 
          
            </p>

            {/* Countdown Timer */}
            <div className="mb-8 sm:mb-12 px-4">
              <h3 className="text-slate-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 font-mono tracking-wider">🎃 THE CURSE BEGINS IN...</h3>
              <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-wrap">
                {[
                  { value: timeLeft.days, label: 'DAYS' },
                  { value: timeLeft.hours, label: 'HOURS' },
                  { value: timeLeft.minutes, label: 'MINS' },
                  { value: timeLeft.seconds, label: 'SECS' }
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-16 h-20 sm:w-20 sm:h-24 md:w-28 md:h-32 bg-slate-900/90 backdrop-blur-md border-2 border-orange-500 rounded-lg sm:rounded-xl flex flex-col items-center justify-center group hover:border-red-500 transition-all shadow-lg shadow-orange-500/20">
                      <span 
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-400 font-mono group-hover:text-red-400 transition-colors"
                        style={{ textShadow: '0 0 20px rgba(249, 115, 22, 0.5)' }}
                      >
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-400 font-mono mt-1">{item.label}</span>
                    </div>
                    {/* Decorative corners */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-red-500 rounded-tl" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-red-500 rounded-br" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <motion.a
                href="#register"
                onClick={(e) => { e.preventDefault(); scrollToSection('register') }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220, 38, 38, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-red-700 to-red-600 text-white font-bold text-base sm:text-lg rounded-lg border-2 border-red-500 hover:from-red-600 hover:to-red-500 transition-all shadow-lg shadow-red-500/30 cursor-pointer text-center"
              >
                🩸 REGISTER NOW
              </motion.a>
              <motion.button
                onClick={() => scrollToSection('about')}
                whileHover={{ scale: 1.05, borderColor: '#10b981' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent text-orange-400 font-bold text-base sm:text-lg rounded-lg border-2 border-orange-500/50 hover:bg-orange-500/10 transition-all"
              >
                👻 LEARN MORE
              </motion.button>
            </div>

          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-12 sm:py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
                <span className="text-red-500">🔮</span> THE <span className="text-orange-400">HAUNTING</span> AWAITS
              </h2>
              <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
                Ekathon is not just a competition—it's a terrifying journey through three cursed rounds. 
                Face the Trial of Minds with logic and puzzles, survive the Cursed Code with relay coding, 
                and summon your innovation in the Final Summoning. Only the bravest coders emerge victorious.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  icon: '🧠',
                  title: 'Round 1: Trial of Minds',
                  description: 'Mathematical problems, logical reasoning, and puzzles. Only the sharpest minds survive.',
                  color: 'from-orange-500/20 to-orange-500/5'
                },
                {
                  icon: '💻',
                  title: 'Round 2: Cursed Code',
                  description: 'Relay coding with no communication – adaptability and silent teamwork are your weapons.',
                  color: 'from-red-500/20 to-red-500/5'
                },
                {
                  icon: '🔮',
                  title: 'Round 3: Final Summoning',
                  description: 'Innovation, feasibility, and pitching skills – conjure your startup-style solution.',
                  color: 'from-purple-500/20 to-purple-500/5'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`relative bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 group hover:border-orange-500/50 transition-all`}
                >
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 group-hover:animate-bounce">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base">{feature.description}</p>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-orange-500/30 group-hover:border-orange-500 transition-colors" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-orange-500/30 group-hover:border-orange-500 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="relative py-12 sm:py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
                <span className="text-orange-400">⚰️</span> RITUAL <span className="text-red-500">TIMELINE</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base md:text-lg px-4">Follow the sequence or face the consequences...</p>
            </motion.div>

            <div className="relative">
              <TimelineItem 
                time="3:00 – 3:10 PM" 
                title="Opening & Rule Briefing" 
                description="Theme introduction and rule briefing. The cursed souls assemble." 
                icon="🌑" 
                delay={0.1}
              />
              <TimelineItem 
                time="3:10 – 3:35 PM" 
                title="Round 1 – The Trial of Minds" 
                description="Mathematical problems, logical reasoning, puzzles, MCQs. 25 minutes of mental warfare." 
                icon="🧠" 
                delay={0.2}
              />
              <TimelineItem 
                time="3:35 – 4:10 PM" 
                title="Round 2 – The Cursed Code" 
                description="Relay coding challenge – 5 mins per member, no communication. Test your coding instincts." 
                icon="💀" 
                delay={0.3}
              />
              <TimelineItem 
                time="4:10 – 4:45 PM" 
                title="Round 3 – The Final Summoning" 
                description="Random problem statement, brainstorming, and startup-style pitch. 25 min prep + 5 min presentation + 2 min Q&A." 
                icon="🔮" 
                delay={0.4}
              />
              <TimelineItem 
                time="4:45 – 5:00 PM" 
                title="The Reckoning" 
                description="Evaluation, results announcement & closing ceremony. The curse is lifted." 
                icon="🏆" 
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section id="prizes" className="relative py-12 sm:py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
                <span className="text-red-500">💎</span> CURSED <span className="text-orange-400">TREASURES</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base md:text-lg px-4">Rewards for those brave enough to survive...</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <PrizeCard 
                place="1st Place" 
                prize="₹XX,XXX" 
                icon="🏆" 
                color="from-yellow-500 to-amber-600" 
                delay={0.2}
              />
              <PrizeCard 
                place="2nd Place" 
                prize="₹XX,XXX" 
                icon="🥈" 
                color="from-slate-400 to-slate-500" 
                delay={0.3}
              />
              <PrizeCard 
                place="3rd Place" 
                prize="₹XX,XXX" 
                icon="🥉" 
                color="from-amber-600 to-amber-700" 
                delay={0.4}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 sm:mt-12 text-center px-4"
            >
              <p className="text-slate-400 text-sm sm:text-base md:text-lg">
                Plus special prizes for <span className="text-orange-400">Best UI/UX</span>, 
                <span className="text-red-500"> Most Innovative</span>, and 
                <span className="text-purple-400"> Best First-Time Hackers</span>!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="relative py-12 sm:py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 px-2">
                <span className="text-red-500">🩸</span> SIGN THE <span className="text-orange-400">BLOOD PACT</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
                Ready to enter the realm of cursed code? Sign up now and receive your invitation to the underworld of innovation.
              </p>
            </motion.div>

            {/* Registration Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-slate-900/90 backdrop-blur-md border-2 border-red-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden"
            >
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl" 
                style={{ 
                  background: 'linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.2), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 3s infinite'
                }} 
              />
              
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border-t-2 sm:border-t-3 md:border-t-4 border-l-2 sm:border-l-3 md:border-l-4 border-orange-500 rounded-tl-2xl sm:rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border-t-2 sm:border-t-3 md:border-t-4 border-r-2 sm:border-r-3 md:border-r-4 border-red-500 rounded-tr-2xl sm:rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border-b-2 sm:border-b-3 md:border-b-4 border-l-2 sm:border-l-3 md:border-l-4 border-red-500 rounded-bl-2xl sm:rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border-b-2 sm:border-b-3 md:border-b-4 border-r-2 sm:border-r-3 md:border-r-4 border-orange-500 rounded-br-2xl sm:rounded-br-3xl" />
              
              <div className="relative z-10">
                {/* Skull decoration */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-center mb-6 sm:mb-8"
                >
                  <span className="text-4xl sm:text-6xl md:text-8xl">💀</span>
                </motion.div>

                {/* Quick info cards */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10">
                  {[
                    { icon: '📅', label: 'Date', value: 'Jan 22, 2026' },
                    { icon: '⏱️', label: 'Duration', value: '2 Hours' },
                    { icon: '📍', label: 'Venue', value: 'ECE Dept.' },
                    { icon: '👥', label: 'Team Size', value: '3-4 Members' }
                  ].map((info) => (
                    <motion.div 
                      key={info.label} 
                      whileHover={{ scale: 1.05, borderColor: '#10b981' }}
                      className="bg-slate-800/70 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border-2 border-slate-700 text-center transition-all"
                    >
                      <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">{info.icon}</div>
                      <div className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider">{info.label}</div>
                      <div className="text-white font-bold text-xs sm:text-sm md:text-lg">{info.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Form Embed Area - Replace the src with your Google Form embed URL */}
                <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-700 mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white mb-3 sm:mb-4">
                    <span className="text-red-500">📝</span> Registration Form
                  </h3>
                  
                  {/* 
                    =====================================================
                    ADD YOUR GOOGLE FORM EMBED HERE
                    Replace the placeholder below with your iframe code
                    Example: <iframe src="YOUR_GOOGLE_FORM_EMBED_URL" ... />
                    =====================================================
                  */}
                  <div className="relative bg-slate-900 rounded-lg sm:rounded-xl border-2 border-dashed border-orange-500/50 min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
                    {/* Placeholder - Replace this div with your embedded form iframe */}
                    <div className="text-center p-4 sm:p-6 md:p-8">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4"
                      >
                        📋
                      </motion.div>
                      <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                        Registration Form Will Appear Here
                      </p>
                      <p className="text-slate-500 text-xs sm:text-sm mb-4 sm:mb-6 px-2">
                        Add your Google Form iframe embed code in EkathonPage.tsx
                      </p>
                      
                      {/* Alternate: External link button */}
                      <motion.a
                        href="https://forms.gle/7wPwyY6hyrjEJ1Ap8"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl border-2 border-orange-400 hover:from-orange-500 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/30 cursor-pointer"
                      >
                        🦴 OPEN REGISTRATION FORM
                      </motion.a>
                    </div>
                    
                    {/* 
                      UNCOMMENT AND REPLACE WITH YOUR IFRAME:
                      <iframe 
                        src="YOUR_GOOGLE_FORM_EMBED_URL"
                        width="100%" 
                        height="600" 
                        frameBorder="0" 
                        marginHeight={0} 
                        marginWidth={0}
                        className="rounded-xl"
                      >
                        Loading…
                      </iframe>
                    */}
                  </div>
                </div>

                {/* Additional info */}
                <div className="text-center">
                  <p className="text-slate-500 text-xs sm:text-sm mb-3 sm:mb-4 px-2">
                    ⚠️ Teams of 3-4 members allowed • Registration closes soon • No turning back once you register...
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/50">
                      ✓ Free Entry
                    </span>
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/50">
                      ✓ Exciting Prizes
                    </span>
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/50">
                      ✓ Swag & Goodies
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative py-12 sm:py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
                <span className="text-orange-400">❓</span> QUESTIONS FROM <span className="text-red-500">THE CRYPT</span>
              </h2>
            </motion.div>

            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  q: 'Who can participate in Ekathon?',
                  a: 'Any student with a passion for coding and a brave soul! Teams of 3-4 members from any branch are welcome to face the curse.'
                },
                {
                  q: 'What are the three rounds?',
                  a: 'Round 1: Trial of Minds (25 min) – puzzles, math, MCQs. Round 2: Cursed Code (35 min) – relay coding. Round 3: Final Summoning (35 min) – startup pitch.'
                },
                {
                  q: 'How does relay coding work in Round 2?',
                  a: 'Each team member codes for 5 minutes in sequence with no communication allowed. Test your adaptability and silent teamwork!'
                },
                {
                  q: 'What is evaluated in each round?',
                  a: 'Round 1: Accuracy & speed. Round 2: Correctness, logic, efficiency & creativity. Round 3: Innovation, impact, clarity & feasibility.'
                },
                {
                  q: 'What should I bring?',
                  a: 'Your laptop, charger, and the courage to face three rounds of challenges. Come prepared for logic puzzles and coding!'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/60 backdrop-blur-sm border border-slate-700 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:border-orange-500/50 transition-all group"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 group-hover:text-orange-400 transition-colors">
                    <span className="text-red-500">👁️</span> {faq.q}
                  </h3>
                  <p className="text-slate-400 mt-2 pl-6 sm:pl-7 text-sm sm:text-base">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="relative py-12 sm:py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
                READY TO <span className="text-red-500">FACE</span> THE <span className="text-orange-400">CURSE</span>?
              </h2>
              <p className="text-slate-400 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-4">
                The clock is ticking. The spirits are waiting. Your code awaits...
              </p>
              <motion.a
                href="#register"
                onClick={(e) => { e.preventDefault(); scrollToSection('register') }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(220, 38, 38, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white font-bold text-base sm:text-lg md:text-xl rounded-lg sm:rounded-xl border-2 border-red-500 hover:from-red-600 hover:via-red-500 hover:to-red-600 transition-all shadow-xl shadow-red-500/40 cursor-pointer"
              >
                ☠️ ENTER THE DARKNESS
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Spacer for footer */}
        <div className="h-20" />
      </div>

      {/* Global styles for animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}

export default EkathonPage

