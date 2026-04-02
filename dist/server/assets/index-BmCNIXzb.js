import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { SearchCode, Bot, Paintbrush, MapPin, Presentation, Briefcase, Bug, Mic, Image, Box, Video, AppWindow, Gamepad2, Megaphone, X } from "lucide-react";
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
function RegisterCTA() {
  return /* @__PURE__ */ jsx("section", { id: "register", className: "section-padding", style: {
    background: "var(--bg)"
  }, children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "cta-container", style: {
    padding: "4rem"
  }, children: [
    /* @__PURE__ */ jsx("span", { className: "ascii-corner tl", children: "┌──────────────────────────┐" }),
    /* @__PURE__ */ jsx("span", { className: "ascii-corner bl", children: "└──────────────────────────┘" }),
    /* @__PURE__ */ jsx("span", { className: "ascii-corner tr", style: {
      right: "12px"
    }, children: "┐" }),
    /* @__PURE__ */ jsx("span", { className: "ascii-corner br", style: {
      right: "12px"
    }, children: "┘" }),
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "3rem",
      flexWrap: "wrap"
    }, children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h2", { className: "font-display", style: {
        fontSize: "clamp(32px, 4vw, 52px)",
        color: "var(--text-primary)",
        lineHeight: 0.95
      }, children: [
        "Ready to compete?",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { style: {
          color: "var(--accent)"
        }, children: "Register now." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.75rem"
      }, children: [
        /* @__PURE__ */ jsx("a", { href: "mailto:zyphoria@rit.ac.in?subject=Registration%20for%20ZYPHORIA%2026", className: "btn-filled", style: {
          fontSize: "14px",
          padding: "1rem 2rem"
        }, children: "Register Now" }),
        /* @__PURE__ */ jsxs("div", { className: "font-mono", style: {
          fontSize: "11px",
          color: "var(--text-muted)",
          textAlign: "right",
          lineHeight: 2
        }, children: [
          /* @__PURE__ */ jsx("span", { children: "Free · RIT Students" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { children: "₹200 · External Teams" })
        ] })
      ] })
    ] })
  ] }) }) });
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(EventsSection, {}),
      /* @__PURE__ */ jsx(RegisterCTA, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  ZyphoriaHome as component
};
