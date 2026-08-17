document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
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

// Sombra no header ao rolar
const header = document.querySelector('.site-header');
const floatWa = document.getElementById('floatWa');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 12;
  header.classList.toggle('scrolled', scrolled);
  floatWa.classList.toggle('visible', window.scrollY > 400);
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
