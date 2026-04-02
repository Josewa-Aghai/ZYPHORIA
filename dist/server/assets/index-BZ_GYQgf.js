import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SkipForward, ArrowRight, SearchCode, Bot, Paintbrush, MapPin, Presentation, Briefcase, Bug, Mic, Image, Box, Video, AppWindow, Gamepad2, Megaphone, CheckCircle, Upload, Loader2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
const INTRO_TIMINGS = {
  screenOne: 1500,
  screenTwo: 1500,
  screenThree: 2e3,
  exit: 500
};
const shellVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.4, ease: "easeInOut" } }
};
const contentVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, scale: 1.02, transition: { duration: 0.28, ease: "easeInOut" } }
};
const logoVariants = {
  hidden: { opacity: 0, scale: 0.86, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } }
};
const sponsorList = [
  { src: "/idatamind.png", alt: "iDataMind" },
  { src: "/rit.png", alt: "Rajalakshmi Institute of Technology" },
  { label: "Associate Sponsor", alt: "Associate Sponsor" }
];
function buildStars(count) {
  return Array.from({ length: count }, (_, index) => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 1.4 + 0.5,
    opacity: Math.random() * 0.45 + 0.08,
    duration: Math.random() * 5 + 3,
    delay: index * 0.03
  }));
}
function ParticleField() {
  const particles = useMemo(() => buildStars(60), []);
  return /* @__PURE__ */ jsxs("div", { "aria-hidden": "true", className: "absolute inset-0 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,250,100,0.18),transparent_42%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_48%)]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,12,0.7),rgba(8,8,12,0.96))]" }),
    particles.map((particle, index) => /* @__PURE__ */ jsx(
      motion.span,
      {
        className: "absolute rounded-full bg-white",
        style: {
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity
        },
        animate: { opacity: [particle.opacity * 0.35, particle.opacity, particle.opacity * 0.5] },
        transition: { duration: particle.duration, delay: particle.delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
      },
      index
    ))
  ] });
}
function LogoScreen({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  accent = "lime",
  reveal = false
}) {
  const glowClass = accent === "lime" ? "bg-[radial-gradient(circle,rgba(200,250,100,0.22),transparent_68%)]" : "bg-[radial-gradient(circle,rgba(251,146,60,0.22),transparent_68%)]";
  return /* @__PURE__ */ jsxs(
    motion.section,
    {
      variants: contentVariants,
      initial: "hidden",
      animate: "visible",
      exit: "exit",
      className: "relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8",
      children: [
        /* @__PURE__ */ jsx("div", { className: `absolute inset-x-0 top-1/2 mx-auto h-72 w-[min(76vw,58rem)] -translate-y-1/2 rounded-full blur-3xl ${glowClass}` }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-5 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-8 sm:py-14", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 border-b border-white/10 pb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.32em] text-white/45", children: eyebrow }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.32em] text-white/30", children: "Zyphoria '26" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex min-h-[26rem] flex-col items-center justify-center gap-8 text-center sm:min-h-[30rem]", children: [
            imageSrc ? /* @__PURE__ */ jsx(
              motion.div,
              {
                variants: logoVariants,
                className: "relative w-full max-w-[20rem] sm:max-w-[28rem]",
                animate: reveal ? { scale: [1, 1.03, 1], filter: ["drop-shadow(0 0 0 rgba(0,0,0,0))", "drop-shadow(0 0 32px rgba(200,250,100,0.45))", "drop-shadow(0 0 56px rgba(200,250,100,0.7))"] } : void 0,
                transition: { duration: 2.1, repeat: reveal ? Number.POSITIVE_INFINITY : 0, repeatType: "mirror" },
                children: /* @__PURE__ */ jsx("img", { src: imageSrc, alt: imageAlt ?? title, className: "h-auto w-full object-contain", draggable: false })
              }
            ) : null,
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(motion.p, { className: "mx-auto max-w-3xl text-[11px] uppercase tracking-[0.32em] text-white/55", variants: contentVariants, children: eyebrow }),
              /* @__PURE__ */ jsx(motion.p, { className: "mx-auto max-w-3xl text-xl font-semibold uppercase tracking-[0.2em] text-white sm:text-2xl", variants: contentVariants, children: title }),
              description ? /* @__PURE__ */ jsx(motion.p, { className: "mx-auto max-w-2xl text-sm leading-6 text-white/78 sm:text-base", variants: contentVariants, children: description }) : null
            ] }),
            children ? /* @__PURE__ */ jsx("div", { className: "w-full", children }) : null
          ] })
        ] })
      ]
    }
  );
}
function IntroLoader({ showIntro, onComplete }) {
  const [screen, setScreen] = useState(1);
  const [closing, setClosing] = useState(false);
  const closeTimerRef = useRef(null);
  useEffect(() => {
    if (!showIntro || typeof window === "undefined") {
      return;
    }
    if (window.sessionStorage.getItem("intro_seen") === "true") {
      onComplete();
      return;
    }
    setScreen(1);
    const screenTwoTimer = window.setTimeout(() => setScreen(2), INTRO_TIMINGS.screenOne);
    const screenThreeTimer = window.setTimeout(() => setScreen(3), INTRO_TIMINGS.screenOne + INTRO_TIMINGS.screenTwo);
    const finishTimer = window.setTimeout(() => {
      if (closeTimerRef.current !== null) {
        return;
      }
      window.sessionStorage.setItem("intro_seen", "true");
      setClosing(true);
      closeTimerRef.current = window.setTimeout(onComplete, INTRO_TIMINGS.exit);
    }, INTRO_TIMINGS.screenOne + INTRO_TIMINGS.screenTwo + INTRO_TIMINGS.screenThree);
    return () => {
      window.clearTimeout(screenTwoTimer);
      window.clearTimeout(screenThreeTimer);
      window.clearTimeout(finishTimer);
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [onComplete, showIntro]);
  if (!showIntro) {
    return null;
  }
  const skipIntro = () => {
    if (typeof window === "undefined") {
      onComplete();
      return;
    }
    window.sessionStorage.setItem("intro_seen", "true");
    setClosing(true);
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(onComplete, INTRO_TIMINGS.exit);
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      variants: shellVariants,
      initial: "hidden",
      animate: closing ? "exit" : "visible",
      exit: "exit",
      className: "fixed inset-0 z-[1000] overflow-hidden bg-[color:var(--bg)] text-white",
      children: [
        /* @__PURE__ */ jsx(ParticleField, {}),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: skipIntro,
            className: "absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/70 backdrop-blur-md transition hover:border-lime-300/40 hover:bg-lime-300/10 hover:text-lime-100 sm:right-6 sm:top-6",
            children: [
              /* @__PURE__ */ jsx(SkipForward, { size: 14 }),
              "Skip"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
          screen === 1 ? /* @__PURE__ */ jsx(
            LogoScreen,
            {
              eyebrow: "Powered by",
              title: "Rajalakshmi Institute of Technology",
              description: "The college community that powers ZYPHORIA '26.",
              imageSrc: "/rit.png",
              imageAlt: "Rajalakshmi Institute of Technology"
            },
            "screen-one"
          ) : null,
          screen === 2 ? /* @__PURE__ */ jsx(
            LogoScreen,
            {
              eyebrow: "Associate Sponsors",
              title: "Backed by partners building the experience",
              description: "A curated set of supporters helping shape the event atmosphere.",
              children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3",
                  initial: "hidden",
                  animate: "visible",
                  variants: {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.08 } }
                  },
                  children: sponsorList.map((sponsor) => /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      variants: {
                        hidden: { opacity: 0, y: 20, scale: 0.94 },
                        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } }
                      },
                      className: "flex min-h-32 items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-6 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl",
                      children: sponsor.src ? /* @__PURE__ */ jsx("img", { src: sponsor.src, alt: sponsor.alt, className: "max-h-16 w-full object-contain opacity-95", draggable: false }) : /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-[0.32em] text-white/45", children: "Sponsor" }),
                        /* @__PURE__ */ jsx("div", { className: "mt-3 text-xl font-semibold tracking-[0.2em] text-lime-100", children: sponsor.label })
                      ] })
                    },
                    sponsor.alt
                  ))
                }
              )
            },
            "screen-two"
          ) : null,
          screen === 3 ? /* @__PURE__ */ jsx(
            LogoScreen,
            {
              eyebrow: "Presented by",
              title: "Department of Computer Science and Engineering",
              description: "ZYPHORIA '26 emerges from the center of the frame.",
              imageSrc: "/Zyphoria.png",
              imageAlt: "Zyphoria '26",
              accent: "lime",
              reveal: true,
              children: /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "mt-1 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/50",
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.25, duration: 0.4, ease: "easeOut" },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-lime-300/50" }),
                    /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-lime-100/80", children: [
                      "Main reveal",
                      /* @__PURE__ */ jsx(ArrowRight, { size: 12 })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "h-px w-10 bg-lime-300/50" })
                  ]
                }
              )
            },
            "screen-three"
          ) : null
        ] })
      ]
    },
    "intro-loader"
  ) });
}
const supabaseUrl = "https://placeholder.supabase.co";
const supabaseKey = "placeholder";
const supabase = createClient(supabaseUrl, supabaseKey);
const events = [
  // TECHNICAL
  {
    id: 1,
    category: "technical",
    name: "Reverse Engineering Arena",
    description: "Decode and reverse-engineer software or logic puzzles to uncover hidden functionality.",
    team: "Solo / Duo",
    icon: SearchCode
  },
  {
    id: 2,
    category: "technical",
    name: "AI Prompt Engineering Battle",
    description: "Craft the most effective AI prompts to solve challenges using generative AI tools.",
    team: "Individual",
    icon: Bot
  },
  {
    id: 3,
    category: "technical",
    name: "UI/UX Redesign Challenge",
    description: "Redesign a given app or website to improve usability, aesthetics and user experience.",
    team: "2–3",
    icon: Paintbrush
  },
  {
    id: 4,
    category: "technical",
    name: "Tech Treasure Hunt",
    description: "Solve technical clues and puzzles scattered across campus to find the final treasure.",
    team: "3–4",
    icon: MapPin
  },
  {
    id: 5,
    category: "technical",
    name: "Research Pitch",
    description: "Present your research idea or paper in a concise, compelling pitch to a panel of judges.",
    team: "1–2",
    icon: Presentation
  },
  {
    id: 6,
    category: "technical",
    name: "Build a Startup in 60 Min",
    description: "Conceptualize and pitch a startup idea with a full business model in just 60 minutes.",
    team: "2–4",
    icon: Briefcase
  },
  {
    id: 7,
    category: "technical",
    name: "Bug Hunt",
    description: "Find and fix bugs in provided code snippets across multiple rounds of increasing difficulty.",
    team: "Solo / Duo",
    icon: Bug
  },
  // NON-TECHNICAL
  {
    id: 8,
    category: "non-tech",
    name: "Engineering Standup Comedy",
    description: "Make the audience laugh with your best engineering-themed original comedy routine.",
    team: "Individual",
    icon: Mic
  },
  {
    id: 9,
    category: "non-tech",
    name: "Tech Meme War",
    description: "Create the funniest and most relatable tech memes in a timed competition.",
    team: "Individual",
    icon: Image
  },
  {
    id: 10,
    category: "non-tech",
    name: "Mystery Box Innovation",
    description: "Build something innovative using only random items revealed from a mystery box.",
    team: "2–3",
    icon: Box
  },
  {
    id: 11,
    category: "non-tech",
    name: "Reel Making Challenge",
    description: "Create an engaging short reel on a given topic within the time limit, edited on-site.",
    team: "1–3",
    icon: Video
  },
  {
    id: 12,
    category: "non-tech",
    name: "Tech Dum Charades",
    description: "Act out tech terms, software names and programming concepts without speaking.",
    team: "3–4",
    icon: AppWindow
  },
  {
    id: 13,
    category: "non-tech",
    name: "E-Sports",
    description: "Compete in popular esports titles against the best gamers from various colleges.",
    team: "Solo / Team",
    icon: Gamepad2
  },
  {
    id: 14,
    category: "non-tech",
    name: "Marketing a Useless Product",
    description: "Pitch and market the most useless product imaginable — creativity is king.",
    team: "2–3",
    icon: Megaphone
  }
];
function useCountdown(target) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1e3);
    return () => clearInterval(id);
  }, [target]);
  const total = Math.max(0, diff);
  const days = Math.floor(total / 864e5);
  const hours = Math.floor(total % 864e5 / 36e5);
  const mins = Math.floor(total % 36e5 / 6e4);
  const secs = Math.floor(total % 6e4 / 1e3);
  return {
    days,
    hours,
    mins,
    secs
  };
}
function pad(n) {
  return String(n).padStart(2, "0");
}
function StarField() {
  const stars = useRef([]);
  if (stars.current.length === 0) {
    for (let i = 0; i < 120; i++) {
      stars.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        dur: Math.random() * 4 + 2,
        delay: Math.random() * 5
      });
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "star-field", "aria-hidden": "true", children: stars.current.map((s, i) => /* @__PURE__ */ jsx("div", { className: "star", style: {
    left: `${s.x}%`,
    top: `${s.y}%`,
    width: `${s.size}px`,
    height: `${s.size}px`,
    opacity: 0.2,
    ["--duration"]: `${s.dur}s`,
    ["--min-opacity"]: "0.05",
    ["--max-opacity"]: `${0.1 + Math.random() * 0.5}`,
    animationDelay: `${s.delay}s`
  } }, i)) });
}
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return /* @__PURE__ */ jsxs("nav", { className: `navbar ${scrolled ? "scrolled" : ""}`, style: {
    background: scrolled ? void 0 : "transparent"
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "container", style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px"
    }, children: [
      /* @__PURE__ */ jsx("a", { href: "#", style: {
        textDecoration: "none"
      }, children: /* @__PURE__ */ jsxs("span", { className: "font-display", style: {
        fontSize: "18px",
        color: "var(--text-primary)",
        letterSpacing: "-0.04em"
      }, children: [
        "ZYPH",
        /* @__PURE__ */ jsx("span", { style: {
          color: "var(--accent)"
        }, children: "ORIA" }),
        /* @__PURE__ */ jsx("span", { className: "font-mono", style: {
          fontSize: "10px",
          color: "var(--text-muted)",
          marginLeft: "6px",
          fontWeight: 400,
          letterSpacing: "0.1em"
        }, children: "'26" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { style: {
        display: "flex",
        gap: "2.5rem",
        alignItems: "center"
      }, className: "desktop-nav", children: ["EVENTS", "CONTACT"].map((link) => /* @__PURE__ */ jsx("a", { href: `#${link.toLowerCase()}`, className: "font-mono", style: {
        fontSize: "12px",
        letterSpacing: "0.12em",
        color: "var(--text-muted)",
        textDecoration: "none",
        textTransform: "uppercase",
        transition: "color 0.15s"
      }, onMouseEnter: (e) => e.currentTarget.style.color = "var(--text-primary)", onMouseLeave: (e) => e.currentTarget.style.color = "var(--text-muted)", children: link }, link)) }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: "1rem"
      }, children: [
        /* @__PURE__ */ jsx("a", { href: "#register", className: "btn-lime-pill", children: "Register" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setMenuOpen(!menuOpen), className: "font-mono mobile-menu-btn", style: {
          background: "none",
          border: "none",
          color: "var(--text-primary)",
          cursor: "pointer",
          fontSize: "18px",
          display: "none"
        }, "aria-label": "Toggle menu", children: menuOpen ? "✕" : "☰" })
      ] })
    ] }),
    menuOpen && /* @__PURE__ */ jsx("div", { style: {
      background: "var(--surface)",
      borderTop: "1px solid var(--stroke)",
      padding: "1rem 2rem"
    }, children: ["EVENTS", "CONTACT"].map((link) => /* @__PURE__ */ jsx("a", { href: `#${link.toLowerCase()}`, className: "font-mono", onClick: () => setMenuOpen(false), style: {
      display: "block",
      padding: "0.75rem 0",
      fontSize: "12px",
      letterSpacing: "0.12em",
      color: "var(--text-muted)",
      textDecoration: "none",
      textTransform: "uppercase",
      borderBottom: "1px solid var(--stroke)"
    }, children: link }, link)) }),
    /* @__PURE__ */ jsx("style", { children: `
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      ` })
  ] });
}
function Hero() {
  const target = /* @__PURE__ */ new Date("2026-04-15T09:00:00+05:30");
  const {
    days,
    hours,
    mins,
    secs
  } = useCountdown(target);
  return /* @__PURE__ */ jsxs("section", { style: {
    position: "relative",
    minHeight: "100vh",
    background: "var(--bg)",
    display: "flex",
    alignItems: "center",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsx(StarField, {}),
    /* @__PURE__ */ jsx("div", { className: "container", style: {
      position: "relative",
      zIndex: 2,
      width: "100%"
    }, children: /* @__PURE__ */ jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: "4rem",
      alignItems: "center"
    }, className: "hero-grid", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "font-mono", style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "2.5rem"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "var(--accent)",
            fontSize: "10px"
          }, children: "◆" }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)"
          }, children: "CSE Symposium · RIT · April 15–16 2026" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "font-display", style: {
          fontSize: "clamp(52px, 8vw, 110px)",
          lineHeight: 0.95,
          marginBottom: "2rem"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            display: "block"
          }, children: "INNOVATE." }),
          /* @__PURE__ */ jsx("span", { style: {
            display: "block"
          }, children: "DOMINATE." }),
          /* @__PURE__ */ jsx("span", { style: {
            display: "block",
            color: "var(--accent)",
            textShadow: "0 0 40px rgba(200,250,100,0.3)"
          }, children: "ZYPHORIA." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-mono", style: {
          fontSize: "15px",
          lineHeight: 1.6,
          color: "var(--text-muted)",
          marginBottom: "2.5rem",
          maxWidth: "480px"
        }, children: "14 events. 2 days. One department. No limits." }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap"
        }, children: /* @__PURE__ */ jsx("a", { href: "#events", className: "btn-filled", style: {
          fontSize: "12px"
        }, children: "Explore Events" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        background: "var(--surface)",
        border: "1px solid var(--stroke)",
        padding: "2rem",
        minWidth: "280px",
        position: "relative"
      }, className: "countdown-block", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-mono", style: {
          fontSize: "10px",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
          borderBottom: "1px solid var(--stroke)",
          paddingBottom: "0.75rem",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between"
        }, children: [
          /* @__PURE__ */ jsx("span", { children: "COUNTDOWN.SYS" }),
          /* @__PURE__ */ jsx("span", { style: {
            color: "var(--accent)"
          }, children: "● LIVE" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "1rem"
        }, children: [{
          label: "DAYS",
          value: pad(days)
        }, {
          label: "HRS",
          value: pad(hours)
        }, {
          label: "MIN",
          value: pad(mins)
        }, {
          label: "SEC",
          value: pad(secs)
        }].map(({
          label,
          value
        }) => /* @__PURE__ */ jsxs("div", { style: {
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ jsx("div", { className: "countdown-digit", children: value }),
          /* @__PURE__ */ jsx("div", { className: "font-mono", style: {
            fontSize: "9px",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginTop: "4px"
          }, children: label })
        ] }, label)) }),
        /* @__PURE__ */ jsx("div", { className: "font-mono", style: {
          fontSize: "10px",
          color: "var(--text-muted)",
          letterSpacing: "0.08em",
          borderTop: "1px solid var(--stroke)",
          paddingTop: "0.75rem",
          textAlign: "center"
        }, children: "UNTIL ZYPHORIA '26" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { children: `
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .countdown-block {
            min-width: unset !important;
          }
        }
      ` })
  ] });
}
function EventCard({
  event,
  onClick
}) {
  const isTech = event.category === "technical";
  const pillClass = isTech ? "pill-tech" : "pill-nontech";
  const pillText = isTech ? "Technical" : "Non-Tech";
  const accentColor = isTech ? "var(--accent)" : "var(--danger)";
  return /* @__PURE__ */ jsxs("div", { className: "event-card group", onClick, style: {
    cursor: "pointer",
    ["--card-accent"]: accentColor
  }, children: [
    /* @__PURE__ */ jsx("style", { children: `
        .event-card.group:hover {
          box-shadow: 0 0 20px ${isTech ? "var(--accent-glow)" : "rgba(255, 77, 109, 0.15)"}, 0 0 40px ${isTech ? "var(--accent-glow)" : "rgba(255, 77, 109, 0.15)"};
        }
        .event-card.group::before {
          background: ${accentColor};
        }
        .event-card.group:active {
          transform: scale(0.98);
        }
      ` }),
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1.25rem"
    }, children: [
      /* @__PURE__ */ jsx("span", { className: pillClass, children: pillText }),
      /* @__PURE__ */ jsx(event.icon, { size: 28, strokeWidth: 1.5, color: accentColor })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "event-name font-display", style: {
      fontSize: "20px",
      color: "var(--text-primary)",
      marginBottom: "0.75rem",
      lineHeight: "1.2"
    }, children: event.name }),
    /* @__PURE__ */ jsx("p", { className: "font-mono", style: {
      fontSize: "13px",
      color: "var(--text-muted)",
      lineHeight: 1.5,
      marginBottom: "2rem",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }, children: event.description }),
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsxs("span", { className: "font-mono", style: {
        fontSize: "11px",
        color: "var(--text-muted)",
        letterSpacing: "0.05em"
      }, children: [
        "Team: ",
        event.team
      ] }),
      /* @__PURE__ */ jsx("button", { className: "btn-ghost font-mono", style: {
        fontSize: "11px",
        padding: "0.4rem 0.75rem",
        border: "none"
      }, children: "VIEW →" })
    ] })
  ] });
}
function EventModal({
  event,
  onClose
}) {
  const [opening, setOpening] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setOpening(false), 10);
    return () => clearTimeout(t);
  }, []);
  const handleClose = () => {
    setOpening(true);
    setTimeout(onClose, 120);
  };
  if (!event) return null;
  const isTech = event.category === "technical";
  const accentColor = isTech ? "var(--accent)" : "var(--danger)";
  return /* @__PURE__ */ jsx("div", { className: "modal-overlay", onClick: handleClose, style: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(8, 8, 12, 0.8)",
    backdropFilter: "blur(8px)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: opening ? 0 : 1,
    transition: "opacity 150ms ease"
  }, children: /* @__PURE__ */ jsxs("div", { className: "modal-container", onClick: (e) => e.stopPropagation(), style: {
    width: "100%",
    maxWidth: "640px",
    maxHeight: "80vh",
    backgroundColor: "var(--surface)",
    border: "1px solid var(--stroke)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    transform: opening ? "scale(0.95)" : "scale(1)",
    transition: "all 180ms ease-out"
  }, children: [
    /* @__PURE__ */ jsx("span", { className: "ascii-corner tl", style: {
      color: accentColor
    }, children: "┌" }),
    /* @__PURE__ */ jsx("span", { className: "ascii-corner tr", style: {
      color: accentColor
    }, children: "┐" }),
    /* @__PURE__ */ jsx("span", { className: "ascii-corner bl", style: {
      color: accentColor
    }, children: "└" }),
    /* @__PURE__ */ jsx("span", { className: "ascii-corner br", style: {
      color: accentColor
    }, children: "┘" }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: "2rem 2rem 1.5rem",
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx("button", { onClick: handleClose, className: "font-mono", style: {
        position: "absolute",
        top: "1.5rem",
        right: "1.5rem",
        background: "none",
        border: "none",
        color: "var(--text-muted)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px"
      }, children: /* @__PURE__ */ jsx(X, { size: 20 }) }),
      /* @__PURE__ */ jsx("div", { style: {
        marginBottom: "1.25rem"
      }, children: /* @__PURE__ */ jsx("span", { className: isTech ? "pill-tech" : "pill-nontech", children: isTech ? "Technical" : "Non-Tech" }) }),
      /* @__PURE__ */ jsx("h2", { className: "font-display", style: {
        fontSize: "32px",
        color: "var(--text-primary)",
        marginBottom: "0.5rem",
        lineHeight: 1.1
      }, children: event.name }),
      /* @__PURE__ */ jsx("p", { className: "font-mono", style: {
        fontSize: "15px",
        color: "var(--text-muted)",
        lineHeight: 1.5
      }, children: event.description })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      height: "1px",
      backgroundColor: "var(--stroke)",
      width: "100%"
    } }),
    /* @__PURE__ */ jsx("div", { style: {
      padding: "2rem",
      overflowY: "auto"
    }, children: /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-mono", style: {
          fontSize: "11px",
          textTransform: "uppercase",
          color: "#8888A8",
          marginBottom: "0.75rem",
          letterSpacing: "0.1em"
        }, children: "INSTRUCTIONS" }),
        /* @__PURE__ */ jsxs("ul", { className: "font-mono", style: {
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "14px",
          color: "#EEEEF5",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }, children: [
          /* @__PURE__ */ jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Individual or team of ",
            event.team
          ] }),
          /* @__PURE__ */ jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Laptops allowed"
          ] }),
          /* @__PURE__ */ jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Multiple rounds"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-mono", style: {
          fontSize: "11px",
          textTransform: "uppercase",
          color: "#8888A8",
          marginBottom: "0.75rem",
          letterSpacing: "0.1em"
        }, children: "RULES" }),
        /* @__PURE__ */ jsxs("ul", { className: "font-mono", style: {
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "14px",
          color: "#EEEEF5",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }, children: [
          /* @__PURE__ */ jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " No external tools unless noted"
          ] }),
          /* @__PURE__ */ jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Time-limited rounds"
          ] }),
          /* @__PURE__ */ jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Points for accuracy and speed"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-mono", style: {
          fontSize: "11px",
          textTransform: "uppercase",
          color: "#8888A8",
          marginBottom: "0.75rem",
          letterSpacing: "0.1em"
        }, children: "EVALUATION" }),
        /* @__PURE__ */ jsxs("ul", { className: "font-mono", style: {
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "14px",
          color: "#EEEEF5",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }, children: [
          /* @__PURE__ */ jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Correctness of output"
          ] }),
          /* @__PURE__ */ jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Speed of completion"
          ] }),
          /* @__PURE__ */ jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Depth of analysis"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { style: {
      height: "1px",
      backgroundColor: "var(--stroke)",
      width: "100%"
    } }),
    /* @__PURE__ */ jsx("div", { style: {
      padding: "1.5rem 2rem"
    }, children: /* @__PURE__ */ jsx("button", { className: "font-mono", style: {
      width: "100%",
      backgroundColor: accentColor,
      color: "var(--bg)",
      border: "none",
      padding: "1rem",
      fontSize: "14px",
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      cursor: "pointer",
      transition: "all 0.15s ease"
    }, onMouseOver: (e) => {
      e.currentTarget.style.backgroundColor = "white";
      e.currentTarget.style.boxShadow = `0 0 20px ${accentColor}`;
    }, onMouseOut: (e) => {
      e.currentTarget.style.backgroundColor = accentColor;
      e.currentTarget.style.boxShadow = "none";
    }, onClick: () => {
      window.location.href = "#register";
      handleClose();
    }, children: "REGISTER NOW →" }) })
  ] }) });
}
function EventsSection() {
  const [activeEvent, setActiveEvent] = useState(null);
  const techEvents = events.filter((e) => e.category === "technical");
  const nonTechEvents = events.filter((e) => e.category === "non-tech");
  useEffect(() => {
    if (activeEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeEvent]);
  return /* @__PURE__ */ jsxs("section", { id: "events", className: "section-padding", style: {
    background: "var(--bg)"
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "container", style: {
      display: "flex",
      flexDirection: "column",
      gap: "6rem"
    }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { style: {
          marginBottom: "3rem"
        }, children: [
          /* @__PURE__ */ jsx("p", { className: "section-label", style: {
            color: "var(--text-muted)"
          }, children: "[ 02 — TECHNICAL ]" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display", style: {
            fontSize: "clamp(36px, 4vw, 52px)",
            color: "var(--text-primary)"
          }, children: "Prove Your Skill." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--stroke)"
        }, className: "events-grid", children: [
          techEvents.map((event) => /* @__PURE__ */ jsx(EventCard, { event, onClick: () => setActiveEvent(event) }, event.id)),
          /* @__PURE__ */ jsx("div", { style: {
            background: "var(--bg)"
          } }),
          /* @__PURE__ */ jsx("div", { style: {
            background: "var(--bg)"
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { style: {
          marginBottom: "3rem"
        }, children: [
          /* @__PURE__ */ jsx("p", { className: "section-label", style: {
            color: "var(--text-muted)"
          }, children: "[ 03 — NON-TECHNICAL ]" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display", style: {
            fontSize: "clamp(36px, 4vw, 52px)",
            color: "var(--text-primary)"
          }, children: "Unleash the Chaos." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--stroke)"
        }, className: "events-grid", children: [
          nonTechEvents.map((event) => /* @__PURE__ */ jsx(EventCard, { event, onClick: () => setActiveEvent(event) }, event.id)),
          /* @__PURE__ */ jsx("div", { style: {
            background: "var(--bg)"
          } }),
          /* @__PURE__ */ jsx("div", { style: {
            background: "var(--bg)"
          } })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @media (max-width: 900px) {
          .events-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
      ` }),
    activeEvent && /* @__PURE__ */ jsx(EventModal, { event: activeEvent, onClose: () => setActiveEvent(null) })
  ] });
}
const techDropdownEvents = ["Reverse Engineering Arena", "AI Prompt Engineering Battle", "UI/UX Redesign Challenge", "Tech Treasure Hunt", "Research Pitch", "Build a Startup in 60 Min", "Bug Hunt"];
const nonTechDropdownEvents = ["Engineering Standup Comedy", "Tech Meme War", "Mystery Box Innovation", "Reel Making Challenge", "Tech Dum Charades", "E-Sports", "Marketing a Useless Product"];
const PAYMENT_LINK = "https://edu.easebuzz.in/register/RAJALAKSHMIbw5w4/ZYPHORIA_2026_SYMPOSIUM";
const NAME_REGEX = /^[A-Za-z\s.'-]{2,100}$/;
const PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/;
const DEPT_REGEX = /^[A-Za-z\s&./()-]{2,100}$/;
const COLLEGE_REGEX = /^[A-Za-z\s&.,'/()-]{2,200}$/;
const TEAM_NAME_REGEX = /^[A-Za-z0-9\s&._'-]{2,100}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function RegistrationSection() {
  const [tab, setTab] = useState("tech");
  const [formData, setFormData] = useState({
    event: "",
    teamName: "",
    participantCount: "0",
    leader: {
      name: "",
      department: "",
      college: "",
      email: "",
      phone: ""
    },
    participants: [{
      name: "",
      department: "",
      college: "",
      email: "",
      phone: ""
    }, {
      name: "",
      department: "",
      college: "",
      email: "",
      phone: ""
    }, {
      name: "",
      department: "",
      college: "",
      email: "",
      phone: ""
    }]
  });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const accent = tab === "tech" ? "var(--accent)" : "var(--danger)";
  const eventsList = tab === "tech" ? techDropdownEvents : nonTechDropdownEvents;
  const dateLabel = tab === "tech" ? "15 Apr" : "16 Apr";
  const handleLeaderChange = (field, val) => setFormData((p) => ({
    ...p,
    leader: {
      ...p.leader,
      [field]: val
    }
  }));
  const handleParticipantChange = (idx, field, val) => {
    const nextArr = [...formData.participants];
    nextArr[idx] = {
      ...nextArr[idx],
      [field]: val
    };
    setFormData((p) => ({
      ...p,
      participants: nextArr
    }));
  };
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setFilePreview(url);
    setErrors((prev) => ({
      ...prev,
      file: ""
    }));
  };
  const validate = () => {
    let errs = {};
    if (!formData.event) errs["event"] = "Please select an event.";
    if (!formData.participantCount) errs["participantCount"] = "Please select participant count.";
    if (!file) errs["file"] = "Payment screenshot required.";
    if (!TEAM_NAME_REGEX.test(formData.teamName)) errs["teamName"] = "Invalid team name.";
    if (!NAME_REGEX.test(formData.leader.name)) errs["leader.name"] = "Invalid name.";
    if (!DEPT_REGEX.test(formData.leader.department)) errs["leader.department"] = "Invalid dept.";
    if (!COLLEGE_REGEX.test(formData.leader.college)) errs["leader.college"] = "Invalid college.";
    if (!EMAIL_REGEX.test(formData.leader.email)) errs["leader.email"] = "Invalid email.";
    if (!PHONE_REGEX.test(formData.leader.phone)) errs["leader.phone"] = "Invalid phone.";
    const count = parseInt(formData.participantCount);
    for (let i = 0; i < count; i++) {
      if (!NAME_REGEX.test(formData.participants[i].name)) errs[`p${i}.name`] = "Invalid name.";
      if (!DEPT_REGEX.test(formData.participants[i].department)) errs[`p${i}.department`] = "Invalid dept.";
      if (!COLLEGE_REGEX.test(formData.participants[i].college)) errs[`p${i}.college`] = "Invalid college.";
      if (!EMAIL_REGEX.test(formData.participants[i].email)) errs[`p${i}.email`] = "Invalid email.";
      if (!PHONE_REGEX.test(formData.participants[i].phone)) errs[`p${i}.phone`] = "Invalid phone.";
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
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
      const {
        error: uploadErr
      } = await supabase.storage.from("payment-screenshots").upload(filename, file);
      if (uploadErr) throw uploadErr;
      const {
        data: publicUrlData
      } = supabase.storage.from("payment-screenshots").getPublicUrl(filename);
      const publicUrl = publicUrlData.publicUrl;
      const count = parseInt(formData.participantCount);
      const insertData = {
        team_name: formData.teamName,
        leader_name: formData.leader.name,
        leader_email: formData.leader.email,
        leader_phone: formData.leader.phone,
        leader_department: formData.leader.department,
        leader_college: formData.leader.college,
        technical_event: tab === "tech" ? formData.event : null,
        non_technical_event: tab === "nontech" ? formData.event : null,
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
        participant3_phone: count == 3 ? formData.participants[2].phone : null
      };
      const {
        error: insertErr
      } = await supabase.from("registrations").insert([insertData]);
      if (insertErr) throw insertErr;
      supabase.functions.invoke("sync-to-sheets", {
        body: {
          registration: insertData
        }
      }).catch((err) => console.error("Sheets sync failed:", err));
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const Label = ({
    children
  }) => /* @__PURE__ */ jsx("label", { className: "font-mono text-xs uppercase tracking-wider text-[#8888A8] mb-2 block", children });
  const Input = ({
    err,
    ...props
  }) => /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsx("input", { className: "w-full bg-[#101018] border outline-none font-mono text-sm p-3 text-[#EEEEF5] transition-colors", style: {
      borderColor: err ? "var(--danger)" : "var(--stroke)"
    }, onFocus: (e) => e.target.style.borderColor = accent, onBlur: (e) => e.target.style.borderColor = err ? "var(--danger)" : "var(--stroke)", ...props }),
    err && /* @__PURE__ */ jsx("div", { className: "text-[var(--danger)] text-xs mt-1 font-mono", children: err })
  ] });
  return /* @__PURE__ */ jsx("section", { id: "register", className: "section-padding", style: {
    background: "var(--bg)"
  }, children: /* @__PURE__ */ jsxs("div", { className: "container", style: {
    maxWidth: "800px",
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      marginBottom: "3rem",
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ jsx("p", { className: "section-label", style: {
        color: "var(--text-muted)"
      }, children: "[ 04 — REGISTER ]" }),
      /* @__PURE__ */ jsx("h2", { className: "font-display", style: {
        fontSize: "clamp(32px, 4vw, 52px)",
        color: "var(--text-primary)"
      }, children: "Join the Arena." }),
      /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[#8888A8] mt-2", children: "Secure your spot in the symposium." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "cta-container", style: {
      padding: "3rem",
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx("span", { className: "ascii-corner tl", style: {
        color: accent
      }, children: "┌" }),
      /* @__PURE__ */ jsx("span", { className: "ascii-corner bl", style: {
        color: accent
      }, children: "└" }),
      /* @__PURE__ */ jsx("span", { className: "ascii-corner tr", style: {
        right: "12px",
        color: accent
      }, children: "┐" }),
      /* @__PURE__ */ jsx("span", { className: "ascii-corner br", style: {
        right: "12px",
        color: accent
      }, children: "┘" }),
      isSuccess ? /* @__PURE__ */ jsxs("div", { style: {
        textAlign: "center",
        padding: "4rem 0",
        opacity: 1,
        transform: "scale(1)",
        transition: "all 0.5s ease"
      }, children: [
        /* @__PURE__ */ jsx(CheckCircle, { style: {
          margin: "0 auto 1rem",
          color: accent
        }, size: 48 }),
        /* @__PURE__ */ jsx("h3", { className: "font-display", style: {
          fontSize: "32px",
          marginBottom: "0.5rem"
        }, children: `"You're In!"` }),
        /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[#8888A8]", children: '"Your Technical/Non-Technical event registration has been submitted."' })
      ] }) : /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          gap: "1rem",
          marginBottom: "3rem",
          borderBottom: "1px solid var(--stroke)"
        }, children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setTab("tech"), className: "font-mono text-sm uppercase tracking-wider bg-transparent border-none cursor-pointer", style: {
            padding: "1rem 1.5rem",
            color: tab === "tech" ? "var(--accent)" : "var(--text-muted)",
            borderBottom: tab === "tech" ? "2px solid var(--accent)" : "2px solid transparent",
            transition: "all 0.2s"
          }, children: "Technical" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setTab("nontech"), className: "font-mono text-sm uppercase tracking-wider bg-transparent border-none cursor-pointer", style: {
            padding: "1rem 1.5rem",
            color: tab === "nontech" ? "var(--danger)" : "var(--text-muted)",
            borderBottom: tab === "nontech" ? "2px solid var(--danger)" : "2px solid transparent",
            transition: "all 0.2s"
          }, children: "Non-Technical" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(Label, { children: [
            tab === "tech" ? "Technical Event" : "Non-Technical Event",
            " (",
            dateLabel,
            ")"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxs("select", { value: formData.event, onChange: (e) => setFormData((p) => ({
              ...p,
              event: e.target.value
            })), className: "w-full bg-[#101018] border outline-none font-mono text-sm p-3 text-[#EEEEF5]", style: {
              borderColor: errors.event ? "var(--danger)" : "var(--stroke)"
            }, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "-- Select Event --" }),
              eventsList.map((ev) => /* @__PURE__ */ jsx("option", { value: ev, children: ev }, ev))
            ] }),
            errors.event && /* @__PURE__ */ jsx("div", { className: "text-[var(--danger)] text-xs mt-1 font-mono", children: errors.event })
          ] }),
          /* @__PURE__ */ jsx(Label, { children: "Team Name" }),
          /* @__PURE__ */ jsx(Input, { value: formData.teamName, onChange: (e) => setFormData((p) => ({
            ...p,
            teamName: e.target.value
          })), err: errors.teamName, placeholder: "Enter Team Name" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 mb-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-display text-xl mb-4", style: {
              color: accent
            }, children: "👑 Team Leader" }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0 1rem"
            }, children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { children: "Full Name" }),
                /* @__PURE__ */ jsx(Input, { value: formData.leader.name, onChange: (e) => handleLeaderChange("name", e.target.value), err: errors["leader.name"], placeholder: "John Doe" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { children: "Department" }),
                /* @__PURE__ */ jsx(Input, { value: formData.leader.department, onChange: (e) => handleLeaderChange("department", e.target.value), err: errors["leader.department"], placeholder: "Computer Science" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { children: "College" }),
                /* @__PURE__ */ jsx(Input, { value: formData.leader.college, onChange: (e) => handleLeaderChange("college", e.target.value), err: errors["leader.college"], placeholder: "RIT" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { children: "Email" }),
                /* @__PURE__ */ jsx(Input, { value: formData.leader.email, onChange: (e) => handleLeaderChange("email", e.target.value), err: errors["leader.email"], placeholder: "john@example.com" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { children: "Phone" }),
                /* @__PURE__ */ jsx(Input, { value: formData.leader.phone, onChange: (e) => handleLeaderChange("phone", e.target.value), err: errors["leader.phone"], placeholder: "9876543210" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Label, { children: "Number of Participants (excluding leader)" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxs("select", { value: formData.participantCount, onChange: (e) => setFormData((p) => ({
              ...p,
              participantCount: e.target.value
            })), className: "w-full bg-[#101018] border outline-none font-mono text-sm p-3 text-[#EEEEF5]", style: {
              borderColor: errors.participantCount ? "var(--danger)" : "var(--stroke)"
            }, children: [
              /* @__PURE__ */ jsx("option", { value: "0", children: "0 (Solo)" }),
              /* @__PURE__ */ jsx("option", { value: "1", children: "1" }),
              /* @__PURE__ */ jsx("option", { value: "2", children: "2" }),
              /* @__PURE__ */ jsx("option", { value: "3", children: "3" })
            ] }),
            errors.participantCount && /* @__PURE__ */ jsx("div", { className: "text-[var(--danger)] text-xs mt-1 font-mono", children: errors.participantCount })
          ] }),
          Array.from({
            length: parseInt(formData.participantCount)
          }).map((_, idx) => /* @__PURE__ */ jsxs("div", { className: "mt-6 mb-6 p-4 border", style: {
            borderColor: "var(--stroke)",
            background: "var(--elevated)"
          }, children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-display text-lg mb-4 text-[#EEEEF5]", children: [
              "Participant ",
              idx + 1
            ] }),
            /* @__PURE__ */ jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "0 1rem"
            }, children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { children: "Full Name" }),
                /* @__PURE__ */ jsx(Input, { value: formData.participants[idx].name, onChange: (e) => handleParticipantChange(idx, "name", e.target.value), err: errors[`p${idx}.name`], placeholder: "Jane Doe" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { children: "Department" }),
                /* @__PURE__ */ jsx(Input, { value: formData.participants[idx].department, onChange: (e) => handleParticipantChange(idx, "department", e.target.value), err: errors[`p${idx}.department`], placeholder: "Information Tech" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { children: "College" }),
                /* @__PURE__ */ jsx(Input, { value: formData.participants[idx].college, onChange: (e) => handleParticipantChange(idx, "college", e.target.value), err: errors[`p${idx}.college`], placeholder: "RIT" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { children: "Email" }),
                /* @__PURE__ */ jsx(Input, { value: formData.participants[idx].email, onChange: (e) => handleParticipantChange(idx, "email", e.target.value), err: errors[`p${idx}.email`], placeholder: "jane@example.com" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { children: "Phone" }),
                /* @__PURE__ */ jsx(Input, { value: formData.participants[idx].phone, onChange: (e) => handleParticipantChange(idx, "phone", e.target.value), err: errors[`p${idx}.phone`], placeholder: "9123456780" })
              ] })
            ] })
          ] }, idx)),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 mb-8 pt-8 border-t", style: {
            borderColor: "var(--stroke)"
          }, children: [
            /* @__PURE__ */ jsx("h4", { className: "font-display text-xl mb-4 flex items-center gap-2", style: {
              color: accent
            }, children: "💳 Payment" }),
            /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[#8888A8] mb-6", children: "Pay ₹300 per team for an event via the secure portal, then upload the screenshot below." }),
            /* @__PURE__ */ jsx("a", { href: PAYMENT_LINK, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 px-6 py-3 border font-mono text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer mb-8", style: {
              borderColor: accent,
              color: accent
            }, onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "var(--bg)";
              e.currentTarget.style.boxShadow = `0 0 15px ${accent}`;
            }, onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = accent;
              e.currentTarget.style.boxShadow = "none";
            }, children: "↗ Pay ₹300 Now" }),
            /* @__PURE__ */ jsxs("div", { className: "relative border-2 border-dashed p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-colors", style: {
              borderColor: errors.file ? "var(--danger)" : "var(--stroke)",
              background: "var(--elevated)"
            }, children: [
              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" }),
              filePreview ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ jsx("img", { src: filePreview, alt: "Preview", className: "h-24 object-cover mb-2 border", style: {
                  borderColor: "var(--stroke)"
                } }),
                /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-[#8888A8]", children: file?.name })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Upload, { size: 32, style: {
                  color: accent,
                  marginBottom: "1rem"
                } }),
                /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-[#EEEEF5]", children: "Click to upload screenshot" }),
                /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-[#8888A8] mt-2", children: "Max 5MB (Images only)" })
              ] })
            ] }),
            errors.file && /* @__PURE__ */ jsx("div", { className: "text-[var(--danger)] text-xs mt-2 font-mono text-center", children: errors.file })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: handleSubmit, disabled: isSubmitting, className: "w-full font-mono font-bold text-sm uppercase tracking-wider py-4 flex items-center justify-center gap-2 transition-all cursor-pointer", style: {
            backgroundColor: isSubmitting ? "var(--stroke)" : accent,
            color: isSubmitting ? "var(--text-muted)" : "var(--bg)"
          }, children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "animate-spin", size: 18 }),
            " Submitting..."
          ] }) : "Register Now" })
        ] })
      ] })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { id: "contact", style: {
    background: "var(--surface)",
    borderTop: "1px solid var(--stroke)"
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "container", style: {
      padding: "80px 32px 0"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: "4rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid var(--stroke)"
      }, className: "footer-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "font-display", style: {
            fontSize: "24px",
            marginBottom: "0.75rem"
          }, children: [
            "ZYPH",
            /* @__PURE__ */ jsx("span", { style: {
              color: "var(--accent)"
            }, children: "ORIA" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono", style: {
              fontSize: "12px",
              color: "var(--text-muted)",
              marginLeft: "6px",
              fontWeight: 400
            }, children: "'26" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-mono", style: {
            fontSize: "13px",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            maxWidth: "280px"
          }, children: "The annual CSE Symposium of Rajalakshmi Institute of Technology. Sci-fi precision. Human ambition." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono", style: {
            fontSize: "10px",
            color: "var(--accent)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1.25rem"
          }, children: "Navigation" }),
          ["Events", "Register", "Contact"].map((item) => /* @__PURE__ */ jsx("a", { href: `#${item.toLowerCase()}`, className: "font-mono", style: {
            display: "block",
            fontSize: "13px",
            color: "var(--text-muted)",
            textDecoration: "none",
            marginBottom: "0.75rem",
            transition: "color 0.15s"
          }, onMouseEnter: (e) => e.currentTarget.style.color = "var(--text-primary)", onMouseLeave: (e) => e.currentTarget.style.color = "var(--text-muted)", children: item }, item))
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono", style: {
            fontSize: "10px",
            color: "var(--accent)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1.25rem"
          }, children: "Contact" }),
          /* @__PURE__ */ jsx("a", { href: "mailto:zyphoria@rit.ac.in", className: "font-mono", style: {
            display: "block",
            fontSize: "13px",
            color: "var(--text-muted)",
            textDecoration: "none",
            marginBottom: "1rem"
          }, onMouseEnter: (e) => e.currentTarget.style.color = "var(--accent)", onMouseLeave: (e) => e.currentTarget.style.color = "var(--text-muted)", children: "zyphoria@rit.ac.in" }),
          /* @__PURE__ */ jsx("div", { style: {
            display: "flex",
            gap: "0.75rem",
            marginTop: "1rem"
          }, children: ["IG", "LI", "TW"].map((social) => /* @__PURE__ */ jsx("a", { href: "#", className: "font-mono", style: {
            width: "32px",
            height: "32px",
            border: "1px solid var(--stroke)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            color: "var(--text-muted)",
            textDecoration: "none",
            transition: "all 0.15s"
          }, onMouseEnter: (e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }, onMouseLeave: (e) => {
            e.currentTarget.style.borderColor = "var(--stroke)";
            e.currentTarget.style.color = "var(--text-muted)";
          }, children: social }, social)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "font-mono", style: {
        padding: "1.25rem 0",
        textAlign: "center",
        fontSize: "10px",
        color: "var(--text-muted)",
        letterSpacing: "0.12em",
        textTransform: "uppercase"
      }, children: "ZYPHORIA '26 · CSE DEPARTMENT · RAJALAKSHMI INSTITUTE OF TECHNOLOGY · APRIL 15–16" })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      ` })
  ] });
}
function ZyphoriaHome() {
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setShowIntro(window.sessionStorage.getItem("intro_seen") !== "true");
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-right", toastOptions: {
      style: {
        background: "var(--surface)",
        color: "var(--text-primary)",
        border: "1px solid var(--stroke)",
        fontFamily: "Geist Mono, monospace",
        fontSize: "13px"
      }
    } }),
    /* @__PURE__ */ jsx(IntroLoader, { showIntro, onComplete: () => setShowIntro(false) }),
    /* @__PURE__ */ jsxs(motion.div, { initial: false, animate: {
      opacity: showIntro ? 0 : 1,
      y: showIntro ? 8 : 0
    }, transition: {
      duration: 0.45,
      ease: "easeOut"
    }, className: "relative", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsx(Hero, {}),
        /* @__PURE__ */ jsx(EventsSection, {}),
        /* @__PURE__ */ jsx(RegistrationSection, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  ZyphoriaHome as component
};
