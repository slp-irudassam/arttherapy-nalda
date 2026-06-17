/* ===== Hero Slider ===== */
(function () {
  const track = document.getElementById("heroTrack");
  if (!track) return;
  const slides = Array.from(track.children);
  const total = slides.length;
  let index = 0;

  const currentEl = document.getElementById("heroCurrent");
  const totalEl = document.getElementById("heroTotal");
  if (totalEl) totalEl.textContent = total;

  function render() {
    // center the active slide (slides are 64% wide -> offset to center)
    const slideWidth = slides[0].offsetWidth;
    const viewport = track.parentElement.offsetWidth;
    const offset = index * slideWidth - (viewport - slideWidth) / 2;
    track.style.transform = `translateX(${-offset}px)`;

    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    if (currentEl) currentEl.textContent = index + 1;
  }

  function go(dir) {
    index = (index + dir + total) % total;
    render();
  }

  document.querySelector(".hero-arrow.prev").addEventListener("click", () => go(-1));
  document.querySelector(".hero-arrow.next").addEventListener("click", () => go(1));

  let timer = setInterval(() => go(1), 4500);
  track.parentElement.addEventListener("mouseenter", () => clearInterval(timer));
  track.parentElement.addEventListener("mouseleave", () => (timer = setInterval(() => go(1), 4500)));

  window.addEventListener("resize", render);
  window.addEventListener("load", render);
  render();
})();

/* ===== Card Carousels (프로그램 / 강의 / 상품) ===== */
(function () {
  document.querySelectorAll(".carousel").forEach((car) => {
    const row = car.querySelector("[data-carousel]");
    const prev = car.querySelector(".car-arrow.prev");
    const next = car.querySelector(".car-arrow.next");
    if (!row) return;

    const step = () => {
      const card = row.querySelector(".card");
      return card ? card.offsetWidth + 22 : row.offsetWidth * 0.8;
    };
    if (prev) prev.addEventListener("click", () => row.scrollBy({ left: -step() * 2, behavior: "smooth" }));
    if (next) next.addEventListener("click", () => row.scrollBy({ left: step() * 2, behavior: "smooth" }));
  });
})();

/* ===== Notice toggle (placeholder) ===== */
(function () {
  const btn = document.querySelector(".notice-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    btn.style.transform = btn.style.transform === "rotate(180deg)" ? "" : "rotate(180deg)";
  });
})();
