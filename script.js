// ===== Project Data =====
const projects = [
  {
    title: '프로필 웹사이트',
    description: '지금 보고 계신 이 사이트! HTML, CSS, JS로 만든 개인 포트폴리오.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    title: 'AI 챗봇',
    description: 'AI API를 활용한 간단한 대화형 챗봇 프로젝트.',
    tags: ['JavaScript', 'API'],
    link: '#',
  },
  {
    title: '할 일 관리 앱',
    description: '로컬 스토리지를 활용한 심플한 투두리스트.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    title: '계산기',
    description: '깔끔한 UI의 웹 계산기 앱.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
];

// ===== Render Projects =====
function renderProjects() {
  const grid = document.getElementById('projectGrid');

  grid.innerHTML = projects
    .map(
      (p) => `
    <div class="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-violet-500/50 transition-all hover:-translate-y-1">
      <h3 class="text-xl font-bold mb-3 group-hover:text-violet-400 transition-colors">${p.title}</h3>
      <p class="text-gray-400 text-sm mb-5 leading-relaxed">${p.description}</p>
      <div class="flex flex-wrap gap-2 mb-5">
        ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
      </div>
      <a href="${p.link}" class="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors">
        자세히 보기
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </a>
    </div>`
    )
    .join('');
}

// ===== Dark/Light Mode Toggle =====
const darkToggle = document.getElementById('darkToggle');
const themeIcon = document.getElementById('themeIcon');

darkToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  const isLight = document.documentElement.classList.contains('light');
  themeIcon.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.add('light');
  themeIcon.textContent = '☀️';
}

// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('section > div');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== Skill Bar Animation =====
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ===== Hero Particles =====
function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['rgba(139,92,246,0.15)', 'rgba(6,182,212,0.15)', 'rgba(168,85,247,0.15)'];

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    container.appendChild(particle);
  }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  renderProjects();
});
