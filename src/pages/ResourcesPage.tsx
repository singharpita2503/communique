import { useState } from 'react'
import type { ReactElement } from 'react'
import { motion } from 'framer-motion'

// Types for resources
interface Resource {
  id: number
  title: string
  description: string
  iconType: string
  link?: string
  tags?: string[]
}

// Icon Component
function ResourceIcon({ type, className = "w-6 h-6" }: { type: string; className?: string }) {
  const icons: { [key: string]: ReactElement } = {
    chip: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    signal: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    antenna: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    cog: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    bolt: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    desktop: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    academic: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    book: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    globe: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    home: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    robot: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    cloud: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    clipboard: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    wifi: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    hand: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
    plug: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    fire: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    controller: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    cube: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    beaker: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    code: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    palette: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    brain: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    sparkles: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    eye: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    chat: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    mobile: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    folder: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    document: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    video: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    rocket: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  }
  
  return icons[type] || icons.document
}

// Previous Year Questions Data
const pyqData: Resource[] = [
  { id: 1, title: 'Digital Electronics', description: 'PYQs from 2019-2024', iconType: 'chip', tags: ['3rd Sem', '4th Sem'] },
  { id: 2, title: 'Signals & Systems', description: 'Complete question bank', iconType: 'signal', tags: ['4th Sem'] },
  { id: 3, title: 'Communication Systems', description: 'Theory + Numericals', iconType: 'antenna', tags: ['5th Sem'] },
  { id: 4, title: 'Microprocessors', description: '8085/8086 PYQs', iconType: 'cog', tags: ['4th Sem'] },
  { id: 5, title: 'VLSI Design', description: 'All previous papers', iconType: 'bolt', tags: ['6th Sem'] },
  { id: 6, title: 'Embedded Systems', description: 'Lab + Theory', iconType: 'desktop', tags: ['7th Sem'] },
]

// Courses Data
const coursesData: Resource[] = [
  { id: 1, title: 'NPTEL - Digital Circuits', description: 'IIT Madras course on digital logic design', iconType: 'academic', tags: ['Free', 'Certificate'] },
  { id: 2, title: 'Coursera - Electronics', description: 'Georgia Tech specialization', iconType: 'book', tags: ['Paid', 'Popular'] },
  { id: 3, title: 'MIT OCW - Signals', description: 'MIT OpenCourseWare lectures', iconType: 'academic', tags: ['Free', 'Advanced'] },
  { id: 4, title: 'Udemy - PCB Design', description: 'Complete Altium Designer course', iconType: 'cube', tags: ['Paid', 'Practical'] },
  { id: 5, title: 'edX - IoT Fundamentals', description: 'Cisco Networking Academy', iconType: 'globe', tags: ['Free', 'Certificate'] },
  { id: 6, title: 'LinkedIn Learning - MATLAB', description: 'Engineering simulations', iconType: 'chart', tags: ['Paid', 'Tool'] },
]

// Projects Data
const projectsData: Resource[] = [
  { id: 1, title: 'Smart Home Automation', description: 'IoT-based home control system using ESP32', iconType: 'home', tags: ['IoT', 'Hardware'] },
  { id: 2, title: 'Voice Controlled Robot', description: 'Arduino + Bluetooth robot', iconType: 'robot', tags: ['Robotics', 'Arduino'] },
  { id: 3, title: 'Weather Station', description: 'Real-time monitoring with sensors', iconType: 'cloud', tags: ['IoT', 'Sensors'] },
  { id: 4, title: 'RFID Attendance System', description: 'Automated attendance tracking', iconType: 'clipboard', tags: ['RFID', 'Database'] },
  { id: 5, title: 'Signal Generator', description: 'Function generator using 555 timer', iconType: 'wifi', tags: ['Analog', 'Hardware'] },
  { id: 6, title: 'Gesture Control System', description: 'Hand gesture recognition', iconType: 'hand', tags: ['ML', 'OpenCV'] },
]

