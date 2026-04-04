import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { SkipForward } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type IntroLoaderProps = {
  showIntro: boolean
  onComplete: () => void
}

type LogoScreenProps = {
  imageSrc?: string
  imageAlt?: string
  label?: string
  subtitle?: string
  accent?: 'lime' | 'warm'
  reveal?: boolean
  trimBorder?: boolean
}

type Star = {
  left: number
  top: number
  size: number
  opacity: number
  duration: number
  delay: number
}

const INTRO_TIMINGS = {
  screenOne: 1200,
  screenTwo: 1200,
  screenThree: 1400,
  exit: 240,
} as const

const shellVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.12, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 1.001, transition: { duration: 0.2, ease: 'easeInOut' } },
}

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -4, scale: 1.001, transition: { duration: 0.12, ease: 'easeInOut' } },
}

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
}

const labelVariants: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: 'easeOut' } },
  exit: { opacity: 0, y: -4, scale: 1.005, transition: { duration: 0.12, ease: 'easeInOut' } },
}

function buildStars(count: number): Star[] {
  return Array.from({ length: count }, (_, index) => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 1.4 + 0.5,
    opacity: Math.random() * 0.45 + 0.08,
    duration: Math.random() * 5 + 3,
    delay: index * 0.03,
  }))
}

function ParticleField() {
  const particles = useMemo(() => {
    // Optimized particle count for performance
    return buildStars(10)
  }, [])

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,250,100,0.12),transparent_32%),radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,6,0.82),rgba(8,8,12,0.98))]" />
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity * 0.55,
          }}
        />
      ))}
    </div>
  )
}

