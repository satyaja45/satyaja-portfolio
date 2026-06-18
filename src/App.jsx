import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS
emailjs.init("ZCp2mpFNsX-_9H0O9");

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = [
  "Python", "React.js", "JavaScript", "Java", "C / C++",
  "HTML / CSS", "Laravel (PHP)", "Bootstrap", "AWS",
  "Machine Learning", "REST APIs", "DBMS", "Power BI", "Canva / Photoshop", "Git",
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "CSI COMPUTECH",
    date: "Ongoing",
    desc: "Worked on Laravel-based projects end-to-end — designed RESTful APIs that actually REST (unlike me during deadlines), and built responsive frontends people didn't complain about.",
    tags: ["Laravel", "PHP", "REST APIs", "Frontend", "Full Stack"],
  },
  {
    role: "Web Dev Intern",
    company: "IMMORTALS SOLAR",
    date: "Jun–Jul 2024",
    desc: "Built S.U.R.Y.A. — a React + Power BI platform that made solar cell analytics look good on screen. Complex data, digestible UI, zero PhD required to understand it.",
    tags: ["React.js", "Power BI", "Data Viz", "UI/UX"],
  },
];

const PROJECTS = [
  {
    num: "01", title: "AI Virtual Try-On Platform",
    desc: "AI-powered platform letting users see outfits on themselves — without fitting room anxiety. ML overlays garments onto user images in real-time.",
    tech: ["Python", "ML", "Computer Vision", "React.js"],
  },
  {
    num: "02", title: "Museum Website",
    desc: "Interactive museum site with a voice-enabled, multilingual chatbot for ticket bookings. Art is for everyone — so is the chatbot.",
    tech: ["HTML/CSS", "JavaScript", "Voice Recognition", "NLP"],
  },
  {
    num: "03", title: "Responsive YouTube Clone",
    desc: "A pixel-perfect YouTube replica with playback, search, and mobile-first design. Vanilla HTML/CSS/JS only — no framework needed when you're built differently.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive"],
  },
  {
    num: "04", title: "S.U.R.Y.A. — Solar Analytics",
    desc: "React + Power BI dashboard visualizing solar cell performance metrics. Made data so beautiful, even data analysts wanted a poster of it.",
    tech: ["React.js", "Power BI", "Analytics", "API"],
  },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Nav({ menuOpen, setMenuOpen }) {
  const close = () => setMenuOpen(false);
  return (
    <>
      <nav>
        <div className="logo">SATYAJA.DEV</div>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
          <a href="/resume.pdf" download className="nav-resume">Resume</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={close}>✕</button>
        {NAV_LINKS.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={close}>{l}</a>
        ))}
        <a href="/resume.pdf" download onClick={close}>Download Resume</a>
      </div>
    </>
  );
}

