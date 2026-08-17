const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Sombra no header ao rolar
const header = document.querySelector('.site-header');
const floatWa = document.getElementById('floatWa');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 12;
  if (header) header.classList.toggle('scrolled', scrolled);
  if (floatWa) floatWa.classList.toggle('visible', window.scrollY > 400);
});

// Animações de revelação ao rolar (só desloca a posição, nunca esconde o
// conteúdo — ver comentário no CSS). Se o navegador não suportar
// IntersectionObserver, o conteúdo já nasce na posição final mesmo.
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal');

  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
  revealEls.forEach(el => io.observe(el));
}

// Carrossel de resultados — usa rolagem nativa com "encaixe" (scroll-snap),
// mais simples e robusto que calcular posições na mão, e já ganha arrastar
// no touch de graça, sem código extra.
(function () {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));
  if (!track || !prevBtn || !nextBtn) return;

  const slideCount = track.children.length;
  let index = 0;

  function updateUI() {
    dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = index === slideCount - 1 ? 'hidden' : 'visible';
  }

  function goTo(i) {
    index = Math.max(0, Math.min(slideCount - 1, i));
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
    updateUI();
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Mantém os pontos/setas corretos quando o usuário arrasta manualmente
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      index = Math.round(track.scrollLeft / track.clientWidth);
      updateUI();
    }, 100);
  });

  updateUI();
})();
