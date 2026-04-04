// @ts-nocheck
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseKey)
const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseKey) : null
const paymentBucketName = 'screenshots'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

// ─── Event team-size config ──────────────────────────────────────────────────
// minMembers = min additional members (excluding leader)
// maxMembers = max additional members (excluding leader)

const eventConfig: Record<string, { minMembers: number; maxMembers: number; label: string }> = {
  // TECHNICAL
  'Reverse Engineering Arena':       { minMembers: 0, maxMembers: 1, label: 'Solo / Duo' },
  'AI Prompt Engineering Battle':    { minMembers: 0, maxMembers: 0, label: 'Individual' },
  'UI/UX Redesign Challenge':        { minMembers: 1, maxMembers: 2, label: '2–3 members' },
  'Tech Treasure Hunt':              { minMembers: 2, maxMembers: 3, label: '3–4 members' },
  'Research Pitch':                  { minMembers: 0, maxMembers: 1, label: '1–2 members' },
  'Build a Startup in 60 Min':       { minMembers: 1, maxMembers: 3, label: '2–4 members' },
  'Bug Hunt':                        { minMembers: 0, maxMembers: 1, label: 'Solo / Duo' },
  // NON-TECHNICAL
  'Engineering Standup Comedy':      { minMembers: 0, maxMembers: 0, label: 'Individual' },
  'Tech Meme War':                   { minMembers: 0, maxMembers: 2, label: '1–3 members' },
  'Mystery Box Innovation':          { minMembers: 1, maxMembers: 2, label: '2–3 members' },
  'Reel Making Challenge':           { minMembers: 0, maxMembers: 2, label: '1–3 members' },
  'Tech Dum Charades':               { minMembers: 2, maxMembers: 3, label: '3–4 members' },
  'E-Sports':                        { minMembers: 1, maxMembers: 1, label: 'Duo' },
  'Marketing a Useless Product':     { minMembers: 1, maxMembers: 2, label: '2–3 members' },
}

const techDropdownEvents = [
  'Reverse Engineering Arena',
  'AI Prompt Engineering Battle',
  'UI/UX Redesign Challenge',
  'Tech Treasure Hunt',
  'Research Pitch',
  'Build a Startup in 60 Min',
  'Bug Hunt',
]

const nonTechDropdownEvents = [
  'Engineering Standup Comedy',
  'Tech Meme War',
  'Mystery Box Innovation',
  'Reel Making Challenge',
  'Tech Dum Charades',
  'E-Sports',
  'Marketing a Useless Product',
]

const eSportsGames = ['PUBG MOBILE', 'E-FOOTBALL', 'FREEFIRE'] as const

const PAYMENT_LINK = 'https://edu.easebuzz.in/register/RAJALAKSHMIbw5w4/ZYPHORIA_2026_SYMPOSIUM'

const NAME_REGEX = /^[A-Za-z\s.'-]{2,100}$/
const PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/
const DEPT_REGEX = /^[A-Za-z\s&./()-]{2,100}$/
const COLLEGE_REGEX = /^[A-Za-z\s&.,'/()-]{2,200}$/
const TEAM_NAME_REGEX = /^[A-Za-z0-9\s&._'-]{2,100}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ background: scrolled ? undefined : 'transparent' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '64px' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="font-display" style={{ fontSize: '18px', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
            ZYPH<span style={{ color: '#C8FA64' }}>ORIA</span>
            <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '6px', fontWeight: 400, letterSpacing: '0.1em' }}>'26</span>
          </span>
        </Link>
      </div>
    </nav>
  )
}

const InputField = ({ name, placeholder, err, optional = false, ...props }: any) => (
  <div>
    <input
      name={name}
      placeholder={placeholder}
      className="w-full bg-[#0D0D14] border outline-none font-mono text-[14px] text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] placeholder-[#4A4A62]"
      style={{
        borderColor: err ? '#FF4D6D' : '#1E1E2E',
        borderRadius: '0',
        height: '44px',
        padding: '12px 14px',
      }}
      onFocus={(e) => { e.target.style.borderColor = optional ? '#6060A0' : '#C8FA64' }}
      onBlur={(e) => { e.target.style.borderColor = err ? '#FF4D6D' : '#1E1E2E' }}
      {...props}
    />
    {err && <div className="text-[#FF4D6D] text-[10px] mt-1.5 font-mono tracking-wide">{err}</div>}
  </div>
)