function Hero() {
  const circleRef = useRef(null);
  const circle2Ref = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;
    const handler = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      if (circleRef.current)
        circleRef.current.style.transform = `translateY(calc(-50% + ${y}px)) translateX(${x}px)`;
      if (circle2Ref.current)
        circle2Ref.current.style.transform = `translateY(calc(-50% + ${y * 0.7}px)) translateX(${x * 0.7}px)`;
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-circle" ref={circleRef} />
      <div className="hero-circle2" ref={circle2Ref} />
      <div className="hero-eyebrow">// 01 — Hello, World (again)</div>
      <h1 className="hero-name">
        Satyaja<br /><span>Shivthare.</span>
      </h1>
      <p className="hero-tagline">
        Software Developer. Bug creator. <em>Bug fixer.</em><br />
        Building things that (mostly) work — from AI platforms to web apps that don't crash on demo day.
      </p>
      <div className="hero-cta">
        <a className="btn-primary" href="#projects">See My Work</a>
        <a className="btn-ghost" href="#contact">Hire Me (Please)</a>
      </div>
      <div className="scroll-hint">
        <span className="scroll-line" /> SCROLL DOWN
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="section-label">// 02 — The Human Behind The Code</div>
      <Reveal><div className="section-title">About Me</div></Reveal>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>Hey! I'm <strong>Satyaja</strong> — a B.Tech student in Electronics & Computer Science at Pillai College of Engineering with a CGPA of <span className="highlight">9.25</span> (yes, I study AND code, somehow).</p>
          <p>I build full-stack web apps, craft intelligent user experiences, and convince myself <strong>one more feature</strong> won't take long. Spoiler: it always does.</p>
          <p>When I'm not coding, I'm organizing hackathons or debating — which is just <strong>arguing with better vocabulary</strong>. (3rd place at Mumbai University Youth Fest 2025.)</p>
          <div className="about-stat-row">
            {[["9.25","CGPA"],["4+","Projects"],["2","Roles"]].map(([num, label]) => (
              <div className="stat" key={label}>
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="about-code">
          <span className="code-comment">// satyaja.config.js</span><br /><br />
          <span className="code-key">const</span> dev = {"{"}<br />
          &nbsp;&nbsp;<span className="code-key">name</span>: <span className="code-str">"Satyaja Shivthare"</span>,<br />
          &nbsp;&nbsp;<span className="code-key">role</span>: <span className="code-str">"Full Stack Developer"</span>,<br />
          &nbsp;&nbsp;<span className="code-key">location</span>: <span className="code-str">"Navi Mumbai 🇮🇳"</span>,<br />
          &nbsp;&nbsp;<span className="code-key">coffee</span>: <span className="code-val">Infinity</span>,<br />
          &nbsp;&nbsp;<span className="code-key">bugs_fixed</span>: <span className="code-val">many</span>,<br />
          &nbsp;&nbsp;<span className="code-key">bugs_created</span>: <span className="code-val">also many</span>,<br />
          &nbsp;&nbsp;<span className="code-key">openToWork</span>: <span className="code-val">true</span>, <span className="code-comment">// hint 👀</span><br />
          {"}"};<br /><br />
          <span className="code-key">export default</span> dev;
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="section-label">// 03 — Weapons Of Mass Construction</div>
      <Reveal><div className="section-title">Skills</div></Reveal>
      <Reveal>
        <div className="skills-grid">
          {SKILLS.map((s) => <div className="skill-tag" key={s}>{s}</div>)}
        </div>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ background: "var(--bg2)" }}>
      <div className="section-label">// 04 — Places That Trusted Me With Their Codebase</div>
      <Reveal><div className="section-title">Experience</div></Reveal>
      <div className="exp-timeline">
        {EXPERIENCE.map((exp) => (
          <Reveal key={exp.company} className="exp-item">
            <div className="exp-dot" />
            <div className="exp-header">
              <div>
                <div className="exp-role">{exp.role}</div>
                <div className="exp-company">{exp.company}</div>
              </div>
              <div className="exp-date">{exp.date}</div>
            </div>
            <p className="exp-desc">{exp.desc}</p>
            <div className="exp-tags">
              {exp.tags.map((t) => <span className="exp-tag" key={t}>{t}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="section-label">// 05 — Things I Built At 2 AM</div>
      <Reveal><div className="section-title">Projects</div></Reveal>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <Reveal key={p.num} className="project-card">
            <span className="project-num">{p.num}</span>
            <div className="project-title">{p.title}</div>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tech">
              {p.tech.map((t) => <span className="tech-pill" key={t}>{t}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.msg) {
      alert("Hey! Fill in all the fields. Even I have standards 😄");
      return;
    }

    try {
      const response = await emailjs.send(
        "service_w4zpqdb",  // Service ID
        "template_cfj9fyk",  // Template ID
        {
          name: form.name,
          email: form.email,
          message: form.msg,
        }
      );
      console.log("Email sent successfully:", response);
      setSuccess(true);
      setForm({ name: "", email: "", msg: "" });
      setTimeout(() => setSuccess(false), 5000); // Hide success message after 5s
    } catch (error) {
      console.error("Email error:", error);
      alert("Oops! Something went wrong. Check console for details.");
    }
  };

  return (
    <section id="contact">
      <div className="section-label">// 06 — Let's Build Something (Or Just Say Hi)</div>
      <Reveal><div className="section-title">Get In Touch</div></Reveal>
      <div className="contact-grid">
        <Reveal className="contact-info">
          <h3>Don't be a stranger.</h3>
          <p>Cool project? Collab idea? Want to debate Ferrari vs Redbull? I'm all ears.<br />(It's Ferrari. Fight me.)</p>
          <div className="contact-links">
            <a className="contact-link" href="/resume.pdf" download>
              <div className="icon">📄</div>Download Resume
            </a>
            <a className="contact-link" href="mailto:satyashivthare13@gmail.com">
              <div className="icon">✉️</div>satyashivthare13@gmail.com
            </a>
            <a className="contact-link" href="https://instagram.com/satyaja_13" target="_blank" rel="noreferrer">
              <div className="icon">📸</div>@satyaja_13
            </a>
            <a className="contact-link" href="tel:+919867745631">
              <div className="icon">📱</div>+91 98677 45631
            </a>
          </div>
        </Reveal>
        <Reveal>
          <div className="form">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your name here" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="so I can actually reply" />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-input" name="msg" value={form.msg} onChange={handleChange} placeholder="Project idea, collab, or your favourite meme..." />
            </div>
            <button className="form-btn" onClick={handleSubmit}>SEND IT →</button>
            {success && (
              <div className="form-success show">
                ✓ Message received! Getting back to you faster than Leclerc.
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <footer>
        <p>SATYAJA SHIVTHARE © 2026 &nbsp;·&nbsp; BUILT WITH REACT + CAFFEINE &nbsp;·&nbsp; That's all!</p>
      </footer>
    </>
  );
}
