// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      window.scrollTo({
        top: destino.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Menu fixo ao rolar
window.addEventListener('scroll', function () {
  const nav = document.querySelector('.Mtop');
  
  if (window.scrollY > 120) {      // quando descer mais que 120px
    nav.classList.add('fixo');
  } else {
    nav.classList.remove('fixo');
  }
});


(() => {
const slider = document.querySelector('.hero-slider');
if (!slider) return;

const slidesEl = slider.querySelector('.slides');
const slides = [...slider.querySelectorAll('.slide')];
const prev = slider.querySelector('.prev');
const next = slider.querySelector('.next');
const dotsWrap = slider.querySelector('.dots');

let i = 0, auto = null;
const DURATION = 6000; // 6s

// cria dots
slides.forEach((_, idx) => {
const b = document.createElement('button');
b.type = 'button';
b.setAttribute('aria-label', `Ir para o slide ${idx+1}`);
b.addEventListener('click', () => go(idx, true));
dotsWrap.appendChild(b);
});

function updateUI(){
slidesEl.style.transform = `translateX(${-i * 100}%)`;
dotsWrap.querySelectorAll('button').forEach((b,idx)=>{
  b.setAttribute('aria-selected', idx===i ? 'true' : 'false');
});
}
function go(to, stopAuto=false){
const total = slides.length;
i = (to + total) % total;
updateUI();
if (stopAuto) restartAuto();
}
const nextSlide = () => go(i+1);
const prevSlide = () => go(i-1);

prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);

// autoplay
const startAuto = () => auto = setInterval(nextSlide, DURATION);
const stopAuto  = () => { if (auto) clearInterval(auto); auto = null; };
const restartAuto = () => { stopAuto(); startAuto(); };

slider.addEventListener('mouseenter', stopAuto);
slider.addEventListener('mouseleave', startAuto);
slider.addEventListener('focusin', stopAuto);
slider.addEventListener('focusout', startAuto);

// teclado
slider.addEventListener('keydown', (e)=>{
if (e.key === 'ArrowRight') nextSlide();
if (e.key === 'ArrowLeft')  prevSlide();
});
slider.setAttribute('tabindex','0');

// init
updateUI(); startAuto();
})();
document.getElementById("contactForm").addEventListener("submit", function(e) {
e.preventDefault(); // impede o recarregamento da página

// Mostra a mensagem de sucesso
const successMessage = document.getElementById("successMessage");
successMessage.textContent = "Mensagem enviada com sucesso!";
successMessage.style.opacity = "1";

// Limpa os campos
this.reset();

// Oculta a mensagem depois de alguns segundos
setTimeout(() => {
successMessage.style.opacity = "0";
}, 3000);
});

// MODAIS: Missão, Visão, Valores

// referenciando os 3 modais
const modalMissao  = document.getElementById('myModal');
const modalVisao   = document.getElementById('mayModal');
const modalValores = document.getElementById('meyModal');

// botões
const btnMissao  = document.getElementById('btnMissao');
const btnVisao   = document.getElementById('btnVisao');
const btnValores = document.getElementById('btnValores');

// abre cada modal quando clicar no botão
if (btnMissao && modalMissao) {
  btnMissao.addEventListener('click', () => {
    modalMissao.style.display = 'flex';
  });
}

if (btnVisao && modalVisao) {
  btnVisao.addEventListener('click', () => {
    modalVisao.style.display = 'flex';
  });
}

if (btnValores && modalValores) {
  btnValores.addEventListener('click', () => {
    modalValores.style.display = 'flex';
  });
}

// fechar ao clicar no X
document.querySelectorAll('.modal .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.modal');
    if (modal) modal.style.display = 'none';
  });
});

// fechar ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});
document.querySelector('#slideCatalogo a.btn-hero').addEventListener('click', function(event) {
  event.preventDefault();

  const accordionBtn = document.querySelector('.accordion-btn');
  const accordionContent = document.querySelector('#catalogContent');

  // Abre o acordeão
  accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";

  // Rola até ele
  accordionContent.scrollIntoView({
      behavior: "smooth"
  });
});
// ---- REVEAL ON SCROLL ----
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // dispara ao carregar
