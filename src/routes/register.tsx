import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Upload, Loader2, X } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'
const supabase = createClient(supabaseUrl, supabaseKey)

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

const techDropdownEvents = [
  "Reverse Engineering Arena",
  "AI Prompt Engineering Battle",
  "UI/UX Redesign Challenge",
  "Tech Treasure Hunt",
  "Research Pitch",
  "Build a Startup in 60 Min",
  "Bug Hunt"
]

const nonTechDropdownEvents = [
  "Engineering Standup Comedy",
  "Tech Meme War",
  "Mystery Box Innovation",
  "Reel Making Challenge",
  "Tech Dum Charades",
  "E-Sports",
  "Marketing a Useless Product"
]

const PAYMENT_LINK = "https://edu.easebuzz.in/register/RAJALAKSHMIbw5w4/ZYPHORIA_2026_SYMPOSIUM"

const NAME_REGEX = /^[A-Za-z\s.'-]{2,100}$/
const PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/
const DEPT_REGEX = /^[A-Za-z\s&./()-]{2,100}$/
const COLLEGE_REGEX = /^[A-Za-z\s&.,'/()-]{2,200}$/
const TEAM_NAME_REGEX = /^[A-Za-z0-9\s&._'-]{2,100}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ background: scrolled ? undefined : 'transparent' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="font-mono hover:text-[#C8FA64] transition-colors" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>← BACK</span>
        </a>
      </div>
    </nav>
  )
}

const InputField = ({ name, placeholder, err, ...props }: any) => {
  return (
    <div className="mb-0">
      <input
        name={name}
        placeholder={placeholder}
        className="w-full bg-[#0D0D14] border outline-none font-mono text-[15px] sm:text-base px-4 py-3.5 text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] placeholder-[#4A4A62]"
        style={{
          borderColor: err ? '#FF4D6D' : '#1E1E2E',
          borderRadius: '0',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#C8FA64';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = err ? '#FF4D6D' : '#1E1E2E';
        }}
        {...props}
      />
      {err && <div className="text-[#FF4D6D] text-[11px] mt-2 font-mono tracking-wide">{err}</div>}
    </div>
  );
};

const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="font-mono text-[#8888A8] text-[10px] tracking-[0.15em] uppercase mb-2.5 block">{children}</label>
);

