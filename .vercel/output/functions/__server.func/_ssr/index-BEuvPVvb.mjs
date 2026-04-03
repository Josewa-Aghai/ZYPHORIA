import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { F as Fe } from "../_libs/react-hot-toast.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { S as SkipForward, a as SearchCode, B as Bot, P as Paintbrush, M as MapPin, b as Presentation, c as Briefcase, d as Bug, e as Mic, I as Image, f as Box, V as Video, g as AppWindow, G as Gamepad2, h as Megaphone, i as User, j as Phone, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/goober.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const INTRO_TIMINGS = {
  screenOne: 2600,
  screenTwo: 2600,
  screenThree: 3200,
  exit: 900
};
const shellVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.7, ease: "easeInOut" } }
};
const contentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, scale: 1.02, transition: { duration: 0.35, ease: "easeInOut" } }
};
const logoVariants = {
  hidden: { opacity: 0, scale: 0.82, filter: "blur(10px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" } }
};
const labelVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, scale: 1.01, transition: { duration: 0.35, ease: "easeInOut" } }
};
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
  const particles = reactExports.useMemo(() => buildStars(80), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": "true", className: "absolute inset-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,250,100,0.16),transparent_30%),radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_bottom,rgba(200,250,100,0.08),transparent_55%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,6,0.82),rgba(8,8,12,0.98))]" }),
    particles.map((particle, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        animate: { opacity: [particle.opacity * 0.25, particle.opacity, particle.opacity * 0.45] },
        transition: { duration: particle.duration, delay: particle.delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
      },
      index
    ))
  ] });
}
function LogoScreen({
  imageSrc,
  imageAlt,
  label,
  subtitle,
  accent = "lime",
  reveal = false,
  trimBorder = false
}) {
  const lowerSrc = imageSrc?.toLowerCase() ?? "";
  const isZyphoria = lowerSrc.includes("zyphoria");
  const isZyphoria1 = lowerSrc.includes("zyphoria1");
  const isZyphoria2 = lowerSrc.includes("zyphoria2");
  const isZyphoriaMain = lowerSrc.includes("zyphoria.png") && !isZyphoria1;
  const isZyphoriaWordmark = isZyphoria1 || isZyphoria2 || isZyphoriaMain;
  const isIdatamind = lowerSrc.includes("idatamind");
  const isRit = lowerSrc.includes("ritlogo");
  const glowClass = accent === "lime" ? "bg-[radial-gradient(circle,rgba(200,250,100,0.22),transparent_60%)]" : "bg-[radial-gradient(circle,rgba(251,146,60,0.22),transparent_60%)]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      variants: contentVariants,
      initial: "hidden",
      animate: "visible",
      exit: "exit",
      className: "relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-x-0 top-1/2 mx-auto h-192 w-[min(94vw,78rem)] -translate-y-1/2 rounded-full blur-3xl ${glowClass}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex w-full flex-col items-center justify-center gap-6",
            style: void 0,
            children: [
              label ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  variants: labelVariants,
                  initial: "hidden",
                  animate: "visible",
                  exit: "exit",
                  className: `font-mono text-center uppercase tracking-[0.2em] relative z-30 ${isZyphoriaWordmark ? "text-xs sm:text-sm" : isZyphoria ? "text-sm sm:text-lg md:text-xl font-bold" : "text-xs sm:text-sm"}`,
                  style: {
                    marginBottom: isZyphoriaWordmark ? "12px" : isZyphoria ? "-5.5rem" : "0",
                    color: isZyphoriaWordmark ? "rgba(255,255,255,0.8)" : isZyphoria ? "#C8FA64" : "rgba(255,255,255,0.8)",
                    textShadow: isZyphoriaWordmark ? "0 0 16px rgba(255,255,255,0.4)" : isZyphoria ? "0 0 16px rgba(200,250,100,0.55)" : "0 0 16px rgba(255,255,255,0.4)"
                  },
                  children: label
                }
              ) : null,
              imageSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  variants: logoVariants,
                  className: `relative flex items-center justify-center sm:mx-auto ${isRit ? "w-[min(80vw,28rem)] sm:w-[min(70vw,32rem)] lg:w-[min(55vw,36rem)]" : imageSrc?.toLowerCase().includes("idatamind") ? "w-[75vw] sm:w-[65vw] lg:w-[50vw] max-w-[44rem]" : "w-[min(90vw,36rem)] sm:w-[min(80vw,44rem)] lg:w-[min(70vw,52rem)]"}`,
                  animate: reveal ? {
                    scale: [1, 1.04, 1],
                    filter: [
                      "drop-shadow(0 0 0 rgba(0,0,0,0))",
                      "drop-shadow(0 0 26px rgba(200,250,100,0.42))",
                      "drop-shadow(0 0 46px rgba(200,250,100,0.75))"
                    ]
                  } : void 0,
                  transition: { duration: 2.8, repeat: reveal ? Number.POSITIVE_INFINITY : 0, repeatType: "mirror" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imageSrc,
                      alt: imageAlt ?? "Logo",
                      className: `h-auto w-full max-w-full object-contain ${trimBorder ? "[clip-path:inset(2%_1.5%_2%_1.5%)]" : isZyphoriaMain ? "[clip-path:inset(32%_11%_34%_11%)]" : ""}`,
                      style: {
                        mixBlendMode: isZyphoriaWordmark ? "lighten" : void 0,
                        filter: isIdatamind || isRit ? "drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 22px rgba(255,255,255,0.6))" : isZyphoriaWordmark ? "brightness(1.08) saturate(1.08) contrast(1.06) drop-shadow(0 0 14px rgba(200,250,100,0.35))" : void 0,
                        imageRendering: isRit ? "high-quality" : "auto"
                      },
                      draggable: false
                    }
                  )
                }
              ) : null,
              subtitle ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-center text-xs uppercase tracking-[0.22em] text-white/65 sm:text-sm", children: subtitle }) : null
            ]
          }
        )
      ]
    }
  );
}
function IntroLoader({ showIntro, onComplete }) {
  const [screen, setScreen] = reactExports.useState(1);
  const [closing, setClosing] = reactExports.useState(false);
  const closeTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      variants: shellVariants,
      initial: "hidden",
      animate: closing ? "exit" : "visible",
      exit: "exit",
      className: "fixed inset-0 z-1000 overflow-hidden bg-[#050508] text-white",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleField, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: skipIntro,
            className: "absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/70 backdrop-blur-md transition hover:border-lime-300/40 hover:bg-lime-300/10 hover:text-lime-100 sm:right-6 sm:top-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { size: 14 }),
              "Skip"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          screen === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            LogoScreen,
            {
              imageSrc: "/ritlogo.png",
              imageAlt: "Rajalakshmi Institute of Technology",
              label: "Presented by"
            },
            "screen-one"
          ) : null,
          screen === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            LogoScreen,
            {
              imageSrc: "/idatamind.png",
              imageAlt: "iDataMind",
              label: "Associated with",
              accent: "warm"
            },
            "screen-two"
          ) : null,
          screen === 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            LogoScreen,
            {
              imageSrc: "/zyphoria2.png",
              imageAlt: "Zyphoria '26",
              label: "Department of Computer Science and Engineering",
              accent: "lime",
              reveal: true
            },
            "screen-three"
          ) : null
        ] })
      ]
    },
    "intro-loader"
  ) });
}
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
  const [diff, setDiff] = reactExports.useState(target.getTime() - Date.now());
  reactExports.useEffect(() => {
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
  const stars = reactExports.useRef([]);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "star-field", "aria-hidden": "true", children: stars.current.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "star", style: {
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
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: `navbar ${scrolled ? "scrolled" : ""}`, style: {
    background: scrolled ? void 0 : "transparent"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", style: {
        textDecoration: "none"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display", style: {
        fontSize: "18px",
        color: "var(--text-primary)",
        letterSpacing: "-0.04em"
      }, children: [
        "ZYPH",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          color: "var(--accent)"
        }, children: "ORIA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", style: {
          fontSize: "10px",
          color: "var(--text-muted)",
          marginLeft: "6px",
          fontWeight: 400,
          letterSpacing: "0.1em"
        }, children: "'26" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        display: "flex",
        gap: "2.5rem",
        alignItems: "center"
      }, className: "desktop-nav", children: [{
        label: "ABOUT",
        target: "about"
      }, {
        label: "EVENTS",
        target: "events"
      }, {
        label: "TEAM",
        target: "organizers"
      }, {
        label: "REGISTER",
        target: "register"
      }].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link.target === "register" ? "/register.html" : `#${link.target}`, className: "font-mono", style: {
        fontSize: "12px",
        letterSpacing: "0.12em",
        color: "var(--text-muted)",
        textDecoration: "none",
        textTransform: "uppercase",
        transition: "color 0.15s"
      }, onMouseEnter: (e) => e.currentTarget.style.color = "var(--text-primary)", onMouseLeave: (e) => e.currentTarget.style.color = "var(--text-muted)", children: link.label }, link.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: "1rem"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "btn-lime-pill", children: "Register" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMenuOpen(!menuOpen), className: "font-mono mobile-menu-btn", style: {
          background: "none",
          border: "none",
          color: "var(--text-primary)",
          cursor: "pointer",
          fontSize: "18px",
          display: "none"
        }, "aria-label": "Toggle menu", children: menuOpen ? "✕" : "☰" })
      ] })
    ] }),
    menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      background: "var(--surface)",
      borderTop: "1px solid var(--stroke)",
      padding: "1rem 2rem"
    }, children: [{
      label: "ABOUT",
      target: "about"
    }, {
      label: "EVENTS",
      target: "events"
    }, {
      label: "TEAM",
      target: "organizers"
    }, {
      label: "REGISTER",
      target: "register"
    }].map((link) => {
      if (link.target === "register") {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "font-mono", onClick: () => setMenuOpen(false), style: {
          display: "block",
          padding: "0.75rem 0",
          fontSize: "12px",
          letterSpacing: "0.12em",
          color: "var(--text-muted)",
          textDecoration: "none",
          textTransform: "uppercase",
          borderBottom: "1px solid var(--stroke)"
        }, children: link.label }, link.label);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `#${link.target}`, className: "font-mono", onClick: () => setMenuOpen(false), style: {
        display: "block",
        padding: "0.75rem 0",
        fontSize: "12px",
        letterSpacing: "0.12em",
        color: "var(--text-muted)",
        textDecoration: "none",
        textTransform: "uppercase",
        borderBottom: "1px solid var(--stroke)"
      }, children: link.label }, link.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: {
    position: "relative",
    minHeight: "100vh",
    background: "var(--bg)",
    display: "flex",
    alignItems: "center",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StarField, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", style: {
      position: "relative",
      zIndex: 2,
      width: "100%"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: "4rem",
      alignItems: "center"
    }, className: "hero-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono", style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "2.5rem"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: "var(--accent)",
            fontSize: "10px"
          }, children: "◆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)"
          }, children: "CSE Symposium · RIT · April 15–16 2026" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display", style: {
          fontSize: "clamp(52px, 8vw, 110px)",
          lineHeight: 0.95,
          marginBottom: "2rem"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            display: "block"
          }, children: "INNOVATE." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            display: "block"
          }, children: "DOMINATE." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            display: "block",
            color: "var(--accent)",
            textShadow: "0 0 40px rgba(200,250,100,0.3)"
          }, children: "ZYPHORIA." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: {
          fontSize: "15px",
          lineHeight: 1.6,
          color: "var(--text-muted)",
          marginBottom: "2.5rem",
          maxWidth: "480px"
        }, children: "14 events. 2 days. One department. No limits." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "btn-filled", style: {
            fontSize: "12px",
            background: "transparent",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            marginRight: "1rem",
            textDecoration: "none"
          }, children: "REGISTER NOW" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#events", className: "btn-filled", style: {
            fontSize: "12px"
          }, children: "Explore Events" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        background: "var(--surface)",
        border: "1px solid var(--stroke)",
        padding: "2rem",
        minWidth: "280px",
        position: "relative"
      }, className: "countdown-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono", style: {
          fontSize: "10px",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
          borderBottom: "1px solid var(--stroke)",
          paddingBottom: "0.75rem",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "COUNTDOWN.SYS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: "var(--accent)"
          }, children: "● LIVE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
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
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "countdown-digit", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono", style: {
            fontSize: "9px",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            marginTop: "4px"
          }, children: label })
        ] }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono", style: {
          fontSize: "10px",
          color: "var(--text-muted)",
          letterSpacing: "0.08em",
          borderTop: "1px solid var(--stroke)",
          paddingTop: "0.75rem",
          textAlign: "center"
        }, children: "UNTIL ZYPHORIA '26" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event-card group", onClick, style: {
    cursor: "pointer",
    ["--card-accent"]: accentColor
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1.25rem"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: pillClass, children: pillText }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(event.icon, { size: 28, strokeWidth: 1.5, color: accentColor })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "event-name font-display", style: {
      fontSize: "20px",
      color: "var(--text-primary)",
      marginBottom: "0.75rem",
      lineHeight: "1.2"
    }, children: event.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: {
      fontSize: "13px",
      color: "var(--text-muted)",
      lineHeight: 1.5,
      marginBottom: "2rem",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }, children: event.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", style: {
        fontSize: "11px",
        color: "var(--text-muted)",
        letterSpacing: "0.05em"
      }, children: [
        "Team: ",
        event.team
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-ghost font-mono", style: {
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
  const [opening, setOpening] = reactExports.useState(true);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: handleClose, style: {
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
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-container", onClick: (e) => e.stopPropagation(), style: {
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ascii-corner tl", style: {
      color: accentColor
    }, children: "┌" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ascii-corner tr", style: {
      color: accentColor
    }, children: "┐" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ascii-corner bl", style: {
      color: accentColor
    }, children: "└" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ascii-corner br", style: {
      color: accentColor
    }, children: "┘" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      padding: "2rem 2rem 1.5rem",
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClose, className: "font-mono", style: {
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
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        marginBottom: "1.25rem"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isTech ? "pill-tech" : "pill-nontech", children: isTech ? "Technical" : "Non-Tech" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display", style: {
        fontSize: "32px",
        color: "var(--text-primary)",
        marginBottom: "0.5rem",
        lineHeight: 1.1
      }, children: event.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: {
        fontSize: "15px",
        color: "var(--text-muted)",
        lineHeight: 1.5
      }, children: event.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      height: "1px",
      backgroundColor: "var(--stroke)",
      width: "100%"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      padding: "2rem",
      overflowY: "auto"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono", style: {
          fontSize: "11px",
          textTransform: "uppercase",
          color: "#8888A8",
          marginBottom: "0.75rem",
          letterSpacing: "0.1em"
        }, children: "INSTRUCTIONS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "font-mono", style: {
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "14px",
          color: "#EEEEF5",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Individual or team of ",
            event.team
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Laptops allowed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Multiple rounds"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono", style: {
          fontSize: "11px",
          textTransform: "uppercase",
          color: "#8888A8",
          marginBottom: "0.75rem",
          letterSpacing: "0.1em"
        }, children: "RULES" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "font-mono", style: {
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "14px",
          color: "#EEEEF5",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " No external tools unless noted"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Time-limited rounds"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Points for accuracy and speed"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono", style: {
          fontSize: "11px",
          textTransform: "uppercase",
          color: "#8888A8",
          marginBottom: "0.75rem",
          letterSpacing: "0.1em"
        }, children: "EVALUATION" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "font-mono", style: {
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "14px",
          color: "#EEEEF5",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Correctness of output"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Speed of completion"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: accentColor
            }, children: "·" }),
            " Depth of analysis"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      height: "1px",
      backgroundColor: "var(--stroke)",
      width: "100%"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      padding: "1.5rem 2rem"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "font-mono", style: {
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
      navigate({
        to: "/register",
        search: {
          event: event.name
        }
      });
      handleClose();
    }, children: "REGISTER FOR THIS EVENT →" }) })
  ] }) });
}
function EventsSection() {
  const [activeEvent, setActiveEvent] = reactExports.useState(null);
  const techEvents = events.filter((e) => e.category === "technical");
  const nonTechEvents = events.filter((e) => e.category === "non-tech");
  reactExports.useEffect(() => {
    if (activeEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeEvent]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "events", className: "section-padding", style: {
    background: "var(--bg)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", style: {
      display: "flex",
      flexDirection: "column",
      gap: "6rem"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          marginBottom: "3rem"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold", style: {
            color: "var(--accent)",
            fontSize: "clamp(18px, 3vw, 24px)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textShadow: "0 0 20px rgba(200,250,100,0.5)"
          }, children: "[ TECHNICAL ] — 15TH APRIL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display", style: {
            fontSize: "clamp(36px, 4vw, 52px)",
            color: "var(--text-primary)"
          }, children: "Prove Your Skill." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--stroke)"
        }, className: "events-grid", children: [
          techEvents.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventCard, { event, onClick: () => setActiveEvent(event) }, event.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            background: "var(--bg)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            background: "var(--bg)"
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          marginBottom: "3rem"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold", style: {
            color: "var(--accent)",
            fontSize: "clamp(18px, 3vw, 24px)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textShadow: "0 0 20px rgba(200,250,100,0.5)"
          }, children: "[ NON-TECHNICAL ] — 16TH APRIL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display", style: {
            fontSize: "clamp(36px, 4vw, 52px)",
            color: "var(--text-primary)"
          }, children: "Unleash the Chaos." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--stroke)"
        }, className: "events-grid", children: [
          nonTechEvents.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventCard, { event, onClick: () => setActiveEvent(event) }, event.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            background: "var(--bg)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            background: "var(--bg)"
          } })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media (max-width: 900px) {
          .events-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
      ` }),
    activeEvent && /* @__PURE__ */ jsxRuntimeExports.jsx(EventModal, { event: activeEvent, onClose: () => setActiveEvent(null) })
  ] });
}
function AboutSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "section-padding", style: {
    background: "var(--bg)"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", style: {
    display: "flex",
    flexDirection: "column",
    gap: "4rem"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      textAlign: "left"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label", style: {
        color: "var(--text-muted)"
      }, children: "[ ABOUT ]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display", style: {
        fontSize: "clamp(36px, 4vw, 52px)",
        color: "var(--text-primary)",
        marginBottom: "2rem"
      }, children: "The Future, Compiled." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-base text-[#8888A8] max-w-[800px] leading-relaxed", children: "Zyphoria'26 is an International Symposium organized by the Department of Computer Science and Engineering at Rajalakshmi Institute of Technology (RIT) in association with iDataMind. The symposium brings together students, innovators, and technology enthusiasts from various institutions to participate in engaging technical and non-technical competitions, encouraging creativity, innovation, and collaboration." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", style: {
        background: "#101018",
        border: "1px solid #1E1E2E",
        padding: "2rem",
        transition: "all 0.3s ease"
      }, onMouseEnter: (e) => {
        e.currentTarget.style.borderLeft = "3px solid var(--accent)";
        e.currentTarget.style.background = "#16161F";
      }, onMouseLeave: (e) => {
        e.currentTarget.style.borderLeft = "1px solid #1E1E2E";
        e.currentTarget.style.background = "#101018";
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-[24px] mb-4 font-bold", style: {
          color: "var(--accent)"
        }, children: "⚡ · INNOVATION" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: {
          color: "var(--text-muted)",
          fontSize: "14px",
          lineHeight: 1.6
        }, children: "Experience cutting-edge technology showcases, AI-driven challenges, and hands-on competitions curated by iDataMind and CSE faculty." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", style: {
        background: "#101018",
        border: "1px solid #1E1E2E",
        padding: "2rem",
        transition: "all 0.3s ease"
      }, onMouseEnter: (e) => {
        e.currentTarget.style.borderLeft = "3px solid var(--accent)";
        e.currentTarget.style.background = "#16161F";
      }, onMouseLeave: (e) => {
        e.currentTarget.style.borderLeft = "1px solid #1E1E2E";
        e.currentTarget.style.background = "#101018";
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-[24px] mb-4 font-bold", style: {
          color: "var(--accent)"
        }, children: "⚔ · COMPETITION" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: {
          color: "var(--text-muted)",
          fontSize: "14px",
          lineHeight: 1.6
        }, children: "Battle the brightest minds across institutions in 14+ technical and non-technical events — from coding duels to creative showdowns." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", style: {
        background: "#101018",
        border: "1px solid #1E1E2E",
        padding: "2rem",
        transition: "all 0.3s ease"
      }, onMouseEnter: (e) => {
        e.currentTarget.style.borderLeft = "3px solid var(--accent)";
        e.currentTarget.style.background = "#16161F";
      }, onMouseLeave: (e) => {
        e.currentTarget.style.borderLeft = "1px solid #1E1E2E";
        e.currentTarget.style.background = "#101018";
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-[24px] mb-4 font-bold", style: {
          color: "var(--accent)"
        }, children: "🌐 · COMMUNITY" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: {
          color: "var(--text-muted)",
          fontSize: "14px",
          lineHeight: 1.6
        }, children: "Connect with industry experts, researchers, and fellow tech enthusiasts from institutions worldwide at RIT's flagship international symposium." })
      ] })
    ] })
  ] }) });
}
function OrganizersSection() {
  const sectionLabelStyle = {
    fontSize: "11px",
    textTransform: "uppercase",
    color: "#8888A8",
    letterSpacing: "0.15em",
    marginBottom: "1rem"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "organizers", className: "section-padding", style: {
    background: "var(--bg)"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      marginBottom: "4rem"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label", style: {
        color: "var(--text-muted)"
      }, children: "[ TEAM ]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display", style: {
        fontSize: "clamp(36px, 4vw, 52px)",
        color: "var(--text-primary)"
      }, children: "Organizers & Coordinators." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: "3rem"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: sectionLabelStyle, children: "ORGANIZERS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem"
        }, children: [{
          name: "Dr. S. Uma",
          role: "HOD / CSE"
        }, {
          name: "Dr. N. Indumathi",
          role: "AP / CSE"
        }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 group", style: {
          background: "#101018",
          border: "1px solid #1E1E2E",
          transition: "all 0.3s ease"
        }, onMouseEnter: (e) => e.currentTarget.style.borderColor = "var(--accent)", onMouseLeave: (e) => e.currentTarget.style.borderColor = "#1E1E2E", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 flex items-center justify-center transition-colors", style: {
            background: "rgba(200,250,100,0.05)",
            border: "1px solid var(--accent)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 20, color: "var(--accent)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-[18px] text-[#EEEEF5]", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] text-[#8888A8] uppercase", children: p.role })
          ] })
        ] }, p.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: sectionLabelStyle, children: "FACULTY COORDINATORS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem"
        }, children: [{
          name: "Ms. J. Sindhuja",
          role: "AP / CSE"
        }, {
          name: "Mr. P. Murugan",
          role: "AP / CSE"
        }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 group", style: {
          background: "#101018",
          border: "1px solid #1E1E2E",
          transition: "all 0.3s ease"
        }, onMouseEnter: (e) => e.currentTarget.style.borderColor = "var(--accent)", onMouseLeave: (e) => e.currentTarget.style.borderColor = "#1E1E2E", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 flex items-center justify-center transition-colors", style: {
            background: "rgba(200,250,100,0.05)",
            border: "1px solid var(--accent)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 20, color: "var(--accent)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-[18px] text-[#EEEEF5]", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] text-[#8888A8] uppercase", children: p.role })
          ] })
        ] }, p.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: sectionLabelStyle, children: "STUDENT COORDINATORS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [{
          name: "Divyadarshini K",
          phone: "8056120505"
        }, {
          name: "Gajalakshmi C",
          phone: "9994335576"
        }, {
          name: "M. S. Sathish",
          phone: "9384579988"
        }, {
          name: "S. Sanjit Kumar",
          phone: "8667509464"
        }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 group", style: {
          background: "#101018",
          border: "1px solid #1E1E2E",
          transition: "all 0.3s ease"
        }, onMouseEnter: (e) => e.currentTarget.style.borderColor = "var(--accent)", onMouseLeave: (e) => e.currentTarget.style.borderColor = "#1E1E2E", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 flex items-center justify-center shrink-0 transition-colors", style: {
            background: "rgba(200,250,100,0.05)",
            border: "1px solid var(--accent)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16, color: "var(--accent)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            overflow: "hidden"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-[14px] text-[#EEEEF5] truncate", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:+91${p.phone}`, className: "font-mono text-[11px] text-[#8888A8] hover:text-[var(--accent)] flex items-center gap-1 mt-1 truncate", style: {
              transition: "color 0.2s"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10 }),
              " ",
              p.phone
            ] })
          ] })
        ] }, p.name)) })
      ] })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { id: "contact", style: {
    background: "var(--surface)",
    borderTop: "1px solid var(--stroke)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", style: {
      padding: "80px 32px 0"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: "4rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid var(--stroke)"
      }, className: "footer-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display", style: {
            fontSize: "24px",
            marginBottom: "0.75rem"
          }, children: [
            "ZYPH",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: "var(--accent)"
            }, children: "ORIA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", style: {
              fontSize: "12px",
              color: "var(--text-muted)",
              marginLeft: "6px",
              fontWeight: 400
            }, children: "'26" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: {
            fontSize: "13px",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            maxWidth: "280px"
          }, children: "The annual CSE Symposium of Rajalakshmi Institute of Technology. Sci-fi precision. Human ambition." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: {
            fontSize: "10px",
            color: "var(--accent)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1.25rem"
          }, children: "Navigation" }),
          ["Events", "Register", "Contact"].map((item) => item === "Register" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "font-mono", style: {
            display: "block",
            fontSize: "13px",
            color: "var(--text-muted)",
            textDecoration: "none",
            marginBottom: "0.75rem",
            transition: "color 0.15s"
          }, onMouseEnter: (e) => e.currentTarget.style.color = "var(--text-primary)", onMouseLeave: (e) => e.currentTarget.style.color = "var(--text-muted)", children: item }, item) : /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `#${item.toLowerCase()}`, className: "font-mono", style: {
            display: "block",
            fontSize: "13px",
            color: "var(--text-muted)",
            textDecoration: "none",
            marginBottom: "0.75rem",
            transition: "color 0.15s"
          }, onMouseEnter: (e) => e.currentTarget.style.color = "var(--text-primary)", onMouseLeave: (e) => e.currentTarget.style.color = "var(--text-muted)", children: item }, item))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono", style: {
            fontSize: "10px",
            color: "var(--accent)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "1.25rem"
          }, children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 mb-6", children: [{
            name: "Divyadarshini K",
            phone: "8056120505",
            display: "+91 80561 20505"
          }, {
            name: "Gajalakshmi C",
            phone: "9994335576",
            display: "+91 99943 35576"
          }, {
            name: "M. S. Sathish",
            phone: "9384579988",
            display: "+91 93845 79988"
          }, {
            name: "S. Sanjit Kumar",
            phone: "8667509464",
            display: "+91 86675 09464"
          }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-[#8888A8]", style: {
            gap: "1rem"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] break-keep", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:+91${c.phone}`, className: "font-mono text-[12px] whitespace-nowrap hover:text-[var(--accent)] transition-colors", children: c.display })
          ] }, c.name)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            display: "flex",
            gap: "0.75rem",
            marginTop: "1rem"
          }, children: ["IG", "LI", "TW"].map((social) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "font-mono", style: {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono", style: {
        padding: "1.25rem 0",
        textAlign: "center",
        fontSize: "10px",
        color: "var(--text-muted)",
        letterSpacing: "0.12em",
        textTransform: "uppercase"
      }, children: "ZYPHORIA '26 · CSE DEPARTMENT · RAJALAKSHMI INSTITUTE OF TECHNOLOGY · APRIL 15–16" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      ` })
  ] });
}
function CtaBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-padding", style: {
    background: "var(--bg)",
    borderTop: "1px solid var(--stroke)"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display", style: {
      fontSize: "clamp(32px, 4vw, 48px)",
      color: "var(--text-primary)",
      marginBottom: "1rem"
    }, children: "Ready to Compete?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm sm:text-base text-[#8888A8] mb-8", children: "₹300 per team per event · April 15–16, 2026 · Rajalakshmi Institute of Technology" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "btn-lime-pill hover:opacity-90 transition-opacity", style: {
      padding: "1rem 3rem",
      fontSize: "14px",
      display: "inline-block",
      background: "var(--accent)",
      color: "#08080C",
      textDecoration: "none",
      textTransform: "uppercase",
      letterSpacing: "0.15em",
      fontWeight: "bold",
      borderRadius: "0px"
    }, children: "REGISTER NOW" })
  ] }) });
}
function ZyphoriaHome() {
  const [showIntro, setShowIntro] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setShowIntro(window.sessionStorage.getItem("intro_seen") !== "true");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Fe, { position: "bottom-right", toastOptions: {
      style: {
        background: "var(--surface)",
        color: "var(--text-primary)",
        border: "1px solid var(--stroke)",
        fontFamily: "Geist Mono, monospace",
        fontSize: "13px"
      }
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IntroLoader, { showIntro, onComplete: () => setShowIntro(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: false, animate: {
      opacity: showIntro ? 0 : 1,
      y: showIntro ? 8 : 0
    }, transition: {
      duration: 0.45,
      ease: "easeOut"
    }, className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EventsSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CtaBanner, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OrganizersSection, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] })
  ] });
}
export {
  ZyphoriaHome as component
};
