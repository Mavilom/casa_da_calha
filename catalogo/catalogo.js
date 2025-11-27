// ====== LISTA DE FOTOS DO CATALOGO ======
// Troque estes caminhos pelas suas imagens
const photos = [
  { src: "img1.jpg", alt: "Exemplo 1 - Produto em destaque" },
  { src: "img2.jpg", alt: "Exemplo 2 - Produto em ambiente" },
  { src: "img3.jpg", alt: "Exemplo 3 - Detalhe do produto" },
  { src: "img4.jpg", alt: "Exemplo 4 - Vitrine de produtos" },
  { src: "img5.jpg", alt: "Exemplo 5 - Primeiro de produtos" }
];

// ====== ELEMENTOS ======
const bookEl = document.getElementById("catalogBook");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageIndicator = document.getElementById("pageIndicator");

let currentPageIndex = 0; // comeca na primeira pagina

// ====== CRIA AS PAGINAS DINAMICAMENTE ======
function createPages() {
  if (!bookEl) return;
  bookEl.innerHTML = "";

  photos.forEach((photo, index) => {
    const page = document.createElement("div");
    page.classList.add("catalog-page");
    page.dataset.index = index;

    // z-index invertido pra primeira pagina ficar em cima
    page.style.zIndex = photos.length - index;

    page.innerHTML = `<img src="${photo.src}" alt="${photo.alt}">`;

    bookEl.appendChild(page);
  });

  updatePages();
}

// ====== ATUALIZA ESTADO DAS PAGINAS ======
function updatePages() {
  const pages = document.querySelectorAll(".catalog-page");

  pages.forEach(page => {
    const index = parseInt(page.dataset.index, 10);
    if (index < currentPageIndex) {
      page.classList.add("turned");
    } else {
      page.classList.remove("turned");
    }
  });

  // Atualiza indicador de pagina
  if (pageIndicator) {
    pageIndicator.textContent = `Pagina ${currentPageIndex + 1} de ${photos.length}`;
  }

  // Desabilita botoes se nao tiver pra onde ir
  if (prevBtn) prevBtn.disabled = currentPageIndex === 0;
  if (nextBtn) nextBtn.disabled = currentPageIndex === photos.length - 1;
}

// ====== NAVEGACAO ======
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      updatePages();
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentPageIndex < photos.length - 1) {
      currentPageIndex++;
      updatePages();
    }
  });
}

// Opcional: virar pagina clicando no "livro"
if (bookEl) {
  bookEl.addEventListener("click", () => {
    if (currentPageIndex < photos.length - 1) {
      currentPageIndex++;
    } else {
      currentPageIndex = 0; // volta pro inicio
    }
    updatePages();
  });
}

// Inicializa
createPages();

// Toggle do acordeao
const btn = document.querySelector(".accordion-btn");
const content = document.getElementById("catalogContent");

if (btn && content) {
  btn.addEventListener("click", () => {
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
