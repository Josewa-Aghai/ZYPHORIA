import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowRight, SkipForward } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

type IntroLoaderProps = {
  showIntro: boolean
  onComplete: () => void
}

type LogoScreenProps = {
  eyebrow: string
  title: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  children?: ReactNode
  accent?: 'lime' | 'warm'
  reveal?: boolean
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
  screenOne: 1500,
  screenTwo: 1500,
  screenThree: 2000,
  exit: 500,
} as const

const shellVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.4, ease: 'easeInOut' } },
}

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, scale: 1.02, transition: { duration: 0.28, ease: 'easeInOut' } },
}

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.86, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' } },
}

const sponsorList = [
  { src: '/idatamind.png', alt: 'iDataMind' },
  { src: '/rit.png', alt: 'Rajalakshmi Institute of Technology' },
  { label: 'Associate Sponsor', alt: 'Associate Sponsor' },
]

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
  const particles = useMemo(() => buildStars(60), [])

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,250,100,0.18),transparent_42%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_48%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,12,0.7),rgba(8,8,12,0.96))]" />
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
          animate={{ opacity: [particle.opacity * 0.35, particle.opacity, particle.opacity * 0.5] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function LogoScreen({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  accent = 'lime',
  reveal = false,
}: LogoScreenProps) {
  const glowClass = accent === 'lime'
    ? 'bg-[radial-gradient(circle,rgba(200,250,100,0.22),transparent_68%)]'
    : 'bg-[radial-gradient(circle,rgba(251,146,60,0.22),transparent_68%)]'

  return (
    <motion.section
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8"
    >
      <div className={`absolute inset-x-0 top-1/2 mx-auto h-72 w-[min(76vw,58rem)] -translate-y-1/2 rounded-full blur-3xl ${glowClass}`} />

      <div className="relative w-full max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-5 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-8 sm:py-14">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <span className="text-[10px] uppercase tracking-[0.32em] text-white/45">{eyebrow}</span>
          <span className="text-[10px] uppercase tracking-[0.32em] text-white/30">Zyphoria '26</span>
        </div>

        <div className="flex min-h-[26rem] flex-col items-center justify-center gap-8 text-center sm:min-h-[30rem]">
          {imageSrc ? (
            <motion.div
              variants={logoVariants}
              className="relative w-full max-w-[20rem] sm:max-w-[28rem]"
              animate={reveal ? { scale: [1, 1.03, 1], filter: ['drop-shadow(0 0 0 rgba(0,0,0,0))', 'drop-shadow(0 0 32px rgba(200,250,100,0.45))', 'drop-shadow(0 0 56px rgba(200,250,100,0.7))'] } : undefined}
              transition={{ duration: 2.1, repeat: reveal ? Number.POSITIVE_INFINITY : 0, repeatType: 'mirror' }}
            >
              <img src={imageSrc} alt={imageAlt ?? title} className="h-auto w-full object-contain" draggable={false} />
            </motion.div>
          ) : null}

          <div className="space-y-3">
            <motion.p className="mx-auto max-w-3xl text-[11px] uppercase tracking-[0.32em] text-white/55" variants={contentVariants}>
              {eyebrow}
            </motion.p>
            <motion.p className="mx-auto max-w-3xl text-xl font-semibold uppercase tracking-[0.2em] text-white sm:text-2xl" variants={contentVariants}>
              {title}
            </motion.p>
            {description ? (
              <motion.p className="mx-auto max-w-2xl text-sm leading-6 text-white/78 sm:text-base" variants={contentVariants}>
                {description}
              </motion.p>
            ) : null}
          </div>

          {children ? <div className="w-full">{children}</div> : null}
        </div>
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
        className="fixed inset-0 z-[1000] overflow-hidden bg-[color:var(--bg)] text-white"
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
              eyebrow="Powered by"
              title="Rajalakshmi Institute of Technology"
              description="The college community that powers ZYPHORIA '26."
              imageSrc="/rit.png"
              imageAlt="Rajalakshmi Institute of Technology"
            />
          ) : null}

          {screen === 2 ? (
            <LogoScreen
              key="screen-two"
              eyebrow="Associate Sponsors"
              title="Backed by partners building the experience"
              description="A curated set of supporters helping shape the event atmosphere."
            >
              <motion.div
                className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
                }}
              >
                {sponsorList.map((sponsor) => (
                  <motion.div
                    key={sponsor.alt}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.94 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
                    }}
                    className="flex min-h-32 items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-6 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl"
                  >
                    {sponsor.src ? (
                      <img src={sponsor.src} alt={sponsor.alt} className="max-h-16 w-full object-contain opacity-95" draggable={false} />
                    ) : (
                      <div className="text-center">
                        <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">Sponsor</div>
                        <div className="mt-3 text-xl font-semibold tracking-[0.2em] text-lime-100">{sponsor.label}</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </LogoScreen>
          ) : null}

          {screen === 3 ? (
            <LogoScreen
              key="screen-three"
              eyebrow="Presented by"
              title="Department of Computer Science and Engineering"
              description="ZYPHORIA '26 emerges from the center of the frame."
              imageSrc="/Zyphoria.png"
              imageAlt="Zyphoria '26"
              accent="lime"
              reveal
            >
              <motion.div
                className="mt-1 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
              >
                <span className="h-px w-10 bg-lime-300/50" />
                <span className="inline-flex items-center gap-2 text-lime-100/80">
                  Main reveal
                  <ArrowRight size={12} />
                </span>
                <span className="h-px w-10 bg-lime-300/50" />
              </motion.div>
            </LogoScreen>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
