// @ts-nocheck
import { useState, useEffect, useCallback } from 'react'
import { X, Flag, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Word pool ─────────────────────────────────────────────────────────────────
// All 5-letter, tech/programming themed. Players are told the theme upfront.
const ANSWERS = [
  'CRACK','NEXUS','PIXEL','LOGIC','DEBUG','SIGMA','VAULT','GHOST',
  'PARSE','STACK','TOKEN','VIRUS','PATCH','SHELL','ARRAY','CACHE',
  'ROUTE','BLOCK','ABORT','QUEUE','BYTES','CLONE','PROXY','MERGE',
  'FRAME','SCOPE','SHIFT','STORE','DELTA','CLASS','PRIME','GUARD',
]

const WORD_LEN = 5
const MAX_TRY  = 8      // easier: 8 attempts
const TIME     = 120    // easier: 2 minutes

const KEY_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫'],
]

type CS = 'correct'|'present'|'absent'|'empty'|'filled'

// ── Evaluate guess ────────────────────────────────────────────────────────────
function evalGuess(guess: string, ans: string): CS[] {
  const r: CS[] = Array(WORD_LEN).fill('absent')
  const pool: Record<string,number> = {}
  for (const c of ans) pool[c] = (pool[c]||0)+1
  for (let i=0;i<WORD_LEN;i++) if (guess[i]===ans[i]) { r[i]='correct'; pool[guess[i]]-- }
  for (let i=0;i<WORD_LEN;i++) if (r[i]!=='correct'&&pool[guess[i]]>0) { r[i]='present'; pool[guess[i]]-- }
  return r
}

// ── Cell / key colours ────────────────────────────────────────────────────────
const C: Record<CS,{bg:string;text:string;bd:string;glow:string}> = {
  correct:{ bg:'#C8FA64', text:'#08080C', bd:'#C8FA64', glow:'rgba(200,250,100,0.45)' },
  present:{ bg:'#2A1028', text:'#FF6B8A', bd:'#FF4D6D', glow:'rgba(255,77,109,0.3)' },
  absent: { bg:'#111120', text:'#3A3A5A', bd:'#1E1E2E', glow:'none' },
  empty:  { bg:'#0D0D14', text:'transparent', bd:'#1A1A28', glow:'none' },
  filled: { bg:'#0D0D14', text:'#EEEEF5', bd:'#4A4A6A', glow:'none' },
}
const KC: Record<string,{bg:string;text:string}> = {
  correct:{ bg:'#C8FA64', text:'#08080C' },
  present:{ bg:'#FF4D6D', text:'#EEEEF5' },
  absent: { bg:'#111120', text:'#3A3A5A' },
}

