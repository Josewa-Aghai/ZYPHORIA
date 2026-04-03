import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Fe, z as zt } from "../_libs/react-hot-toast.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { U as Upload, L as LoaderCircle, A as ArrowLeft } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const supabaseUrl = "https://placeholder.supabase.co";
const supabaseKey = "placeholder";
const supabase = createClient(supabaseUrl, supabaseKey);
const techDropdownEvents = ["Reverse Engineering Arena", "AI Prompt Engineering Battle", "UI/UX Redesign Challenge", "Tech Treasure Hunt", "Research Pitch", "Build a Startup in 60 Min", "Bug Hunt"];
const nonTechDropdownEvents = ["Engineering Standup Comedy", "Tech Meme War", "Mystery Box Innovation", "Reel Making Challenge", "Tech Dum Charades", "E-Sports", "Marketing a Useless Product"];
const PAYMENT_LINK = "https://edu.easebuzz.in/register/RAJALAKSHMIbw5w4/ZYPHORIA_2026_SYMPOSIUM";
const NAME_REGEX = /^[A-Za-z\s.'-]{2,100}$/;
const PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/;
const DEPT_REGEX = /^[A-Za-z\s&./()-]{2,100}$/;
const COLLEGE_REGEX = /^[A-Za-z\s&.,'/()-]{2,200}$/;
const TEAM_NAME_REGEX = /^[A-Za-z0-9\s&._'-]{2,100}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: `navbar ${scrolled ? "scrolled" : ""}`, style: {
    background: scrolled ? void 0 : "transparent"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", style: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display", style: {
      fontSize: "18px",
      color: "var(--text-primary)",
      letterSpacing: "-0.04em"
    }, children: [
      "ZYPH",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
        color: "#C8FA64"
      }, children: "ORIA" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", style: {
        fontSize: "10px",
        color: "var(--text-muted)",
        marginLeft: "6px",
        fontWeight: 400,
        letterSpacing: "0.1em"
      }, children: "'26" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "btn-ghost font-mono", style: {
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "var(--text-muted)",
      textDecoration: "none"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
      " BACK TO HOME"
    ] })
  ] }) });
}
const InputField = ({
  name,
  placeholder,
  err,
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, placeholder, className: "w-full bg-[#0D0D14] border outline-none font-mono text-[14px] text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] placeholder-[#4A4A62]", style: {
      borderColor: err ? "#FF4D6D" : "#1E1E2E",
      borderRadius: "0",
      height: "44px",
      padding: "12px 14px"
    }, onFocus: (e) => {
      e.target.style.borderColor = "#C8FA64";
    }, onBlur: (e) => {
      e.target.style.borderColor = err ? "#FF4D6D" : "#1E1E2E";
    }, ...props }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#FF4D6D] text-[10px] mt-1.5 font-mono tracking-wide", children: err })
  ] });
};
const FormLabel = ({
  children
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[#8888A8] text-[10px] tracking-[0.15em] uppercase block", style: {
  marginBottom: "8px"
}, children });
function RegisterPage() {
  const [tab, setTab] = reactExports.useState("tech");
  const [formData, setFormData] = reactExports.useState({
    event: "",
    participantCount: "0"
  });
  const [file, setFile] = reactExports.useState(null);
  const [filePreview, setFilePreview] = reactExports.useState(null);
  const [errors, setErrors] = reactExports.useState({});
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [isSuccess, setIsSuccess] = reactExports.useState(false);
  const formRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const eventParam = params.get("event");
    if (eventParam) {
      if (techDropdownEvents.includes(eventParam)) {
        setTab("tech");
        setFormData((p) => ({
          ...p,
          event: eventParam
        }));
      } else if (nonTechDropdownEvents.includes(eventParam)) {
        setTab("nontech");
        setFormData((p) => ({
          ...p,
          event: eventParam
        }));
      }
    }
    window.scrollTo(0, 0);
  }, []);
  const accent = "#C8FA64";
  const eventsList = tab === "tech" ? techDropdownEvents : nonTechDropdownEvents;
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      zt.error("File size must be under 5MB");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    const teamName = fd.get("teamName");
    const leaderName = fd.get("leader.name");
    const leaderDepartment = fd.get("leader.department");
    const leaderCollege = fd.get("leader.college");
    const leaderEmail = fd.get("leader.email");
    const leaderPhone = fd.get("leader.phone");
    const count = parseInt(formData.participantCount);
    const parts = [];
    for (let i = 0; i < count; i++) {
      parts.push({
        name: fd.get(`p${i}.name`),
        department: fd.get(`p${i}.department`),
        college: fd.get(`p${i}.college`),
        email: fd.get(`p${i}.email`),
        phone: fd.get(`p${i}.phone`)
      });
    }
    let errs = {};
    if (!formData.event) errs["event"] = "Select target event";
    if (!file) errs["file"] = "Payment receipt required";
    if (!TEAM_NAME_REGEX.test(teamName || "")) errs["teamName"] = "Invalid team name";
    if (!NAME_REGEX.test(leaderName || "")) errs["leader.name"] = "Invalid name";
    if (!DEPT_REGEX.test(leaderDepartment || "")) errs["leader.department"] = "Invalid department";
    if (!COLLEGE_REGEX.test(leaderCollege || "")) errs["leader.college"] = "Invalid college";
    if (!EMAIL_REGEX.test(leaderEmail || "")) errs["leader.email"] = "Invalid email";
    if (!PHONE_REGEX.test(leaderPhone || "")) errs["leader.phone"] = "Invalid phone";
    for (let i = 0; i < count; i++) {
      if (!NAME_REGEX.test(parts[i].name || "")) errs[`p${i}.name`] = "Invalid name";
      if (!DEPT_REGEX.test(parts[i].department || "")) errs[`p${i}.department`] = "Invalid department";
      if (!COLLEGE_REGEX.test(parts[i].college || "")) errs[`p${i}.college`] = "Invalid college";
      if (!EMAIL_REGEX.test(parts[i].email || "")) errs[`p${i}.email`] = "Invalid email";
      if (!PHONE_REGEX.test(parts[i].phone || "")) errs[`p${i}.phone`] = "Invalid phone";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      zt.error("Please fix the highlighted errors.");
      return;
    }
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
      const insertData = {
        team_name: teamName,
        leader_name: leaderName,
        leader_email: leaderEmail,
        leader_phone: leaderPhone,
        leader_department: leaderDepartment,
        leader_college: leaderCollege,
        technical_event: tab === "tech" ? formData.event : null,
        non_technical_event: tab === "nontech" ? formData.event : null,
        payment_screenshot_url: publicUrl,
        participant1_name: count >= 1 ? parts[0].name : null,
        participant1_department: count >= 1 ? parts[0].department : null,
        participant1_college: count >= 1 ? parts[0].college : null,
        participant1_email: count >= 1 ? parts[0].email : null,
        participant1_phone: count >= 1 ? parts[0].phone : null,
        participant2_name: count >= 2 ? parts[1].name : null,
        participant2_department: count >= 2 ? parts[1].department : null,
        participant2_college: count >= 2 ? parts[1].college : null,
        participant2_email: count >= 2 ? parts[1].email : null,
        participant2_phone: count >= 2 ? parts[1].phone : null,
        participant3_name: count == 3 ? parts[2].name : null,
        participant3_department: count == 3 ? parts[2].department : null,
        participant3_college: count == 3 ? parts[2].college : null,
        participant3_email: count == 3 ? parts[2].email : null,
        participant3_phone: count == 3 ? parts[2].phone : null
      };
      const {
        error: insertErr
      } = await supabase.from("registrations").insert([insertData]);
      if (insertErr) throw insertErr;
      fetch("/api/sync-to-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          registration: insertData
        })
      }).catch((err) => console.error("Sheets sync failed:", err));
      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      zt.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen pt-20", style: {
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        textAlign: "center",
        padding: "0 2rem"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          marginBottom: "2rem"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          color: accent,
          fontSize: "64px",
          filter: "drop-shadow(0 0 20px rgba(200, 250, 100, 0.4))"
        }, children: "✦" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display uppercase", style: {
          fontSize: "clamp(28px, 4vw, 42px)",
          color: "var(--text-primary)",
          marginBottom: "1rem"
        }, children: "Registration Confirmed." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-base text-[#8888A8]", children: "Your submission has been received. See you at Zyphoria '26." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          marginTop: "3rem"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-ghost font-mono uppercase tracking-[0.2em] text-[12px] opacity-70 hover:opacity-100 transition-opacity", children: "← BACK TO HOME" }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen pt-24 sm:pt-32 pb-20", style: {
    background: "var(--bg)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Fe, { position: "bottom-right" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", style: {
      maxWidth: "680px",
      margin: "0 auto",
      position: "relative",
      zIndex: 10
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        marginBottom: "4rem",
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label", style: {
          color: "#8888A8",
          fontSize: "10px",
          letterSpacing: "0.2em"
        }, children: "[ REGISTER ]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display mt-2", style: {
          fontSize: "clamp(36px, 5vw, 64px)",
          color: "var(--text-primary)",
          lineHeight: 1.1
        }, children: "Join the Symposium." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm sm:text-base text-[#8888A8] mt-4 opacity-80", children: "₹300 per team per event" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-[#101018] flex relative items-center border-[1px] border-[#1E1E2E] border-b-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-6 font-mono text-[#8888A8] text-xl hidden sm:block", children: "[" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            setTab("tech");
            setFormData((p) => ({
              ...p,
              event: ""
            }));
          }, className: "font-display font-medium uppercase tracking-widest bg-transparent cursor-pointer", style: {
            padding: "1.25rem 1.5rem",
            fontSize: "13px",
            color: tab === "tech" ? "#C8FA64" : "#8888A8",
            borderBottom: tab === "tech" ? "2px solid #C8FA64" : "2px solid transparent",
            transition: "all 0.3s ease"
          }, children: "⚡ TECHNICAL · APR 15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            setTab("nontech");
            setFormData((p) => ({
              ...p,
              event: ""
            }));
          }, className: "font-display font-medium uppercase tracking-widest bg-transparent cursor-pointer", style: {
            padding: "1.25rem 1.5rem",
            fontSize: "13px",
            color: tab === "nontech" ? "#C8FA64" : "#8888A8",
            borderBottom: tab === "nontech" ? "2px solid #C8FA64" : "2px solid transparent",
            transition: "all 0.3s ease"
          }, children: "🎮 NON-TECHNICAL · APR 16" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-6 font-mono text-[#8888A8] text-xl hidden sm:block", children: "]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        background: "#101018",
        border: "1px solid #1E1E2E",
        padding: "32px"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, ref: formRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", style: {
        gap: "28px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", style: {
          gap: "20px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-[13px] uppercase tracking-[0.1em]", style: {
            color: "#C8FA64",
            margin: 0
          }, children: "EVENT DIRECTIVE" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: tab === "tech" ? "Technical Event (15 Apr)" : "Non-Technical Event (16 Apr)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: formData.event, onChange: (e) => setFormData((p) => ({
              ...p,
              event: e.target.value
            })), className: "w-full bg-[#0D0D14] border outline-none font-mono text-[14px] text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] appearance-none", style: {
              borderColor: errors.event ? "#FF4D6D" : "#1E1E2E",
              borderRadius: "0",
              height: "44px",
              padding: "12px 14px",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFFFFF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              backgroundSize: "1.1em"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- Choose Target --" }),
              eventsList.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: ev, children: ev }, ev))
            ] }),
            errors.event && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#FF4D6D] text-[10px] mt-1.5 font-mono", children: errors.event })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Team Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: "teamName", placeholder: "e.g. Team Zyphoria", err: errors.teamName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          height: "1px",
          background: "#1E1E2E",
          margin: "24px 0"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", style: {
          gap: "20px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-[13px] uppercase tracking-[0.1em]", style: {
              color: "#C8FA64",
              margin: 0
            }, children: "TEAM LEADER" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-[#4A4A62] tracking-widest uppercase", children: "COMMANDER // 01" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "16px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: "leader.name", placeholder: "Enter full name", err: errors["leader.name"] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Department" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: "leader.department", placeholder: "e.g. CSE, ECE, IT...", err: errors["leader.department"] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "16px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "College" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: "leader.college", placeholder: "Enter college name", err: errors["leader.college"] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: "leader.email", placeholder: "Enter email address", err: errors["leader.email"] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Phone Connection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: "leader.phone", placeholder: "Enter 10-digit mobile number", err: errors["leader.phone"] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          height: "1px",
          background: "#1E1E2E",
          margin: "24px 0"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", style: {
          gap: "20px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-[13px] uppercase tracking-[0.1em]", style: {
            color: "#C8FA64",
            margin: 0
          }, children: "SQUAD CAPACITY (EXCLUDING LEADER)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: formData.participantCount, onChange: (e) => setFormData((p) => ({
            ...p,
            participantCount: e.target.value
          })), className: "w-full bg-[#0D0D14] border outline-none font-mono text-[14px] text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] appearance-none", style: {
            borderColor: "#1E1E2E",
            borderRadius: "0",
            height: "44px",
            padding: "12px 14px",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFFFFF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            backgroundSize: "1.1em"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "0", children: "0 (Solo Operative)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "1 Operative" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "2 Operatives" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "3 Operatives" })
          ] })
        ] }),
        Array.from({
          length: parseInt(formData.participantCount)
        }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            height: "1px",
            background: "#1E1E2E",
            margin: "24px 0"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", style: {
            gap: "20px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-[13px] uppercase tracking-[0.1em]", style: {
                color: "#C8FA64",
                margin: 0
              }, children: `OPERATIVE // 0${idx + 2}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-[#4A4A62] tracking-widest uppercase", children: `OPERATIVE // 0${idx + 2}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "16px"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: `p${idx}.name`, placeholder: "Enter full name", err: errors[`p${idx}.name`] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Department" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: `p${idx}.department`, placeholder: "e.g. CSE, ECE, IT...", err: errors[`p${idx}.department`] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "16px"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "College" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: `p${idx}.college`, placeholder: "Enter college name", err: errors[`p${idx}.college`] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: `p${idx}.email`, placeholder: "Enter email address", err: errors[`p${idx}.email`] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Phone Connection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputField, { name: `p${idx}.phone`, placeholder: "Enter 10-digit mobile number", err: errors[`p${idx}.phone`] })
            ] })
          ] })
        ] }, idx)),
        parseInt(formData.participantCount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          height: "1px",
          background: "#1E1E2E",
          margin: "24px 0"
        } }),
        parseInt(formData.participantCount) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          height: "1px",
          background: "#1E1E2E",
          margin: "24px 0"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", style: {
          gap: "20px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-[13px] uppercase tracking-[0.1em]", style: {
            color: "#C8FA64",
            margin: 0
          }, children: "PAYMENT PROTOCOL" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[13px] text-[#8888A8] leading-relaxed m-0", children: "Initialize payment of ₹300 per team via our secure uplink. Upload your confirmation receipt below for verification." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: PAYMENT_LINK, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-3 border font-mono text-[11px] uppercase tracking-widest transition-all duration-300", style: {
            borderColor: "#C8FA64",
            color: "#C8FA64",
            background: "rgba(200, 250, 100, 0.05)",
            height: "44px",
            padding: "0 24px"
          }, onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = "#C8FA64";
            e.currentTarget.style.color = "#08080C";
          }, onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "rgba(200, 250, 100, 0.05)";
            e.currentTarget.style.color = "#C8FA64";
          }, children: "↗ ACCESS PAYMENT PORTAL" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative border-[1px] border-dashed text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#12121A]", style: {
            borderColor: errors.file ? "#FF4D6D" : "#1E1E2E",
            background: "#0D0D14",
            padding: "40px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" }),
            filePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: filePreview, alt: "Preview", className: "h-20 w-20 object-cover border mb-3", style: {
                borderColor: "#C8FA64"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-[#EEEEF5]", children: file?.name })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 24, style: {
                color: "#4A4A62",
                marginBottom: "16px"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[12px] text-[#EEEEF5] mb-1", children: "Upload Transmission Receipt" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-[#4A4A62]", children: "PNG, JPG or WEBP · Max 5MB" })
            ] })
          ] }),
          errors.file && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#FF4D6D] text-[10px] font-mono text-center m-0", children: errors.file })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full font-display font-bold text-[14px] uppercase tracking-[0.15em] py-5 flex items-center justify-center gap-3 transition-all duration-300 group mt-4 shadow-[0_0_20px_rgba(0,0,0,0.3)]", style: {
          backgroundColor: isSubmitting ? "#1E1E2E" : "#C8FA64",
          color: isSubmitting ? "#4A4A62" : "#08080C",
          border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer"
        }, children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin", size: 18 }),
          " SYNCING DATA..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "CONFIRM REGISTRATION →" }) })
      ] }) }) })
    ] })
  ] });
}
export {
  RegisterPage as component
};