// Hardware Tutorials Data
const hardwareTutorials: Resource[] = [
  { id: 1, title: 'PCB Design Basics', description: 'From schematic to fabrication', iconType: 'plug', tags: ['Beginner'] },
  { id: 2, title: 'Soldering Techniques', description: 'SMD and through-hole soldering', iconType: 'fire', tags: ['Practical'] },
  { id: 3, title: 'Arduino Masterclass', description: 'Complete microcontroller guide', iconType: 'controller', tags: ['Arduino'] },
  { id: 4, title: 'Raspberry Pi Projects', description: 'From setup to advanced projects', iconType: 'cube', tags: ['RPi'] },
  { id: 5, title: 'FPGA Programming', description: 'Verilog and VHDL basics', iconType: 'chip', tags: ['Advanced'] },
  { id: 6, title: 'Oscilloscope Usage', description: 'Lab equipment tutorials', iconType: 'beaker', tags: ['Lab'] },
]

// Software Tutorials Data
const softwareTutorials: Resource[] = [
  { id: 1, title: 'MATLAB Essentials', description: 'Signal processing & simulations', iconType: 'chart', tags: ['Simulation'] },
  { id: 2, title: 'Python for ECE', description: 'Automation and data analysis', iconType: 'code', tags: ['Programming'] },
  { id: 3, title: 'LTspice Simulations', description: 'Circuit simulation software', iconType: 'bolt', tags: ['Free'] },
  { id: 4, title: 'Proteus Design Suite', description: 'Schematic & PCB design', iconType: 'palette', tags: ['Design'] },
  { id: 5, title: 'LabVIEW Basics', description: 'Graphical programming', iconType: 'beaker', tags: ['NI'] },
  { id: 6, title: 'Embedded C Programming', description: 'Microcontroller programming', iconType: 'desktop', tags: ['Coding'] },
]

// AI Types Data
const aiTypesData: Resource[] = [
  { id: 1, title: 'Machine Learning', description: 'Supervised, unsupervised, and reinforcement learning algorithms', iconType: 'brain', tags: ['Core AI'] },
  { id: 2, title: 'Deep Learning', description: 'Neural networks, CNNs, RNNs, and transformers', iconType: 'sparkles', tags: ['Advanced'] },
  { id: 3, title: 'Computer Vision', description: 'Image recognition, object detection, OpenCV', iconType: 'eye', tags: ['Visual AI'] },
  { id: 4, title: 'Natural Language Processing', description: 'Text analysis, chatbots, language models', iconType: 'chat', tags: ['NLP'] },
  { id: 5, title: 'Generative AI', description: 'GANs, diffusion models, creative AI', iconType: 'palette', tags: ['Creative'] },
  { id: 6, title: 'Edge AI & TinyML', description: 'AI on microcontrollers and embedded devices', iconType: 'mobile', tags: ['Embedded'] },
]

