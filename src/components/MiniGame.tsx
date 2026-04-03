// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import { X, Gift } from 'lucide-react'
import { motion } from 'framer-motion'

/** Website developers — revealed after opening the prize at 10 pts. */
const WEBSITE_DEVELOPERS: string[] = [
  'Josewa Aghai',
  'Jegadeesh',
  'Jebin Rufus',
  'Jeevesh',
]

const WIN_SCORE = 10

// Easy mode: wide gaps, slow pipes, soft gravity
const GRAVITY = 0.22
const FLAP = -5.6
const PIPE_SPEED = 1.55
const PIPE_WIDTH = 52
const GAP_HEIGHT = 188
const PIPE_INTERVAL = 300
const BIRD_X = 76
const BIRD_R = 11
const GROUND_H = 56
const LIME = '#C8FA64'
const SKY_TOP = '#06060e'
const SKY_MID = '#0e1022'

type Pipe = { x: number; gapY: number; passed: boolean }

function MiniGameCanvas({
  onWin,
  onGameOver,
  flapRef,
}: {
  onWin: () => void
  onGameOver: () => void
  flapRef: MutableRefObject<() => void>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const stateRef = useRef({
    birdY: 0,
    vy: 0,
    pipes: [] as Pipe[],
    score: 0,
    ended: false,
    frameCount: 0,
  })

  const reset = useCallback((h: number) => {
    const s = stateRef.current
    s.birdY = h * 0.42
    s.vy = 0
    s.pipes = [{ x: 300, gapY: h * 0.45, passed: false }]
    s.score = 0
    s.ended = false
    s.frameCount = 0
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const playBottom = H - GROUND_H
    reset(H)

    const spawnPipe = (pipes: Pipe[], lastX: number) => {
      const minGapY = GAP_HEIGHT / 2 + 48
      const maxGapY = playBottom - GAP_HEIGHT / 2 - 48
      const gapY = minGapY + Math.random() * Math.max(8, maxGapY - minGapY)
      pipes.push({ x: lastX + PIPE_INTERVAL, gapY, passed: false })
    }

    const flap = () => {
      const s = stateRef.current
      if (s.ended) return
      s.vy = FLAP
    }
    flapRef.current = flap

    const tick = () => {
      const s = stateRef.current
      if (s.ended) return

      s.frameCount++
      s.vy += GRAVITY
      s.birdY += s.vy

      if (s.birdY - BIRD_R <= 0) {
        s.ended = true
        onGameOver()
        return
      }
      if (s.birdY + BIRD_R >= playBottom) {
        s.ended = true
        onGameOver()
        return
      }

      const pipes = s.pipes
      for (const p of pipes) {
        p.x -= PIPE_SPEED
      }
      while (pipes.length && pipes[0].x + PIPE_WIDTH < 0) {
        pipes.shift()
      }
      const last = pipes[pipes.length - 1]
      if (last && last.x < W - PIPE_INTERVAL) {
        spawnPipe(pipes, last.x)
      }

      for (const p of pipes) {
        if (!p.passed && p.x + PIPE_WIDTH < BIRD_X) {
          p.passed = true
          s.score++
          if (s.score >= WIN_SCORE) {
            s.ended = true
            onWin()
            return
          }
        }
      }

      for (const p of pipes) {
        const inX = BIRD_X + BIRD_R > p.x && BIRD_X - BIRD_R < p.x + PIPE_WIDTH
        if (!inX) continue
        const gapTop = p.gapY - GAP_HEIGHT / 2
        const gapBot = p.gapY + GAP_HEIGHT / 2
        if (s.birdY - BIRD_R < gapTop || s.birdY + BIRD_R > gapBot) {
          s.ended = true
          onGameOver()
          return
        }
      }

      const sky = ctx.createLinearGradient(0, 0, 0, playBottom)
      sky.addColorStop(0, SKY_TOP)
      sky.addColorStop(0.55, SKY_MID)
      sky.addColorStop(1, '#12141c')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, W, playBottom)

      ctx.strokeStyle = 'rgba(200,250,100,0.04)'
      ctx.lineWidth = 1
      const gridOff = s.frameCount * 0.35
      for (let gx = -40; gx < W + 40; gx += 28) {
        ctx.beginPath()
        ctx.moveTo(gx - (gridOff % 28), 0)
        ctx.lineTo(gx - (gridOff % 28), playBottom)
        ctx.stroke()
      }
      for (let gy = 0; gy < playBottom; gy += 28) {
        ctx.beginPath()
        ctx.moveTo(0, gy)
        ctx.lineTo(W, gy)
        ctx.stroke()
      }

      for (let i = 0; i < 42; i++) {
        const sx = ((i * 61 + (gridOff * 2)) % (W + 20)) - 10
        const sy = ((i * 97) % playBottom)
        ctx.fillStyle = `rgba(200,250,100,${0.04 + (i % 5) * 0.02})`
        ctx.fillRect(sx, sy, 1.5, 1.5)
      }

      for (const p of pipes) {
        const gt = p.gapY - GAP_HEIGHT / 2
        const gb = p.gapY + GAP_HEIGHT / 2
        const cap = 14
        const bodyGrad = ctx.createLinearGradient(p.x, 0, p.x + PIPE_WIDTH, 0)
        bodyGrad.addColorStop(0, '#16161f')
        bodyGrad.addColorStop(0.5, '#1e1e2a')
        bodyGrad.addColorStop(1, '#141418')
        const drawPipe = (top: number, height: number, roundBottom: boolean) => {
          ctx.fillStyle = bodyGrad
          ctx.strokeStyle = LIME
          ctx.lineWidth = 2
          if (typeof ctx.roundRect === 'function') {
            ctx.beginPath()
            ctx.roundRect(p.x, top, PIPE_WIDTH, height, roundBottom ? [0, 0, 8, 8] : [8, 8, 0, 0])
            ctx.fill()
            ctx.stroke()
          } else {
            ctx.fillRect(p.x, top, PIPE_WIDTH, height)
            ctx.strokeRect(p.x, top, PIPE_WIDTH, height)
          }
          ctx.fillStyle = 'rgba(200,250,100,0.12)'
          ctx.fillRect(p.x + 4, top, 5, Math.min(cap, height))
          ctx.fillStyle = LIME
          ctx.fillRect(p.x, roundBottom ? top + height - cap : top, PIPE_WIDTH, Math.min(cap, height))
          ctx.strokeRect(p.x, roundBottom ? top + height - cap : top, PIPE_WIDTH, Math.min(cap, height))
        }
        drawPipe(0, gt, true)
        drawPipe(gb, playBottom - gb, false)
      }

      const groundGrad = ctx.createLinearGradient(0, playBottom, 0, H)
      groundGrad.addColorStop(0, '#0c0c14')
      groundGrad.addColorStop(1, '#050508')
      ctx.fillStyle = groundGrad
      ctx.fillRect(0, playBottom, W, GROUND_H)
      ctx.strokeStyle = LIME
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.7
      ctx.beginPath()
      ctx.moveTo(0, playBottom)
      ctx.lineTo(W, playBottom)
      ctx.stroke()
      ctx.globalAlpha = 1
      for (let gx = 0; gx < W + 30; gx += 24) {
        ctx.strokeStyle = 'rgba(200,250,100,0.08)'
        ctx.beginPath()
        ctx.moveTo(gx, playBottom + 4)
        ctx.lineTo(gx - 14, H - 4)
        ctx.stroke()
      }

      // Simple “normal” bird — browns / tan, no glow
      const tilt = Math.max(-0.42, Math.min(0.48, s.vy * 0.045))
      const body = '#6B5344'
      const belly = '#C4A882'
      const wing = '#4A3B30'
      const outline = '#3D3128'

      ctx.save()
      ctx.translate(BIRD_X, s.birdY)
      ctx.rotate(tilt)

      ctx.fillStyle = wing
      ctx.beginPath()
      ctx.ellipse(-3, 3, BIRD_R * 0.52, BIRD_R * 0.34, -0.35, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = body
      ctx.beginPath()
      ctx.ellipse(1, 0, BIRD_R * 1.05, BIRD_R * 0.88, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = belly
      ctx.beginPath()
      ctx.ellipse(3, 3, BIRD_R * 0.62, BIRD_R * 0.48, 0.12, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = body
      ctx.beginPath()
      ctx.arc(BIRD_R * 0.75, -BIRD_R * 0.32, BIRD_R * 0.58, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#E19A3A'
      ctx.beginPath()
      ctx.moveTo(BIRD_R * 1.22, -BIRD_R * 0.32)
      ctx.lineTo(BIRD_R * 1.78, -BIRD_R * 0.22)
      ctx.lineTo(BIRD_R * 1.22, -BIRD_R * 0.08)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = '#F4F4F0'
      ctx.beginPath()
      ctx.arc(BIRD_R * 1.02, -BIRD_R * 0.48, 3.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#1C1C1C'
      ctx.beginPath()
      ctx.arc(BIRD_R * 1.1, -BIRD_R * 0.46, 1.35, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = outline
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(1, 0, BIRD_R * 1.05, BIRD_R * 0.88, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(BIRD_R * 0.75, -BIRD_R * 0.32, BIRD_R * 0.58, 0, Math.PI * 2)
      ctx.stroke()

      ctx.restore()

      ctx.fillStyle = 'rgba(6,8,12,0.82)'
      ctx.strokeStyle = 'rgba(200,250,100,0.4)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      if (typeof ctx.roundRect === 'function') ctx.roundRect(10, 8, 124, 40, 8)
      else ctx.rect(10, 8, 124, 40)
      ctx.fill()
      ctx.stroke()
      ctx.font = '600 11px ui-monospace, monospace'
      ctx.fillStyle = '#5A5A7A'
      ctx.textAlign = 'left'
      ctx.fillText('PTS', 22, 24)
      ctx.font = 'bold 22px ui-monospace, monospace'
      ctx.fillStyle = LIME
      ctx.textAlign = 'right'
      ctx.fillText(String(s.score), 122, 36)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      flapRef.current = () => {}
    }
  }, [flapRef, onGameOver, onWin, reset])

  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={520}
      onPointerDown={(e) => {
        e.preventDefault()
        flapRef.current?.()
      }}
      style={{
        width: '100%',
        maxWidth: 360,
        height: 'auto',
        touchAction: 'none',
        cursor: 'pointer',
        border: '2px solid rgba(200,250,100,0.35)',
        borderRadius: 4,
        display: 'block',
        margin: '0 auto',
        boxShadow: '0 0 32px rgba(200,250,100,0.12), 0 16px 48px rgba(0,0,0,0.45)',
        background: '#08080c',
      }}
    />
  )
}

function FlappyWrapper({
  onWin,
  onGameOver,
}: {
  onWin: () => void
  onGameOver: () => void
}) {
  const flapRef = useRef<() => void>(() => {})

  useEffect(() => {
    const fn = () => flapRef.current?.()
    window.addEventListener('flappy-flap', fn)
    return () => window.removeEventListener('flappy-flap', fn)
  }, [])

  return <MiniGameCanvas onWin={onWin} onGameOver={onGameOver} flapRef={flapRef} />
}

export function MiniGame({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<'play' | 'win' | 'lose'>('play')
  const [key, setKey] = useState(0)
  const [prizeOpened, setPrizeOpened] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.code === 'Space') e.preventDefault()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  useEffect(() => {
    if (phase !== 'play') return
    const h = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('flappy-flap'))
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [phase])

  const handleWin = useCallback(() => setPhase('win'), [])
  const handleLose = useCallback(() => setPhase('lose'), [])

  const restart = () => {
    setPrizeOpened(false)
    setPhase('play')
    setKey((k) => k + 1)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(6,6,10,0.97)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 220ms',
        padding: '1rem',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(200,250,100,0.02) 3px,rgba(200,250,100,0.02) 4px)',
        }}
      />

      <button
        type="button"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          background: 'none',
          border: 'none',
          color: '#4A4A62',
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        <X size={22} />
      </button>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          <p
            className="font-mono"
            style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C8FA64', marginBottom: '4px' }}
          >
            [ NEON CORRIDOR // FLIGHT ]
          </p>
          <h2
            className="font-display uppercase"
            style={{ fontSize: 'clamp(18px,3vw,22px)', color: '#EEEEF5', letterSpacing: '-0.02em' }}
          >
            <span style={{ color: '#C8FA64' }}>Zyphoria</span>{' '}
            <span style={{ color: '#8888A8' }}>Run</span>
          </h2>
          <p className="font-mono" style={{ fontSize: '10px', color: '#5A5A7A', marginTop: '6px' }}>
            Tap / Space · {WIN_SCORE} pts · Intermediate
          </p>
        </div>

        {phase === 'play' && <FlappyWrapper key={key} onWin={handleWin} onGameOver={handleLose} />}

        {phase === 'win' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '2rem 1.5rem',
              background: '#0D0D14',
              border: '1px solid rgba(200,250,100,0.35)',
              boxShadow: '0 0 40px rgba(200,250,100,0.12)',
              maxWidth: 400,
              margin: '0 auto',
            }}
          >
            <p className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C8FA64', marginBottom: '0.75rem' }}>
              ◈ RUN COMPLETE — {WIN_SCORE} PTS
            </p>

            {!prizeOpened ? (
              <>
                <h3
                  className="font-display uppercase"
                  style={{ fontSize: 'clamp(24px,5vw,32px)', color: '#EEEEF5', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}
                >
                  You won!
                </h3>
                <p className="font-mono" style={{ fontSize: '12px', color: '#6A6A8A', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  A sealed prize is waiting — open it to see who built this site.
                </p>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}
                >
                  <div
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: 0,
                      border: '2px solid rgba(200,250,100,0.45)',
                      background: 'linear-gradient(145deg, rgba(200,250,100,0.12), rgba(200,250,100,0.03))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 32px rgba(200,250,100,0.15), inset 0 0 24px rgba(200,250,100,0.06)',
                    }}
                  >
                    <Gift size={40} strokeWidth={1.2} color="#C8FA64" />
                  </div>
                </motion.div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPrizeOpened(true)}
                  className="font-display uppercase"
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    background: '#C8FA64',
                    color: '#08080C',
                    border: 'none',
                    fontSize: '13px',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    boxShadow: '0 0 24px rgba(200,250,100,0.35)',
                  }}
                >
                  Open prize
                </motion.button>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
                <p className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#C8FA64', marginBottom: '0.75rem' }}>
                  ◈ PRIZE UNLOCKED
                </p>
                <h3
                  className="font-display uppercase"
                  style={{ fontSize: 'clamp(20px,4vw,26px)', color: '#EEEEF5', marginBottom: '1rem' }}
                >
                  Website developers
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', textAlign: 'left' }}>
                  {WEBSITE_DEVELOPERS.map((name, i) => (
                    <motion.li
                      key={name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * i }}
                      className="font-mono"
                      style={{
                        fontSize: '14px',
                        color: '#B8B8D0',
                        padding: '10px 12px',
                        marginBottom: '6px',
                        background: 'rgba(200,250,100,0.04)',
                        border: '1px solid rgba(200,250,100,0.12)',
                      }}
                    >
                      <span style={{ color: '#5A5A7A', marginRight: '10px', fontSize: '10px' }}>{String(i + 1).padStart(2, '0')}</span>
                      {name}
                    </motion.li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={restart}
                    className="font-mono"
                    style={{
                      padding: '10px 20px',
                      background: 'rgba(200,250,100,0.1)',
                      border: '1px solid #C8FA64',
                      color: '#C8FA64',
                      cursor: 'pointer',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                    }}
                  >
                    PLAY AGAIN
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-mono"
                    style={{
                      padding: '10px 20px',
                      background: 'transparent',
                      border: '1px solid #2A2A40',
                      color: '#8888A8',
                      cursor: 'pointer',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                    }}
                  >
                    CLOSE
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {phase === 'lose' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '2rem',
              background: '#120810',
              border: '1px solid rgba(255,77,109,0.4)',
            }}
          >
            <p className="font-mono" style={{ fontSize: '12px', color: '#FF4D6D', marginBottom: '1rem', letterSpacing: '0.12em' }}>
              SIGNAL LOST — TRY AGAIN
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={restart}
                className="font-mono"
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255,77,109,0.15)',
                  border: '1px solid #FF4D6D',
                  color: '#FF4D6D',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                RETRY
              </button>
              <button
                type="button"
                onClick={onClose}
                className="font-mono"
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  border: '1px solid #2A2A40',
                  color: '#8888A8',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                EXIT
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
