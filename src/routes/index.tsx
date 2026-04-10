// @ts-nocheck
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Paintbrush, MapPin, Presentation, Briefcase, Bug, Mic, Image, Box, Video, AppWindow, Gamepad2, Megaphone, SearchCode, X, User, Lock, Gamepad, Mail, Instagram } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'
import { IntroLoader } from '../components/IntroLoader'
import { MiniGame } from '../components/MiniGame'

// No supabase client needed in index.tsx anymore as form is moved to register.tsx

export const Route = createFileRoute('/')({
  component: ZyphoriaHome,
})

// ─── Data ───────────────────────────────────────────────────────────────────

export type EventItem = {
  id: number;
  category: 'technical' | 'non-tech';
  name: string;
  description: string;
  team: string;
  icon: React.ElementType;
}

const events: EventItem[] = [
  // TECHNICAL
  { id: 1, category: 'technical', name: 'Reverse Engineering Arena', description: 'Analyze inputs, outputs, and hidden flags to uncover what the product is really doing.', team: '1–2', icon: SearchCode },
  { id: 2, category: 'technical', name: 'AI Prompt Engineering Battle', description: 'Design and refine prompts live to solve a real problem with smart AI use.', team: '3–4', icon: Bot },
  { id: 3, category: 'technical', name: 'UI/UX Redesign Challenge', description: 'Turn a poorly structured interface into a clean, visually appealing, user-friendly layout.', team: '1–2', icon: Paintbrush },
  { id: 4, category: 'technical', name: 'Tech Treasure Hunt', description: 'Follow clues, QR codes, and challenges to unlock the final treasure first.', team: '2 per team', icon: MapPin },
  { id: 5, category: 'technical', name: 'Research Pitch', description: 'Present an innovative, real-world research solution with clarity and confidence.', team: '1–2', icon: Presentation },
  { id: 6, category: 'technical', name: 'Build a Startup in 60 Min', description: 'Choose a problem on the spot, add the wild card twist, and pitch a startup fast.', team: '1–3', icon: Briefcase },
  { id: 7, category: 'technical', name: 'Bug Hunt', description: 'Fix syntax, runtime, and logic errors quickly using only Python IDE tools.', team: 'Individual', icon: Bug },
  // NON-TECHNICAL
  { id: 8, category: 'non-tech', name: 'Engineering Standup Comedy', description: 'Perform a clean engineering-themed act with good timing, stage presence, and audience engagement.', team: '1–2', icon: Mic },
  { id: 9, category: 'non-tech', name: 'Tech Meme War', description: 'Act memes silently, caption templates, and create funny tech memes on the spot.', team: '3–4', icon: Image },
  { id: 10, category: 'non-tech', name: 'Mystery Box Innovation', description: 'Solve surprise innovation tasks quickly using only the mystery box challenge items.', team: '3–4', icon: Box },
  { id: 11, category: 'non-tech', name: 'Reel Making Challenge', description: 'Create a tech-themed reel on-site with original content and strong presentation.', team: '1–4', icon: Video },
  { id: 12, category: 'non-tech', name: 'Tech Dum Charades', description: 'Act out tech terms, software names and programming concepts without speaking.', team: '2–4', icon: AppWindow },
  { id: 13, category: 'non-tech', name: 'E-Sports', description: 'Compete in popular gaming titles and prove your team is the strongest.', team: 'Duo', icon: Gamepad2 },
  { id: 14, category: 'non-tech', name: 'Marketing a Useless Product', description: 'Market a random useless product creatively with a quick pitch and fun presentation.', team: '2–3', icon: Megaphone },
]

interface EventGuidelines {
  instructions: string[]
  rules: string[]
  regulations: string[]
  evaluation: string[]
  contact?: {
    label: string
    name: string
    phone: string
  }
}