// Tab Component
function TabButton({ active, onClick, children, color, icon }: { active: boolean; onClick: () => void; children: React.ReactNode; color: string; icon: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
        active 
          ? `bg-gradient-to-r ${color} text-white shadow-lg` 
          : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
      }`}
    >
      <ResourceIcon type={icon} className="w-4 h-4" />
      {children}
    </button>
  )
}

// Resource Card Component
function ResourceCard({ resource, color, delay }: { resource: Resource; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-${color}-500/50 transition-all duration-300 cursor-pointer group`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 flex items-center justify-center text-${color}-400 group-hover:scale-110 transition-transform duration-300`}>
          <ResourceIcon type={resource.iconType} className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-cyan-400 transition-colors">
            {resource.title}
          </h3>
          <p className="text-slate-400 text-sm mb-3">{resource.description}</p>
          {resource.tags && (
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-slate-700/50 text-xs text-slate-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Section Component
function ResourceSection({ 
  title, 
  subtitle, 
  resources, 
  color, 
  iconType,
  gradient 
}: { 
  title: string
  subtitle: string
  resources: Resource[]
  color: string
  iconType: string
  gradient: string
}) {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-8"
      >
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
          <ResourceIcon type={iconType} className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-slate-400">{subtitle}</p>
        </div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <ResourceCard 
            key={resource.id} 
            resource={resource} 
            color={color}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  )
}

function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('academic')

  const tabs = [
    { id: 'academic', name: 'Academic Materials', icon: 'book', color: 'from-cyan-500 to-cyan-600' },
    { id: 'courses', name: 'Courses', icon: 'academic', color: 'from-purple-500 to-purple-600' },
    { id: 'projects', name: 'Projects', icon: 'rocket', color: 'from-pink-500 to-pink-600' },
    { id: 'tutorials', name: 'Tutorials', icon: 'video', color: 'from-orange-500 to-orange-600' },
    { id: 'ai', name: 'AI & ML', icon: 'brain', color: 'from-green-500 to-green-600' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-5"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-cyan-400 text-sm font-medium border border-cyan-500/30 flex items-center gap-2">
                <ResourceIcon type="book" className="w-4 h-4" />
                Knowledge Hub
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Resources{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                Center
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Your one-stop destination for academic materials, courses, projects, tutorials, and everything you need to excel in ECE
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: 'Resources', value: '100+', icon: 'cube' },
              { label: 'Categories', value: '5', icon: 'folder' },
              { label: 'PYQ Papers', value: '50+', icon: 'document' },
              { label: 'Tutorials', value: '30+', icon: 'video' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-700/50 flex items-center justify-center text-cyan-400">
                  <ResourceIcon type={stat.icon} className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                color={tab.color}
                icon={tab.icon}
              >
                {tab.name}
              </TabButton>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'academic' && (
              <ResourceSection
                title="Previous Year Questions"
                subtitle="Comprehensive collection of exam papers"
                resources={pyqData}
                color="cyan"
                iconType="book"
                gradient="from-cyan-500 to-cyan-600"
              />
            )}

            {activeTab === 'courses' && (
              <ResourceSection
                title="Important Courses"
                subtitle="Curated online learning resources"
                resources={coursesData}
                color="purple"
                iconType="academic"
                gradient="from-purple-500 to-purple-600"
              />
            )}

            {activeTab === 'projects' && (
              <ResourceSection
                title="Project Ideas"
                subtitle="Hands-on projects for practical learning"
                resources={projectsData}
                color="pink"
                iconType="rocket"
                gradient="from-pink-500 to-pink-600"
              />
            )}

            {activeTab === 'tutorials' && (
              <div>
                <ResourceSection
                  title="Hardware Tutorials"
                  subtitle="Learn electronics and hardware design"
                  resources={hardwareTutorials}
                  color="orange"
                  iconType="cog"
                  gradient="from-orange-500 to-orange-600"
                />
                <ResourceSection
                  title="Software Tutorials"
                  subtitle="Master essential software tools"
                  resources={softwareTutorials}
                  color="blue"
                  iconType="code"
                  gradient="from-blue-500 to-blue-600"
                />
              </div>
            )}

            {activeTab === 'ai' && (
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-12 text-center"
                >
                  <div className="inline-block p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20 mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                        <ResourceIcon type="brain" className="w-6 h-6" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">Explore AI & Machine Learning</h3>
                    </div>
                    <p className="text-slate-400">Discover the fascinating world of Artificial Intelligence</p>
                  </div>
                </motion.div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiTypesData.map((ai, index) => (
                    <motion.div
                      key={ai.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -8 }}
                      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <ResourceIcon type={ai.iconType} className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                        {ai.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                        {ai.description}
                      </p>
                      {ai.tags && (
                        <div className="flex flex-wrap gap-2">
                          {ai.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* AI Learning Path */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-16 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-2xl p-8 border border-green-500/20"
                >
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                      <ResourceIcon type="rocket" className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">AI Learning Path</h3>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    {['Python Basics', 'Math & Stats', 'Machine Learning', 'Deep Learning', 'Specialization'].map((step, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                          {i + 1}
                        </div>
                        <span className="ml-2 text-white font-medium">{step}</span>
                        {i < 4 && <span className="mx-4 text-green-500">→</span>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-cyan-500/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <ResourceIcon type="sparkles" className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Have Resources to Share?</h3>
              </div>
              <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                Help your fellow students by contributing study materials, notes, or project ideas to our resource library
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30 font-semibold">
                Contribute Resources
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ResourcesPage
