import { useState, useEffect, useRef } from "react";

// ============================================================
// ✏️  EDIT YOUR INFO HERE
// ============================================================
const CONFIG = {
  name: "Your Name",                          // TODO: Your full name
  title: "Senior Software Test Engineer",
  tagline: "I break things on purpose — so your users don't have to.",
  bio: "Passionate QA Engineer with expertise in test automation, performance testing, and CI/CD integration. I help teams ship with confidence by building robust testing frameworks and catching bugs before they reach production.",
  location: "📍 Your City, Country",          // TODO: Your location
  available: true,                            // TODO: Set false if not available
  email: "your@email.com",                    // TODO: Your email
  linkedin: "https://linkedin.com/in/yourhandle",  // TODO: Your LinkedIn URL
  github: "https://github.com/yourhandle",         // TODO: Your GitHub URL
  // 📄 RESUME SETUP — place your PDF in the public/ folder:
  //   my-portfolio/
  //     public/
  //       resume.pdf   ← export your Word file as PDF and place here
  //     src/
  //       App.jsx
  // In Word: File → Save As → PDF
  resume: "/public/resume.pdf",                    // must match filename in public/
  profilePic: "https://media.licdn.com/dms/image/v2/D4E03AQGQeDDL4B0VAw/profile-displayphoto-scale_100_100/B4EZle4hJUKYAc-/0/1758233498591?e=1775692800&v=beta&t=SuU6VEb66q3VN4BowJxS6eJNN5XFCrm5udl6Oz2R6j0", // TODO: Replace with your photo URL
};

const SKILLS = {
  "Test Automation": ["Selenium", "Cypress", "Playwright", "Appium", "TestNG"],
  "Languages & Tools": ["Python", "Java", "JavaScript", "Pytest", "JUnit"],
  "Performance & API": ["JMeter", "Postman", "REST Assured", "k6", "Gatling"],
  "CI/CD & DevOps": ["Jenkins", "GitHub Actions", "Docker", "Jira", "Git"],
};

const PROJECTS = [
  {
    title: "Test Automation Framework",        // TODO: Your project name
    desc: "Built a scalable Page Object Model framework using Selenium & Python that reduced regression time by 60%.",  // TODO: Your description
    tags: ["Selenium", "Python", "Jenkins"],
    github: "#",    // TODO: GitHub link
    demo: "#",      // TODO: Live/demo link
  },
  {
    title: "API Testing Suite",
    desc: "Designed comprehensive REST API test coverage using Postman & RestAssured integrated into the CI pipeline.",
    tags: ["Postman", "Java", "CI/CD"],
    github: "#",
    demo: "#",
  },
  {
    title: "Performance Test Dashboard",
    desc: "Created a JMeter-based load testing suite with real-time Grafana dashboards for monitoring system bottlenecks.",
    tags: ["JMeter", "Grafana", "Docker"],
    github: "#",
    demo: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Senior QA Engineer",               // TODO: Your role
    company: "Company Name",                  // TODO: Company
    period: "2022 – Present",
    points: [
      "Led end-to-end automation strategy across 3 product teams",
      "Reduced manual testing effort by 70% via framework adoption",
      "Mentored 4 junior QA engineers",
    ],
  },
  {
    role: "QA Automation Engineer",
    company: "Previous Company",
    period: "2020 – 2022",
    points: [
      "Built Cypress-based E2E suite covering 200+ test scenarios",
      "Integrated automated tests into GitHub Actions CI pipeline",
    ],
  },
  {
    role: "Manual QA Tester",
    company: "Startup Name",
    period: "2018 – 2020",
    points: [
      "Performed functional, regression, and UAT testing",
      "Documented and tracked 500+ bugs using Jira",
    ],
  },
];

