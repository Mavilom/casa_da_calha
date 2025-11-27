// Rolagem suave entre secoes (ignora links marcados com data-no-scroll)
document.querySelectorAll('a[href^="#"]:not([data-no-scroll])').forEach(link => {
  link.addEventListener('click', function (e) {
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
  if (!nav) return;

  if (window.scrollY > 120) {
    nav.classList.add('fixo');
  } else {
    nav.classList.remove('fixo');
  }
});

// Menu mobile toggle
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.Menu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();

// Slider hero
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
    b.setAttribute('aria-label', `Ir para o slide ${idx + 1}`);
    b.addEventListener('click', () => go(idx, true));
    dotsWrap.appendChild(b);
  });

  function updateUI() {
    slidesEl.style.transform = `translateX(${-i * 100}%)`;
    dotsWrap.querySelectorAll('button').forEach((b, idx) => {
      b.setAttribute('aria-selected', idx === i ? 'true' : 'false');
    });
  }

  function go(to, stopAuto = false) {
    const total = slides.length;
    i = (to + total) % total;
    updateUI();
    if (stopAuto) restartAuto();
  }

  const nextSlide = () => go(i + 1);
  const prevSlide = () => go(i - 1);

  prev.addEventListener('click', prevSlide);
  next.addEventListener('click', nextSlide);

  // autoplay
  const startAuto = () => auto = setInterval(nextSlide, DURATION);
  const stopAuto = () => { if (auto) clearInterval(auto); auto = null; };
  const restartAuto = () => { stopAuto(); startAuto(); };

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  slider.addEventListener('focusin', stopAuto);
  slider.addEventListener('focusout', startAuto);

  // teclado
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
  slider.setAttribute('tabindex', '0');

  // init
  updateUI(); startAuto();
})();

// Formulario
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // impede o recarregamento da pagina

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";
    const successMessage = document.getElementById("successMessage");
    const submitButton = this.querySelector("button[type='submit']");

    if (!name || !email || !message) {
      if (successMessage) {
        successMessage.textContent = "Preencha nome, e-mail e mensagem antes de enviar.";
        successMessage.style.opacity = "1";
      }
      return;
    }

    if (submitButton) submitButton.disabled = true;
    if (successMessage) {
      successMessage.textContent = "Enviando...";
      successMessage.style.opacity = "1";
    }

    fetch("https://formsubmit.co/ajax/casadacalhacuiaba@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    })
      .then(res => {
        if (!res.ok) throw new Error("Falha ao enviar");
        return res.json();
      })
      .then(() => {
        if (successMessage) {
          successMessage.textContent = "Mensagem enviada com sucesso! Respondemos em breve.";
          successMessage.style.opacity = "1";
        }
        this.reset();
      })
      .catch(() => {
        if (successMessage) {
          successMessage.textContent = "Nao foi possivel enviar agora. Tente novamente ou chame no WhatsApp: 65 99953-2679.";
          successMessage.style.opacity = "1";
        }
      })
      .finally(() => {
        if (submitButton) submitButton.disabled = false;
        setTimeout(() => {
          if (successMessage) successMessage.style.opacity = "0";
        }, 4000);
      });
  });
}

// Modais: Missao, Visao, Valores
const modalMissao = document.getElementById('myModal');
const modalVisao = document.getElementById('mayModal');
const modalValores = document.getElementById('meyModal');

const btnMissao = document.getElementById('btnMissao');
const btnVisao = document.getElementById('btnVisao');
const btnValores = document.getElementById('btnValores');

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

document.querySelectorAll('.modal .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.modal');
    if (modal) modal.style.display = 'none';
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

// Abre o catalogo ao clicar no CTA do slide
(() => {
  const catalogLink = document.querySelector('a[href="#catalogContent"]');
  const accordionContent = document.querySelector('#catalogContent');
  if (!catalogLink || !accordionContent) return;

  catalogLink.addEventListener('click', (event) => {
    event.preventDefault();
    accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    accordionContent.scrollIntoView({ behavior: "smooth" });
  });
})();

// Destaque ao clicar na imagem de Sobre nos
(() => {
  const sobreCard = document.querySelector('.sobre .paragrafo');
  if (!sobreCard) return;

  const link = sobreCard.querySelector('a');
  const toggleHighlight = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    sobreCard.classList.toggle('is-active');
  };

  if (link) {
    link.addEventListener('click', toggleHighlight);
  } else {
    sobreCard.addEventListener('click', toggleHighlight);
  }
})();

// Reveal on scroll
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
revealOnScroll();
