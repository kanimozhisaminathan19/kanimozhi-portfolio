import { useEffect } from "react";
import "./App.css";
import photo from "./assets/photo.jpg";



function App() {
  useEffect(() => {
    // ---------- Scroll reveal ----------
    const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));

    // ---------- Count-up stats ----------
    const statNums = document.querySelectorAll(".stat-item .n");
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const raw = el.textContent.trim();
          const match = raw.match(/^([\d.]+)(.*)$/);
          if (!match) return;
          const end = parseFloat(match[1]);
          const suffix = match[2];
          const isDecimal = match[1].includes(".");
          const duration = 1100;
          const start = performance.now();
          function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = end * eased;
            el.textContent = (isDecimal ? val.toFixed(2) : Math.round(val)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          countIO.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    statNums.forEach((el) => countIO.observe(el));

    // ---------- Photo tilt parallax ----------
    const heroVisual = document.getElementById("heroVisual");
    const photoFrame = document.getElementById("photoFrame");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function handleMouseMove(e) {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      photoFrame.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
    }
    function handleMouseLeave() {
      photoFrame.style.transform = "rotateY(0) rotateX(0)";
    }

    if (heroVisual && photoFrame && !reducedMotion) {
      heroVisual.addEventListener("mousemove", handleMouseMove);
      heroVisual.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      io.disconnect();
      countIO.disconnect();
      if (heroVisual && photoFrame) {
        heroVisual.removeEventListener("mousemove", handleMouseMove);
        heroVisual.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <>
      <nav>
        <div className="wrap">
          <div className="logo">
            Kani<span>mozhi.</span>
          </div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact" className="nav-cta">Let's Talk</a></li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="wrap">
          <div className="hero-text reveal">
            <span className="eyebrow">Kanimozhi Saminathan</span>
            <h1>
              I build <em>full-stack</em>
              <br />
              software that ships.
            </h1>
            <p className="lead">
              Software Engineer crafting scalable multi-tenant web &amp; mobile
              products — from 360° virtual tours to AI-powered diagnostics — using
              React, Node.js, PostgreSQL, Flutter and AWS.
            </p>
            <div className="hero-ctas">
              <a href="#contact" className="btn-primary">Let's Talk</a>
              <a href="#work" className="btn-ghost">
                <span className="circle-arrow">↓</span> See My Work
              </a>
            </div>
          </div>
          <div className="hero-visual reveal" id="heroVisual">
            <div className="blob"></div>
            <div className="hero-photo-frame" id="photoFrame">
              <img src={photo} alt="Kanimozhi Saminathan" />
            </div>
            <div className="float-card float-code">
              <span className="k">const</span> engineer <span className="s">=</span> {"{"}
              <br />
              &nbsp;&nbsp;name: <span className="s">'Kanimozhi'</span>,
              <br />
              &nbsp;&nbsp;role: <span className="s">'Software Engineer'</span>
              {"}"};
            </div>
            <div className="float-card float-stat">
              <div className="num">1+</div>
              <div className="lbl">Years building production software</div>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="sec-eyebrow">What I Do</span>
            <h2>Services I Provide</h2>
            <p>End-to-end product development — from architecture and database design to a polished, deployed interface.</p>
          </div>
          <div className="service-grid reveal-stagger">
            <div className="service-card">
              <div className="service-icon">◧</div>
              <h3>Web Development</h3>
              <p>Multi-tenant web platforms built with React.js, Node.js and PostgreSQL — scalable, fast and production-ready.</p>
              <div className="tag-row">
                <span className="tag">React.js</span>
                <span className="tag">Node.js</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">AWS</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">▤</div>
              <h3>App Development</h3>
              <p>Cross-platform mobile apps with Flutter — including no-code app generation and one-click APK delivery.</p>
              <div className="tag-row">
                <span className="tag">Flutter</span>
                <span className="tag">Node.js</span>
                  <span className="tag">MongoDB</span>
                <span className="tag">AWS</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">◆</div>
              <h3>AI-Powered Solutions</h3>
              <p>Diagnostic and intelligent platforms — from ultrasound image analysis to automated data pipelines.</p>
              <div className="tag-row">
                <span className="tag">Django</span>
                <span className="tag">Python</span>
                <span className="tag">AWS EC2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="wrap">
          <div className="about-strip">
            <div className="reveal">
              <span className="sec-eyebrow">About Me</span>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "2.1rem", marginBottom: "18px" }}>
                Turning ideas into reliable, shipped products.
              </h2>
              <p>
                I'm a Software Engineer at JBB Softech Private Limited, building
                multi-tenant platforms end-to-end — architecture, backend, frontend
                and deployment. I care about clean design, measurable impact, and
                code that holds up in production.
              </p>
              <p>
                B.Tech in Biomedical Engineering, which shaped how I approach
                software: precise, evidence-driven, and built to solve a real
                problem.
              </p>
              <div className="stat-block">
                <div className="stat-item">
                  <div className="n">4+</div>
                  <div className="l">Products shipped</div>
                </div>
                <div className="stat-item">
                  <div className="n">8.37</div>
                  <div className="l">CGPA, B.Tech</div>
                </div>
                <div className="stat-item">
                  <div className="n">1+</div>
                  <div className="l">Years experience</div>
                </div>
              </div>
            </div>
            <div className="about-card reveal">
              <h3>Quick Facts</h3>
              <ul>
                <li>Role <b>Software Engineer</b></li>
                <li>Company <b>JBB Softech Pvt Ltd</b></li>
                <li>Location <b>Chennai, Tamil Nadu</b></li>
                <li>Education <b>B.Tech Biomedical Engg.</b></li>
                <li>Certification <b>Full Stack Developer</b></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="work" style={{ background: "var(--card)" }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="sec-eyebrow">Selected Work</span>
            <h2>Projects I've Led</h2>
            <p>Real products shipped for real users — architected, built and deployed by me.</p>
          </div>
          <div className="work-list reveal-stagger">
            <div className="work-card">
              <div className="work-num">01</div>
              <div className="work-body">
                <h3>VisualWalkin</h3>
                <p>A self-service 360° virtual tour platform with a multi-tenant ecosystem — automated media workflows, centralized administration and real-time content synchronization on scalable cloud infrastructure.</p>
              </div>
              <div className="work-side">
                <div className="tag-row">
                  <span className="tag">React.js</span>
                  <span className="tag">Node.js</span>
                   <span className="tag">PostgreSQL</span>
                  <span className="tag">AWS</span>
                </div>
              </div>
            </div>

            <div className="work-card">
              <div className="work-num">02</div>
              <div className="work-body">
                <h3>Appifyours</h3>
             
                <p>A no-code application generation platform that produces brand-specific mobile apps from business inputs, with one-click APK creation and tenant-based management for multiple organizations.</p>
              </div>
              <div className="work-side">
                <div className="tag-row">
                  <span className="tag">Flutter</span>
                  <span className="tag">Node.js</span>
                    <span className="tag">MongoDB</span>
                </div>
              </div>
            </div>

            <div className="work-card">
              <div className="work-num">03</div>
              <div className="work-body">
                <h3>MyList4U</h3>
                <span className="role">Product Lead</span>
                <p>A QR-powered digital menu system delivering seamless contactless experiences, with tenant-isolated data management and live analytics dashboards for instant menu updates.</p>
              </div>
              <div className="work-side">
                <div className="tag-row">
                  <span className="tag">React.js</span>
                   <span className="tag">Node.js</span>
                   <span className="tag">PostgreSQL</span>
                  <span className="tag">AWS</span>
                  
                </div>
              </div>
            </div>

            <div className="work-card">
              <div className="work-num">04</div>
              <div className="work-body">
                <h3>Breast Cancer Detection AI</h3>
                <span className="role">Tamil Nadu Government Initiative</span>
                <p>An AI-enabled diagnostic platform for early breast cancer screening from ultrasound images, built with secure medical data handling and scalable hosting.</p>
              </div>
              <div className="work-side">
                <div className="tag-row">
                  <span className="tag">Django</span>
                  <span className="tag">Python</span>
                     <span className="tag">PostgreSQL</span>
                  <span className="tag">AWS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="sec-eyebrow">Toolbox</span>
            <h2>Skills &amp; Technologies</h2>
            <p>The languages, frameworks and tools I build with every day.</p>
          </div>
          <div className="skills-grid reveal-stagger">
            <div className="skill-col">
              <h4>Languages</h4>
              <ul>
                <li>JavaScript</li>
                <li>Python</li>
                <li>C++</li>
                <li>HTML5 / CSS3</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>Frameworks</h4>
              <ul>
                <li>React.js</li>
                <li>Node.js</li>
                <li>Flutter</li>
                <li>Bootstrap</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>Data &amp; Cloud</h4>
              <ul>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>Firebase</li>
                <li>AWS</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>Tools</h4>
              <ul>
                <li>VS Code</li>
                <li>Android Studio</li>
                <li>Git</li>
                <li>REST APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
<section id="contact">
        <div className="wrap">
          <div className="contact reveal">
            <h2>
              Have a project in mind?
              <br />
              Let's build it together.
            </h2>
            <p>I'm open to full-time roles and freelance collaborations.</p>
            <div className="contact-links">
              <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=kanimozhisaminathan19@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="primary"
>
  ✉ kanimozhisaminathan19@gmail.com
</a>
              <a
  href="https://wa.me/917639882047"
  target="_blank"
  rel="noopener noreferrer"
  className="phone-link"
>
  💬 WhatsApp
</a>
              <a href="https://www.linkedin.com/in/kanimozhisaminathan" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/kanimozhisaminathan19" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          Designed &amp; built by <span>Kanimozhi Saminathan</span> · Chennai, Tamil Nadu
        </div>
      </footer>
    </>
  );
}

export default App;