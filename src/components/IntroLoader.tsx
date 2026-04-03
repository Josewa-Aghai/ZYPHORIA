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
  screenOne: 2600,
  screenTwo: 2600,
  screenThree: 3200,
  exit: 900,
} as const

const shellVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.7, ease: 'easeInOut' } },
}

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, scale: 1.02, transition: { duration: 0.35, ease: 'easeInOut' } },
}

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.82, filter: 'blur(10px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1, ease: 'easeOut' } },
}

const labelVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, scale: 1.01, transition: { duration: 0.35, ease: 'easeInOut' } },
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
  const particles = useMemo(() => buildStars(80), [])

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,250,100,0.16),transparent_30%),radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_bottom,rgba(200,250,100,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,6,0.82),rgba(8,8,12,0.98))]" />
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{ opacity: [particle.opacity * 0.25, particle.opacity, particle.opacity * 0.45] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
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
  const isZyphoria1 = lowerSrc.includes('zyphoria1')
  const isZyphoria2 = lowerSrc.includes('zyphoria2')
  const isZyphoriaMain = lowerSrc.includes('zyphoria.png') && !isZyphoria1
  const isZyphoriaWordmark = isZyphoria1 || isZyphoria2 || isZyphoriaMain
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
      <div className={`absolute inset-x-0 top-1/2 mx-auto h-192 w-[min(94vw,78rem)] -translate-y-1/2 rounded-full blur-3xl ${glowClass}`} />

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
              isZyphoriaWordmark
                ? 'text-xs sm:text-sm'
                : isZyphoria
                ? 'text-sm sm:text-lg md:text-xl font-bold'
                : 'text-xs sm:text-sm'
            }`}
            style={{
              marginBottom: isZyphoriaWordmark ? '12px' : isZyphoria ? '-5.5rem' : '0',
              color: isZyphoriaWordmark ? 'rgba(255,255,255,0.8)' : isZyphoria ? '#C8FA64' : 'rgba(255,255,255,0.8)',
              textShadow:
                isZyphoriaWordmark
                  ? '0 0 16px rgba(255,255,255,0.4)'
                  : isZyphoria
                  ? '0 0 16px rgba(200,250,100,0.55)'
                  : '0 0 16px rgba(255,255,255,0.4)',
            }}
          >
            {label}
          </motion.p>
        ) : null}

        {imageSrc ? (
          <motion.div
            variants={logoVariants}
            className={`relative flex items-center justify-center sm:mx-auto ${
              isRit
                ? 'w-[min(80vw,28rem)] sm:w-[min(70vw,32rem)] lg:w-[min(55vw,36rem)]'
                : imageSrc?.toLowerCase().includes('idatamind')
                ? 'w-[75vw] sm:w-[65vw] lg:w-[50vw] max-w-[44rem]'
                : 'w-[min(90vw,36rem)] sm:w-[min(80vw,44rem)] lg:w-[min(70vw,52rem)]'
            }`}
            animate={
              reveal
                ? {
                    scale: [1, 1.04, 1],
                    filter: [
                      'drop-shadow(0 0 0 rgba(0,0,0,0))',
                      'drop-shadow(0 0 26px rgba(200,250,100,0.42))',
                      'drop-shadow(0 0 46px rgba(200,250,100,0.75))',
                    ],
                    opacity: 1,
                  }
                : 'visible'
            }
            transition={
              reveal
                ? { duration: 2.8, repeat: Number.POSITIVE_INFINITY, repeatType: 'mirror' }
                : { duration: 1, ease: 'easeOut' }
            }
          >
            <img
              src={imageSrc}
              alt={imageAlt ?? 'Logo'}
              className={`h-auto w-full max-w-full object-contain ${
                trimBorder
                  ? '[clip-path:inset(2%_1.5%_2%_1.5%)]'
                  : isZyphoriaMain
                  ? '[clip-path:inset(32%_11%_34%_11%)]'
                  : ''
              }`}
              style={{
                mixBlendMode: isZyphoriaWordmark ? 'lighten' : undefined,
                filter:
                  isIdatamind || isRit
                    ? 'drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 22px rgba(255,255,255,0.6))'
                    : isZyphoriaWordmark
                      ? 'brightness(1.08) saturate(1.08) contrast(1.06) drop-shadow(0 0 14px rgba(200,250,100,0.35))'
                      : undefined,
                imageRendering: (isRit ? 'high-quality' : 'auto') as any,
              }}
              draggable={false}
            />
          </motion.div>
        ) : null}

        {subtitle ? (
          <p className="font-mono text-center text-xs uppercase tracking-[0.22em] text-white/65 sm:text-sm">
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

        <AnimatePresence mode="wait">
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
              imageSrc="/zyphoria2.png"
              imageAlt="Zyphoria '26"
              label="Department of Computer Science and Engineering"
              accent="lime"
              reveal
            />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