const FormLabel = ({ children, optional = false }: { children: React.ReactNode; optional?: boolean }) => (
  <label className="font-mono text-[10px] tracking-[0.15em] uppercase block" style={{ marginBottom: '10px', color: optional ? '#5A5A7A' : '#8888A8' }}>
    {children}
    {optional && <span style={{ color: '#3A3A5A', marginLeft: '6px', fontSize: '9px' }}>(optional)</span>}
  </label>
)

const selectStyle = (err?: string) => ({
  borderColor: err ? '#FF4D6D' : '#1E1E2E',
  borderRadius: '0',
  height: '44px',
  padding: '12px 14px',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFFFFF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
  backgroundSize: '1.1em',
})

// ─── Main Page ────────────────────────────────────────────────────────────────

function RegisterPage() {
  const [tab, setTab] = useState<'tech' | 'nontech'>('tech')
  const [formData, setFormData] = useState({ event: '', memberCount: 0, eSportsGame: '' })
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Derived event config for selected event
  const cfg = formData.event ? eventConfig[formData.event] : null
  const maxMembers = cfg ? cfg.maxMembers : 0

  // When event changes, reset memberCount to min for that event
  const handleEventChange = (eventName: string) => {
    const c = eventConfig[eventName]
    setFormData(p => ({
      ...p,
      event: eventName,
      memberCount: c ? c.minMembers : 0,
      eSportsGame: eventName === 'E-Sports' ? p.eSportsGame : '',
    }))
    setErrors({})
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const eventParam = params.get('event')
    if (eventParam) {
      if (techDropdownEvents.includes(eventParam)) {
        setTab('tech')
        handleEventChange(eventParam)
      } else if (nonTechDropdownEvents.includes(eventParam)) {
        setTab('nontech')
        handleEventChange(eventParam)
      }
    }
    window.scrollTo(0, 0)
  }, [])

  const accent = tab === 'tech' ? '#C8FA64' : '#FF4D6D'
  const accentSoft = tab === 'tech' ? 'rgba(200, 250, 100, 0.05)' : 'rgba(255, 77, 109, 0.08)'
  const eventsList = tab === 'tech' ? techDropdownEvents : nonTechDropdownEvents

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) { toast.error('File size must be under 5MB'); return }
    setFile(f)
    setFilePreview(URL.createObjectURL(f))
    setErrors(prev => ({ ...prev, file: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    const fd = new FormData(formRef.current)

    const teamName      = fd.get('teamName') as string
    const leaderName    = fd.get('leader.name') as string
    const leaderDept    = fd.get('leader.department') as string
    const leaderCollege = fd.get('leader.college') as string
    const leaderEmail   = fd.get('leader.email') as string
    const leaderPhone   = fd.get('leader.phone') as string

    const count = formData.memberCount
    const parts: { name: string; department: string; college: string; email: string; phone: string }[] = []
    for (let i = 0; i < count; i++) {
      parts.push({
        name:       fd.get(`p${i}.name`) as string,
        department: fd.get(`p${i}.department`) as string,
        college:    fd.get(`p${i}.college`) as string,
        email:      fd.get(`p${i}.email`) as string,
        phone:      fd.get(`p${i}.phone`) as string,
      })
    }

    const errs: Record<string, string> = {}

    if (!formData.event)                           errs['event']              = 'Select target event'
    if (formData.event === 'E-Sports' && !formData.eSportsGame) errs['eSportsGame'] = 'Select E-Sports title'
    if (!file)                                     errs['file']               = 'Payment receipt required'
    if (!TEAM_NAME_REGEX.test(teamName || ''))     errs['teamName']           = 'Invalid team name'
    if (!NAME_REGEX.test(leaderName || ''))        errs['leader.name']        = 'Invalid name'
    if (!DEPT_REGEX.test(leaderDept || ''))        errs['leader.department']  = 'Invalid department'
    if (!COLLEGE_REGEX.test(leaderCollege || ''))  errs['leader.college']     = 'Invalid college'
    if (!EMAIL_REGEX.test(leaderEmail || ''))      errs['leader.email']       = 'Invalid email'
    if (!PHONE_REGEX.test(leaderPhone || ''))      errs['leader.phone']       = 'Invalid phone'

    // Validate member fields - name is mandatory, others optional
    for (let i = 0; i < count; i++) {
      if (!NAME_REGEX.test(parts[i].name || ''))                        errs[`p${i}.name`]       = 'Member name required'
      if (parts[i].department && !DEPT_REGEX.test(parts[i].department)) errs[`p${i}.department`] = 'Invalid department'
      if (parts[i].college && !COLLEGE_REGEX.test(parts[i].college))    errs[`p${i}.college`]    = 'Invalid college'
      if (parts[i].email && !EMAIL_REGEX.test(parts[i].email))          errs[`p${i}.email`]      = 'Invalid email'
      if (parts[i].phone && !PHONE_REGEX.test(parts[i].phone))          errs[`p${i}.phone`]      = 'Invalid phone'
    }

    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      toast.error('Please fix the highlighted errors.')
      return
    }

    if (!hasSupabaseConfig || !supabase) {
      toast.error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
      return
    }

    setIsSubmitting(true)
    try {
      const ext = file!.name.split('.').pop()
      const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`
      const { error: uploadErr } = await supabase.storage.from(paymentBucketName).upload(filename, file!)
      if (uploadErr) throw uploadErr

      const { data: publicUrlData } = supabase.storage.from(paymentBucketName).getPublicUrl(filename)
      const publicUrl = publicUrlData.publicUrl

      const insertData = {
        team_name:               teamName,
        leader_name:             leaderName,
        leader_email:            leaderEmail,
        leader_phone:            leaderPhone,
        leader_department:       leaderDept,
        leader_college:          leaderCollege,
        technical_event:         tab === 'tech' ? formData.event : null,
        non_technical_event:     tab === 'nontech' ? formData.event : null,
        esports_title:           formData.event === 'E-Sports' ? formData.eSportsGame : null,
        payment_screenshot_url:  publicUrl,
        participant1_name:       count >= 1 ? parts[0].name || null : null,
        participant1_department: count >= 1 ? parts[0].department || null : null,
        participant1_college:    count >= 1 ? parts[0].college || null : null,
        participant1_email:      count >= 1 ? parts[0].email || null : null,
        participant1_phone:      count >= 1 ? parts[0].phone || null : null,
        participant2_name:       count >= 2 ? parts[1].name || null : null,
        participant2_department: count >= 2 ? parts[1].department || null : null,
        participant2_college:    count >= 2 ? parts[1].college || null : null,
        participant2_email:      count >= 2 ? parts[1].email || null : null,
        participant2_phone:      count >= 2 ? parts[1].phone || null : null,
        participant3_name:       count >= 3 ? parts[2].name || null : null,
        participant3_department: count >= 3 ? parts[2].department || null : null,
        participant3_college:    count >= 3 ? parts[2].college || null : null,
        participant3_email:      count >= 3 ? parts[2].email || null : null,
        participant3_phone:      count >= 3 ? parts[2].phone || null : null,
      }

      const { error: insertErr } = await supabase.from('registrations').insert([insertData])
      if (insertErr) throw insertErr

      try {
        const sheetsRes = await fetch('/api/sync-to-sheets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ registration: insertData }),
        })

        const sheetsJson = await sheetsRes.json().catch(() => null)

        if (!sheetsRes.ok) {
          console.error('Sheets sync failed:', sheetsRes.status, sheetsJson)
          toast.error(
            `Google Sheets sync failed (${sheetsRes.status}). Check server env + sharing.`,
          )
        } else {
          console.log('Sheets sync ok:', sheetsJson)
        }
      } catch (err) {
        console.error('Sheets sync failed:', err)
        toast.error('Google Sheets sync failed. Please contact the team.')
      }

      setIsSuccess(true)
      window.scrollTo(0, 0)

    } catch (err: any) {
      console.error(err)
      const details =
        err?.message ||
        err?.error_description ||
        err?.details ||
        err?.hint ||
        err?.code
      toast.error(`Registration failed: ${details ?? 'Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Success screen ─────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="relative min-h-screen pt-20" style={{ background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '0 2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ color: accent, fontSize: '64px', filter: 'drop-shadow(0 0 20px rgba(200, 250, 100, 0.4))' }}>✦</span>
          </div>
          <h2 className="font-display uppercase" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Registration Confirmed.
          </h2>
          <p className="font-mono text-base text-[#8888A8]">Your submission has been received. See you at Zyphoria '26.</p>
          <div style={{ marginTop: '3rem' }}>
            <Link to="/" className="btn-ghost font-mono uppercase tracking-[0.2em] text-[12px] opacity-70 hover:opacity-100 transition-opacity">
              ← BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ─── Form ───────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen pt-24 sm:pt-32 pb-20" style={{ background: 'var(--bg)' }}>
      <Toaster position="bottom-right" />
      <Navbar />



      <div className="container" style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Back Button */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" className="font-mono uppercase tracking-[0.2em] text-[11px] text-[#8888A8] hover:text-[var(--accent)] transition-colors" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            ← BACK TO HOME
          </Link>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p className="section-label" style={{ color: '#8888A8', fontSize: '10px', letterSpacing: '0.2em' }}>[ REGISTER ]</p>
          <h2 className="font-display mt-2" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
            Join the Symposium.
          </h2>
          <p className="font-mono text-sm sm:text-base text-[#8888A8] mt-4 opacity-80">₹300 per team per event</p>
        </div>

        {/* Tabs */}
        <div className="w-full bg-[#101018] flex relative items-center border-[1px] border-[#1E1E2E] border-b-0">
          <div className="absolute left-6 font-mono text-[#8888A8] text-xl hidden sm:block">[</div>
          <div className="flex-1 flex justify-center">
            <button
              type="button"
              onClick={() => { setTab('tech'); setFormData(p => ({ ...p, event: '', memberCount: 0 })); setErrors({}) }}
              className="font-display font-medium uppercase tracking-widest bg-transparent cursor-pointer"
              style={{
                padding: '1.25rem 1.5rem',
                fontSize: '13px',
                color: tab === 'tech' ? '#C8FA64' : '#8888A8',
                borderBottom: tab === 'tech' ? '2px solid #C8FA64' : '2px solid transparent',
                transition: 'all 0.3s ease',
              }}
            >
              ⚡ TECHNICAL · APR 15
            </button>
            <button
              type="button"
              onClick={() => { setTab('nontech'); setFormData(p => ({ ...p, event: '', memberCount: 0 })); setErrors({}) }}
              className="font-display font-medium uppercase tracking-widest bg-transparent cursor-pointer"
              style={{
                padding: '1.25rem 1.5rem',
                fontSize: '13px',
                color: tab === 'nontech' ? '#FF4D6D' : '#8888A8',
                borderBottom: tab === 'nontech' ? '2px solid #FF4D6D' : '2px solid transparent',
                transition: 'all 0.3s ease',
              }}
            >
              🎮 NON-TECHNICAL · APR 16
            </button>
          </div>
          <div className="absolute right-6 font-mono text-[#8888A8] text-xl hidden sm:block">]</div>
        </div>

        {/* Form Card */}
        <div style={{ background: '#101018', border: '1px solid #1E1E2E', padding: '48px' }}>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="flex flex-col" style={{ gap: '28px' }}>

              {/* ── EVENT DIRECTIVE ─────────────────────────────────────── */}
              <div className="flex flex-col" style={{ gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="font-display font-bold text-[13px] uppercase tracking-[0.1em]" style={{ color: accent, margin: 0 }}>
                    EVENT DIRECTIVE
                  </h4>
                </div>

                {/* Event selector */}
                <div>
                  <FormLabel>{tab === 'tech' ? 'Technical Event (15 Apr)' : 'Non-Technical Event (16 Apr)'}</FormLabel>
                  <select
                    value={formData.event}
                    onChange={(e) => handleEventChange(e.target.value)}
                    className="w-full bg-[#0D0D14] border outline-none font-mono text-[14px] text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] appearance-none"
                    style={selectStyle(errors.event)}
                  >
                    <option value="">-- Choose Target --</option>
                    {eventsList.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                  </select>
                  {errors.event && <div className="text-[#FF4D6D] text-[10px] mt-1.5 font-mono">{errors.event}</div>}
                </div>

                {formData.event === 'E-Sports' && (
                  <div>
                    <FormLabel>E-Sports Title</FormLabel>
                    <select
                      value={formData.eSportsGame}
                      onChange={(e) => setFormData(p => ({ ...p, eSportsGame: e.target.value }))}
                      className="w-full bg-[#0D0D14] border outline-none font-mono text-[14px] text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] appearance-none"
                      style={selectStyle(errors.eSportsGame)}
                    >
                      <option value="">-- Choose Game --</option>
                      {eSportsGames.map((game) => (
                        <option key={game} value={game}>{game}</option>
                      ))}
                    </select>
                    {errors.eSportsGame && <div className="text-[#FF4D6D] text-[10px] mt-1.5 font-mono">{errors.eSportsGame}</div>}
                  </div>
                )}

                {/* Team size badge — shown once event is chosen */}
                {cfg && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    background: 'rgba(200,250,100,0.04)',
                    border: `1px solid ${accent}22`,
                  }}>
                    <span style={{ color: accent, fontSize: '18px', lineHeight: 1 }}>◈</span>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: '#5A5A7A', marginBottom: '2px' }}>Team Format</div>
                      <div className="font-mono text-[13px]" style={{ color: '#EEEEF5' }}>{cfg.label}</div>
                    </div>
                    {maxMembers > 0 && (
                      <div style={{ marginLeft: 'auto' }}>
                        <div className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: '#5A5A7A', marginBottom: '2px' }}>Add Members</div>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <button
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, memberCount: Math.max(cfg.minMembers, p.memberCount - 1) }))}
                            className="font-mono"
                            style={{
                              width: '28px', height: '28px', background: '#1A1A28', border: '1px solid #2A2A40',
                              color: '#EEEEF5', cursor: 'pointer', fontSize: '16px', display: 'flex',
                              alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                            }}
                          >−</button>
                          <span className="font-mono text-[13px]" style={{ color: accent, minWidth: '20px', textAlign: 'center' }}>
                            {formData.memberCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, memberCount: Math.min(maxMembers, p.memberCount + 1) }))}
                            className="font-mono"
                            style={{
                              width: '28px', height: '28px', background: '#1A1A28', border: '1px solid #2A2A40',
                              color: '#EEEEF5', cursor: 'pointer', fontSize: '16px', display: 'flex',
                              alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                            }}
                          >+</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Team Name */}
                <div>
                  <FormLabel>Team Name</FormLabel>
                  <InputField name="teamName" placeholder="e.g. Team Zyphoria" err={errors.teamName} />
                </div>
              </div>

              <div style={{ height: '1px', background: '#1E1E2E', margin: '32px 0' }} />

              {/* ── TEAM LEADER (mandatory) ────────────────────────────── */}
              <div className="flex flex-col" style={{ gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="font-display font-bold text-[13px] uppercase tracking-[0.1em]" style={{ color: accent, margin: 0 }}>
                    TEAM LEADER
                  </h4>
                  <div className="font-mono text-[9px] text-[#4A4A62] tracking-widest uppercase">COMMANDER // 01</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '20px' }}>
                  <div>
                    <FormLabel>Full Name</FormLabel>
                    <InputField name="leader.name" placeholder="Enter full name" err={errors['leader.name']} />
                  </div>
                  <div>
                    <FormLabel>Department</FormLabel>
                    <InputField name="leader.department" placeholder="e.g. CSE, ECE, IT…" err={errors['leader.department']} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '20px' }}>
                  <div>
                    <FormLabel>College</FormLabel>
                    <InputField name="leader.college" placeholder="Enter college name" err={errors['leader.college']} />
                  </div>
                  <div>
                    <FormLabel>Email</FormLabel>
                    <InputField name="leader.email" placeholder="Enter email address" err={errors['leader.email']} />
                  </div>
                </div>
                <div>
                  <FormLabel>Phone Connection</FormLabel>
                  <InputField name="leader.phone" placeholder="Enter 10-digit mobile number" err={errors['leader.phone']} />
                </div>
              </div>

              {/* ── OPTIONAL TEAM MEMBERS (dynamic) ───────────────────── */}
              {formData.memberCount > 0 && Array.from({ length: formData.memberCount }).map((_, idx) => (
                <div key={idx}>
                  <div style={{ height: '1px', background: '#1E1E2E', margin: '32px 0' }} />
                  <div className="flex flex-col" style={{ gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 className="font-display font-bold text-[13px] uppercase tracking-[0.1em]" style={{ color: accent, margin: 0 }}>
                        {`MEMBER // 0${idx + 2}`}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '20px' }}>
                      <div>
                        <FormLabel>Full Name</FormLabel>
                        <InputField name={`p${idx}.name`} placeholder="Enter full name" err={errors[`p${idx}.name`]} />
                      </div>
                      <div>
                        <FormLabel>Department</FormLabel>
                        <InputField name={`p${idx}.department`} placeholder="e.g. CSE, ECE, IT…" err={errors[`p${idx}.department`]} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '20px' }}>
                      <div>
                        <FormLabel>College</FormLabel>
                        <InputField name={`p${idx}.college`} placeholder="Enter college name" err={errors[`p${idx}.college`]} />
                      </div>
                      <div>
                        <FormLabel>Email</FormLabel>
                        <InputField name={`p${idx}.email`} placeholder="Enter email address" err={errors[`p${idx}.email`]} />
                      </div>
                    </div>
                    <div>
                      <FormLabel>Phone Connection</FormLabel>
                      <InputField name={`p${idx}.phone`} placeholder="Enter 10-digit mobile number" err={errors[`p${idx}.phone`]} />
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ height: '1px', background: '#1E1E2E', margin: '32px 0' }} />

              {/* ── PAYMENT PROTOCOL ──────────────────────────────────── */}
              <div className="flex flex-col" style={{ gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="font-display font-bold text-[13px] uppercase tracking-[0.1em]" style={{ color: accent, margin: 0 }}>
                    PAYMENT PROTOCOL
                  </h4>
                </div>
                <p className="font-mono text-[13px] text-[#8888A8] leading-relaxed m-0">
                  Initialize payment of ₹300 per team via our secure uplink. Upload your confirmation receipt below for verification.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <a
                    href={PAYMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border font-mono text-[11px] uppercase tracking-widest transition-all duration-300"
                    style={{ borderColor: accent, color: accent, background: accentSoft, height: '44px', padding: '0 24px' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accent; e.currentTarget.style.color = '#08080C'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = accentSoft; e.currentTarget.style.color = accent; }}
                  >
                    ↗ ACCESS PAYMENT PORTAL
                  </a>
                </div>

                <div
                  className="group relative border-[1px] border-dashed text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#12121A]"
                  style={{ borderColor: errors.file ? '#FF4D6D' : '#1E1E2E', background: '#0D0D14', padding: '40px' }}
                >
                  <input id="payment" name="payment" type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  {filePreview ? (
                    <div className="flex flex-col items-center">
                      <img src={filePreview} alt="Preview" className="h-20 w-20 object-cover border mb-3" style={{ borderColor: accent }} />
                      <span className="font-mono text-xs text-[#EEEEF5]">{file?.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload size={24} style={{ color: '#4A4A62', marginBottom: '16px' }} />
                      <p className="font-mono text-[12px] text-[#EEEEF5] mb-1">Upload Transmission Receipt</p>
                      <p className="font-mono text-[10px] text-[#4A4A62]">PNG, JPG or WEBP · Max 5MB</p>
                    </>
                  )}
                </div>
                {errors.file && <div className="text-[#FF4D6D] text-[10px] font-mono text-center m-0">{errors.file}</div>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-display font-bold text-[14px] uppercase tracking-[0.15em] py-5 flex items-center justify-center gap-3 transition-all duration-300 group mt-4 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                style={{
                  backgroundColor: isSubmitting ? '#1E1E2E' : accent,
                  color: isSubmitting ? '#4A4A62' : '#08080C',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" size={18} /> SYNCING DATA...</>
                ) : (
                  <>CONFIRM REGISTRATION →</>
                )}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