// ============================================================
// STYLES
// ============================================================
const S = {
  root: {
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    background: "#ffffff",
    color: "#111111",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    height: "56px",
    background: "rgba(255,255,255,0.95)",
    borderBottom: "1px solid #38bdf8",
    backdropFilter: "blur(8px)",
  },
  logo: {
    color: "#0369a1",
    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: "0.08em",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    gap: "1.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  section: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "5rem 2rem",
  },
  label: {
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    color: "#0369a1",
    textTransform: "uppercase",
    marginBottom: "0.5rem",
    display: "block",
  },
  h2: {
    fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
    fontWeight: 700,
    color: "#111111",
    margin: "0 0 1rem",
    lineHeight: 1.2,
  },
  divider: {
    width: "40px",
    height: "2px",
    background: "#0369a1",
    margin: "1rem 0 2.5rem",
    border: "none",
  },
  tag: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "4px",
    fontSize: "0.72rem",
    border: "1px solid #38bdf8",
    color: "#0369a1",
    background: "rgba(3,105,161,0.08)",
    marginRight: "6px",
    marginBottom: "6px",
    letterSpacing: "0.05em",
  },
  card: {
    background: "#e0f7ff",
    border: "1px solid #38bdf8",
    borderRadius: "10px",
    padding: "1.5rem",
    transition: "border-color 0.2s, transform 0.2s",
  },
  btn: {
    display: "inline-block",
    padding: "0.65rem 1.5rem",
    borderRadius: "6px",
    fontFamily: "inherit",
    fontSize: "0.82rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.2s",
  },
};

// ============================================================
// COMPONENTS
// ============================================================