const eventGuidelines: Record<string, EventGuidelines> = {
  'Reverse Engineering Arena': {
    instructions: [
      'Analyze system inputs and outputs.',
      'Hunt technical flags and metadata.',
      'Redesign the product with fixes.',
    ],
    rules: [
      'Use only provided systems.',
      'No plagiarism or unauthorized tools.',
      'Maintain professional conduct.',
    ],
    regulations: [
      'Team size is 1–2 per team.',
      'There will be 3 rounds.',
      'All work must be completed on-site.',
    ],
    evaluation: [
      'Logic and clarity of analysis',
      'Creativity and realism of fixes',
      'Teamwork and methodology',
    ],
  },
  'AI Prompt Engineering Battle': {
    instructions: [
      'Select a problem to solve.',
      'Design and refine prompts live.',
      'Present your solution to the judges.',
    ],
    rules: [
      'Finish within 3 hours.',
      'Explain model choices clearly.',
      'No outside help allowed.',
    ],
    regulations: [
      'Team size is 3–4 per team.',
      'There will be 3 rounds.',
      'All work must be live and original.',
    ],
    evaluation: [
      'Strength of solution',
      'Quality of prompt design',
      'Smart use of AI agents',
    ],
  },
  'UI/UX Redesign Challenge': {
    instructions: [
      'Participants will be provided with a poorly designed interface at the start of the event.',
      'Redesign the interface to improve usability, clarity, and visual appeal.',
      'Prepare wireframes, mockups, or a prototype using the allowed tools.',
    ],
    rules: [
      'Allowed tools: Figma, Canva, Adobe XD, or paper sketching.',
      'Participation can be individual or in teams of 1–2 members.',
      'Complete the task within a time limit of 2 hours.',
    ],
    regulations: [
      'Team size is 1–2 members.',
      'All work should be created during the event period.',
      'Judge decisions are final.',
    ],
    evaluation: [
      'Design clarity and usability',
      'Creativity and visual appeal',
      'Presentation of the solution',
    ],
  },
  'Tech Treasure Hunt': {
    instructions: [
      'Answer sequential questions to advance.',
      'Find hidden QR codes for rapid quiz rounds.',
      'Complete the final vault task to win.',
    ],
    rules: [
      'No unfair means or external help.',
      'Do not damage any objects.',
      'Follow all instructions carefully.',
    ],
    regulations: [
      'Team size is 2 per team.',
      'There will be 3 rounds.',
      'All activity must be completed on-site.',
    ],
    evaluation: [
      'Time taken to complete tasks',
      'Logical problem-solving',
      'Order of completion',
    ],
  },
  'Research Pitch': {
    instructions: [
      'Deliver a 3-minute pitch followed by 2-minute Q&A.',
      'Use PPT or poster format.',
      'Bring your ID and registration proof.',
    ],
    rules: [
      'No plagiarism or copied ideas.',
      'Must be feasible and research-based.',
      'Mobile phone usage is prohibited.',
    ],
    regulations: [
      'Team size is 1–2 per team.',
      'There will be 1 round.',
      'All work and materials must be original.',
    ],
    evaluation: [
      'Innovation of the idea',
      'Clarity of problem and solution',
      'Judges’ final decision',
    ],
  },
  'Build a Startup in 60 Min': {
    instructions: [
      'Choose a problem statement on the spot.',
      'Incorporate the wild card twist into your idea.',
      'Pitch the idea and handle Q&A.',
    ],
    rules: [
      'No pre-prepared ideas.',
      'Follow the assigned constraints.',
      'Judges’ decision is final.',
    ],
    regulations: [
      'Team size is 1–3 per team.',
      'There will be 1 round.',
      'All ideas must be original and created during the event.',
    ],
    evaluation: [
      'Problem clarity',
      'Solution and unique value',
      'Pitch quality and teamwork',
    ],
  },
  'Bug Hunt': {
    instructions: [
      'Solve syntax and runtime errors first.',
      'Fix logical bugs in the later round.',
      'Use Python IDE only.',
    ],
    rules: [
      'No AI tools allowed.',
      'No internet access.',
      'Only Python v3.14.3 is permitted.',
    ],
    regulations: [
      'Individual participation only.',
      'There will be 2 rounds.',
      'All work must be completed on-site.',
    ],
    evaluation: [
      'Accuracy of debugging',
      'Speed of completion',
      'Ranking based on finishers',
    ],
  },
  'Engineering Standup Comedy': {
    instructions: [
      'Perform solo or duo comedy acts.',
      'Use English, Tamil, or Tanglish.',
      'Props and notes are optional.',
    ],
    rules: [
      'Keep humor clean and respectful.',
      'Be present before your turn.',
      'Beginners are welcome.',
    ],
    regulations: [
      'Team size is 1–2 members.',
      'There will be 2 rounds.',
      'Judges’ decisions are final.',
    ],
    evaluation: [
      'Humor and impact',
      'Stage presence and delivery',
      'Audience engagement',
    ],
  },
  'Tech Meme War': {
    instructions: [
      'Act memes silently for teammates to guess.',
      'Caption funny images and templates.',
      'Create memes instantly on the given topics.',
    ],
    rules: [
      'Respectful humor only.',
      'No plagiarism or copied memes.',
      'Use only allowed tools and websites.',
    ],
    regulations: [
      'Team size is 3–4 per team.',
      'There will be 3 rounds.',
      'Judges’ decisions are final.',
    ],
    evaluation: [
      'Originality of memes',
      'Humor and creativity',
      'Team collaboration',
    ],
  },
  'Mystery Box Innovation': {
    instructions: [
      'Complete mystery rounds within the allotted time limits.',
      'Use only one mobile phone per team.',
      'Follow coordinator instructions strictly.',
    ],
    rules: [
      'No communication with other teams.',
      'No malpractice or unfair means.',
      'Judges’ decision is final.',
    ],
    regulations: [
      'Team size is 3–4 per team.',
      'There will be 3 rounds.',
      'All work must be completed on-site.',
    ],
    evaluation: [
      'Timely completion of tasks',
      'Discipline and adherence to rules',
      'Creativity in solving challenges',
    ],
  },
  'Reel Making Challenge': {
    instructions: [
      'Submit a pre-recorded tech reel.',
      'Create an on-spot reel within campus.',
      'Use your own device for recording and editing.',
    ],
    rules: [
      'Original content only.',
      'No vulgar or offensive material.',
      'No external clips allowed.',
    ],
    regulations: [
      'Team size is 1–4 per team.',
      'There will be 2 rounds.',
      'All work must be completed on-site.',
    ],
    evaluation: [
      'Creativity',
      'Relevance to theme',
      'Technical quality and presentation',
    ],
  },
  'Tech Dum Charades': {
    instructions: [
      'Each team must have 2 to 4 members.',
      'The event consists of two rounds.',
      'Participants must follow all instructions given during the event.',
    ],
    rules: [
      'Round 1: Teams will have 90 seconds to find as many words as possible.',
      'Top 8 teams from Round 1 will qualify for the next round.',
      'In Round 2, teams must identify the single word provided.',
    ],
    regulations: [
      'Teams must not use any props or external help.',
      'Lip movements, gestures, or indicating letters/words are strictly prohibited.',
      'Any violation will lead to immediate disqualification.',
    ],
    evaluation: [
      'Teams are judged based on accuracy and time taken.',
      'The team that finds the correct word in the shortest time will be declared the winner.',
    ],
  },
  'E-Sports': {
    instructions: [
      'Register for one game and compete in Duo format.',
      'Follow official game rules and play fair.',
      'Be ready for scheduled matches and coordinate with your teammate.',
    ],
    rules: [
      'No emulators — mobile games only.',
      'No teaming with opponents or using cheats.',
      'Specific game rules apply based on the selected title.',
      'Coordinator decisions are final.',
    ],
    regulations: [
      'Team size is fixed at Duo.',
      'Participants must be present for their match times.',
      'Repeated rule violations may lead to disqualification.',
    ],
    evaluation: [
      'Match performance and results',
      'Team coordination',
      'Sportsmanship and fairness',
    ],
  },
  'Marketing a Useless Product': {
    instructions: [
      'Prepare a quick pitch with product name and tagline.',
      'Present the ad via skit, TV ad, or poster.',
      'Manage your time effectively.',
    ],
    rules: [
      'Respectful humor only.',
      'Props will be provided by us.',
      'Stick to the time limits.',
    ],
    regulations: [
      'Team size is 2–3 per team.',
      'There will be 2 rounds.',
      'Participants can bring props for the second round.',
    ],
    evaluation: [
      'Creativity and humor',
      'Confidence in delivery',
      'Marketing strategy',
    ],
  },
}

const defaultGuidelines: EventGuidelines = {
  instructions: [
    'Follow the event description and team size guidance.',
    'Work within the time limit and keep your event plan clear.',
    'Use only permitted tools and event-specific assets.',
  ],
  rules: [
    'No outside help or external resources unless explicitly allowed.',
    'Respect judges, other teams, and the event venue.',
    'Coordinator decisions are final.',
  ],
  regulations: [
    'All work must be original and created on-site.',
    'Participants must follow venue conduct and safety rules.',
    'Stay within the listed team size for the event.',
  ],
  evaluation: [
    'Overall quality and completion of the event task.',
    'Creativity, execution, and presentation.',
    'Adherence to the event rules.',
  ],
}

// ─── Countdown ───────────────────────────────────────────────────────────────

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now())
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])
  const total = Math.max(0, diff)
  const days = Math.floor(total / 86400000)
  const hours = Math.floor((total % 86400000) / 3600000)
  const mins = Math.floor((total % 3600000) / 60000)
  const secs = Math.floor((total % 60000) / 1000)
  return { days, hours, mins, secs }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

// ─── Stars ───────────────────────────────────────────────────────────────────

