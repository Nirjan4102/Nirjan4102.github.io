// ── Particles ──
function createParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;
  const colors = ['rgba(108,99,255,0.4)', 'rgba(0,212,170,0.4)', 'rgba(255,107,157,0.3)'];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*15+10}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
}

// ── Cursor Glow ──
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ── Typewriter ──
function initTypewriter() {
  const el = document.querySelector('.typewriter');
  if (!el) return;
  const words = ['Backend Developer', 'C++ Enthusiast', 'DSA Problem Solver', 'Full Stack Builder'];
  let wordIdx = 0, charIdx = 0, deleting = false;
  function type() {
    const word = words[wordIdx];
    if (deleting) {
      el.textContent = word.substring(0, charIdx--);
      if (charIdx < 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; setTimeout(type, 500); return; }
    } else {
      el.textContent = word.substring(0, ++charIdx);
      if (charIdx === word.length) { deleting = true; setTimeout(type, 2000); return; }
    }
    setTimeout(type, deleting ? 50 : 100);
  }
  type();
}

// ── Navbar ──
function initNavbar() {
  const nav = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > lastScroll && curr > 100) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    lastScroll = curr;

    // Active link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (curr >= top && curr < top + sec.offsetHeight) link.classList.add('active');
        else link.classList.remove('active');
      }
    });
  });

  if (toggle) toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
  }));
}

// ── Scroll Progress ──
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / h * 100) + '%';
  });
}

// ── Back To Top ──
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Reveal on Scroll ──
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── Skill Bars ──
function initSkillBars() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fills = e.target.querySelectorAll('.skill-fill');
        fills.forEach(f => { f.style.width = f.dataset.width; });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-category').forEach(el => obs.observe(el));
}

// ── Counter Animation ──
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current + suffix;
        }, 30);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => obs.observe(el));
}

// ── Smooth scroll for anchor links ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ── Tilt effect on project cards ──
function initTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // 3D Tilt
      card.style.transform = `translateY(-8px) perspective(800px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`;
      
      // Spotlight Glow Coordinates
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${mouseX}px`);
      card.style.setProperty('--mouse-y', `${mouseY}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Magnetic button spotlight ──
function initMagneticButtons() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100);
      const y = ((e.clientY - rect.top) / rect.height * 100);
      btn.style.setProperty('--x', x + '%');
      btn.style.setProperty('--y', y + '%');
    });
  });
}

// ── Parallax hero image on scroll ──
function initParallax() {
  const heroImg = document.querySelector('.hero-image-wrap');
  if (!heroImg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImg.style.transform = `translateY(${y * 0.15}px)`;
    }
  });
}

// ── Theme Toggle ──
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const icon = btn.querySelector('i');
  
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    icon.classList.replace('fa-sun', 'fa-moon');
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    } else {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// ── Live Local Time ──
function initLocalTime() {
  const timeDisplay = document.getElementById('time-display');
  if (!timeDisplay) return;
  setInterval(() => {
    const time = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
    timeDisplay.textContent = time + " (IST)";
  }, 1000);
}

// ── Interactive Hero Terminal ──
function initHeroTerminal() {
  const terminal = document.getElementById('terminal-body');
  if (!terminal) return;
  
  const lines = [
    { text: "npm start", delay: 500, color: "var(--text)" },
    { text: "> portfolio@1.0.0 start", delay: 300, color: "var(--text-dim)" },
    { text: "> node server.js", delay: 200, color: "var(--text-dim)" },
    { text: "[Server] Starting backend service...", delay: 800, color: "#f1fa8c" },
    { text: "[MongoDB] Connected to cluster successfully! 🚀", delay: 1000, color: "#50fa7b" },
    { text: "[Auth] User system initialized.", delay: 400, color: "#8be9fd" },
    { text: "Listening on port 5000...", delay: 200, color: "#ff79c6" }
  ];

  let currentLine = 0;
  
  function typeLine() {
    if (currentLine >= lines.length) {
      terminal.innerHTML += '<br><span style="color:var(--text)">nirjan@ubuntu: ~/portfolio$</span> <span class="cursor-blink" style="border-right: 2px solid #fff;"></span>';
      return;
    }
    
    setTimeout(() => {
      const p = document.createElement('div');
      p.style.color = lines[currentLine].color;
      p.textContent = lines[currentLine].text;
      terminal.appendChild(p);
      currentLine++;
      typeLine();
    }, lines[currentLine].delay);
  }
  
  typeLine();
}

// ── Custom Context Menu ──
function initContextMenu() {
  const menu = document.getElementById('context-menu');
  if (!menu) return;

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.style.display = 'block';
    
    // Ensure menu stays within viewport bounds
    let x = e.clientX;
    let y = e.clientY;
    
    if (x + menu.offsetWidth > window.innerWidth) x -= menu.offsetWidth;
    if (y + menu.offsetHeight > window.innerHeight) y -= menu.offsetHeight;
    
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
}

// ── Init All ──
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initCursorGlow();
  initTypewriter();
  initNavbar();
  initScrollProgress();
  initBackToTop();
  initReveal();
  initSkillBars();
  initCounters();
  initSmoothScroll();
  initTilt();
  initMagneticButtons();
  initParallax();
  initThemeToggle();
  initLocalTime();
  initHeroTerminal();
  initContextMenu();
});
