import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Bot, Paintbrush, MapPin, Presentation, Briefcase, Bug, Mic, Image, Box, Video, AppWindow, Gamepad2, Megaphone, SearchCode, X, Upload, CheckCircle, Loader2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { createClient } from '@supabase/supabase-js'
import { IntroLoader } from '../components/IntroLoader'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'
const supabase = createClient(supabaseUrl, supabaseKey)

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
    for (let i = 0; i < 120; i++) {
      stars.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        dur: Math.random() * 4 + 2,
        delay: Math.random() * 5,
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
            opacity: 0.2,
            ['--duration' as string]: `${s.dur}s`,
            ['--min-opacity' as string]: '0.05',
            ['--max-opacity' as string]: `${0.1 + Math.random() * 0.5}`,
            animationDelay: `${s.delay}s`,
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
        <a href="#" style={{ textDecoration: 'none' }}>
          <span className="font-display" style={{ fontSize: '18px', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
            ZYPH<span style={{ color: 'var(--accent)' }}>ORIA</span>
            <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '6px', fontWeight: 400, letterSpacing: '0.1em' }}>'26</span>
          </span>
        </a>

        {/* Center nav — desktop */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          {['EVENTS', 'CONTACT'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
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
              {link}
            </a>
          ))}
        </div>

        {/* Register pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#register" className="btn-lime-pill">Register</a>
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
          {['EVENTS', 'CONTACT'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
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
              {link}
            </a>
          ))}
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

function Hero() {
  const target = new Date('2026-04-15T09:00:00+05:30')
  const { days, hours, mins, secs } = useCountdown(target)

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
            {/* Micro tag */}
            <div className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2.5rem' }}>
              <span style={{ color: 'var(--accent)', fontSize: '10px' }}>◆</span>
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                CSE Symposium · RIT · April 15–16 2026
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display"
              style={{ fontSize: 'clamp(52px, 8vw, 110px)', lineHeight: 0.95, marginBottom: '2rem' }}
            >
              <span style={{ display: 'block' }}>INNOVATE.</span>
              <span style={{ display: 'block' }}>DOMINATE.</span>
              <span style={{ display: 'block', color: 'var(--accent)', textShadow: '0 0 40px rgba(200,250,100,0.3)' }}>
                ZYPHORIA.
              </span>
            </h1>

            {/* Sub-copy */}
            <p
              className="font-mono"
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '480px',
              }}
            >
              14 events. 2 days. One department. No limits.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#events" className="btn-filled" style={{ fontSize: '12px' }}>
                Explore Events
              </a>
            </div>
          </div>

          {/* Right — countdown terminal */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--stroke)',
              padding: '2rem',
              minWidth: '280px',
              position: 'relative',
            }}
            className="countdown-block"
          >
            {/* Terminal header bar */}
            <div
              className="font-mono"
              style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                borderBottom: '1px solid var(--stroke)',
                paddingBottom: '0.75rem',
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>COUNTDOWN.SYS</span>
              <span style={{ color: 'var(--accent)' }}>● LIVE</span>
            </div>

            {/* Digits */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { label: 'DAYS', value: pad(days) },
                { label: 'HRS', value: pad(hours) },
                { label: 'MIN', value: pad(mins) },
                { label: 'SEC', value: pad(secs) },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div className="countdown-digit">{value}</div>
                  <div
                    className="font-mono"
                    style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.15em', marginTop: '4px' }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="font-mono"
              style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                borderTop: '1px solid var(--stroke)',
                paddingTop: '0.75rem',
                textAlign: 'center',
              }}
            >
              UNTIL ZYPHORIA '26
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .countdown-block {
            min-width: unset !important;
          }
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
  
  return (
    <div 
      className="event-card group" 
      onClick={onClick}
      style={{ cursor: 'pointer', ['--card-accent' as string]: accentColor } as any}
    >
      <style>{`
        .event-card.group:hover {
          box-shadow: 0 0 20px ${isTech ? 'var(--accent-glow)' : 'rgba(255, 77, 109, 0.15)'}, 0 0 40px ${isTech ? 'var(--accent-glow)' : 'rgba(255, 77, 109, 0.15)'};
        }
        .event-card.group::before {
          background: ${accentColor};
        }
        .event-card.group:active {
          transform: scale(0.98);
        }
      `}</style>
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
          
          <h2 className="font-display" style={{ fontSize: '32px', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.1 }}>
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
              window.location.href = '#register';
              handleClose();
            }}
          >
            REGISTER NOW →
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
            <p className="section-label" style={{ color: 'var(--text-muted)' }}>[ 02 — TECHNICAL ]</p>
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
            <p className="section-label" style={{ color: 'var(--text-muted)' }}>[ 03 — NON-TECHNICAL ]</p>
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

