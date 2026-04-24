/* Mobile menu */
function toggleMenu() {
  const links = document.querySelector(".nav-links");
  const btn = document.querySelector(".nav-toggle");
  const open = links.classList.toggle("open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    const links = document.querySelector(".nav-links");
    const btn = document.querySelector(".nav-toggle");
    if (links.classList.contains("open")) {
      links.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
    }
  });
});

/* Nav border-on-scroll */
const nav = document.querySelector(".site-nav");
const onScroll = () => {
  if (window.scrollY > 10) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Lightbox */
let lightboxImages = [];
let lightboxIndex = 0;

function collectGalleryImages(img) {
  const gallery = img.closest(".gallery");
  if (!gallery) return [img];
  return Array.from(gallery.querySelectorAll("img"));
}

function openFullSize(img) {
  lightboxImages = collectGalleryImages(img);
  lightboxIndex = lightboxImages.indexOf(img);
  showLightbox();
  document.body.style.overflow = "hidden";
}

function showLightbox() {
  const overlay = document.getElementById("lightbox");
  const target = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const img = lightboxImages[lightboxIndex];
  target.src = img.src;
  target.alt = img.alt || "";
  caption.textContent = img.alt || "";
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
}

function closeFullSize() {
  const overlay = document.getElementById("lightbox");
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function navLightbox(delta) {
  if (!lightboxImages.length) return;
  lightboxIndex = (lightboxIndex + delta + lightboxImages.length) % lightboxImages.length;
  showLightbox();
}

document.addEventListener("keydown", (e) => {
  const overlay = document.getElementById("lightbox");
  if (!overlay.classList.contains("open")) return;
  if (e.key === "Escape") closeFullSize();
  else if (e.key === "ArrowRight") navLightbox(1);
  else if (e.key === "ArrowLeft") navLightbox(-1);
});

document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") closeFullSize();
});

/* Year */
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