function StarField() {
  const stars = useRef<Array<{ x: number; y: number; size: number; dur: number; delay: number }>>([])
  if (stars.current.length === 0) {
    for (let i = 0; i < 60; i++) {
      stars.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.2 + 0.5,
        dur: Math.random() * 3.5 + 2,
        delay: Math.random() * 4,
      })
    }
  }
  return (
    <div className="star-field" aria-hidden="true">
      {stars.current.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0.15,
            ['--duration' as string]: `${s.dur}s`,
            ['--min-opacity' as string]: '0.03',
            ['--max-opacity' as string]: `${0.08 + Math.random() * 0.4}`,
            animationDelay: `${s.delay}s`,
            willChange: 'opacity',
          }}
        />
      ))}
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ background: scrolled ? undefined : 'transparent' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '64px' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span className="font-display nav-brand-text" style={{ fontSize: '18px', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
              ZYPH<span style={{ color: 'var(--accent)' }}>ORIA</span>
              <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '6px', fontWeight: 400, letterSpacing: '0.1em' }}>'26</span>
            </span>
          </span>
        </Link>

        {/* Center nav — desktop */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginLeft: 'auto', marginRight: '1rem' }} className="desktop-nav">
          {[
            { label: 'HOME', target: 'home' },
            { label: 'ABOUT', target: 'about' },
            { label: 'EVENTS', target: 'events' },
            { label: 'TEAM', target: 'organizers' }
          ].map((link) => (
            <a
              key={link.label}
              href={link.target === 'register' ? '/register.html' : `#${link.target}`}
              className="font-mono"
              style={{
                fontSize: '12px',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Register button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
          <a href="/organized.pdf" target="_blank" rel="noopener noreferrer" className="btn-filled" style={{ fontSize: '12px', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', marginRight: '1rem', textDecoration: 'none' }}>Rule Book</a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-mono mobile-menu-btn"
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '18px', display: 'none' }}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-side-drawer" style={{ background: 'var(--surface)', borderTop: '1px solid var(--stroke)', padding: '1rem 2rem' }}>
          {[
            { label: 'HOME', target: 'home' },
            { label: 'ABOUT', target: 'about' },
            { label: 'EVENTS', target: 'events' },
            { label: 'TEAM', target: 'organizers' }
          ].map((link) => {
            if (link.target === 'register') {
              return (
                <Link
                  key={link.label}
                  to="/register"
                  className="font-mono"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.75rem 0',
                    fontSize: '12px',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid var(--stroke)',
                  }}
                >
                  {link.label}
                </Link>
              )
            }
            return (
              <a
                key={link.label}
                href={`#${link.target}`}
                className="font-mono"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.75rem 0',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--stroke)',
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-brand-text {
            font-size: 15px !important;
          }

          .nav-register-btn {
            font-size: 10px !important;
            letter-spacing: 0.08em !important;
            padding: 0.45rem 0.8rem !important;
          }

          .desktop-nav { display: none !important; }

          .mobile-menu-btn { display: block !important; }

          .mobile-side-drawer {
            position: fixed;
            top: 64px;
            right: 0;
            width: min(78vw, 280px);
            height: calc(100vh - 64px);
            padding: 1rem 1.25rem !important;
            border-left: 1px solid var(--stroke);
            border-top: 0;
            box-shadow: -16px 0 40px rgba(0, 0, 0, 0.45);
            z-index: 110;
          }

          .mobile-side-drawer a {
            padding: 1rem 0 !important;
          }
        }
      `}</style>
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

// ── Easter Egg Modal ──────────────────────────────────────────────────────────
function EasterEggModal({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const [showGame, setShowGame] = useState(false)

  // ⚠️ ALL hooks must come before any conditional return
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    const g = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 120)
    }, 2800)
    document.body.style.overflow = 'hidden'
    return () => { clearTimeout(t); clearInterval(g); document.body.style.overflow = 'auto' }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 200)
  }

  // Conditional render AFTER all hooks
  if (showGame) return <MiniGame onClose={() => { setShowGame(false); handleClose() }} />

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        backgroundColor: 'rgba(8,8,12,0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: visible ? 1 : 0, transition: 'opacity 200ms ease',
        padding: '1rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '420px',
          background: '#0D0D14',
          border: '1px solid rgba(255,77,109,0.35)',
          boxShadow: '0 0 60px rgba(255,77,109,0.15), inset 0 0 40px rgba(255,77,109,0.04)',
          position: 'relative', padding: '3rem 2.5rem',
          textAlign: 'center',
          transform: visible ? 'scale(1)' : 'scale(0.92)',
          transition: 'transform 220ms cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* ASCII corners */}
        {['tl','tr','bl','br'].map(pos => (
          <span key={pos} className={`ascii-corner ${pos}`} style={{ color: '#FF4D6D', fontSize: '18px' }}>
            {pos === 'tl' ? '┌' : pos === 'tr' ? '┐' : pos === 'bl' ? '└' : '┘'}
          </span>
        ))}

        {/* Dim scanlines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,77,109,0.015) 3px, rgba(255,77,109,0.015) 4px)',
        }} />

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'none', border: 'none', color: '#4A4A62',
            cursor: 'pointer', display: 'flex',
          }}
        >
          <X size={18} />
        </button>

        {/* Lock icon */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <motion.div
            animate={{ y: [0, -6, 0], filter: ['drop-shadow(0 0 8px #FF4D6D)', 'drop-shadow(0 0 20px #FF4D6D)', 'drop-shadow(0 0 8px #FF4D6D)'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Lock size={56} strokeWidth={1.2} color="#FF4D6D" />
          </motion.div>
        </div>

        {/* Chip label */}
        <p className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#FF4D6D', marginBottom: '0.75rem', textTransform: 'uppercase', opacity: 0.7 }}>
          [ SECRET PROTOCOL DETECTED ]
        </p>

        {/* Glitchy title */}
        <h2
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(22px, 4vw, 28px)',
            color: '#EEEEF5',
            lineHeight: 1.2,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            filter: glitch ? 'blur(1.5px) brightness(1.4)' : 'none',
            transform: glitch ? 'translate(2px, -1px)' : 'none',
            transition: 'filter 60ms, transform 60ms',
            textShadow: '0 0 20px rgba(255,77,109,0.4)',
          }}
        >
          You&apos;ve Cracked<br />
          <span style={{ color: '#FF4D6D' }}>The Protocol.</span>
        </h2>

        <p className="font-mono" style={{ fontSize: '13px', color: '#6A6A8A', lineHeight: 1.6, marginBottom: '2rem' }}>
          An encrypted chamber has been unlocked.<br />
          Initiate the sequence — if you dare.
        </p>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="font-display uppercase tracking-widest"
          style={{
            width: '100%', padding: '1rem',
            background: 'rgba(255,77,109,0.1)',
            border: '1px solid #FF4D6D',
            color: '#FF4D6D',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e: any) => { e.currentTarget.style.background = '#FF4D6D'; e.currentTarget.style.color = '#08080C'; e.currentTarget.style.boxShadow = '0 0 24px rgba(255,77,109,0.5)' }}
          onMouseLeave={(e: any) => { e.currentTarget.style.background = 'rgba(255,77,109,0.1)'; e.currentTarget.style.color = '#FF4D6D'; e.currentTarget.style.boxShadow = 'none' }}
          onClick={() => setShowGame(true)}
        >
          <Gamepad size={16} />
          PLAY THE MINI-GAME
        </motion.button>

        <p className="font-mono" style={{ fontSize: '9px', color: '#3A3A5A', marginTop: '1.25rem', letterSpacing: '0.15em' }}>
          CLASSIFIED · ZYPHORIA '26 EASTER EGG
        </p>
      </div>
    </div>
  )
}

function Hero() {
  const target = new Date('2026-04-15T09:00:00+05:30')
  const { days, hours, mins, secs } = useCountdown(target)
  const unlockOrder = ['DAYS', 'HOURS', 'MINUTES', 'SECONDS']

  // 0 = lime default | 1 = red breach | 2 = lime "restored" | 3 = red urgent | 4 = modal
  const [eggPhase, setEggPhase] = useState<0|1|2|3|4>(0)
  const [unlockStep, setUnlockStep] = useState(0)

  // ── Per-phase colour tokens ────────────────────────────────────────────────
  const isRed  = eggPhase === 1 || eggPhase === 3
  const isLime = eggPhase === 0 || eggPhase === 2

  const hudAccent   = isRed  ? '#FF4D6D' : '#C8FA64'
  const hudBorder   = isRed  ? 'rgba(255,77,109,0.35)'  : 'rgba(200,250,100,0.18)'
  const hudGlow     = isRed  ? 'rgba(255,77,109,0.08)'  : 'rgba(200,250,100,0.06)'
  const hudGlowHov  = isRed  ? 'rgba(255,77,109,0.2)'   : 'rgba(200,250,100,0.12)'
  const hudBordHov  = isRed  ? 'rgba(255,77,109,0.7)'   : 'rgba(200,250,100,0.5)'
  const digitShadow = isRed  ? 'rgba(255,77,109,0.7)'   : 'rgba(200,250,100,0.6)'
  const sweepColor1 = isRed  ? '#FF4D6D'                : '#C8FA64'
  const sweepColor2 = isRed  ? 'rgba(255,77,109,0.6)'   : 'rgba(200,250,100,0.6)'
  const sweepColor3 = isRed  ? 'rgba(255,77,109,0.5)'   : 'rgba(200,250,100,0.5)'
  const sweepSpeed  = eggPhase === 3 ? 1.4 : isRed ? 2.5 : 4

  // ── Per-phase HUD text ────────────────────────────────────────────────────
  const hdrLeft = [
    'COUNTDOWN',          // 0
    'BREACH DETECTED',    // 1
    'RECOVERING...',      // 2
    '⚠ FINAL SEQUENCE',  // 3
    'COUNTDOWN',          // 4 (modal open, HUD behind)
  ][eggPhase]
  const hdrRight = [
    'ACTIVE',   // 0
    'CRACKED',  // 1
    'STABLE?',  // 2
    'EXECUTE',  // 3
    'ACTIVE',   // 4
  ][eggPhase]
  const statusText = [
    'AWAITING PROTOCOL',    // 0
    'CRACK THE PROTOCOL',   // 1
    'SYSTEM RESTORED?',     // 2
    'INITIATE NOW  ▶▶▶',   // 3
    'AWAITING PROTOCOL',    // 4
  ][eggPhase]

  const handleUnlockTap = (label: string) => {
    if (eggPhase === 4) return

    if (label === unlockOrder[unlockStep]) {
      if (unlockStep === unlockOrder.length - 1) {
        setEggPhase(4)
        setUnlockStep(0)
        return
      }

      setUnlockStep((step) => step + 1)
      return
    }

    setUnlockStep(0)
  }

  const handleHudClick = () => {
    if (eggPhase < 3) setEggPhase((p) => (p + 1) as 0|1|2|3|4)
    else if (eggPhase === 3) setEggPhase(4)
  }

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <StarField />

      {/* Easter Egg Modal */}
      {eggPhase === 4 && <EasterEggModal onClose={() => setEggPhase(0)} />}

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left — copy */}
          <div>
            <div className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2.5rem' }}>
              <span style={{ color: 'var(--accent)', fontSize: '10px' }}>◆</span>
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                CSE Symposium · RIT · April 15–16 2026
              </span>
            </div>

            <h1 className="font-display" style={{ fontSize: 'clamp(52px, 8vw, 110px)', lineHeight: 0.95, marginBottom: '1.5rem' }}>
              <span style={{ display: 'block' }}>INNOVATE.</span>
              <span style={{ display: 'block' }}>DOMINATE.</span>
              <span style={{ display: 'block', color: 'var(--accent)', textShadow: '0 0 40px rgba(200,250,100,0.3)' }}>ZYPHORIA.</span>
            </h1>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '6px 12px', background: 'rgba(200,250,100,0.08)', border: '1px solid rgba(200,250,100,0.3)', borderRadius: '4px', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🏆</span>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                  1ST PRIZE <span style={{ color: 'var(--accent)', fontWeight: 'bold', marginLeft: '4px' }}>₹1,000</span>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '6px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🥈</span>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                  2ND PRIZE <span style={{ color: '#E0E0E0', fontWeight: 'bold', marginLeft: '4px' }}>₹700</span>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '6px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🥉</span>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                  3RD PRIZE <span style={{ color: '#CD7F32', fontWeight: 'bold', marginLeft: '4px' }}>₹500</span>
                </span>
              </div>
            </div>

            <p className="font-mono" style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '480px' }}>
              14 events. 2 days. One department. No limits.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn-filled" style={{ fontSize: '12px', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', marginRight: '1rem', textDecoration: 'none' }}>REGISTER NOW</Link>
              <a href="#events" className="btn-filled" style={{ fontSize: '12px' }}>Explore Events</a>
            </div>
          </div>

          {/* Right — countdown terminal HUD */}
          <div
            className="countdown-block group"
            onClick={handleHudClick}
            style={{
              background: 'rgba(12, 12, 18, 0.4)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${hudBorder}`,
              padding: '2.5rem 2rem',
              minWidth: '320px',
              position: 'relative',
              boxShadow: `0 0 50px rgba(0,0,0,0.5), inset 0 0 20px ${hudGlow}`,
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = hudBordHov
              e.currentTarget.style.boxShadow = `0 0 50px rgba(0,0,0,0.5), inset 0 0 30px ${hudGlowHov}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = hudBorder
              e.currentTarget.style.boxShadow = `0 0 50px rgba(0,0,0,0.5), inset 0 0 20px ${hudGlow}`
            }}
          >
            {/* ASCII Corners */}
            {['tl','bl','tr','br'].map((pos, i) => (
              <span key={pos} className={`ascii-corner ${pos}`} style={{ color: hudAccent, transition: 'color 0.4s' }}>
                {['┌','└','┐','┘'][i]}
              </span>
            ))}

            {/* Tint flicker overlay — red phases only */}
            {isRed && (
              <motion.div
                animate={{ opacity: [0, eggPhase===3 ? 0.12 : 0.06, 0, 0.04, 0] }}
                transition={{ duration: eggPhase===3 ? 0.35 : 0.6, repeat: Infinity, repeatDelay: eggPhase===3 ? 0.8 : 2.2 }}
                style={{ position: 'absolute', inset: 0, background: '#FF4D6D', zIndex: 0, pointerEvents: 'none' }}
              />
            )}

            {/* Sweep scan lines */}
            <motion.div
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: sweepSpeed, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${sweepColor1}, transparent)`,
                opacity: 0.3, zIndex: 0,
              }}
            />
            <motion.div
              animate={{ top: ['110%', '-10%'] }}
              transition={{ duration: sweepSpeed * 1.4, repeat: Infinity, ease: 'linear', delay: 1.5 }}
              style={{
                position: 'absolute', left: 0, right: 0, height: '1px',
                background: `linear-gradient(90deg, transparent, ${sweepColor2}, transparent)`,
                opacity: 0.2, zIndex: 0,
              }}
            />
            <motion.div
              animate={{ left: ['-10%', '110%'] }}
              transition={{ duration: sweepSpeed * 1.2, repeat: Infinity, ease: 'linear', delay: 0.8 }}
              style={{
                position: 'absolute', top: 0, bottom: 0, width: '1px',
                background: `linear-gradient(180deg, transparent, ${sweepColor1}, transparent)`,
                opacity: 0.15, zIndex: 0,
              }}
            />
            <motion.div
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 3 }}
              style={{
                position: 'absolute', left: '20%', right: '20%', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                opacity: 0.15, transform: 'rotate(15deg)', zIndex: 0,
              }}
            />
            <motion.div
              animate={{ left: ['110%', '-10%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 2 }}
              style={{
                position: 'absolute', top: '30%', bottom: '30%', width: '1px',
                background: `linear-gradient(180deg, transparent, ${sweepColor3}, transparent)`,
                opacity: 0.12, zIndex: 0,
              }}
            />

            {/* Background dot grid */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.05,
              backgroundImage: `radial-gradient(${hudAccent} 1px, transparent 1px)`,
              backgroundSize: '16px 16px', zIndex: 0,
              transition: 'background-image 0.4s',
            }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Header bar */}
              <div
                className="font-mono flex items-center justify-between"
                style={{
                  fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.15em',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  paddingBottom: '1rem', marginBottom: '2rem',
                }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: eggPhase===3 ? 0.25 : isRed ? 0.5 : 2, repeat: Infinity }}
                    style={{ width: '6px', height: '6px', background: hudAccent, transition: 'background 0.4s' }}
                  />
                  <span>{hdrLeft}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: hudAccent, transition: 'color 0.4s' }}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: eggPhase===3 ? 0.2 : isRed ? 0.4 : 1, repeat: Infinity }}
                    style={{ width: '4px', height: '4px', borderRadius: '50%', background: hudAccent, boxShadow: `0 0 8px ${hudAccent}`, transition: 'background 0.4s, box-shadow 0.4s' }}
                  />
                  <span>{hdrRight}</span>
                </div>
              </div>

              {/* Digits */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                  { label: 'DAYS', value: pad(days) },
                  { label: 'HOURS', value: pad(hours) },
                  { label: 'MINUTES', value: pad(mins) },
                  { label: 'SECONDS', value: pad(secs) },
                ].map(({ label, value }) => (
                  <button
                    key={label}
                    onClick={() => handleUnlockTap(label)}
                    style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    <div
                      className="font-display"
                      style={{
                        position: 'relative', height: '1.2em', width: '100%',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        fontSize: 'clamp(32px, 6vw, 48px)', color: '#fff',
                        perspective: '800px', transformStyle: 'preserve-3d',
                      }}
                    >
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={value}
                          initial={{ rotateX: -90, z: -100, opacity: 0, filter: 'blur(8px)' }}
                          animate={{ rotateX: 0, z: 0, opacity: 1, filter: 'blur(0px)' }}
                          exit={{ rotateX: 90, z: 100, opacity: 0, filter: 'blur(8px)', position: 'absolute' }}
                          transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 1.2 }}
                          style={{ transformOrigin: 'center center', textShadow: `0 0 20px ${digitShadow}`, transition: 'text-shadow 0.4s' }}
                        >
                          {value}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div
                      className="font-mono flex items-center justify-center gap-2"
                      style={{ fontSize: '9px', color: isRed ? 'rgba(255,77,109,0.5)' : 'var(--text-muted)', letterSpacing: '0.2em', marginTop: '8px', transition: 'color 0.4s' }}
                    >
                      <span style={{ opacity: 0.3 }}>[</span>{label}<span style={{ opacity: 0.3 }}>]</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer status bar */}
              <div
                className="font-mono flex justify-between items-center"
                style={{
                  fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.1em',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '1rem', textTransform: 'uppercase',
                }}
              >
                <span>TARGET // ZYPHORIA '26</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={statusText}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    style={{ color: hudAccent }}
                  >
                    {statusText}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .countdown-block { min-width: unset !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Events ───────────────────────────────────────────────────────────────────

function EventCard({ event, onClick }: { event: EventItem; onClick: () => void }) {
  const isTech = event.category === 'technical'
  const pillClass = isTech ? 'pill-tech' : 'pill-nontech'
  const pillText = isTech ? 'Technical' : 'Non-Tech'
  
  const accentColor = isTech ? 'var(--accent)' : 'var(--danger)'
  const accentGlow = isTech ? 'var(--accent-glow)' : 'rgba(255, 77, 109, 0.15)'
  
  return (
    <div 
      className={`event-card group ${isTech ? 'event-tech' : 'event-nontech'}`}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        ['--card-accent' as string]: accentColor,
        ['--card-accent-glow' as string]: accentGlow,
      } as any}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <span className={pillClass}>
          {pillText}
        </span>
        <event.icon size={28} strokeWidth={1.5} color={accentColor} />
      </div>

      <h3
        className="event-name font-display"
        style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: '1.2' }}
      >
        {event.name}
      </h3>

      <p
        className="font-mono"
        style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >
        {event.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          className="font-mono"
          style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}
        >
          Team: {event.team}
        </span>
        <button
          className="btn-ghost font-mono"
          style={{ fontSize: '11px', padding: '0.4rem 0.75rem', border: 'none' }}
        >
          VIEW →
        </button>
      </div>
    </div>
  )
}

function EventModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  if (!event) return null

  const [opening, setOpening] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setOpening(false), 10)
    return () => clearTimeout(t)
  }, [])

  const handleClose = () => {
    setOpening(true) // trigger close animation
    setTimeout(onClose, 120)
  }

  const [selectedGame, setSelectedGame] = useState<'E-FOOTBALL' | 'FREEFIRE'>('E-FOOTBALL')
  const isTech = event.category === 'technical'
  const isEsports = event.name === 'E-Sports'
  const accentColor = isTech ? 'var(--accent)' : 'var(--danger)'
  const guidelines = eventGuidelines[event.name] ?? defaultGuidelines

  const eSportsOptions = ['E-FOOTBALL', 'FREEFIRE'] as const
  const selectedRules: Record<typeof eSportsOptions[number], string[]> = {
    'E-FOOTBALL': [
      'Mode: Duo (2v2)',
      '8 minutes per match',
      'Extra Time: ON',
      'Penalties: ON',
      'Substitutions: 5 players',
      'Knockout format applies',
      "Coordinator's decision is final",
    ],
    'FREEFIRE': [
      'Mode: Clash Squad (2v2)',
      'No rooftop camping allowed',
      'Grenades are not allowed',
      'Gun skins: OFF',
      'No hacks, panels, or third party tools',
      'Character skills: OFF',
      'No teaming with opponents',
      'Emulators are strictly prohibited (Mobile only)',
    ],
  }

  return (
    <div 
      className="modal-overlay" 
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(8, 8, 12, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: opening ? 0 : 1,
        transition: 'opacity 150ms ease'
      }}
    >
      <div 
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '80vh',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--stroke)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          transform: opening ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 180ms ease-out',
        }}
      >
        {/* ASCII corners */}
        <span className="ascii-corner tl" style={{ color: accentColor }}>┌</span>
        <span className="ascii-corner tr" style={{ color: accentColor }}>┐</span>
        <span className="ascii-corner bl" style={{ color: accentColor }}>└</span>
        <span className="ascii-corner br" style={{ color: accentColor }}>┘</span>

        {/* Header */}
        <div style={{ padding: '2rem 2rem 1.5rem', position: 'relative' }}>
          <button 
            onClick={handleClose}
            className="font-mono"
            style={{ 
              position: 'absolute', 
              top: '1.5rem', 
              right: '1.5rem', 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-muted)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }}
          >
            <X size={20} />
          </button>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <span className={isTech ? 'pill-tech' : 'pill-nontech'}>
              {isTech ? 'Technical' : 'Non-Tech'}
            </span>
          </div>
          
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              lineHeight: 1.1,
            }}
          >
            {event.name}
          </h2>
          <p className="font-mono" style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {event.description}
          </p>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--stroke)', width: '100%' }} />

        {/* Scrollable content */}
        <div style={{ padding: '2rem', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* INSTRUCTIONS */}
            <div>
              <h4 className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8888A8', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>INSTRUCTIONS</h4>
              <ul className="font-mono" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#EEEEF5', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {guidelines.instructions.map((instruction) => (
                  <li key={instruction} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span>{instruction}</li>
                ))}
              </ul>
            </div>

            {isEsports && (
              <div>
                <h4 className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8888A8', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>GAME OPTIONS</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {eSportsOptions.map((game) => (
                    <button
                      key={game}
                      onClick={() => setSelectedGame(game)}
                      className="font-mono"
                      style={{
                        border: selectedGame === game ? `1px solid ${accentColor}` : '1px solid #1E1E2E',
                        background: selectedGame === game ? accentColor : 'transparent',
                        color: selectedGame === game ? '#08080C' : '#EEEEF5',
                        padding: '0.85rem 1rem',
                        cursor: 'pointer',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        minWidth: '130px',
                      }}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* RULES */}
            <div>
              <h4 className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8888A8', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>RULES</h4>
              <ul className="font-mono" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#EEEEF5', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(isEsports ? selectedRules[selectedGame] : eventGuidelines[event.name]?.rules ?? defaultGuidelines.rules).map((rule) => (
                  <li key={rule} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span>{rule}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8888A8', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>REGULATIONS</h4>
              <ul className="font-mono" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#EEEEF5', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(eventGuidelines[event.name]?.regulations ?? defaultGuidelines.regulations).map((reg) => (
                  <li key={reg} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span>{reg}</li>
                ))}
              </ul>
            </div>

            {guidelines.contact && (
              <div>
                <h4 className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8888A8', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>{guidelines.contact.label}</h4>
                <div style={{ fontSize: '14px', color: '#EEEEF5', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span style={{ color: '#A5F14D', fontWeight: 700 }}>{guidelines.contact.name}</span>
                  <a href={`tel:${guidelines.contact.phone}`} style={{ color: accentColor, textDecoration: 'underline' }}>
                    {guidelines.contact.phone}
                  </a>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8888A8', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>EVALUATION</h4>
              <ul className="font-mono" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#EEEEF5', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(eventGuidelines[event.name]?.evaluation ?? defaultGuidelines.evaluation).map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--stroke)', width: '100%' }} />

        {/* Footer CTA */}
        <div style={{ padding: '1.5rem 2rem' }}>
          <button 
            className="font-mono"
            style={{ 
              width: '100%', 
              backgroundColor: accentColor, 
              color: 'var(--bg)', 
              border: 'none', 
              padding: '1rem', 
              fontSize: '14px', 
              fontWeight: 700, 
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.boxShadow = `0 0 20px ${accentColor}`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = accentColor;
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => {
              navigate({
                to: '/register',
                search: isEsports ? { event: event.name, eSportsGame: selectedGame } : { event: event.name },
              })
              handleClose();
            }}
          >
            REGISTER FOR THIS EVENT →
          </button>
        </div>
      </div>
    </div>
  )
}

function EventsSection() {
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null)
  
  const techEvents = events.filter(e => e.category === 'technical')
  const nonTechEvents = events.filter(e => e.category === 'non-tech')

  useEffect(() => {
    if (activeEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; }
  }, [activeEvent])

  return (
    <section id="events" className="section-padding" style={{ background: 'var(--bg)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        
        {/* Technical Section */}
        <div>
          <div style={{ marginBottom: '3rem' }}>
            <p className="font-mono font-bold" style={{ color: 'var(--accent)', fontSize: 'clamp(18px, 3vw, 24px)', letterSpacing: '0.15em', textTransform: 'uppercase', textShadow: '0 0 20px rgba(200,250,100,0.5)' }}>[ TECHNICAL ] — 15TH APRIL</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: 'var(--text-primary)' }}>
              Prove Your Skill.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'var(--stroke)',
            }}
            className="events-grid"
          >
            {techEvents.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => setActiveEvent(event)} />
            ))}
            {/* Filler cells to complete row if needed */}
            <div style={{ background: 'var(--bg)' }} />
            <div style={{ background: 'var(--bg)' }} />
          </div>
        </div>

        {/* Non-Technical Section */}
        <div>
          <div style={{ marginBottom: '3rem' }}>
            <p className="font-mono font-bold" style={{ color: 'var(--danger)', fontSize: 'clamp(18px, 3vw, 24px)', letterSpacing: '0.15em', textTransform: 'uppercase', textShadow: '0 0 20px rgba(255,77,109,0.45)' }}>[ NON-TECHNICAL ] — 16TH APRIL</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: 'var(--text-primary)' }}>
              Unleash the Chaos.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'var(--stroke)',
            }}
            className="events-grid"
          >
            {nonTechEvents.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => setActiveEvent(event)} />
            ))}
            {/* Filler cells to complete row if needed */}
            <div style={{ background: 'var(--bg)' }} />
            <div style={{ background: 'var(--bg)' }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .events-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      
      {activeEvent && <EventModal event={activeEvent} onClose={() => setActiveEvent(null)} />}
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        <div style={{ textAlign: 'left' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: 'var(--text-primary)', marginBottom: '2rem' }}>
            The Future, Compiled.
          </h2>
          <p className="font-mono text-base text-[#8888A8] max-w-[800px] leading-relaxed">
            Zyphoria'26 is an International Symposium organized by the Department of Computer Science and Engineering at Rajalakshmi Institute of Technology (RIT) in association with iDataMind. The symposium brings together students, innovators, and technology enthusiasts from various institutions to participate in engaging technical and non-technical competitions, encouraging creativity, innovation, and collaboration.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Card 1 */}
          <div className="group" style={{ background: '#101018', border: '1px solid #1E1E2E', padding: '2rem', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.borderLeft = '3px solid var(--accent)'; e.currentTarget.style.background = '#16161F'; }} onMouseLeave={e => { e.currentTarget.style.borderLeft = '1px solid #1E1E2E'; e.currentTarget.style.background = '#101018'; }}>
            <div className="font-display text-[24px] mb-4 font-bold" style={{ color: 'var(--accent)' }}>⚡ · INNOVATION</div>
            <p className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>Experience cutting-edge technology showcases, AI-driven challenges, and hands-on competitions curated by iDataMind and CSE faculty.</p>
          </div>
          {/* Card 2 */}
          <div className="group" style={{ background: '#101018', border: '1px solid #1E1E2E', padding: '2rem', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.borderLeft = '3px solid var(--accent)'; e.currentTarget.style.background = '#16161F'; }} onMouseLeave={e => { e.currentTarget.style.borderLeft = '1px solid #1E1E2E'; e.currentTarget.style.background = '#101018'; }}>
            <div className="font-display text-[24px] mb-4 font-bold" style={{ color: 'var(--accent)' }}>⚔ · COMPETITION</div>
            <p className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>Battle the brightest minds across institutions in 14+ technical and non-technical events — from coding duels to creative showdowns.</p>
          </div>
          {/* Card 3 */}
          <div className="group" style={{ background: '#101018', border: '1px solid #1E1E2E', padding: '2rem', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.borderLeft = '3px solid var(--accent)'; e.currentTarget.style.background = '#16161F'; }} onMouseLeave={e => { e.currentTarget.style.borderLeft = '1px solid #1E1E2E'; e.currentTarget.style.background = '#101018'; }}>
            <div className="font-display text-[24px] mb-4 font-bold" style={{ color: 'var(--accent)' }}>🌐 · COMMUNITY</div>
            <p className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>Connect with industry experts, researchers, and fellow tech enthusiasts from institutions worldwide at RIT's flagship international symposium.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Organizers ───────────────────────────────────────────────────────────────

function OrganizersSection() {
  const sectionLabelStyle = { fontSize: '11px', textTransform: 'uppercase' as const, color: '#8888A8', letterSpacing: '0.15em', marginBottom: '1rem' };
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' })
  const [feedbackErrors, setFeedbackErrors] = useState<Record<string, string>>({})

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errs: Record<string, string> = {}
    if (!feedback.name.trim()) errs.name = 'Not filled'
    if (!feedback.email.trim()) errs.email = 'Not filled'
    if (!feedback.message.trim()) errs.message = 'Not filled'
    setFeedbackErrors(errs)

    if (Object.keys(errs).length > 0) {
      toast.error('Details not filled')
      return
    }

    const subject = encodeURIComponent('Zyphoria Website Feedback')
    const body = encodeURIComponent(
      `Name: ${feedback.name || 'Anonymous'}\nEmail: ${feedback.email || 'Not provided'}\n\nFeedback:\n${feedback.message}`
    )

    const cc = encodeURIComponent('jdnk5607@gmail.com')

    window.location.href = `mailto:zyphoria26.cse@gmail.com?cc=${cc}&subject=${subject}&body=${body}`
  }

  return (
    <section id="organizers" className="section-padding" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4vw, 52px)', color: 'var(--text-primary)' }}>
            Organizers & Coordinators.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {/* Organizers */}
          <div>
            <p className="font-mono" style={sectionLabelStyle}>ORGANIZERS</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Dr. S. Uma', role: 'HOD / CSE' },
                { name: 'Dr. N. Indumathi', role: 'AP / CSE' }
              ].map(p => (
                <div key={p.name} className="flex items-center gap-4 p-4 group" style={{ background: '#101018', border: '1px solid #1E1E2E', transition: 'all 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#1E1E2E'}>
                  <div className="w-12 h-12 flex items-center justify-center transition-colors" style={{ background: 'rgba(200,250,100,0.05)', border: '1px solid var(--accent)' }}>
                    <User size={20} color="var(--accent)" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[18px] text-[#EEEEF5]">{p.name}</div>
                    <div className="font-mono text-[11px] text-[#8888A8] uppercase">{p.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty */}
          <div>
            <p className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8888A8', letterSpacing: '0.15em', marginBottom: '1rem' }}>FACULTY COORDINATORS</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Ms. J. Sindhuja', role: 'AP / CSE' },
                { name: 'Mr. P. Murugan', role: 'AP / CSE' },
                { name: 'Ms. Bharathy', role: 'AP / CSE' }
              ].map(p => (
                <div key={p.name} className="flex items-center gap-4 p-4 group" style={{ background: '#101018', border: '1px solid #1E1E2E', transition: 'all 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#1E1E2E'}>
                  <div className="w-12 h-12 flex items-center justify-center transition-colors" style={{ background: 'rgba(200,250,100,0.05)', border: '1px solid var(--accent)' }}>
                    <User size={20} color="var(--accent)" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[18px] text-[#EEEEF5]">{p.name}</div>
                    <div className="font-mono text-[11px] text-[#8888A8] uppercase">{p.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Coordinators */}
          <div>
            <p className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8888A8', letterSpacing: '0.15em', marginBottom: '1rem' }}>STUDENT COORDINATORS</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Divyadarshini K", phone: "8056120505" },
                { name: "Gajalakshmi C", phone: "9994335576" },
                { name: "M. S. Sathish", phone: "9384579988" },
                { name: "S. Sanjit Kumar", phone: "8667509464" },
              ].map(s => (
                <div key={s.name} className="flex items-center gap-4 p-4 group" style={{ background: '#101018', border: '1px solid #1E1E2E', transition: 'all 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#1E1E2E'}>
                  <div className="w-12 h-12 flex items-center justify-center transition-colors" style={{ background: 'rgba(200,250,100,0.05)', border: '1px solid var(--accent)' }}>
                    <User size={20} color="var(--accent)" />
                  </div>
                  <div>
                    <div className="font-display student-coordinator-name font-bold text-[16px] text-[#EEEEF5]">{s.name}</div>
                    <a href={`tel:+91${s.phone}`} className="font-mono text-[11px] text-[#8888A8] hover:text-[#C8FA64] transition-colors" style={{ textDecoration: 'none' }}>
                      {s.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-feedback-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '0.5rem' }}>
            <div className="feedback-panel" style={{ padding: '1.75rem', border: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(180deg, rgba(14,14,24,0.96), rgba(10,10,16,0.96))', borderRadius: '22px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
              <p className="font-mono feedback-title" style={{ fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                SHARE YOUR THOUGHTS
              </p>
              <h3 className="font-display" style={{ fontSize: 'clamp(30px, 4vw, 48px)', color: 'var(--text-primary)', marginBottom: '1.35rem', lineHeight: 0.95 }}>
                FEEDBACK
              </h3>

              <form onSubmit={handleFeedbackSubmit} style={{ display: 'grid', gap: '0.95rem', maxWidth: '720px' }}>
                <div>
                  <label className="font-display feedback-label" style={{ display: 'block', fontSize: '16px', color: 'var(--accent)', marginBottom: '0.3rem' }}>
                    Name
                  </label>
                  <input
                    value={feedback.name}
                    onChange={(e) => {
                      const value = e.target.value
                      setFeedback((prev) => ({ ...prev, name: value }))
                      if (value.trim()) {
                        setFeedbackErrors((prev) => ({ ...prev, name: '' }))
                      }
                    }}
                    placeholder="Enter your name"
                    className="font-mono feedback-input"
                    style={{
                      width: '100%',
                      background: '#0B0B10',
                      border: feedbackErrors.name ? '1px solid #FF4D6D' : '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--accent)',
                      padding: '0.95rem 1rem',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  {feedbackErrors.name && <div className="text-[#FF4D6D] text-[10px] mt-1.5 font-mono">{feedbackErrors.name}</div>}
                </div>

                <div>
                  <label className="font-display feedback-label" style={{ display: 'block', fontSize: '16px', color: 'var(--accent)', marginBottom: '0.3rem' }}>
                    Mail
                  </label>
                  <input
                    value={feedback.email}
                    onChange={(e) => {
                      const value = e.target.value
                      setFeedback((prev) => ({ ...prev, email: value }))
                      if (value.trim()) {
                        setFeedbackErrors((prev) => ({ ...prev, email: '' }))
                      }
                    }}
                    placeholder="Enter your email"
                    type="email"
                    className="font-mono feedback-input"
                    style={{
                      width: '100%',
                      background: '#0B0B10',
                      border: feedbackErrors.email ? '1px solid #FF4D6D' : '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--accent)',
                      padding: '0.95rem 1rem',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  {feedbackErrors.email && <div className="text-[#FF4D6D] text-[10px] mt-1.5 font-mono">{feedbackErrors.email}</div>}
                </div>

                <div>
                  <label className="font-display feedback-label" style={{ display: 'block', fontSize: '16px', color: 'var(--accent)', marginBottom: '0.3rem' }}>
                    Message
                  </label>
                  <textarea
                    value={feedback.message}
                    onChange={(e) => {
                      const value = e.target.value
                      setFeedback((prev) => ({ ...prev, message: value }))
                      if (value.trim()) {
                        setFeedbackErrors((prev) => ({ ...prev, message: '' }))
                      }
                    }}
                    placeholder="Write your feedback here..."
                    rows={4}
                    className="font-mono feedback-input feedback-textarea"
                    style={{
                      width: '100%',
                      background: '#0B0B10',
                      border: feedbackErrors.message ? '1px solid #FF4D6D' : '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--accent)',
                      padding: '0.95rem 1rem',
                      fontSize: '13px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                  {feedbackErrors.message && <div className="text-[#FF4D6D] text-[10px] mt-1.5 font-mono">{feedbackErrors.message}</div>}
                </div>

                <button
                  type="submit"
                  className="btn-filled"
                  style={{ fontSize: '12px', width: '170px', justifyContent: 'center', marginTop: '1rem' }}
                >
                  Send Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--stroke)', paddingTop: '1.25rem', paddingBottom: '0.5rem' }}>
      <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span className="font-display" style={{ fontSize: '42px', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
                ZYPH<span style={{ color: 'var(--accent)' }}>ORIA</span>
                <span className="font-mono" style={{ fontSize: '16px', color: 'var(--text-muted)', marginLeft: '8px', fontWeight: 400, letterSpacing: '0.1em' }}>'26</span>
              </span>
            </span>
          </div>

          <div style={{ height: '1px', width: '100%', background: 'var(--stroke)', marginBottom: '1rem' }} />

          <p className="font-mono" style={{ color: '#A3A3BE', fontSize: '14px', lineHeight: 1.5, marginBottom: '0.35rem' }}>
            The annual CSE Symposium of
          </p>
          <p className="font-mono" style={{ color: '#A3A3BE', fontSize: '14px', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            Rajalakshmi Institute of Technology
          </p>
          <p style={{ color: 'var(--accent)', fontFamily: 'Geist Mono, monospace', fontSize: '14px', letterSpacing: '0.03em', lineHeight: 1.35 }}>
            In association with iDataMind · April 15-16, 2026
          </p>
        </div>

        <div className="footer-socials" style={{ textAlign: 'center', paddingTop: '1.9rem' }}>
          <p className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '14px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.9rem' }}>
            Socials
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <a
              href="https://www.instagram.com/zyphoria_26_rit?igsh=MXNrMGtuc2ppbGUwcw=="
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', border: '1px solid var(--stroke)', background: 'rgba(16,16,24,0.8)' }}
              aria-label="Instagram"
            >
              <img src="/insta1.png" alt="Instagram" style={{ width: '32px', height: '32px', objectFit: 'contain' }} draggable={false} />
            </a>
            <a
              href="mailto:zyphoria26.cse@gmail.com"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', border: '1px solid var(--stroke)', background: 'rgba(16,16,24,0.8)' }}
              aria-label="Gmail"
            >
              <img src="/gmail.png" alt="Gmail" style={{ width: '32px', height: '32px', objectFit: 'contain' }} draggable={false} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-socials {
          margin-right: 6rem;
        }

        @media (max-width: 980px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }

          .footer-socials {
            margin-right: 0;
          }
        }
      `}</style>

      <div
        className="font-mono"
        style={{
          marginTop: '0.6rem',
          paddingTop: '0.6rem',
          borderTop: '1px solid var(--stroke)',
          textAlign: 'center',
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        © ZYPHORIA '26 · CSE DEPARTMENT · RAJALAKSHMI INSTITUTE OF TECHNOLOGY
      </div>
    </footer>
  )
}


// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg)', borderTop: '1px solid var(--stroke)' }}>
      <div className="container text-center" style={{ paddingTop: '2rem' }}>
        <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Ready to Compete?
        </h2>
        <p className="font-mono text-sm sm:text-base text-[#8888A8] mb-8">
          April 15–16, 2026 · Rajalakshmi Institute of Technology
        </p>
        <Link 
          to="/register" 
          className="btn-filled" 
          style={{ padding: '1rem 3rem', fontSize: '12px', marginTop: '1rem' }}
        >
          REGISTER NOW
        </Link>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ZyphoriaHome() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    setShowIntro(window.sessionStorage.getItem('intro_seen') !== 'true')
  }, [])

  return (
    <div className="relative min-h-screen">
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          border: '1px solid var(--stroke)',
          fontFamily: 'Geist Mono, monospace',
          fontSize: '13px'
        }
      }} />

      <IntroLoader showIntro={showIntro} onComplete={() => setShowIntro(false)} />

      <motion.div
        initial={false}
        animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 8 : 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative"
      >
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <EventsSection />
          <CtaBanner />
          <OrganizersSection />
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}
