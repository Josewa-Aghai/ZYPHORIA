import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
const events = [{
  id: 1,
  category: "technical",
  name: "Code Clash",
  description: "Algorithmic speed run. Solve the hardest problems fastest under pressure.",
  team: "Solo"
}, {
  id: 2,
  category: "technical",
  name: "Hack Orbit",
  description: "12-hour hackathon sprint. Build something real, something bold.",
  team: "Duo"
}, {
  id: 3,
  category: "technical",
  name: "Debug Duel",
  description: "Find the bugs others planted. Fastest fix takes the crown.",
  team: "Solo"
}, {
  id: 4,
  category: "technical",
  name: "Circuit Surge",
  description: "Hardware meets software. Design, wire, and program under the clock.",
  team: "Duo"
}, {
  id: 5,
  category: "technical",
  name: "Query Quest",
  description: "SQL sorcery and data wrangling. Your schema, your rules.",
  team: "Solo"
}, {
  id: 6,
  category: "technical",
  name: "Net Phantom",
  description: "CTF-style cybersecurity challenge. Infiltrate, capture, report.",
  team: "Duo"
}, {
  id: 7,
  category: "technical",
  name: "Paper Blitz",
  description: "Present your research in 5 minutes. Judges are relentless.",
  team: "Duo"
}, {
  id: 8,
  category: "non-tech",
  name: "Pixel Wars",
  description: "UI design battle. Given a brief, create the sharpest interface.",
  team: "Duo"
}, {
  id: 9,
  category: "non-tech",
  name: "Mind Matrix",
  description: "Tech trivia warfare. Knowledge is the only weapon.",
  team: "Duo"
}, {
  id: 10,
  category: "non-tech",
  name: "Robo Royale",
  description: "Remote control combat arena. Last bot standing wins.",
  team: "Duo"
}, {
  id: 11,
  category: "non-tech",
  name: "Signal Jam",
  description: "Improvised tech talk. No slides. No notes. Pure articulation.",
  team: "Solo"
}, {
  id: 12,
  category: "non-tech",
  name: "Capture Frame",
  description: "Tech-themed photography. One lens, one shot, one story.",
  team: "Solo"
}, {
  id: 13,
  category: "non-tech",
  name: "Code Poetry",
  description: "Write code that reads like art. Creativity meets logic.",
  team: "Solo"
}, {
  id: 14,
  category: "non-tech",
  name: "Startup Sprint",
  description: "Pitch your tech startup idea in 3 minutes. Sharks are watching.",
  team: "Duo"
}];
const team = [{
  id: 1,
  name: "Arjun Krishnan",
  role: "Event Coordinator",
  featured: true,
  initials: "AK",
  color: "#C8FA64"
}, {
  id: 2,
  name: "Priya Nair",
  role: "Technical Head",
  featured: false,
  initials: "PN",
  color: "#8888A8"
}, {
  id: 3,
  name: "Karthik Raj",
  role: "Design Lead",
  featured: false,
  initials: "KR",
  color: "#8888A8"
}, {
  id: 4,
  name: "Sneha Varma",
  role: "Logistics Head",
  featured: false,
  initials: "SV",
  color: "#8888A8"
}, {
  id: 5,
  name: "Rahul Dev",
  role: "Outreach Lead",
  featured: false,
  initials: "RD",
  color: "#8888A8"
}, {
  id: 6,
  name: "Ananya Iyer",
  role: "Web Developer",
  featured: false,
  initials: "AI",
  color: "#8888A8"
}];
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
      }, className: "desktop-nav", children: ["EVENTS", "TEAM", "CONTACT"].map((link) => /* @__PURE__ */ jsx("a", { href: `#${link.toLowerCase()}`, className: "font-mono", style: {
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
    }, children: ["EVENTS", "TEAM", "CONTACT"].map((link) => /* @__PURE__ */ jsx("a", { href: `#${link.toLowerCase()}`, className: "font-mono", onClick: () => setMenuOpen(false), style: {
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
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap"
        }, children: [
          /* @__PURE__ */ jsx("a", { href: "#events", className: "btn-filled", style: {
            fontSize: "12px"
          }, children: "Explore Events" }),
          /* @__PURE__ */ jsx("a", { href: "#team", className: "btn-ghost", style: {
            fontSize: "12px"
          }, children: "Meet the Team →" })
        ] })
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
  event
}) {
  return /* @__PURE__ */ jsxs("div", { className: "event-card", children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "0.75rem"
    }, children: [
      /* @__PURE__ */ jsx("span", { className: event.category === "technical" ? "pill-tech" : "pill-nontech", children: event.category === "technical" ? "Technical" : "Non-Tech" }),
      /* @__PURE__ */ jsx("span", { className: "font-mono", style: {
        fontSize: "10px",
        color: "var(--text-muted)",
        letterSpacing: "0.1em",
        textTransform: "uppercase"
      }, children: event.team })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "event-name font-display", style: {
      fontSize: "20px",
      color: "var(--text-primary)",
      marginBottom: "0.5rem"
    }, children: event.name }),
    /* @__PURE__ */ jsx("p", { className: "font-mono", style: {
      fontSize: "13px",
      color: "var(--text-muted)",
      lineHeight: 1.6,
      marginBottom: "1.25rem"
    }, children: event.description }),
    /* @__PURE__ */ jsx("a", { href: "#register", className: "btn-ghost font-mono", style: {
      fontSize: "11px",
      padding: "0.5rem 1rem",
      display: "inline-flex",
      alignItems: "center",
      gap: "4px"
    }, children: "JOIN →" })
  ] });
}
function EventsSection() {
  return /* @__PURE__ */ jsxs("section", { id: "events", className: "section-padding", style: {
    background: "var(--bg)"
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: {
        marginBottom: "4rem"
      }, children: [
        /* @__PURE__ */ jsx("p", { className: "section-label", children: "[02 — EVENTS]" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display", style: {
          fontSize: "clamp(36px, 4vw, 52px)",
          color: "var(--text-primary)"
        }, children: "14 Ways to Win." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1px",
        background: "var(--stroke)"
      }, className: "events-grid", children: [
        events.map((event) => /* @__PURE__ */ jsx(EventCard, { event }, event.id)),
        /* @__PURE__ */ jsx("div", { style: {
          background: "var(--bg)"
        } })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @media (max-width: 900px) {
          .events-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
      ` })
  ] });
}
function TeamCard({
  member,
  large
}) {
  const [hovered, setHovered] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "team-card", onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), style: {
    borderColor: hovered ? "var(--accent)" : "var(--stroke)",
    transition: "border-color 0.2s"
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "photo-wrap", style: {
      aspectRatio: large ? "4/3" : "1/1",
      background: "var(--elevated)",
      borderBottom: "1px solid var(--stroke)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsx("span", { className: "font-display", style: {
        fontSize: large ? "72px" : "36px",
        color: hovered ? "var(--accent)" : "var(--stroke)",
        transition: "color 0.2s"
      }, children: member.initials }),
      hovered && /* @__PURE__ */ jsx("div", { style: {
        position: "absolute",
        inset: 0,
        border: "2px solid var(--accent)",
        pointerEvents: "none"
      } })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      padding: large ? "1.5rem" : "1rem"
    }, children: [
      /* @__PURE__ */ jsx("h3", { className: "team-name font-display", style: {
        fontSize: large ? "24px" : "16px",
        color: hovered ? "var(--accent)" : "var(--text-primary)",
        marginBottom: "4px",
        transition: "color 0.2s"
      }, children: member.name }),
      /* @__PURE__ */ jsx("p", { className: "font-mono", style: {
        fontSize: "11px",
        color: "var(--text-muted)",
        letterSpacing: "0.1em",
        textTransform: "uppercase"
      }, children: member.role })
    ] })
  ] });
}
function TeamSection() {
  const featured = team.find((m) => m.featured);
  const rest = team.filter((m) => !m.featured);
  return /* @__PURE__ */ jsxs("section", { id: "team", className: "section-padding", style: {
    background: "var(--surface)"
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("div", { style: {
        marginBottom: "4rem"
      }, children: [
        /* @__PURE__ */ jsx("p", { className: "section-label", children: "[03 — TEAM]" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display", style: {
          fontSize: "clamp(36px, 4vw, 52px)",
          color: "var(--text-primary)"
        }, children: "The people behind it." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gridTemplateRows: "auto auto",
        gap: "1px",
        background: "var(--stroke)"
      }, className: "team-grid", children: [
        /* @__PURE__ */ jsx("div", { style: {
          gridRow: "1 / 3"
        }, children: /* @__PURE__ */ jsx(TeamCard, { member: featured, large: true }) }),
        rest.map((m) => /* @__PURE__ */ jsx(TeamCard, { member: m }, m.id))
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @media (max-width: 900px) {
          .team-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: unset !important; }
          .team-grid > div:first-child { grid-row: unset !important; }
        }
        @media (max-width: 600px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      ` })
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
          ["Events", "Team", "Register", "Contact"].map((item) => /* @__PURE__ */ jsx("a", { href: `#${item.toLowerCase()}`, className: "font-mono", style: {
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
      /* @__PURE__ */ jsx(TeamSection, {}),
      /* @__PURE__ */ jsx(RegisterCTA, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  ZyphoriaHome as component
};