// ─── Constants ───────────────────────────────────────────────────────────────

const techDropdownEvents = [
  "Reverse Engineering Arena",
  "AI Prompt Engineering Battle",
  "UI/UX Redesign Challenge",
  "Tech Treasure Hunt",
  "Research Pitch",
  "Build a Startup in 60 Min",
  "Bug Hunt"
]

const nonTechDropdownEvents = [
  "Engineering Standup Comedy",
  "Tech Meme War",
  "Mystery Box Innovation",
  "Reel Making Challenge",
  "Tech Dum Charades",
  "E-Sports",
  "Marketing a Useless Product"
]

const PAYMENT_LINK = "https://edu.easebuzz.in/register/RAJALAKSHMIbw5w4/ZYPHORIA_2026_SYMPOSIUM"

const NAME_REGEX = /^[A-Za-z\s.'-]{2,100}$/
const PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/
const DEPT_REGEX = /^[A-Za-z\s&./()-]{2,100}$/
const COLLEGE_REGEX = /^[A-Za-z\s&.,'/()-]{2,200}$/
const TEAM_NAME_REGEX = /^[A-Za-z0-9\s&._'-]{2,100}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ─── Registration ─────────────────────────────────────────────────────────────

function RegistrationSection() {
  const [tab, setTab] = useState<'tech' | 'nontech'>('tech');
  const [formData, setFormData] = useState({
    event: '',
    teamName: '',
    participantCount: '0',
    leader: { name: '', department: '', college: '', email: '', phone: '' },
    participants: [
      { name: '', department: '', college: '', email: '', phone: '' },
      { name: '', department: '', college: '', email: '', phone: '' },
      { name: '', department: '', college: '', email: '', phone: '' },
    ]
  });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // accent based on tab
  const accent = tab === 'tech' ? 'var(--accent)' : 'var(--danger)';
  const eventsList = tab === 'tech' ? techDropdownEvents : nonTechDropdownEvents;
  const dateLabel = tab === 'tech' ? '15 Apr' : '16 Apr';

  // Handle updates
  const handleLeaderChange = (field: string, val: string) => setFormData(p => ({ ...p, leader: { ...p.leader, [field]: val } }));
  const handleParticipantChange = (idx: number, field: string, val: string) => {
    const nextArr = [...formData.participants];
    nextArr[idx] = { ...nextArr[idx], [field]: val };
    setFormData(p => ({ ...p, participants: nextArr }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setFilePreview(url);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const validate = () => {
    let errs: Record<string, string> = {};

    if (!formData.event) errs['event'] = 'Please select an event.';
    if (!formData.participantCount) errs['participantCount'] = 'Please select participant count.';
    if (!file) errs['file'] = 'Payment screenshot required.';

    if (!TEAM_NAME_REGEX.test(formData.teamName)) errs['teamName'] = 'Invalid team name.';
    
    // Validate leader
    if (!NAME_REGEX.test(formData.leader.name)) errs['leader.name'] = 'Invalid name.';
    if (!DEPT_REGEX.test(formData.leader.department)) errs['leader.department'] = 'Invalid dept.';
    if (!COLLEGE_REGEX.test(formData.leader.college)) errs['leader.college'] = 'Invalid college.';
    if (!EMAIL_REGEX.test(formData.leader.email)) errs['leader.email'] = 'Invalid email.';
    if (!PHONE_REGEX.test(formData.leader.phone)) errs['leader.phone'] = 'Invalid phone.';

    // Validate participants based on count
    const count = parseInt(formData.participantCount);
    for (let i = 0; i < count; i++) {
      if (!NAME_REGEX.test(formData.participants[i].name)) errs[`p${i}.name`] = 'Invalid name.';
      if (!DEPT_REGEX.test(formData.participants[i].department)) errs[`p${i}.department`] = 'Invalid dept.';
      if (!COLLEGE_REGEX.test(formData.participants[i].college)) errs[`p${i}.college`] = 'Invalid college.';
      if (!EMAIL_REGEX.test(formData.participants[i].email)) errs[`p${i}.email`] = 'Invalid email.';
      if (!PHONE_REGEX.test(formData.participants[i].phone)) errs[`p${i}.phone`] = 'Invalid phone.';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("Please fix the highlighted errors.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate() || !file) return;

    setIsSubmitting(true);
    try {
      // Step 1 - Upload file
      const ext = file.name.split('.').pop();
      const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
      
      const { error: uploadErr } = await supabase.storage
        .from('payment-screenshots')
        .upload(filename, file);
        
      if (uploadErr) throw uploadErr;

      const { data: publicUrlData } = supabase.storage
        .from('payment-screenshots')
        .getPublicUrl(filename);
      const publicUrl = publicUrlData.publicUrl;

      // Step 2 - Insert to Supabase DB
      const count = parseInt(formData.participantCount);
      const insertData = {
        team_name: formData.teamName,
        leader_name: formData.leader.name,
        leader_email: formData.leader.email,
        leader_phone: formData.leader.phone,
        leader_department: formData.leader.department,
        leader_college: formData.leader.college,
        technical_event: tab === 'tech' ? formData.event : null,
        non_technical_event: tab === 'nontech' ? formData.event : null,
        payment_screenshot_url: publicUrl,
        participant1_name: count >= 1 ? formData.participants[0].name : null,
        participant1_department: count >= 1 ? formData.participants[0].department : null,
        participant1_college: count >= 1 ? formData.participants[0].college : null,
        participant1_email: count >= 1 ? formData.participants[0].email : null,
        participant1_phone: count >= 1 ? formData.participants[0].phone : null,
        participant2_name: count >= 2 ? formData.participants[1].name : null,
        participant2_department: count >= 2 ? formData.participants[1].department : null,
        participant2_college: count >= 2 ? formData.participants[1].college : null,
        participant2_email: count >= 2 ? formData.participants[1].email : null,
        participant2_phone: count >= 2 ? formData.participants[1].phone : null,
        participant3_name: count == 3 ? formData.participants[2].name : null,
        participant3_department: count == 3 ? formData.participants[2].department : null,
        participant3_college: count == 3 ? formData.participants[2].college : null,
        participant3_email: count == 3 ? formData.participants[2].email : null,
        participant3_phone: count == 3 ? formData.participants[2].phone : null,
      };

      const { error: insertErr } = await supabase
        .from('registrations')
        .insert([insertData]);

      if (insertErr) throw insertErr;

      // Step 3 - Sync to Sheets (fire & forget)
      supabase.functions.invoke('sync-to-sheets', {
        body: { registration: insertData },
      }).catch((err) => console.error("Sheets sync failed:", err));

      // Step 4 - Success
      setIsSuccess(true);
      
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI rendering
  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[#9A9AB8] mb-2.5 block">{children}</label>
  );

  const Input = ({ err, ...props }: any) => (
    <div className="mb-5 sm:mb-6 last:mb-0">
      <input
        className="w-full bg-[#0D0D14] border sm:border-[var(--stroke)] border-[rgba(255,255,255,0.45)] outline-none font-mono text-[15px] sm:text-base px-4 py-3.5 text-[#EEEEF5] transition-all duration-300 placeholder:text-[#4A4A62] hover:bg-[#12121A] rounded-[8px] sm:rounded-none"
        style={err ? { borderColor: 'var(--danger)' } : {}}
        onFocus={(e) => {
          e.target.style.borderColor = accent;
          if (window.innerWidth < 640) {
            e.target.style.boxShadow = `0 0 20px ${accent}40`;
            e.target.style.transform = 'translateY(-2px)';
          } else {
            e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.2)';
            e.target.style.transform = 'translateY(0)';
          }
          e.target.style.background = '#12121A';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = err ? 'var(--danger)' : '';
          e.target.style.boxShadow = window.innerWidth < 640 ? 'none' : 'inset 0 1px 2px rgba(0,0,0,0.2)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.background = '#0D0D14';
        }}
        {...props}
      />
      {err && <div className="text-[var(--danger)] text-[11px] mt-2 font-mono tracking-wide">{err}</div>}
    </div>
  );

  return (
    <section id="register" className="section-padding" style={{ background: 'var(--bg)' }}>
      <div className="container" style={{ maxWidth: '980px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>[ 04 — REGISTER ]</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
            Join the Arena.
          </h2>
          <p className="font-mono text-sm sm:text-base text-[#8888A8] mt-4 max-w-[500px] mx-auto opacity-80">"Choose your path, gather your team, and prepare for the ultimate technical showdown."</p>
        </div>

        <div className="registration-card p-6 sm:p-10 md:p-14" style={{ position: 'relative', background: 'rgba(16, 16, 24, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid var(--stroke)' }}>
          <span className="ascii-corner tl" style={{ color: accent }}>┌</span>
          <span className="ascii-corner bl" style={{ color: accent }}>└</span>
          <span className="ascii-corner tr" style={{ color: accent }}>┐</span>
          <span className="ascii-corner br" style={{ color: accent }}>┘</span>

          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <CheckCircle style={{ margin: '0 auto 1.5rem', color: accent }} size={64} />
              <h3 className="font-display" style={{ fontSize: '36px', marginBottom: '1rem', color: 'var(--text-primary)' }}>"TRANSMISSION RECEIVED"</h3>
              <p className="font-mono text-base text-[#8888A8]">Registration confirmed. Check your email for details.</p>
            </div>
          ) : (
            <div>
              {/* Tab Switcher */}
              <div className="mb-8 sm:mb-12" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', borderBottom: '1px solid var(--stroke)' }}>
                <button
                  onClick={() => setTab('tech')}
                  className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] bg-transparent border-none cursor-pointer flex-1 sm:flex-none"
                  style={{ 
                    padding: '1.25rem 2rem', 
                    color: tab === 'tech' ? 'var(--accent)' : 'var(--text-muted)',
                    borderBottom: tab === 'tech' ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    marginBottom: '-1px'
                  }}
                >
                  Technical
                </button>
                <button
                  onClick={() => setTab('nontech')}
                  className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] bg-transparent border-none cursor-pointer flex-1 sm:flex-none"
                  style={{ 
                    padding: '1.25rem 2rem', 
                    color: tab === 'nontech' ? 'var(--danger)' : 'var(--text-muted)',
                    borderBottom: tab === 'nontech' ? '2px solid var(--danger)' : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    marginBottom: '-1px'
                  }}
                >
                  Non-Technical
                </button>
              </div>

              {/* Form body */}
              <div className="flex flex-col gap-12 sm:gap-16">
                
                {/* SECTION 1: EVENT DETAILS */}
                <div className="space-y-4 sm:space-y-5" style={{ marginTop: '0.5rem' }}>
                  <h4 className="font-display text-xl mb-5 sm:mb-6 flex items-center gap-2" style={{ color: accent }}>
                    <span>EVENT</span>
                    <span>DIRECTIVE</span>
                  </h4>
                  <Label>{tab === 'tech' ? 'Technical Event' : 'Non-Technical Event'} ({dateLabel})</Label>
                <div className="mb-2 sm:mb-3">
                  <select
                    value={formData.event}
                    onChange={(e) => setFormData(p => ({ ...p, event: e.target.value }))}
                    className="w-full bg-[#0D0D14] border sm:border-[var(--stroke)] border-[rgba(255,255,255,0.45)] outline-none font-mono text-[15px] sm:text-base px-4 py-3.5 text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] appearance-none rounded-[8px] sm:rounded-none"
                    style={{ 
                      ...(errors.event ? { borderColor: 'var(--danger)' } : {}),
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23FFFFFF\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1.2em'
                    }}
                  >
                    <option value="">-- Choose Target —-</option>
                    {eventsList.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                  </select>
                  </div> {/* Close event combo wrapper */}

                  <Label>Team Name</Label>
                  <Input value={formData.teamName} onChange={(e: any) => setFormData(p => ({ ...p, teamName: e.target.value }))} err={errors.teamName} placeholder="Enter Team Name" />
                </div> {/* Close SECTION 1 Wrapper */}

                {/* SECTION 2: TEAM LEADER */}
                <div>
                  <h4 className="font-display text-xl mt-4 mb-5 sm:mt-2 sm:mb-6 flex items-center gap-2" style={{ color: accent }}>
                    <span>TEAM</span>
                    <span>LEADER</span>
                  </h4>
                  <div className="p-6 pt-8 sm:p-8 sm:pt-9 border relative overflow-hidden" style={{ borderColor: 'var(--stroke)', background: 'rgba(25, 25, 35, 0.3)' }}>
                    <div className="absolute top-0 right-0 p-2 font-mono text-[9px] text-[#3A3A4A] tracking-widest">COMMANDER // 01</div>
                    <div className="grid grid-cols-1 gap-y-5">
                    <div>
                      <Label>Full Name</Label>
                      <Input value={formData.leader.name} onChange={(e: any) => handleLeaderChange('name', e.target.value)} err={errors['leader.name']} placeholder="John Doe" />
                    </div>
                    <div>
                      <Label>Department</Label>
                      <Input value={formData.leader.department} onChange={(e: any) => handleLeaderChange('department', e.target.value)} err={errors['leader.department']} placeholder="Computer Science" />
                    </div>
                    <div>
                      <Label>College</Label>
                      <Input value={formData.leader.college} onChange={(e: any) => handleLeaderChange('college', e.target.value)} err={errors['leader.college']} placeholder="RIT" />
                    </div>
                    <div>
                      <Label>Email Address</Label>
                      <Input value={formData.leader.email} onChange={(e: any) => handleLeaderChange('email', e.target.value)} err={errors['leader.email']} placeholder="john@example.com" />
                    </div>
                    <div>
                      <Label>Phone Connection</Label>
                      <Input value={formData.leader.phone} onChange={(e: any) => handleLeaderChange('phone', e.target.value)} err={errors['leader.phone']} placeholder="9876543210" />
                    </div>
                  </div>
                </div>

                <div className="pt-2 sm:pt-3">
                <Label>Squad Capacity (excluding leader)</Label>
                <div className="mb-8 sm:mb-10">
                  <select
                    value={formData.participantCount}
                    onChange={(e) => setFormData(p => ({ ...p, participantCount: e.target.value }))}
                    className="w-full bg-[#0D0D14] border sm:border-[var(--stroke)] border-[rgba(255,255,255,0.45)] outline-none font-mono text-[15px] sm:text-base px-4 py-3.5 text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] appearance-none rounded-[8px] sm:rounded-none"
                    style={{ 
                      ...(errors.participantCount ? { borderColor: 'var(--danger)' } : {}),
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23FFFFFF\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1.2em'
                    }}
                  >
                    <option value="0">0 (Solo Operative)</option>
                    <option value="1">1 Member</option>
                    <option value="2">2 Members</option>
                    <option value="3">3 Members</option>
                  </select>
                  {errors.participantCount && <div className="text-[var(--danger)] text-[11px] mt-2 font-mono">{errors.participantCount}</div>}
                </div>
                </div>

                {Array.from({ length: parseInt(formData.participantCount) }).map((_, idx) => (
                  <div key={idx} className="mt-10 sm:mt-12">
                    <h4 className="font-display text-lg mb-5 sm:mb-6 text-[#EEEEF5] flex items-center gap-2">
                       Participant {idx + 1}
                    </h4>
                    <div className="p-6 pt-8 sm:p-8 sm:pt-9 border relative overflow-hidden" style={{ borderColor: 'var(--stroke)', background: 'rgba(25, 25, 35, 0.3)' }}>
                      <div className="absolute top-0 right-0 p-2 font-mono text-[9px] text-[#3A3A4A] tracking-widest">MEMBER // {idx + 1}</div>
                      <div className="grid grid-cols-1 gap-y-5">
                      <div>
                        <Label>Full Name</Label>
                        <Input value={formData.participants[idx].name} onChange={(e: any) => handleParticipantChange(idx, 'name', e.target.value)} err={errors[`p${idx}.name`]} placeholder="Jane Doe" />
                      </div>
                      <div>
                        <Label>Department</Label>
                        <Input value={formData.participants[idx].department} onChange={(e: any) => handleParticipantChange(idx, 'department', e.target.value)} err={errors[`p${idx}.department`]} placeholder="Information Tech" />
                      </div>
                      <div>
                        <Label>College</Label>
                        <Input value={formData.participants[idx].college} onChange={(e: any) => handleParticipantChange(idx, 'college', e.target.value)} err={errors[`p${idx}.college`]} placeholder="RIT" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input value={formData.participants[idx].email} onChange={(e: any) => handleParticipantChange(idx, 'email', e.target.value)} err={errors[`p${idx}.email`]} placeholder="jane@example.com" />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input value={formData.participants[idx].phone} onChange={(e: any) => handleParticipantChange(idx, 'phone', e.target.value)} err={errors[`p${idx}.phone`]} placeholder="9123456780" />
                      </div>
                      </div>
                    </div>
                  </div>
                ))}

                </div> {/* Close SECTION 2 Wrapper */}

                {/* SECTION 3: PAYMENT PROTOCOL */}
                <div className="pt-10 sm:pt-12 border-t" style={{ borderColor: 'var(--stroke)' }}>
                  <h4 className="font-display text-xl mt-4 mb-6 sm:mt-0 sm:mb-4 flex items-center gap-2" style={{ color: accent }}>
                    <span>PAYMENT</span>
                    <span>PROTOCOL</span>
                  </h4>
                  <p className="font-mono text-sm sm:text-base text-[#8888A8] mb-10 leading-relaxed max-w-[680px]">
                    Initialize payment of ₹300 per team for the event via our secure uplink. Upload your confirmation receipt below for verification.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-10">
                    <a 
                      href={PAYMENT_LINK} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-3 px-8 py-4 border font-mono text-sm uppercase tracking-widest transition-all duration-300" 
                      style={{ 
                        borderColor: accent, 
                        color: accent,
                        background: 'rgba(200, 250, 100, 0.05)'
                      }} 
                      onMouseEnter={(e) => { 
                        e.currentTarget.style.backgroundColor = accent; 
                        e.currentTarget.style.color = 'var(--bg)'; 
                        e.currentTarget.style.boxShadow = `0 0 25px ${accent}40`; 
                      }} 
                      onMouseLeave={(e) => { 
                        e.currentTarget.style.backgroundColor = 'rgba(200, 250, 100, 0.05)'; 
                        e.currentTarget.style.color = accent; 
                        e.currentTarget.style.boxShadow = 'none'; 
                      }}
                    >
                      ↗ Access Payment Portal
                    </a>
                    <div className="font-mono text-[10px] text-[#555575] uppercase tracking-widest">
                      ID // SYMP-2026-PAY
                    </div>
                  </div>

                     <div className="group relative border-2 border-dashed p-10 sm:p-12 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#12121A] overflow-hidden" 
                       style={{ borderColor: errors.file ? 'var(--danger)' : 'var(--stroke)', background: 'rgba(13, 13, 20, 0.6)' }}>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {filePreview ? (
                      <div className="flex flex-col items-center relative z-20">
                        <div className="relative mb-4">
                          <img src={filePreview} alt="Preview" className="h-32 w-32 object-cover border-2 shadow-2xl" style={{ borderColor: accent }} />
                          <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg">
                            <CheckCircle size={16} color="white" />
                          </div>
                        </div>
                        <span className="font-mono text-sm text-[#EEEEF5] font-bold mb-1">{file?.name}</span>
                        <span className="font-mono text-[10px] text-[#8888A8] uppercase tracking-wider">File secured // {(file?.size ? file.size / (1024 * 1024) : 0).toFixed(2)} MB</span>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                          <Upload size={32} style={{ color: accent }} />
                        </div>
                        <p className="font-mono text-base text-[#EEEEF5] mb-2 font-medium tracking-wide">Upload Transmission Receipt</p>
                        <p className="font-mono text-xs text-[#8888A8] opacity-70">PNG, JPG or WEBP (Max 5MB)</p>
                      </>
                    )}
                  </div>
                  {errors.file && <div className="text-[var(--danger)] text-xs mt-3 font-mono text-center tracking-wide">{errors.file}</div>}
                </div>

                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="w-full font-mono font-bold text-base sm:text-lg uppercase tracking-[0.18em] py-6 sm:py-7 flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group shadow-xl"
                  style={{ 
                    backgroundColor: isSubmitting ? 'var(--stroke)' : accent, 
                    color: isSubmitting ? 'var(--text-muted)' : 'var(--bg)',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    marginTop: '2rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.boxShadow = `0 0 30px ${accent}60`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = accent;
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <><Loader2 className="animate-spin" size={20} /> SYNCING DATA...</>
                  ) : (
                    <>CONFIRM REGISTRATION <span className="group-hover:translate-x-1 transition-transform">→</span></>
                  )}
                </button>
              </div>
            </div>
          )}
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
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '4rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid var(--stroke)',
          }}
          className="footer-grid"
        >
          {/* Col 1 — logo + tagline */}
          <div>
            <div className="font-display" style={{ fontSize: '24px', marginBottom: '0.75rem' }}>
              ZYPH<span style={{ color: 'var(--accent)' }}>ORIA</span>
              <span className="font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '6px', fontWeight: 400 }}>'26</span>
            </div>
            <p className="font-mono" style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '280px' }}>
              The annual CSE Symposium of Rajalakshmi Institute of Technology. Sci-fi precision. Human ambition.
            </p>
          </div>

          {/* Col 2 — nav */}
          <div>
            <p className="font-mono" style={{ fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Navigation</p>
            {['Events', 'Register', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono"
                style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '0.75rem', transition: 'color 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Col 3 — social + contact */}
          <div>
            <p className="font-mono" style={{ fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Contact</p>
            <a
              href="mailto:zyphoria@rit.ac.in"
              className="font-mono"
              style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1rem' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              zyphoria@rit.ac.in
            </a>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              {['IG', 'LI', 'TW'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-mono"
                  style={{
                    width: '32px',
                    height: '32px',
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
                  {social}
                </a>
              ))}
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
          ZYPHORIA '26 · CSE DEPARTMENT · RAJALAKSHMI INSTITUTE OF TECHNOLOGY · APRIL 15–16
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </footer>
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
          <EventsSection />
          <RegistrationSection />
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}
