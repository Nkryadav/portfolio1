/* ============================================================
   NAVDEEP KUMAR RANJAN – PORTFOLIO  |  script.js
   ============================================================ */

'use strict';

/* ---- PAGE LOADER ---- */
(function initLoader() {
  const loader = document.getElementById('page-loader');
  const bar = document.getElementById('loader-bar');
  const percent = document.getElementById('loader-percent');
  if (!loader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 4;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    bar.style.width = progress + '%';
    percent.textContent = Math.floor(progress) + '%';
  }, 80);

  window.addEventListener('load', () => {
    setTimeout(() => {
      bar.style.width = '100%';
      percent.textContent = '100%';
      setTimeout(() => loader.classList.add('hidden'), 300);
    }, 200);
  });
})();


/* ---- CUSTOM CURSOR ---- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, follX = 0, follY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth follower
(function animateFollower() {
  follX += (mouseX - follX) * 0.12;
  follY += (mouseY - follY) * 0.12;
  follower.style.left = follX + 'px';
  follower.style.top = follY + 'px';
  requestAnimationFrame(animateFollower);
})();

// Scale cursor on hover over interactive elements
const interactives = document.querySelectorAll('a, button, .project-card, .skill-category, .contact-card, .tc-card');
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursor.style.background = 'var(--accent3)';
    follower.style.width = '56px';
    follower.style.height = '56px';
    follower.style.borderColor = 'rgba(167,139,250,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'var(--accent2)';
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = 'rgba(99,102,241,0.5)';
  });
});

/* ---- NAVBAR SCROLL STATE ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

/* ---- ACTIVE NAV LINK ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksEl.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ---- TYPEWRITER EFFECT ---- */
const heroRole = document.getElementById('hero-role');
const roles = [
  'Full Stack Developer',
  'React.js Enthusiast',
  'Node.js Developer',
  'Problem Solver',
  'GitTalk President'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
  const current = roles[roleIndex];
  if (isDeleting) {
    heroRole.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    heroRole.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) {
    speed = 1800; isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }
  setTimeout(typeWriter, speed);
}
typeWriter();

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 16);
}

/* ---- INTERSECTION OBSERVER (AOS + counters + bars) ---- */
const aosEls = document.querySelectorAll('[data-aos]');
const counterEls = document.querySelectorAll('.stat-number');
const barFills = document.querySelectorAll('.bar-fill');

