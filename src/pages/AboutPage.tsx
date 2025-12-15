import { motion } from 'framer-motion'
import presidentImage from '../assets/Ashlesha_web.jpg'
import departmentPhoto from '../assets/department-photo1.jpg'
import magazine23 from '../assets/Magazine-23.jpg'
import magazine25 from '../assets/Magazine-25.jpeg'

function AboutPage() {
  const coreValues = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovation',
      description: 'Pushing boundaries and embracing new technologies to create impactful solutions.',
      color: 'cyan'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Collaboration',
      description: 'Working together as a united community to achieve extraordinary results.',
      color: 'purple'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Excellence',
      description: 'Striving for the highest standards in everything we do and deliver.',
      color: 'pink'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Integrity',
      description: 'Upholding honesty, transparency, and ethical values in all our actions.',
      color: 'orange'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Learning',
      description: 'Continuous growth through knowledge sharing and skill development.',
      color: 'green'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Inclusivity',
      description: 'Creating a welcoming space where every voice matters and is heard.',
      color: 'blue'
    }
  ]

  const magazines = [
    {
      title: 'Third Edition',
      description: 'Our inaugural edition featuring student innovations, technical articles, and ECE community stories.',
      year: '2023',
      cover: magazine23,
      link: 'https://acrobat.adobe.com/id/urn:aaid:sc:AP:434d3501-48e3-4aad-a490-5f49a65abe9b'
    },
    {
      title: 'Latest Edition',
      description: 'Exploring the frontiers of technology with space-themed design, featuring cutting-edge projects and innovations.',
      year: '2025',
      cover: magazine25,
      link: '/Magazine-25.pdf'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; shadow: string; border: string }> = {
      cyan: { bg: 'from-cyan-500 to-cyan-600', shadow: 'shadow-cyan-500/50', border: 'border-cyan-500/30' },
      purple: { bg: 'from-purple-500 to-purple-600', shadow: 'shadow-purple-500/50', border: 'border-purple-500/30' },
      pink: { bg: 'from-pink-500 to-pink-600', shadow: 'shadow-pink-500/50', border: 'border-pink-500/30' },
      orange: { bg: 'from-orange-500 to-orange-600', shadow: 'shadow-orange-500/50', border: 'border-orange-500/30' },
      green: { bg: 'from-green-500 to-green-600', shadow: 'shadow-green-500/50', border: 'border-green-500/30' },
      blue: { bg: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/50', border: 'border-blue-500/30' }
    }
    return colors[color] || colors.cyan
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section - Spirit of Ekatra */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-cyan-400 text-sm font-medium border border-cyan-500/30">
                The Spirit of Ekatra
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Together We{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Rise
              </span>
              <br />
              Together We{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                Shine
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ekatra is an annual celebration that brings students together in the spirit of unity, culture, and joy. It showcases the richness of traditions through Traditional Day, vibrant cultural performances, and engaging games that promote teamwork and fun. With the dedicated efforts of Communique members, the event is seamlessly organized, creating a memorable experience for all. Ekatra truly reflects the power of togetherness, cultural appreciation, and shared happiness.

            </p>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: '500+', label: 'Active Members' },
              { number: '50+', label: 'Events Hosted' },
              { number: '30+', label: 'Projects' },
              { number: '5+', label: 'Years Strong' }
            ].map((stat, index) => (
              <div key={index} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all">
                <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              What We{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Do?
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Empowering students through diverse activities that bridge theory and practice
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Technical Workshops',
                description: 'Hands-on sessions on emerging technologies like IoT, AI/ML, embedded systems, and VLSI design.',
                color: 'cyan'
              },
              {
                icon: '🏆',
                title: 'Hackathons & Competitions',
                description: 'Platform for students to showcase skills, compete, and win recognition at various levels.',
                color: 'purple'
              },
              {
                icon: '🎤',
                title: 'Guest Lectures',
                description: 'Industry experts and alumni share insights on career paths and cutting-edge technologies.',
                color: 'pink'
              },
              {
                icon: '🔬',
                title: 'Research Projects',
                description: 'Collaborative research initiatives that solve real-world problems and publish findings.',
                color: 'orange'
              },
              {
                icon: '🤝',
                title: 'Industry Connect',
                description: 'Bridge between academia and industry through internships, placements, and networking.',
                color: 'green'
              },
              {
                icon: '📚',
                title: 'Resource Sharing',
                description: 'Curated study materials, project guides, and peer-to-peer learning sessions.',
                color: 'blue'
              }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border ${getColorClasses(activity.color).border} shadow-lg hover:shadow-2xl transition-all group`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{activity.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{activity.title}</h3>
                <p className="text-slate-400 leading-relaxed">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ECE Section */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-400 text-sm font-medium border border-purple-500/30">
                Department of Excellence
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mt-6 mb-6">
                Electronics &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Communication
                </span>{' '}
                Engineering
              </h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                The ECE department stands at the forefront of technological innovation, nurturing minds 
                that will shape the future of communication, computing, and electronic systems.
              </p>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                With state-of-the-art laboratories, experienced faculty, and a curriculum aligned with 
                industry needs, we prepare students to excel in diverse fields from telecommunications 
                to semiconductor design.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Research Labs', value: '12+' },
                  { label: 'Faculty Members', value: '40+' },
                  { label: 'Publications', value: '200+' },
                  { label: 'Patents Filed', value: '15+' }
                ].map((item, index) => (
                  <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                      {item.value}
                    </div>
                    <div className="text-slate-400 text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 ring-2 ring-purple-500/30">
                <img
                  src={departmentPhoto}
                  alt="ECE Department"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
                    <p className="text-white font-semibold">ECE Department</p>
                    <p className="text-slate-400 text-sm">Where Innovation Meets Excellence</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 shadow-lg shadow-purple-500/50">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">EST.</div>
                  <div className="text-sm">Since 2019</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* President Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Meet Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                President
              </span>
            </h2>
            <p className="text-xl text-slate-400">Leading Communique with vision and dedication</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 p-8">
              {/* Profile Image - Compact */}
              <div className="relative flex-shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <img
                    src={presidentImage}
                    alt="President - Ashlesha Gaydhane"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
                  President
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-cyan-400 text-sm font-medium border border-cyan-500/30">
                    President 2025-26
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  Ashlesha Gaydhane
                </h3>
                <p className="text-cyan-400 font-medium mb-4">B.Tech ECE, Final Year</p>
                
                <blockquote className="text-slate-300 italic mb-4 border-l-4 border-cyan-500 pl-4 text-sm md:text-base">
                  "At Communique, we believe in the power of community. Every student has the potential 
                  to innovate and lead – our mission is to unlock that potential."
                </blockquote>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  Under Ashlesha's leadership, Communique continues to thrive as a vibrant ecosystem of learners, 
                  innovators, and future leaders, bridging academic knowledge with industry requirements.
                </p>

                {/* Social Links */}
                <div className="flex justify-center md:justify-start gap-3">
                  <a href="#" className="w-9 h-9 bg-slate-700/50 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-9 h-9 bg-slate-700/50 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="mailto:president@communique.com" className="w-9 h-9 bg-slate-700/50 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Our Core{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Values
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do at Communique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const colors = getColorClasses(value.color)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border ${colors.border} shadow-lg hover:shadow-2xl transition-all text-center group`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg ${colors.shadow} group-hover:scale-110 transition-transform`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Magazines Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Explore Communique{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Magazines
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Dive into our collection of student-curated technical magazines
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {magazines.map((magazine, index) => (
              <motion.a
                key={index}
                href={magazine.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.03, y: -10 }}
                className="group cursor-pointer block"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-cyan-500/10 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
                  {/* Magazine Cover */}
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={magazine.cover}
                      alt={magazine.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {magazine.year}
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{magazine.title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{magazine.description}</p>
                      
                      <span className="mt-4 inline-flex items-center text-cyan-400 font-medium hover:text-cyan-300 transition-colors group/btn">
                        Read Magazine
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 font-semibold">
              View All Magazines
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage


