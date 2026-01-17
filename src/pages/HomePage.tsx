import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import installation1 from '../assets/installation1.jpg'
import installation2 from '../assets/installation2.jpg'
import departmentPhoto from '../assets/department-photo.jpg'
import departmentPhoto3 from '../assets/department-photo3.JPG'
import magazine23 from '../assets/Magazine-23.jpg'
import magazine25 from '../assets/Magazine-25.jpeg'

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Carousel images
  const carouselImages = [
    installation1,
    installation2,
    departmentPhoto,
    departmentPhoto3,
  ]

  // Auto-slide effect (pause on hover)
  useEffect(() => {
    if (isHovered) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [carouselImages.length, isHovered])

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Animated Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                Communique
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mt-2">
                  The Voice of ECE
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                We are the ECE Students' Society, bringing together aspiring engineers through 
                innovative events, hands-on workshops, collaborative projects, and a thriving community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/events">
                  <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 font-semibold">
                    View Events
                  </button>
                </Link>
                <Link to="/resources">
                  <button className="bg-slate-800 text-cyan-400 px-8 py-4 rounded-xl hover:bg-slate-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold border-2 border-cyan-500/50 hover:border-cyan-400">
                    Explore Resources
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* 3D Floating Gallery */}
            <motion.div 
              className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Glowing orb behind */}
              <div className="absolute w-[350px] h-[250px] bg-gradient-to-r from-cyan-500/40 to-purple-500/40 blur-3xl rounded-full animate-pulse"></div>
              
              {/* Main Image Display */}
              <div className="relative w-[380px] sm:w-[450px] lg:w-[520px] h-[250px] sm:h-[300px] lg:h-[340px]">
                {carouselImages.map((image, index) => {
                  const isActive = index === currentSlide
                  const isPrev = index === (currentSlide - 1 + carouselImages.length) % carouselImages.length
                  const isNext = index === (currentSlide + 1) % carouselImages.length
                  
                  let xPos = 0
                  let zPos = 0
                  let rotateY = 0
                  let scale = 0.7
                  let opacity = 0
                  let zIndex = 0

                  if (isActive) {
                    xPos = 0
                    zPos = 50
                    rotateY = 0
                    scale = 1
                    opacity = 1
                    zIndex = 30
                  } else if (isPrev) {
                    xPos = -220
                    zPos = -100
                    rotateY = 45
                    scale = 0.75
                    opacity = 0.6
                    zIndex = 20
                  } else if (isNext) {
                    xPos = 220
                    zPos = -100
                    rotateY = -45
                    scale = 0.75
                    opacity = 0.6
                    zIndex = 20
                  }

                  return (
                    <motion.div
                      key={index}
                      className="absolute top-1/2 left-1/2 cursor-pointer"
                      animate={{
                        x: xPos,
                        z: zPos,
                        rotateY: rotateY,
                        scale: scale,
                        opacity: opacity,
                        zIndex: zIndex,
                      }}
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                      onClick={() => setCurrentSlide(index)}
                      style={{
                        translateX: '-50%',
                        translateY: '-50%',
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                      }}
                      whileHover={isActive ? { scale: 1.05 } : {}}
                    >
                      <div 
                        className={`w-[320px] sm:w-[380px] lg:w-[420px] h-[210px] sm:h-[250px] lg:h-[280px] rounded-2xl overflow-hidden transition-shadow duration-300 ${
                          isActive 
                            ? 'shadow-2xl shadow-black/60' 
                            : 'shadow-xl shadow-black/40'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        {/* Overlay gradient */}
                        <div className={`absolute inset-0 transition-opacity duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-t from-slate-950/20 via-transparent to-transparent' 
                            : 'bg-slate-950/30'
                        }`}></div>
                        
                      </div>
                      
                      {/* Reflection */}
                      {isActive && (
                        <div className="absolute -bottom-2 left-0 right-0 h-20 bg-gradient-to-b from-cyan-500/10 to-transparent blur-xl rounded-full"></div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400/60"
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i) * 20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="achievements" className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Highlights</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Celebrating our achievements and milestones in the ECE community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Highlight Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/50">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">500+ Members</h3>
              <p className="text-slate-300">
                A vibrant community of ECE students passionate about technology and innovation
              </p>
            </motion.div>

            {/* Highlight Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">50+ Events</h3>
              <p className="text-slate-300">
                Annual workshops, hackathons, tech talks, and networking sessions for all students
              </p>
            </motion.div>

            {/* Highlight Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/30 shadow-lg shadow-pink-500/20 hover:shadow-2xl hover:shadow-pink-500/30 transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-pink-500/50">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">30+ Projects</h3>
              <p className="text-slate-300">
                Collaborative student projects ranging from IoT to AI and embedded systems
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources Teaser Section */}
      <section id="resources" className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Resources <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Hub</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Access curated learning materials, project guides, and study resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Resource Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-500 transition-all cursor-pointer shadow-lg shadow-cyan-500/10 hover:shadow-2xl hover:shadow-cyan-500/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Study Notes</h3>
              <p className="text-slate-300 text-sm">Comprehensive notes for all ECE subjects</p>
            </motion.div>

            {/* Resource Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-purple-500/30 hover:border-purple-500 transition-all cursor-pointer shadow-lg shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Code Labs</h3>
              <p className="text-slate-300 text-sm">Hands-on coding tutorials and exercises</p>
            </motion.div>

            {/* Resource Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-pink-500/30 hover:border-pink-500 transition-all cursor-pointer shadow-lg shadow-pink-500/10 hover:shadow-2xl hover:shadow-pink-500/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Project Ideas</h3>
              <p className="text-slate-300 text-sm">Innovative project ideas with documentation</p>
            </motion.div>

            {/* Resource Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-orange-500/30 hover:border-orange-500 transition-all cursor-pointer shadow-lg shadow-orange-500/10 hover:shadow-2xl hover:shadow-orange-500/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Video Tutorials</h3>
              <p className="text-slate-300 text-sm">Expert-led video courses and workshops</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/resources">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 font-semibold">
                Browse All Resources
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Explore Communique Magazines Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-slate-950"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Book Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-6 bg-gradient-to-b from-cyan-400/20 to-purple-400/20 rounded-sm"
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i * 2) * 30, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              📖 Our Publications
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Communique</span> Magazines
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Dive into our collection of student-curated magazines featuring poems, arts,photography,branch cup,patents and insights from the ECE community
            </p>
          </motion.div>

          {/* Magazine Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Magazine 2023 - Third Edition */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-pink-500/20 hover:border-pink-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20">
                {/* Magazine Cover */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={magazine23} 
                    alt="Communique Third Edition 2023" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-pink-500/90 text-white text-xs font-bold rounded-full">
                      2023
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Third Edition</h3>
                    <p className="text-pink-200/80 text-sm">Communique Magazine</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-slate-400 text-sm mb-4">Our inaugural edition featuring student innovations, technical articles, and ECE community stories.</p>
                  <a 
                    href="https://acrobat.adobe.com/id/urn:aaid:sc:AP:434d3501-48e3-4aad-a490-5f49a65abe9b" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-pink-500/20 to-pink-600/20 border border-pink-500/30 text-pink-400 px-4 py-3 rounded-xl hover:from-pink-500/30 hover:to-pink-600/30 hover:border-pink-400 transition-all font-medium flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-pink-500/20"
                  >
                    <span>Read Magazine</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Magazine 2025 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20">
                {/* Magazine Cover */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={magazine25} 
                    alt="Communique 2025 Edition" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-bold rounded-full">
                      2025
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Latest Edition</h3>
                    <p className="text-cyan-200/80 text-sm">Communique Magazine</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-slate-400 text-sm mb-4"> highlighting student-led innovations, cultural insights, and voices from the ECE community..</p>
                  <a 
                    href="/Magazine-25.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 text-cyan-400 px-4 py-3 rounded-xl hover:from-cyan-500/30 hover:to-cyan-600/30 hover:border-cyan-400 transition-all font-medium flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-cyan-500/20"
                  >
                    <span>Read Magazine</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link to="/about">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                View All Magazines
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage



