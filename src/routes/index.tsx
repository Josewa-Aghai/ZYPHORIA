// @ts-nocheck
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Paintbrush, MapPin, Presentation, Briefcase, Bug, Mic, Image, Box, Video, AppWindow, Gamepad2, Megaphone, SearchCode, X, User, Phone, Lock, Gamepad, Mail, Instagram } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
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
  { id: 1, category: 'technical', name: 'Reverse Engineering Arena', description: 'Decode and reverse-engineer software or logic puzzles to uncover hidden functionality.', team: 'Solo / Duo', icon: SearchCode },
  { id: 2, category: 'technical', name: 'AI Prompt Engineering Battle', description: 'Craft the most effective AI prompts to solve challenges using generative AI tools.', team: 'Individual', icon: Bot },
  { id: 3, category: 'technical', name: 'UI/UX Redesign Challenge', description: 'Redesign a given app or website to improve usability, aesthetics and user experience.', team: '2–3', icon: Paintbrush },
  { id: 4, category: 'technical', name: 'Tech Treasure Hunt', description: 'Solve technical clues and puzzles scattered across campus to find the final treasure.', team: '3–4', icon: MapPin },
  { id: 5, category: 'technical', name: 'Research Pitch', description: 'Present your research idea or paper in a concise, compelling pitch to a panel of judges.', team: '1–2', icon: Presentation },
  { id: 6, category: 'technical', name: 'Build a Startup in 60 Min', description: 'Conceptualize and pitch a startup idea with a full business model in just 60 minutes.', team: '2–4', icon: Briefcase },
  { id: 7, category: 'technical', name: 'Bug Hunt', description: 'Find and fix bugs in provided code snippets across multiple rounds of increasing difficulty.', team: 'Solo / Duo', icon: Bug },
  // NON-TECHNICAL
  { id: 8, category: 'non-tech', name: 'Engineering Standup Comedy', description: 'Make the audience laugh with your best engineering-themed original comedy routine.', team: 'Individual', icon: Mic },
  { id: 9, category: 'non-tech', name: 'Tech Meme War', description: 'Create the funniest and most relatable tech memes in a timed competition.', team: 'Individual', icon: Image },
  { id: 10, category: 'non-tech', name: 'Mystery Box Innovation', description: 'Build something innovative using only random items revealed from a mystery box.', team: '2–3', icon: Box },
  { id: 11, category: 'non-tech', name: 'Reel Making Challenge', description: 'Create an engaging short reel on a given topic within the time limit, edited on-site.', team: '1–3', icon: Video },
  { id: 12, category: 'non-tech', name: 'Tech Dum Charades', description: 'Act out tech terms, software names and programming concepts without speaking.', team: '3–4', icon: AppWindow },
  { id: 13, category: 'non-tech', name: 'E-Sports', description: 'Compete in popular esports titles against the best gamers from various colleges.', team: 'Solo / Team', icon: Gamepad2 },
  { id: 14, category: 'non-tech', name: 'Marketing a Useless Product', description: 'Pitch and market the most useless product imaginable — creativity is king.', team: '2–3', icon: Megaphone },
]

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
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span className="font-display" style={{ fontSize: '18px', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
              ZYPH<span style={{ color: 'var(--accent)' }}>ORIA</span>
              <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '6px', fontWeight: 400, letterSpacing: '0.1em' }}>'26</span>
            </span>
          </span>
        </Link>

        {/* Center nav — desktop */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          {[
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/register" className="btn-lime-pill" style={{ borderRadius: '0' }}>Register</Link>
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
        <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--stroke)', padding: '1rem 2rem' }}>
          {[
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
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
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

  // 0 = lime default | 1 = red breach | 2 = lime "restored" | 3 = red urgent | 4 = modal
  const [eggPhase, setEggPhase] = useState<0|1|2|3|4>(0)

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

  const handleHudClick = () => {
    if (eggPhase < 3) setEggPhase((p) => (p + 1) as 0|1|2|3|4)
    else if (eggPhase === 3) setEggPhase(4)
  }

  return (
    <section
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

            <h1 className="font-display" style={{ fontSize: 'clamp(52px, 8vw, 110px)', lineHeight: 0.95, marginBottom: '2rem' }}>
              <span style={{ display: 'block' }}>INNOVATE.</span>
              <span style={{ display: 'block' }}>DOMINATE.</span>
              <span style={{ display: 'block', color: 'var(--accent)', textShadow: '0 0 40px rgba(200,250,100,0.3)' }}>ZYPHORIA.</span>
            </h1>

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

            {/* Click hint tooltip — only in phase 0 */}
            {eggPhase === 0 && (
              <div style={{
                position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)',
                zIndex: 2,
              }}>
                <motion.div
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 4 }}
                  className="font-mono"
                  style={{ fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}
                >
                  · · ·
                </motion.div>
              </div>
            )}

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
                  <div key={label} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                  </div>
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

  if (!event) return null

  const isTech = event.category === 'technical'
  const accentColor = isTech ? 'var(--accent)' : 'var(--danger)'

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
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span> Individual or team of {event.team}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span> Laptops allowed</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span> Multiple rounds</li>
              </ul>
            </div>

            {/* RULES */}
            <div>
              <h4 className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8888A8', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>RULES</h4>
              <ul className="font-mono" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#EEEEF5', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span> No external tools unless noted</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span> Time-limited rounds</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span> Points for accuracy and speed</li>
              </ul>
            </div>

            {/* EVALUATION */}
            <div>
              <h4 className="font-mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8888A8', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>EVALUATION</h4>
              <ul className="font-mono" style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: '#EEEEF5', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span> Correctness of output</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span> Speed of completion</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: accentColor }}>·</span> Depth of analysis</li>
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
              navigate({ to: '/register', search: { event: event.name } })
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
          <p className="section-label" style={{ color: 'var(--text-muted)' }}>[ ABOUT ]</p>
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
  return (
    <section id="organizers" className="section-padding" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <p className="section-label" style={{ color: 'var(--text-muted)' }}>[ TEAM ]</p>
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
                { name: 'Mr. P. Murugan', role: 'AP / CSE' }
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
                <div key={s.name} className="p-4" style={{ background: '#101018', border: '1px solid #1E1E2E' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} color="#C8FA64" />
                    <div className="font-display student-coordinator-name font-bold text-[16px] text-[#EEEEF5]">{s.name}</div>
                  </div>
                  <a href={`tel:+91${s.phone}`} className="flex items-center gap-1 font-mono text-[11px] text-[#8888A8] hover:text-[#C8FA64] transition-colors">
                    <Phone size={12} color="#C8FA64" />
                    {s.phone}
                  </a>
                </div>
              ))}
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
    <footer id="contact" style={{ background: 'var(--surface)', borderTop: '1px solid var(--stroke)' }}>
      <div className="container" style={{ padding: '80px 32px 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '4rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid var(--stroke)',
          }}
          className="footer-grid"
        >
          {/* Col 1 — logo + tagline */}
          <div>
            <div className="font-display" style={{ fontSize: '24px' }}>
              ZYPH<span style={{ color: 'var(--accent)' }}>ORIA</span>
              <span className="font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '6px', fontWeight: 400 }}>'26</span>
            </div>
            <div style={{ width: '100%', height: '1px', background: '#1E1E2E', margin: '10px 0' }} />
            <p className="footer-tagline-main">
              The annual CSE Symposium of<br />
              Rajalakshmi Institute of Technology
            </p>
            <p className="footer-tagline-sub">
              In association with iDataMind · April 15–16, 2026
            </p>
          </div>

          {/* Col 3 — social only (mobile) */}
          <div className="social-mobile-only" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p className="font-mono" style={{ fontSize: '10px', color: '#8888A8', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                SOCIALS
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { label: 'IG', href: 'https://www.instagram.com/zyphoria_26_rit?igsh=MXNrMGtuc2ppbGUwcw==', icon: '/insta1.png' },
                  { label: 'LI', href: 'mailto:zyphoria26.cse@gmail.com', icon: '/gmail.png' },
                ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="font-mono"
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    width: '38px',
                    height: '38px',
                    border: '1px solid var(--stroke)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--stroke)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }}
                >
                  <img
                    src={social.icon}
                    alt={`${social.label} icon`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    draggable={false}
                  />
                </a>
              ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="font-mono"
          style={{
            padding: '1.25rem 0',
            textAlign: 'center',
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          © ZYPHORIA '26 · CSE DEPARTMENT · RAJALAKSHMI INSTITUTE OF TECHNOLOGY
        </div>
      </div>

      <style>{`
        .footer-tagline-main {
          font-family: 'JetBrains Mono', monospace;
          color: #8888A8;
          font-size: 12px;
          line-height: 1.7;
        }

        .footer-tagline-sub {
          font-family: 'JetBrains Mono', monospace;
          color: #C8FA64;
          font-size: 10px;
          letter-spacing: 0.1em;
          margin-top: 6px;
        }

        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .student-coordinator-name {
            font-size: 14px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .event-card .event-name {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            letter-spacing: 0.01em !important;
            word-spacing: 0.14em !important;
          }
        }
      `}</style>
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
          ₹300 per team per event · April 15–16, 2026 · Rajalakshmi Institute of Technology
        </p>
        <Link 
          to="/register" 
          className="btn-lime-pill hover:opacity-90 transition-opacity" 
          style={{ padding: '1rem 3rem', fontSize: '14px', display: 'inline-block', background: 'var(--accent)', color: '#08080C', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 'bold', borderRadius: '0px', marginTop: '1rem' }}
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