const observerOptions = { threshold: 0.15 };

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-visible');
      aosObserver.unobserve(entry.target);
    }
  });
}, observerOptions);
aosEls.forEach(el => aosObserver.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const w = entry.target.getAttribute('data-w');
      entry.target.style.width = w + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
barFills.forEach(el => barObserver.observe(el));

/* ---- SMOOTH REVEAL: hero elements on load ---- */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-badge, .hero-title, .hero-sub, .hero-actions, .hero-stats')
    .forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.transitionDelay = `${i * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50);
    });

  // Code card slide in
  const card = document.getElementById('code-card');
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateX(40px)';
    card.style.transition = 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateX(0)';
    }, 50);
  }
});

/* ---- TILT EFFECT on project cards ---- */
const tiltCards = document.querySelectorAll('.project-card, .skill-category');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    card.style.transform = `translateY(-8px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- SCROLL PROGRESS BAR ---- */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 3px; z-index: 2000;
  background: linear-gradient(90deg, #6366f1, #22d3ee, #a78bfa);
  width: 0%; transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(99,102,241,0.7);
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + '%';
});

/* ---- GLITCH text effect on name hover ---- */
const gradientText = document.querySelector('.gradient-text');
if (gradientText) {
  gradientText.addEventListener('mouseenter', () => {
    gradientText.style.animation = 'glitch 0.3s steps(2) forwards';
  });
  gradientText.addEventListener('animationend', () => {
    gradientText.style.animation = '';
  });
}

/* ---- NAV CTA pulse ---- */
const navCta = document.getElementById('nav-cta');
if (navCta) {
  setInterval(() => {
    navCta.style.boxShadow = '0 0 36px rgba(99,102,241,0.8)';
    setTimeout(() => { navCta.style.boxShadow = '0 0 24px rgba(99,102,241,0.4)'; }, 600);
  }, 3000);
}

/* ============================================================
   BACKGROUND CANVAS — Particles + Shooting Stars + Shapes + Ripples
   ============================================================ */
(function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = ['#6366f1', '#22d3ee', '#a78bfa', '#34d399', '#818cf8'];
  let W, H, particles, stars, shapes, ripples, largeParticles;
  let mouseX = -9999, mouseY = -9999;

  /* ---- resize ---- */
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', () => { resize(); initAll(); });
  resize();

  /* ---- track mouse for repel ---- */
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  /* ---- click ripple ---- */
  document.addEventListener('click', e => {
    ripples.push({
      x: e.clientX, y: e.clientY,
      r: 0, maxR: 160,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.7
    });
  });

  /* ---- Particle ---- */
  function randomColor() { return COLORS[Math.floor(Math.random() * COLORS.length)]; }

  /* ---- Large glowing orb particle ---- */
  function createLargeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 14 + 8,       // radius 8–22px
      color: randomColor(),
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.3 + 0.15,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: Math.random() * 0.005 + 0.002   // pulse speed
    };
  }

  function createParticle() {
    const r = Math.random() * 1.8 + 0.4;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r,
      color: randomColor(),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      baseVx: (Math.random() - 0.5) * 0.45,
      baseVy: (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.5 + 0.2
    };
  }

  /* ---- Geometric floating shape ---- */
  function createShape() {
    const sides = [3, 4, 6][Math.floor(Math.random() * 3)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 28 + 12,
      sides,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.08 + 0.04
    };
  }

  /* ---- Shooting Star ---- */
  function createStar() {
    const angle = (Math.random() * 30 + 20) * (Math.PI / 180);
    const speed = Math.random() * 6 + 5;
    return {
      x: Math.random() * W * 0.7,
      y: Math.random() * H * 0.4,
      len: Math.random() * 120 + 60,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: COLORS[Math.floor(Math.random() * 3)]
    };
  }

  function initAll() {
    const count = Math.min(220, Math.floor((W * H) / 6000));
    particles = Array.from({ length: count }, createParticle);
    shapes = Array.from({ length: 14 }, createShape);
    stars = [];
    ripples = [];
    largeParticles = Array.from({ length: 12 }, createLargeParticle);
  }
  initAll();

  /* Spawn shooting star every 2.5–5s */
  function scheduleStar() {
    setTimeout(() => { stars.push(createStar()); scheduleStar(); }, Math.random() * 2500 + 2500);
  }
  scheduleStar();

  /* ---- draw polygon helper ---- */
  function drawPolygon(x, y, r, sides, angle) {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const a = angle + (i / sides) * Math.PI * 2;
      i === 0 ? ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r)
        : ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
    }
    ctx.closePath();
  }

  /* ---- Draw loop ---- */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* --- geometric shapes (background layer) --- */
    shapes.forEach(s => {
      s.angle += s.rotSpeed;
      s.x += s.vx; s.y += s.vy;
      if (s.x < -80) s.x = W + 80;
      if (s.x > W + 80) s.x = -80;
      if (s.y < -80) s.y = H + 80;
      if (s.y > H + 80) s.y = -80;

      drawPolygon(s.x, s.y, s.r, s.sides, s.angle);
      ctx.strokeStyle = s.color;
      ctx.globalAlpha = s.alpha;
      ctx.lineWidth = 1;
      ctx.stroke();

      /* inner smaller polygon */
      drawPolygon(s.x, s.y, s.r * 0.5, s.sides, s.angle + 0.4);
      ctx.globalAlpha = s.alpha * 0.5;
      ctx.stroke();
    });

    /* --- large glowing orb particles --- */
    largeParticles.forEach(p => {
      /* pulse alpha */
      p.alpha += p.alphaDir * p.alphaSpeed;
      if (p.alpha > 0.45 || p.alpha < 0.1) p.alphaDir *= -1;

      p.x += p.vx; p.y += p.vy;
      if (p.x < -p.r) p.x = W + p.r;
      if (p.x > W + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = H + p.r;
      if (p.y > H + p.r) p.y = -p.r;

      /* radial gradient glow */
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
      grad.addColorStop(0, p.color);
      grad.addColorStop(0.4, p.color + '88');
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      /* solid bright core */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.globalAlpha = p.alpha * 0.6;
      ctx.fill();
    });

    /* --- particles with mouse repel --- */
    const REPEL_DIST = 100, REPEL_FORCE = 2.5;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      /* repel from mouse */
      const dx = p.x - mouseX, dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_DIST && dist > 0) {
        const force = (REPEL_DIST - dist) / REPEL_DIST * REPEL_FORCE;
        p.vx += (dx / dist) * force * 0.05;
        p.vy += (dy / dist) * force * 0.05;
      }
      /* drift back to base velocity */
      p.vx += (p.baseVx - p.vx) * 0.02;
      p.vy += (p.baseVy - p.vy) * 0.02;

      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      /* connect nearby */
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const ddx = p.x - q.x, ddy = p.y - q.y;
        const d = Math.sqrt(ddx * ddx + ddy * ddy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - d / 110) * 0.12;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    /* --- shooting stars --- */
    stars = stars.filter(s => s.alpha > 0.02);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * (s.len / 8), s.y - s.vy * (s.len / 8));
      const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * (s.len / 8), s.y - s.vy * (s.len / 8));
      grad.addColorStop(0, s.color); grad.addColorStop(1, 'transparent');
      ctx.strokeStyle = grad;
      ctx.globalAlpha = s.alpha;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      s.x += s.vx; s.y += s.vy; s.alpha -= 0.018;
    });

    /* --- ripple waves --- */
    ripples = ripples.filter(r => r.alpha > 0.01);
    ripples.forEach(r => {
      for (let ring = 0; ring < 3; ring++) {
        const rr = r.r - ring * 22;
        if (rr < 0) continue;
        ctx.beginPath();
        ctx.arc(r.x, r.y, rr, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.alpha * (1 - ring * 0.3);
        ctx.lineWidth = 2 - ring * 0.5;
        ctx.stroke();
      }
      r.r += 3.5;
      r.alpha -= 0.018;
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();
})();

/* ============================================================
   CARD SHINE / GLARE EFFECT
   ============================================================ */
(function initShine() {
  const shineCards = document.querySelectorAll('.project-card, .skill-category, .tc-card, .contact-card');
  shineCards.forEach(card => {
    /* inject shine pseudo element via overlay div */
    const shine = document.createElement('div');
    shine.style.cssText = `
      position:absolute; top:0; left:0; width:100%; height:100%;
      border-radius:inherit; pointer-events:none; overflow:hidden;
      z-index:2; opacity:0; transition:opacity 0.3s;
    `;
    const shineInner = document.createElement('div');
    shineInner.style.cssText = `
      position:absolute; width:60%; height:200%;
      background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.07) 50%, transparent 80%);
      transform: translateX(-100%) rotate(15deg);
      transition: transform 0.55s ease;
    `;
    shine.appendChild(shineInner);
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(shine);

    card.addEventListener('mouseenter', () => {
      shine.style.opacity = '1';
      shineInner.style.transform = 'translateX(200%) rotate(15deg)';
    });
    card.addEventListener('mouseleave', () => {
      shine.style.opacity = '0';
      shineInner.style.transform = 'translateX(-100%) rotate(15deg)';
    });
  });
})();

/* ============================================================
   FLOATING TEXT GLOW on section titles
   ============================================================ */
(function initTitleGlow() {
  const titles = document.querySelectorAll('.section-title');
  titles.forEach(title => {
    title.addEventListener('mouseenter', () => {
      title.style.filter = 'drop-shadow(0 0 18px rgba(99,102,241,0.7))';
      title.style.transition = 'filter 0.4s ease';
    });
    title.addEventListener('mouseleave', () => {
      title.style.filter = '';
    });
  });
})();