function RegisterPage() {
  const [tab, setTab] = useState<'tech' | 'nontech'>('tech');
  const [formData, setFormData] = useState({
    event: '',
    participantCount: '0'
  });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const eventParam = params.get('event');
    if (eventParam) {
      if (techDropdownEvents.includes(eventParam)) {
        setTab('tech');
        setFormData(p => ({ ...p, event: eventParam }));
      } else if (nonTechDropdownEvents.includes(eventParam)) {
        setTab('nontech');
        setFormData(p => ({ ...p, event: eventParam }));
      }
    }
  }, []);

  const accent = '#C8FA64';
  const eventsList = tab === 'tech' ? techDropdownEvents : nonTechDropdownEvents;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setFilePreview(url);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);

    const teamName = fd.get('teamName') as string;
    const leaderName = fd.get('leader.name') as string;
    const leaderDepartment = fd.get('leader.department') as string;
    const leaderCollege = fd.get('leader.college') as string;
    const leaderEmail = fd.get('leader.email') as string;
    const leaderPhone = fd.get('leader.phone') as string;

    const count = parseInt(formData.participantCount);
    const parts = [];
    for (let i = 0; i < count; i++) {
        parts.push({
            name: fd.get(`p${i}.name`) as string,
            department: fd.get(`p${i}.department`) as string,
            college: fd.get(`p${i}.college`) as string,
            email: fd.get(`p${i}.email`) as string,
            phone: fd.get(`p${i}.phone`) as string,
        });
    }

    let errs: Record<string, string> = {};

    if (!formData.event) errs['event'] = 'Please select an event.';
    if (!formData.participantCount) errs['participantCount'] = 'Please select participant count.';
    if (!file) errs['file'] = 'Payment screenshot required.';

    if (!TEAM_NAME_REGEX.test(teamName || '')) errs['teamName'] = 'Invalid team name.';
    if (!NAME_REGEX.test(leaderName || '')) errs['leader.name'] = 'Invalid name.';
    if (!DEPT_REGEX.test(leaderDepartment || '')) errs['leader.department'] = 'Invalid dept.';
    if (!COLLEGE_REGEX.test(leaderCollege || '')) errs['leader.college'] = 'Invalid college.';
    if (!EMAIL_REGEX.test(leaderEmail || '')) errs['leader.email'] = 'Invalid email.';
    if (!PHONE_REGEX.test(leaderPhone || '')) errs['leader.phone'] = 'Invalid phone.';

    for (let i = 0; i < count; i++) {
      if (!NAME_REGEX.test(parts[i].name || '')) errs[`p${i}.name`] = 'Invalid name.';
      if (!DEPT_REGEX.test(parts[i].department || '')) errs[`p${i}.department`] = 'Invalid dept.';
      if (!COLLEGE_REGEX.test(parts[i].college || '')) errs[`p${i}.college`] = 'Invalid college.';
      if (!EMAIL_REGEX.test(parts[i].email || '')) errs[`p${i}.email`] = 'Invalid email.';
      if (!PHONE_REGEX.test(parts[i].phone || '')) errs[`p${i}.phone`] = 'Invalid phone.';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("Please fix the highlighted errors.");
      return;
    }

    setIsSubmitting(true);
    try {
      const ext = file!.name.split('.').pop();
      const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
      
      const { error: uploadErr } = await supabase.storage
        .from('payment-screenshots')
        .upload(filename, file!);
        
      if (uploadErr) throw uploadErr;

      const { data: publicUrlData } = supabase.storage
        .from('payment-screenshots')
        .getPublicUrl(filename);
      const publicUrl = publicUrlData.publicUrl;

      const insertData = {
        team_name: teamName,
        leader_name: leaderName,
        leader_email: leaderEmail,
        leader_phone: leaderPhone,
        leader_department: leaderDepartment,
        leader_college: leaderCollege,
        technical_event: tab === 'tech' ? formData.event : null,
        non_technical_event: tab === 'nontech' ? formData.event : null,
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
        participant3_phone: count == 3 ? parts[2].phone : null,
      };

      const { error: insertErr } = await supabase
        .from('registrations')
        .insert([insertData]);

      if (insertErr) throw insertErr;

      supabase.functions.invoke('sync-to-sheets', {
        body: { registration: insertData },
      }).catch((err) => console.error("Sheets sync failed:", err));

      setIsSuccess(true);
      
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-20" style={{ background: 'var(--bg)' }}>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          border: '1px solid var(--stroke)',
          fontFamily: 'Geist Mono, monospace',
          fontSize: '13px'
        }
      }} />

      <Navbar />

      <section className="section-padding relative z-10">
        <div className="container" style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <p className="section-label" style={{ color: '#8888A8', fontSize: '12px' }}>[ REGISTER ]</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Join the Symposium.
            </h2>
            <p className="font-mono text-sm sm:text-base text-[#8888A8] mt-4 max-w-[500px] mx-auto opacity-80">
              ₹300 per team per event
            </p>
          </div>

          <div className="registration-card" style={{ background: '#101018', border: '1px solid #1E1E2E', borderRadius: '0' }}>

            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
                <CheckCircle style={{ margin: '0 auto 1.5rem', color: accent }} size={64} />
                <h3 className="font-display" style={{ fontSize: '36px', marginBottom: '1rem', color: 'var(--text-primary)' }}>"TRANSMISSION RECEIVED"</h3>
                <p className="font-mono text-base text-[#8888A8]">Registration confirmed. Check your email for details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="w-full bg-[#101018] flex relative items-center border-b border-[#1E1E2E]">
                  <div className="absolute left-6 font-mono text-[#8888A8] text-xl hidden sm:block">[</div>
                  <div className="flex-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => { setTab('tech'); setFormData(p => ({...p, event: ''})) }}
                      className="font-display font-bold uppercase tracking-widest bg-transparent cursor-pointer"
                      style={{ 
                        padding: '1.5rem 2rem', 
                        fontSize: '16px',
                        color: tab === 'tech' ? '#C8FA64' : '#8888A8',
                        borderBottom: tab === 'tech' ? '2px solid #C8FA64' : '2px solid transparent',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      ⚡ TECHNICAL · APR 15
                    </button>
                    <button
                      type="button"
                      onClick={() => { setTab('nontech'); setFormData(p => ({...p, event: ''})) }}
                      className="font-display font-bold uppercase tracking-widest bg-transparent cursor-pointer"
                      style={{ 
                        padding: '1.5rem 2rem', 
                        fontSize: '16px',
                        color: tab === 'nontech' ? '#C8FA64' : '#8888A8',
                        borderBottom: tab === 'nontech' ? '2px solid #C8FA64' : '2px solid transparent',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      🎮 NON-TECHNICAL · APR 16
                    </button>
                  </div>
                  <div className="absolute right-6 font-mono text-[#8888A8] text-xl hidden sm:block">]</div>
                </div>

                <div className="flex flex-col gap-16 p-6 sm:p-10 md:p-14">
                  
                  {/* Event & Team */}
                  <div className="flex flex-col gap-6">
                    <h4 className="font-display font-bold text-xl uppercase" style={{ color: '#C8FA64' }}>
                      EVENT DIRECTIVE
                    </h4>
                    
                    <div>
                      <FormLabel>Event</FormLabel>
                      <div className="mb-0">
                        <select
                          value={formData.event}
                          onChange={(e) => setFormData(p => ({ ...p, event: e.target.value }))}
                          className="w-full bg-[#0D0D14] border outline-none font-mono text-[15px] sm:text-base px-4 py-3.5 text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] appearance-none"
                          style={{ 
                            borderColor: errors.event ? '#FF4D6D' : '#1E1E2E',
                            borderRadius: '0',
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23FFFFFF\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.2em'
                          }}
                        >
                          <option value="">-- Choose Target --</option>
                          {eventsList.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                        </select>
                        {errors.event && <div className="text-[#FF4D6D] text-[11px] mt-2 font-mono">{errors.event}</div>}
                      </div>
                    </div>

                    <div>
                      <FormLabel>Team Name</FormLabel>
                      <InputField name="teamName" placeholder="e.g. Team Zyphoria" err={errors.teamName} />
                    </div>
                  </div>

                  {/* Team Leader */}
                  <div className="flex flex-col gap-6 relative">
                    <div className="absolute top-0 right-0 font-mono text-[10px] text-[#8888A8] tracking-widest uppercase">COMMANDER // 01</div>
                    <h4 className="font-display font-bold text-xl uppercase mb-2" style={{ color: '#C8FA64' }}>
                      TEAM LEADER
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <FormLabel>Full Name</FormLabel>
                        <InputField name="leader.name" placeholder="Enter full name" err={errors['leader.name']} />
                      </div>
                      <div>
                        <FormLabel>Department</FormLabel>
                        <InputField name="leader.department" placeholder="e.g. CSE, ECE, IT..." err={errors['leader.department']} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <FormLabel>Phone</FormLabel>
                      <InputField name="leader.phone" placeholder="Enter 10-digit mobile number" err={errors['leader.phone']} />
                    </div>
                  </div>

                  {/* Participant Count */}
                  <div className="flex flex-col gap-6">
                    <h4 className="font-display font-bold text-[18px] uppercase" style={{ color: '#C8FA64' }}>
                        SQUAD CAPACITY (EXCLUDING LEADER)
                    </h4>
                    <div>
                      <select
                        value={formData.participantCount}
                        onChange={(e) => setFormData(p => ({ ...p, participantCount: e.target.value }))}
                        className="w-full bg-[#0D0D14] border outline-none font-mono text-[15px] sm:text-base px-4 py-3.5 text-[#EEEEF5] transition-all duration-300 hover:bg-[#12121A] appearance-none"
                        style={{ 
                          borderColor: errors.participantCount ? '#FF4D6D' : '#1E1E2E',
                          borderRadius: '0',
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23FFFFFF\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.2em'
                        }}
                      >
                        <option value="0">0 (Solo Operative)</option>
                        <option value="1">1 Operative</option>
                        <option value="2">2 Operatives</option>
                        <option value="3">3 Operatives</option>
                      </select>
                      {errors.participantCount && <div className="text-[#FF4D6D] text-[11px] mt-2 font-mono">{errors.participantCount}</div>}
                    </div>
                  </div>

                  {/* Dynamic Participants */}
                  {Array.from({ length: parseInt(formData.participantCount) }).map((_, idx) => (
                    <div key={idx} className="flex flex-col gap-6 relative pt-8 border-t border-[#1E1E2E]">
                      <div className="absolute top-8 right-0 font-mono text-[10px] text-[#8888A8] tracking-widest uppercase">OPERATIVE // 0{idx + 2}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <FormLabel>Full Name</FormLabel>
                          <InputField name={`p${idx}.name`} placeholder="Enter full name" err={errors[`p${idx}.name`]} />
                        </div>
                        <div>
                          <FormLabel>Department</FormLabel>
                          <InputField name={`p${idx}.department`} placeholder="e.g. CSE, ECE, IT..." err={errors[`p${idx}.department`]} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <FormLabel>Phone</FormLabel>
                        <InputField name={`p${idx}.phone`} placeholder="Enter 10-digit mobile number" err={errors[`p${idx}.phone`]} />
                      </div>
                    </div>
                  ))}

                  {/* Payment */}
                  <div className="pt-10 border-t border-[#1E1E2E]">
                    <h4 className="font-display font-bold text-xl mb-6 uppercase" style={{ color: '#C8FA64' }}>
                      PAYMENT PROTOCOL
                    </h4>
                    <p className="font-mono text-sm sm:text-base text-[#8888A8] mb-10 leading-relaxed max-w-[680px]">
                      Initialize payment of ₹300 per team via our secure uplink. Upload your confirmation receipt below for verification.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-10">
                      <a 
                        href={PAYMENT_LINK} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-3 px-8 py-4 border font-mono text-sm shadow-xl uppercase tracking-widest transition-all duration-300" 
                        style={{ 
                          borderColor: '#C8FA64', 
                          color: '#C8FA64',
                          background: 'rgba(200, 250, 100, 0.05)'
                        }} 
                        onMouseEnter={(e) => { 
                          e.currentTarget.style.backgroundColor = '#C8FA64'; 
                          e.currentTarget.style.color = '#08080C'; 
                          e.currentTarget.style.boxShadow = `0 0 25px rgba(200, 250, 100, 0.4)`; 
                        }} 
                        onMouseLeave={(e) => { 
                          e.currentTarget.style.backgroundColor = 'rgba(200, 250, 100, 0.05)'; 
                          e.currentTarget.style.color = '#C8FA64'; 
                          e.currentTarget.style.boxShadow = 'none'; 
                        }}
                      >
                        ↗ ACCESS PAYMENT PORTAL
                      </a>
                      <div className="font-mono text-[10px] text-[#8888A8] uppercase tracking-widest">
                        ID // SYMP-2026-PAY
                      </div>
                    </div>

                    <div className="group relative border-2 border-dashed p-10 sm:p-12 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#12121A] overflow-hidden" 
                         style={{ borderColor: errors.file ? '#FF4D6D' : '#1E1E2E', background: '#0D0D14' }}>
                      <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      {filePreview ? (
                        <div className="flex flex-col items-center relative z-20">
                          <div className="relative mb-4">
                            <img src={filePreview} alt="Preview" className="h-32 w-32 object-cover border-2 shadow-2xl" style={{ borderColor: '#C8FA64' }} />
                            <div className="absolute -top-2 -right-2 bg-[#C8FA64] rounded-full p-1 shadow-lg">
                              <CheckCircle size={16} color="#08080C" />
                            </div>
                          </div>
                          <span className="font-mono text-sm text-[#EEEEF5] font-bold mb-1">{file?.name}</span>
                          <span className="font-mono text-[10px] text-[#8888A8] uppercase tracking-wider">{(file?.size ? file.size / (1024 * 1024) : 0).toFixed(2)} MB</span>
                        </div>
                      ) : (
                        <>
                          <div className="mb-4 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                            <Upload size={32} style={{ color: '#EEEEF5' }} />
                          </div>
                          <p className="font-mono text-base text-[#EEEEF5] mb-2 font-medium tracking-wide">Upload Transmission Receipt</p>
                          <p className="font-mono text-xs text-[#8888A8] opacity-70">PNG, JPG or WEBP · Max 5MB</p>
                        </>
                      )}
                    </div>
                    {errors.file && <div className="text-[#FF4D6D] text-xs mt-3 font-mono text-center tracking-wide">{errors.file}</div>}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-display font-bold text-base sm:text-lg uppercase tracking-[0.18em] py-6 sm:py-7 flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group shadow-xl"
                    style={{ 
                      backgroundColor: isSubmitting ? 'var(--stroke)' : '#C8FA64', 
                      color: isSubmitting ? 'var(--text-muted)' : '#08080C',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      marginTop: '1rem'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.boxShadow = `0 0 30px rgba(200, 250, 100, 0.6)`;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = '#C8FA64';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="animate-spin" size={20} /> SYNCING DATA...</>
                    ) : (
                      <>CONFIRM REGISTRATION <span className="group-hover:translate-x-1 transition-transform">→</span></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