function NavLink({ href, children }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <a
        href={href}
        style={{
          color: hov ? "#0369a1" : "#444444",
          textDecoration: "none",
          fontSize: "0.78rem",
          letterSpacing: "0.1em",
          transition: "color 0.2s",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {children}
      </a>
    </li>
  );
}

function Navbar() {
  return (
    <nav style={S.nav}>
      <a href="#" style={S.logo}>&lt;{CONFIG.name.split(" ")[0]} /&gt;</a>
      <ul style={S.navLinks}>
        {["about", "skills", "projects", "experience", "contact"].map((s) => (
          <NavLink key={s} href={`#${s}`}>{s}</NavLink>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const [resumeLoading, setResumeLoading] = useState(false);
  const text = CONFIG.tagline;

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);

  // Fetch PDF as blob → open as blob URL in new tab
  // This bypasses any Content-Disposition: attachment server headers
  const openResume = async () => {
    setResumeLoading(true);
    try {
      const res = await fetch(CONFIG.resume);
      if (!res.ok) throw new Error("File not found");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (e) {
      alert("Resume not found. Make sure resume.pdf is placed inside the public/ folder.");
    } finally {
      setResumeLoading(false);
    }
  };

  return (
    <section style={{ maxWidth: "900px", margin: "0 auto", padding: "6rem 2rem 4rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Top badge */}
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          fontSize: "0.72rem", letterSpacing: "0.15em", color: CONFIG.available ? "#0369a1" : "#444444",
          border: `1px solid ${CONFIG.available ? "#0369a140" : "#38bdf8"}`,
          borderRadius: "999px", padding: "4px 12px", width: "fit-content",
        }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: CONFIG.available ? "#0369a1" : "#38bdf8", display: "inline-block" }} />
          {CONFIG.available ? "AVAILABLE FOR OPPORTUNITIES" : "NOT AVAILABLE"}
        </span>

        <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Text block */}
          <div style={{ flex: 1, minWidth: "260px" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "#0369a1", marginBottom: "0.4rem" }}>
              // SENIOR SOFTWARE TEST ENGINEER
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", fontWeight: 800, color: "#111111", margin: "0 0 0.8rem", lineHeight: 1.1 }}>
              {CONFIG.name}
            </h1>
            <p style={{ fontSize: "1rem", color: "#0369a1", minHeight: "1.4em", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
              {typed}<span style={{ animation: "blink 1s step-end infinite", color: "#0369a1" }}>|</span>
            </p>
            <p style={{ color: "#1a1a1a", fontSize: "0.88rem", lineHeight: 1.8, maxWidth: "480px", margin: "0 0 2rem" }}>
              {CONFIG.bio}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#projects" style={{ ...S.btn, background: "#0369a1", color: "#ffffff" }}>
                View My Work
              </a>
              <a href="#contact" style={{ ...S.btn, background: "transparent", color: "#0369a1", border: "1px solid #0369a140" }}>
                Get In Touch
              </a>
              <button
                onClick={openResume}
                disabled={resumeLoading}
                style={{ ...S.btn, background: "transparent", color: resumeLoading ? "#aac0d8" : "#0369a1", border: "1px solid #38bdf8", cursor: resumeLoading ? "wait" : "pointer" }}
              >
                {resumeLoading ? "Opening..." : "Resume ↗"}
              </button>
            </div>
          </div>

          {/* Profile picture */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}>
            <div style={{
              width: "160px", height: "160px", borderRadius: "12px",
              border: "2px solid #38bdf8",
              overflow: "hidden", position: "relative",
              boxShadow: "0 0 40px rgba(29,78,216,0.1)",
            }}>
              {/* TODO: Replace src with your photo URL */}
              <img src={CONFIG.profilePic} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{ fontSize: "0.65rem", color: "#444444", letterSpacing: "0.1em" }}>{CONFIG.location}</span>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              <SocialBtn href={CONFIG.linkedin} label="in" />
              <SocialBtn href={CONFIG.github} label="gh" />
              <SocialBtn href={`mailto:${CONFIG.email}`} label="@" />
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}

function SocialBtn({ href, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{
      width: "34px", height: "34px", borderRadius: "6px",
      border: `1px solid ${hov ? "#0369a166" : "#38bdf8"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: hov ? "#0369a1" : "#444444",
      fontSize: "0.75rem", fontWeight: 700,
      textDecoration: "none", transition: "all 0.2s",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
    </a>
  );
}

function About() {
  return (
    <section id="about" style={{ ...S.section, borderTop: "1px solid #e0f7ff" }}>
      <span style={S.label}>// about me</span>
      <h2 style={S.h2}>Who I Am</h2>
      <hr style={S.divider} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "#38bdf8", borderRadius: "10px", overflow: "hidden", border: "1px solid #38bdf8" }}>
        {[
          { label: "Years Experience", value: "5+" },
          { label: "Test Cases Written", value: "2000+" },
          { label: "Bugs Found", value: "1500+" },
          { label: "Projects Shipped", value: "20+" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "#e0f7ff", padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0369a1", margin: 0 }}>{stat.value}</p>
            <p style={{ fontSize: "0.72rem", color: "#444444", margin: "4px 0 0", letterSpacing: "0.1em" }}>{stat.label}</p>
          </div>
        ))}
      </div>
      <p style={{ color: "#1a1a1a", fontSize: "0.9rem", lineHeight: 1.9, marginTop: "2rem", maxWidth: "680px" }}>
        {/* TODO: Update your bio paragraph */}
        I specialize in building test automation ecosystems from scratch — from unit tests to E2E suites and performance benchmarks. My goal is always the same: give development teams the confidence to ship faster without sacrificing quality. I thrive in agile environments and love collaborating closely with developers and product teams.
      </p>
    </section>
  );
}

function Skills() {
  const [active, setActive] = useState(null);
  return (
    <section id="skills" style={{ ...S.section, borderTop: "1px solid #e0f7ff" }}>
      <span style={S.label}>// skills & tools</span>
      <h2 style={S.h2}>What I Work With</h2>
      <hr style={S.divider} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div key={cat}
            style={{
              ...S.card,
              borderColor: active === cat ? "#0369a130" : "#38bdf8",
              cursor: "default",
            }}
            onMouseEnter={() => setActive(cat)}
            onMouseLeave={() => setActive(null)}
          >
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#0369a1", marginBottom: "0.8rem" }}>{cat.toUpperCase()}</p>
            <div>
              {items.map((sk) => (
                <span key={sk} style={S.tag}>{sk}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [hov, setHov] = useState(null);
  return (
    <section id="projects" style={{ ...S.section, borderTop: "1px solid #e0f7ff" }}>
      <span style={S.label}>// projects & work</span>
      <h2 style={S.h2}>Things I've Built</h2>
      <hr style={S.divider} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
        {PROJECTS.map((p, i) => (
          <div key={i}
            style={{
              ...S.card,
              borderColor: hov === i ? "#0369a140" : "#38bdf8",
              transform: hov === i ? "translateY(-3px)" : "none",
              display: "flex", flexDirection: "column",
            }}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
          >
            <div style={{ flex: 1 }}>
              <p style={{ color: "#0369a1", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>PROJECT_{String(i + 1).padStart(2, "0")}</p>
              <h3 style={{ color: "#111111", margin: "0 0 0.6rem", fontSize: "1rem", fontWeight: 700 }}>{p.title}</h3>
              <p style={{ color: "#333333", fontSize: "0.82rem", lineHeight: 1.8, margin: "0 0 1rem" }}>{p.desc}</p>
              <div style={{ marginBottom: "1rem" }}>
                {p.tags.map((t) => <span key={t} style={S.tag}>{t}</span>)}
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.8rem", borderTop: "1px solid #38bdf8", paddingTop: "1rem" }}>
              <a href={p.github} style={{ fontSize: "0.75rem", color: "#444444", textDecoration: "none" }}>GitHub →</a>
              <a href={p.demo} style={{ fontSize: "0.75rem", color: "#0369a1", textDecoration: "none" }}>Live →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ ...S.section, borderTop: "1px solid #e0f7ff" }}>
      <span style={S.label}>// work experience</span>
      <h2 style={S.h2}>Where I've Worked</h2>
      <hr style={S.divider} />
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: "7px", top: 0, bottom: 0, width: "1px", background: "#38bdf8" }} />
        {EXPERIENCE.map((exp, i) => (
          <div key={i} style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", position: "relative" }}>
            <div style={{ width: "15px", height: "15px", borderRadius: "50%", background: "#0369a1", flexShrink: 0, marginTop: "3px", zIndex: 1 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "baseline", marginBottom: "0.3rem" }}>
                <h3 style={{ color: "#111111", margin: 0, fontSize: "0.95rem", fontWeight: 700 }}>{exp.role}</h3>
                <span style={{ color: "#0369a1", fontSize: "0.8rem" }}>@ {exp.company}</span>
              </div>
              <p style={{ color: "#444444", fontSize: "0.72rem", letterSpacing: "0.1em", margin: "0 0 0.8rem" }}>{exp.period}</p>
              <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                {exp.points.map((pt, j) => (
                  <li key={j} style={{ color: "#1a1a1a", fontSize: "0.82rem", lineHeight: 1.8, marginBottom: "4px" }}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ ...S.section, borderTop: "1px solid #e0f7ff" }}>
      <span style={S.label}>// contact</span>
      <h2 style={S.h2}>Get In Touch</h2>
      <hr style={S.divider} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ color: "#333333", fontSize: "0.88rem", lineHeight: 1.9, marginBottom: "1.5rem" }}>
            Open to freelance, full-time, or contract opportunities. Drop a message and I'll get back to you!
          </p>
          {[
            { label: "Email", href: `mailto:${CONFIG.email}` },
            { label: "LinkedIn", href: CONFIG.linkedin },
            { label: "GitHub", href: CONFIG.github },
          ].map((link) => (
            <div key={link.label} style={{ marginBottom: "0.8rem" }}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  color: "#0369a1",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderBottom: "1.5px solid #0369a160",
                  paddingBottom: "1px",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.target.style.borderColor = "#0369a1"; e.target.style.color = "#075985"; }}
                onMouseLeave={e => { e.target.style.borderColor = "#0369a160"; e.target.style.color = "#0369a1"; }}
              >
                {link.label.toUpperCase()} ↗
              </a>
            </div>
          ))}
        </div>
        <div>
          {!sent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <input placeholder="Your name" style={{ background: "#e0f7ff", border: "1px solid #38bdf8", borderRadius: "6px", padding: "0.7rem 1rem", color: "#111111", fontFamily: "inherit", fontSize: "0.82rem", outline: "none", "::placeholder": { color: "#0369a1" } }} />
              <input placeholder="Your email" style={{ background: "#e0f7ff", border: "1px solid #38bdf8", borderRadius: "6px", padding: "0.7rem 1rem", color: "#111111", fontFamily: "inherit", fontSize: "0.82rem", outline: "none", "::placeholder": { color: "#0369a1" } }} />
              <textarea rows={4} placeholder="Your message..." style={{ background: "#e0f7ff", border: "1px solid #38bdf8", borderRadius: "6px", padding: "0.7rem 1rem", color: "#111111", fontFamily: "inherit", fontSize: "0.82rem", resize: "vertical", outline: "none" }} />
              <button onClick={() => setSent(true)} style={{ ...S.btn, background: "#0369a1", color: "#ffffff", border: "none", textAlign: "center" }}>
                Send Message →
              </button>
            </div>
          ) : (
            <div style={{ background: "#e0f2fe", border: "1px solid #0369a130", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "#1a1a1a", fontSize: "1rem", margin: 0 }}>✓ Message sent!</p>
              <p style={{ color: "#333333", fontSize: "0.8rem", marginTop: "0.5rem" }}>I'll get back to you soon.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #e0f7ff", padding: "1.5rem 2rem", textAlign: "center" }}>
      <p style={{ color: "#444444", fontSize: "0.72rem", letterSpacing: "0.1em", margin: 0 }}>
        © {new Date().getFullYear()} {CONFIG.name} — Built with React
      </p>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet" />
      <div style={S.root}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