// ── FLAG CAPTURED screen ──────────────────────────────────────────────────────
function FlagCaptured({ password, onClose }: { password: string; onClose: () => void }) {
  const [glitch, setGlitch] = useState(false)
  useEffect(() => {
    const g = setInterval(() => { setGlitch(true); setTimeout(()=>setGlitch(false),100) }, 2600)
    return () => clearInterval(g)
  }, [])

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:9999999,
      background:'rgba(4,4,8,0.98)', backdropFilter:'blur(16px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem',
    }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(200,250,100,0.012) 2px,rgba(200,250,100,0.012) 4px)' }} />

      <div style={{ textAlign:'center', position:'relative', zIndex:1, maxWidth:'460px' }}>
        <div style={{ marginBottom:'1.5rem', display:'flex', justifyContent:'center' }}>
          <motion.div
            animate={{ y:[0,-8,0], filter:['drop-shadow(0 0 10px #C8FA64)','drop-shadow(0 0 28px #C8FA64)','drop-shadow(0 0 10px #C8FA64)'] }}
            transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}>
            <Flag size={68} strokeWidth={1.2} color="#C8FA64" />
          </motion.div>
        </div>

        <motion.span initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{delay:0.15}}
          className="font-mono"
          style={{ display:'inline-block', fontSize:'10px', letterSpacing:'0.2em', color:'#C8FA64',
            padding:'4px 14px', border:'1px solid rgba(200,250,100,0.3)', background:'rgba(200,250,100,0.05)', marginBottom:'1rem' }}>
          ◈ ACCESS GRANTED
        </motion.span>

        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.25}}
          className="font-display uppercase"
          style={{ fontSize:'clamp(38px,9vw,64px)', color:'#EEEEF5', lineHeight:1.05,
            marginBottom:'0.5rem', letterSpacing:'-0.02em',
            filter: glitch ? 'blur(2px) brightness(1.6)' : 'none',
            transform: glitch ? 'translate(3px,-2px)' : 'none',
            transition:'filter 50ms, transform 50ms',
            textShadow:'0 0 40px rgba(200,250,100,0.15)' }}>
          FLAG<br />
          <span style={{ color:'#C8FA64', textShadow:'0 0 30px rgba(200,250,100,0.5)' }}>CAPTURED.</span>
        </motion.h1>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
          style={{ margin:'1.5rem 0' }}>
          <p className="font-mono" style={{ fontSize:'9px', letterSpacing:'0.2em', color:'#5A5A7A', marginBottom:'10px' }}>PASSWORD CRACKED</p>
          <div style={{ display:'inline-flex', gap:'6px' }}>
            {password.split('').map((ch, i) => (
              <motion.div key={i}
                initial={{ opacity:0, rotateX:-90 }}
                animate={{ opacity:1, rotateX:0 }}
                transition={{ delay:0.65+i*0.1, type:'spring', stiffness:140 }}
                className="font-display"
                style={{ width:'50px', height:'50px', display:'flex', alignItems:'center', justifyContent:'center',
                  background:'#C8FA64', color:'#08080C', fontSize:'22px', fontWeight:'bold',
                  boxShadow:'0 0 16px rgba(200,250,100,0.45)' }}>
                {ch}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}
          className="font-mono"
          style={{ fontSize:'13px', color:'#6A6A8A', lineHeight:1.6, marginBottom:'2rem' }}>
          You have successfully breached the<br />
          Zyphoria security protocol.<br />
          <span style={{ color:'#C8FA64', opacity:0.7 }}>Elite operator status confirmed.</span>
        </motion.p>

        <motion.button
          initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1.5}}
          whileHover={{scale:1.04}} whileTap={{scale:0.97}}
          onClick={onClose}
          className="font-display uppercase tracking-widest"
          style={{ padding:'1rem 3rem', fontSize:'13px', background:'#C8FA64', color:'#08080C',
            border:'none', cursor:'pointer', boxShadow:'0 0 28px rgba(200,250,100,0.3)' }}>
          EXIT SECURE CHANNEL
        </motion.button>
      </div>
    </div>
  )
}

// ── WIN CREDITS SEQUENCE ──────────────────────────────────────────────────────
function WinCredits({ onClose }: { onClose: () => void }) {
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    // Step 1: Screen flash white (0ms)
    setFlash(true)
    setTimeout(() => setFlash(false), 150)
  }, [])

  const developers = [
    {
      name: 'Josewa Aghai',
      handle: '@josewa_aghai34',
      link: 'https://www.instagram.com/josewa_aghai34?igsh=eW85MW85b2FzdXZl',
      direction: 'top' as const
    },
    {
      name: 'Jxck',
      handle: '@_._._jxck_._._',
      link: 'https://www.instagram.com/_._._.jxck._._._?igsh=Y3hxZXo2dWhhODF5',
      direction: 'right' as const
    },
    {
      name: 'Zenitsuuu',
      handle: '@jexxsh_jfj',
      link: 'https://www.instagram.com/jexxsh_jfj?igsh=MThkcjE2aHYwcG1pag==',
      direction: 'left' as const
    },
    {
      name: 'Jebin Rufuz',
      handle: '@_rufuzz._',
      link: 'https://www.instagram.com/_rufuzz._?igsh=aGxvOTVwbWpxdjMw',
      direction: 'bottom' as const
    }
  ]

  const getInitialPosition = (direction: string) => {
    switch (direction) {
      case 'top': return { y: '-120vh', x: 0 }
      case 'right': return { x: '120vw', y: 0 }
      case 'left': return { x: '-120vw', y: 0 }
      case 'bottom': return { y: '120vh', x: 0 }
      default: return { x: 0, y: 0 }
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999999,
      background: flash ? '#FFFFFF' : 'rgba(8, 8, 12, 0.98)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      transition: 'background 150ms'
    }}>
      {/* Step 2: Win text fades in (200ms) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <div className="font-display" style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#C8FA64',
          lineHeight: 1.2,
          textAlign: 'center'
        }}>
          PROTOCOL BREACHED.<br />
          ACCESS GRANTED.
        </div>
      </motion.div>

      {/* Step 3: Sub text fades in (800ms delay) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <div className="font-mono" style={{
          fontSize: '13px',
          color: '#8888A8',
          textAlign: 'center'
        }}>
          "The architects behind Zyphoria '26"
        </div>
      </motion.div>

      {/* Step 4: 4 developer cards animate in (1200ms delay) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}
      >
        {developers.map((dev, index) => (
          <motion.div
            key={dev.name}
            initial={getInitialPosition(dev.direction)}
            animate={{ x: 0, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.9,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 40px rgba(200,250,100,0.4)'
            }}
            style={{
              position: 'relative',
              background: '#101018',
              border: '1px solid #C8FA64',
              padding: '24px',
              width: '200px',
              cursor: 'pointer',
              borderRadius: 0,
              boxShadow: '0 0 24px rgba(200,250,100,0.2)',
              transition: 'all 200ms ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
            onClick={() => window.open(dev.link, '_blank')}
          >
            {/* ASCII Corners */}
            <span style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              color: '#C8FA64',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>┌</span>
            <span style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: '#C8FA64',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>┐</span>
            <span style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              color: '#C8FA64',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>└</span>
            <span style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              color: '#C8FA64',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>┘</span>

            {/* Instagram Icon */}
            <div style={{ marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF4D6D">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>

            {/* Name */}
            <div className="font-display" style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#EEEEF5',
              marginBottom: '8px'
            }}>
              {dev.name}
            </div>

            {/* Handle */}
            <div className="font-mono" style={{
              fontSize: '12px',
              color: '#C8FA64'
            }}>
              {dev.handle}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Step 6: Bottom text fades in (2400ms) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-mono"
          style={{
            fontSize: '10px',
            color: '#8888A8',
            textTransform: 'uppercase',
            letterSpacing: '0.2em'
          }}
        >
          TAP A NAME TO CONNECT →
        </motion.div>
      </motion.div>

      {/* Step 7: Close button appears (2600ms) */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.4 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClose}
        className="font-display"
        style={{
          padding: '1rem 2rem',
          fontSize: '13px',
          background: 'transparent',
          border: '1px solid #C8FA64',
          color: '#C8FA64',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        [ RETURN TO SITE ]
      </motion.button>
    </div>
  )
}