function LogoScreen({
  imageSrc,
  imageAlt,
  label,
  subtitle,
  accent = 'lime',
  reveal = false,
  trimBorder = false,
}: LogoScreenProps) {
  const lowerSrc = imageSrc?.toLowerCase() ?? ''
  const isZyphoria = lowerSrc.includes('zyphoria')
  const isZyphoriaMain = lowerSrc.includes('zyphoria.png')
  const isIdatamind = lowerSrc.includes('idatamind')
  const isRit = lowerSrc.includes('ritlogo')

  const glowClass = accent === 'lime'
    ? 'bg-[radial-gradient(circle,rgba(200,250,100,0.22),transparent_60%)]'
    : 'bg-[radial-gradient(circle,rgba(251,146,60,0.22),transparent_60%)]'

  return (
    <motion.section
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-8"
    >
      <div className={`absolute inset-x-0 top-1/2 mx-auto ${isZyphoriaMain ? 'h-96 sm:h-144' : 'h-144'} w-[min(90vw,68rem)] -translate-y-1/2 rounded-full ${isZyphoriaMain ? 'blur-xl sm:blur-2xl' : 'blur-2xl'} ${glowClass}`} />

      <div
        className="relative flex w-full flex-col items-center justify-center gap-6"
        style={undefined}
      >
        {label ? (
          <motion.p
            variants={labelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`font-mono text-center uppercase tracking-[0.2em] relative z-30 ${
              isZyphoriaMain
                ? 'text-xs sm:text-sm'
                : isZyphoria
                ? 'text-sm sm:text-lg md:text-xl font-bold'
                : 'text-xs sm:text-sm'
            }`}
            style={{
              marginBottom: isZyphoriaMain ? '12px' : isZyphoria ? '-5.5rem' : '0',
              color: isZyphoriaMain ? 'rgba(255,255,255,0.8)' : isZyphoria ? '#C8FA64' : 'rgba(255,255,255,0.8)',
              textShadow:
                isZyphoriaMain
                  ? '0 0 16px rgba(255,255,255,0.4)'
                  : isZyphoria
                  ? '0 0 16px rgba(200,250,100,0.55)'
                  : '0 0 16px rgba(255,255,255,0.4)',
            }}
          >
            {label}
          </motion.p>
        ) : null}

        {subtitle && isZyphoriaMain ? (
          <p
            className="font-mono text-center uppercase tracking-[0.22em] leading-tight text-sm font-semibold text-lime-100/95 sm:text-2xl md:text-3xl"
            style={{
              marginBottom: '0.15rem',
              textShadow: '0 0 14px rgba(200,250,100,0.28)',
            }}
          >
            {subtitle}
          </p>
        ) : null}

        {imageSrc ? (
          <motion.div
            variants={logoVariants}
            className={`relative flex items-center justify-center sm:mx-auto ${
              isRit
                ? 'w-[min(80vw,28rem)] sm:w-[min(70vw,32rem)] lg:w-[min(55vw,36rem)]'
                : isZyphoriaMain
                ? 'w-[min(85vw,32rem)] sm:w-[min(75vw,42rem)] lg:w-[min(65vw,52rem)]'
                : imageSrc?.toLowerCase().includes('idatamind')
                ? 'w-[75vw] sm:w-[65vw] lg:w-[50vw] max-w-[44rem]'
                : 'w-[min(90vw,36rem)] sm:w-[min(80vw,44rem)] lg:w-[min(70vw,52rem)]'
            }`}
            animate="visible"
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <img
              src={imageSrc}
              alt={imageAlt ?? 'Logo'}
              className={`h-auto w-full max-w-full object-contain ${
                trimBorder
                  ? '[clip-path:inset(2%_1.5%_2%_1.5%)]'
                  : ''
              }`}
              style={{
                filter:
                  isIdatamind || isRit
                    ? 'drop-shadow(0 0 7px rgba(255,255,255,0.65)) drop-shadow(0 0 14px rgba(255,255,255,0.35))'
                    : isZyphoriaMain
                      ? 'brightness(1.02) saturate(1.02) contrast(1.02) drop-shadow(0 0 6px rgba(200,250,100,0.2))'
                      : undefined,
                mixBlendMode: isZyphoriaMain ? 'lighten' : undefined,
                imageRendering: (isRit ? 'high-quality' : 'auto') as any,
              }}
              draggable={false}
            />
          </motion.div>
        ) : null}

        {subtitle && !isZyphoriaMain ? (
          <p
            className={`font-mono text-center uppercase tracking-[0.22em] leading-tight ${
              isZyphoriaMain
                ? 'text-sm font-semibold text-lime-100/95 sm:text-2xl md:text-3xl'
                : 'text-white/65 text-xs sm:text-sm'
            }`}
            style={{
              marginTop: isZyphoriaMain ? '0.15rem' : undefined,
              textShadow: isZyphoriaMain ? '0 0 14px rgba(200,250,100,0.28)' : undefined,
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </motion.section>
  )
}

export function IntroLoader({ showIntro, onComplete }: IntroLoaderProps) {
  const [screen, setScreen] = useState<1 | 2 | 3>(1)
  const [closing, setClosing] = useState(false)
  const closeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!showIntro || typeof window === 'undefined') {
      return
    }

    if (window.sessionStorage.getItem('intro_seen') === 'true') {
      onComplete()
      return
    }

    setScreen(1)

    const screenTwoTimer = window.setTimeout(() => setScreen(2), INTRO_TIMINGS.screenOne)
    const screenThreeTimer = window.setTimeout(() => setScreen(3), INTRO_TIMINGS.screenOne + INTRO_TIMINGS.screenTwo)
    const finishTimer = window.setTimeout(() => {
      if (closeTimerRef.current !== null) {
        return
      }

      window.sessionStorage.setItem('intro_seen', 'true')
      setClosing(true)
      closeTimerRef.current = window.setTimeout(onComplete, INTRO_TIMINGS.exit)
    }, INTRO_TIMINGS.screenOne + INTRO_TIMINGS.screenTwo + INTRO_TIMINGS.screenThree)

    return () => {
      window.clearTimeout(screenTwoTimer)
      window.clearTimeout(screenThreeTimer)
      window.clearTimeout(finishTimer)

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
    }
  }, [onComplete, showIntro])

  if (!showIntro) {
    return null
  }

  const skipIntro = () => {
    if (typeof window === 'undefined') {
      onComplete()
      return
    }

    window.sessionStorage.setItem('intro_seen', 'true')
    setClosing(true)

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
    }

    closeTimerRef.current = window.setTimeout(onComplete, INTRO_TIMINGS.exit)
  }

  return (
    <AnimatePresence>
      <motion.div
        key="intro-loader"
        variants={shellVariants}
        initial="hidden"
        animate={closing ? 'exit' : 'visible'}
        exit="exit"
        className="fixed inset-0 z-1000 overflow-hidden bg-[#050508] text-white"
        style={{ willChange: 'opacity, transform' }}
      >
        <ParticleField />

        <button
          type="button"
          onClick={skipIntro}
          className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/70 backdrop-blur-md transition hover:border-lime-300/40 hover:bg-lime-300/10 hover:text-lime-100 sm:right-6 sm:top-6"
        >
          <SkipForward size={14} />
          Skip
        </button>

        <AnimatePresence>
          {screen === 1 ? (
            <LogoScreen
              key="screen-one"
              imageSrc="/ritlogo.png"
              imageAlt="Rajalakshmi Institute of Technology"
              label="Presented by"
            />
          ) : null}

          {screen === 2 ? (
            <LogoScreen
              key="screen-two"
              imageSrc="/idatamind.png"
              imageAlt="iDataMind"
              label="Associated with"
              accent="warm"
            />
          ) : null}

          {screen === 3 ? (
            <LogoScreen
              key="screen-three"
              imageSrc="/zyphoria.png"
              imageAlt="Zyphoria '26"
              accent="lime"
              subtitle="Department of Computer Science and Engineering"
            />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