// ── Main mini-game ────────────────────────────────────────────────────────────
export function MiniGame({ onClose }: { onClose: () => void }) {
  const [answer]    = useState(() => ANSWERS[Math.floor(Math.random()*ANSWERS.length)])
  const [guesses,   setGuesses]   = useState<string[]>([])
  const [gStates,   setGStates]   = useState<CS[][]>([])
  const [cur,       setCur]       = useState('')
  const [timeLeft,  setTimeLeft]  = useState(TIME)
  const [phase,     setPhase]     = useState<'play'|'win'|'lose'|'credits'>('play')
  const [shake,     setShake]     = useState(false)
  const [msg,       setMsg]       = useState('')
  const [kMap,      setKMap]      = useState<Record<string,string>>({})
  const [visible,   setVisible]   = useState(false)
  const [revealing, setRevealing] = useState<number|null>(null)
  const [showFlag,  setShowFlag]  = useState(false)
  const [hintUsed,  setHintUsed]  = useState(false)
  const [hintLetter,setHintLetter]= useState<string|null>(null)

  useEffect(() => { const t=setTimeout(()=>setVisible(true),10); return()=>clearTimeout(t) }, [])

  // Timer
  useEffect(() => {
    if (phase!=='play') return
    if (timeLeft<=0) { setPhase('lose'); setMsg(`TIME'S UP — The word was ${answer}`); return }
    const id=setInterval(()=>setTimeLeft(t=>t-1),1000)
    return ()=>clearInterval(id)
  }, [timeLeft, phase, answer])

  // Auto-hint: after 3 wrong guesses, reveal the first letter automatically
  useEffect(() => {
    if (!hintUsed && guesses.length >= 3 && phase === 'play') {
      setHintLetter(answer[0])
      setHintUsed(true)
    }
  }, [guesses.length, hintUsed, answer, phase])

  const flash = (m: string) => { setMsg(m); setTimeout(()=>setMsg(''), 1800) }
  const doShake = () => { setShake(true); setTimeout(()=>setShake(false), 400) }

  const submit = useCallback(() => {
    if (phase!=='play') return
    if (cur.length < WORD_LEN) { doShake(); flash('NEED 5 CHARACTERS'); return }

    const rs = evalGuess(cur, answer)
    const ri = guesses.length
    const ng = [...guesses, cur]
    const ns = [...gStates, rs]
    setGuesses(ng); setGStates(ns)
    setRevealing(ri); setTimeout(()=>setRevealing(null), WORD_LEN*120+200)

    // Update keyboard colour map (correct > present > absent)
    setKMap(prev => {
      const n = {...prev}
      cur.split('').forEach((ch, i) => {
        if (rs[i]==='correct') n[ch]='correct'
        else if (rs[i]==='present' && n[ch]!=='correct') n[ch]='present'
        else if (!n[ch]) n[ch]='absent'
      })
      return n
    })
    setCur('')

    if (cur === answer) {
      setTimeout(()=>{ setPhase('credits') }, WORD_LEN*120+200)
      return
    }
    if (ng.length >= MAX_TRY) {
      setTimeout(()=>{ setPhase('lose'); setMsg(`BREACH FAILED — Word was ${answer}`) }, WORD_LEN*120+200)
    }
  }, [cur, answer, guesses, gStates, phase])

  const typeKey = useCallback((k: string) => {
    if (phase!=='play' || cur.length>=WORD_LEN) return
    setCur(c => c+k)
  }, [phase, cur])

  const del = useCallback(() => {
    if (phase!=='play') return
    setCur(c => c.slice(0,-1))
  }, [phase])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key==='Enter') submit()
      else if (e.key==='Backspace') del()
      else if (/^[a-zA-Z]$/.test(e.key)) typeKey(e.key.toUpperCase())
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [submit, del, typeKey])

  if (showFlag) return <FlagCaptured password={answer} onClose={onClose} />

  // Show credits sequence on win
  if (phase === 'credits') {
    return <WinCredits onClose={onClose} />
  }

  const timerPct = (timeLeft/TIME)*100
  const timerClr = timeLeft>60 ? '#C8FA64' : timeLeft>30 ? '#FFA726' : '#FF4D6D'

  const rows = Array(MAX_TRY).fill(null).map((_,r) => {
    if (r < guesses.length) return {
      cells: guesses[r].split('').map((l,c)=>({l, s:gStates[r][c]})),
      revealing: r===revealing,
    }
    if (r===guesses.length && phase==='play') return {
      cells: Array(WORD_LEN).fill(null).map((_,i)=>({ l:cur[i]||'', s:(cur[i]?'filled':'empty') as CS })),
      cur: true, shaking: shake,
    }
    return { cells: Array(WORD_LEN).fill(null).map(()=>({l:'', s:'empty' as CS})) }
  })

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:999999,
      background:'rgba(6,6,10,0.97)', backdropFilter:'blur(16px)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      opacity:visible?1:0, transition:'opacity 220ms', padding:'1rem',
      overflowY: 'auto',
    }}>
      {/* scanlines */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,77,109,0.01) 3px,rgba(255,77,109,0.01) 4px)' }} />

      {/* Close */}
      <button onClick={onClose} style={{ position:'fixed',top:'1.5rem',right:'1.5rem',background:'none',border:'none',color:'#4A4A62',cursor:'pointer',zIndex:2 }}>
        <X size={22}/>
      </button>

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'380px', display:'flex', flexDirection:'column', alignItems:'center' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'0.75rem' }}>
          <p className="font-mono" style={{ fontSize:'9px', letterSpacing:'0.25em', color:'#FF4D6D', marginBottom:'4px' }}>[ CIPHER TERMINAL ]</p>
          <h2 className="font-display uppercase" style={{ fontSize:'clamp(16px,3vw,20px)', color:'#EEEEF5', letterSpacing:'-0.02em' }}>
            Crack the <span style={{ color:'#FF4D6D' }}>Password</span>
          </h2>
          {/* Category hint always visible */}
          <p className="font-mono" style={{ fontSize:'10px', color:'#5A5A7A', marginTop:'4px' }}>
            💡 Category: <span style={{ color:'#8888A8' }}>Tech / Programming term</span>
          </p>
          <p className="font-mono" style={{ fontSize:'9px', color:'#3A3A5A', marginTop:'2px' }}>
            {MAX_TRY} attempts · {TIME}s · any 5 letters accepted
          </p>
        </div>

        {/* Timer */}
        <div style={{ width:'100%', marginBottom:'0.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
            <span className="font-mono" style={{ fontSize:'8px', color:'#3A3A5A', letterSpacing:'0.1em' }}>TIME REMAINING</span>
            <span className="font-mono" style={{ fontSize:'8px', color:timerClr, letterSpacing:'0.1em', fontWeight:700, transition:'color 0.3s' }}>{timeLeft}s</span>
          </div>
          <div style={{ height:'2px', background:'#1A1A28' }}>
            <div style={{ height:'100%', width:`${timerPct}%`, background:timerClr, transition:'width 1s linear, background 0.3s' }} />
          </div>
        </div>

        {/* Auto-hint banner */}
        <AnimatePresence>
          {hintLetter && (
            <motion.div
              initial={{ opacity:0, y:-8, height:0 }}
              animate={{ opacity:1, y:0, height:'auto' }}
              style={{ width:'100%', marginBottom:'0.5rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'7px 12px',
                background:'rgba(200,250,100,0.06)', border:'1px solid rgba(200,250,100,0.2)' }}>
                <Lightbulb size={13} color="#C8FA64" />
                <span className="font-mono" style={{ fontSize:'10px', color:'#C8FA64', letterSpacing:'0.1em' }}>
                  HINT UNLOCKED — First letter: <strong>{hintLetter}</strong>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message */}
        <div style={{ height:'18px', marginBottom:'0.35rem', width:'100%', textAlign:'center' }}>
          <AnimatePresence>
            {msg && (
              <motion.p key={msg} initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                className="font-mono" style={{ fontSize:'10px', color:'#FF4D6D', letterSpacing:'0.12em' }}>
                {msg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Grid */}
        <div style={{ display:'flex', flexDirection:'column', gap:'4px', marginBottom:'1rem' }}>
          {rows.map((row,r) => (
            <motion.div key={r}
              animate={(row as any).shaking ? {x:[-5,5,-4,4,-2,2,0]} : {}}
              transition={{ duration:0.35 }}
              style={{ display:'flex', gap:'4px' }}>
              {row.cells.map(({l,s}:{l:string; s:CS}, c:number) => {
                const col = C[s]
                return (
                  <motion.div key={c}
                    animate={(row as any).revealing ? {rotateX:[0,-90,0], scale:[1,0.88,1]} : {}}
                    transition={(row as any).revealing ? {delay:c*0.1, duration:0.35, ease:'easeInOut'} : {}}
                    className="font-display"
                    style={{ width:'50px', height:'50px', display:'flex', alignItems:'center', justifyContent:'center',
                      background:col.bg, border:`1px solid ${col.bd}`, fontSize:'20px', fontWeight:'bold',
                      color:col.text, boxShadow:col.glow!=='none'?`0 0 10px ${col.glow}`:'none',
                      transition:'background 0.15s, border-color 0.15s', userSelect:'none' }}>
                    {l}
                  </motion.div>
                )
              })}
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display:'flex', gap:'16px', marginBottom:'0.75rem' }}>
          {[
            { col:C.correct, label:'Correct position' },
            { col:C.present, label:'Wrong position' },
            { col:C.absent,  label:'Not in word' },
          ].map(({col,label}) => (
            <div key={label} style={{ display:'flex', alignItems:'center', gap:'5px' }}>
              <div style={{ width:'14px', height:'14px', background:col.bg, border:`1px solid ${col.bd}` }} />
              <span className="font-mono" style={{ fontSize:'8px', color:'#4A4A62' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Keyboard */}
        {phase==='play' && (
          <div style={{ display:'flex', flexDirection:'column', gap:'4px', alignItems:'center' }}>
            {KEY_ROWS.map((row,r) => (
              <div key={r} style={{ display:'flex', gap:'3px' }}>
                {row.map(key => {
                  const ks = key.length===1 ? kMap[key] : undefined
                  const kc = ks ? KC[ks] : {bg:'#1E1E2E', text:'#8888A8'}
                  const wide = key==='ENTER'||key==='⌫'
                  return (
                    <button key={key}
                      onClick={()=>{ if(key==='ENTER') submit(); else if(key==='⌫') del(); else typeKey(key) }}
                      className="font-mono"
                      style={{ width:wide?'52px':'30px', height:'38px', fontSize:wide?'8px':'12px',
                        fontWeight:700, border:'1px solid #2A2A40', cursor:'pointer',
                        letterSpacing:wide?'0.04em':'0', background:kc.bg, color:kc.text,
                        transition:'all 0.15s', userSelect:'none' }}>
                      {key}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        )}

        {/* Lose panel */}
        {phase==='lose' && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
            style={{ marginTop:'1rem', padding:'1rem 1.5rem', background:'#120812',
              border:'1px solid #FF4D6D', textAlign:'center', width:'100%' }}>
            <p className="font-mono" style={{ fontSize:'11px', color:'#FF4D6D', letterSpacing:'0.12em', marginBottom:'0.75rem' }}>{msg}</p>
            <button onClick={onClose} className="font-mono"
              style={{ padding:'0.5rem 1.5rem', background:'rgba(255,77,109,0.1)',
                border:'1px solid #FF4D6D', color:'#FF4D6D', cursor:'pointer',
                fontSize:'10px', letterSpacing:'0.1em' }}>
              EXIT TERMINAL
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
