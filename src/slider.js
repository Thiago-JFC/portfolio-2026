const track = document.getElementById("track");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const cards = track.querySelectorAll("article");
const total = cards.length;

let current = 0;
let startX = 0;
let deltaX = 0;

function getStep() {
  return window.innerWidth >= 768 ? 2 : 1;
}

function getTotalSteps() {
  return Math.ceil(total / getStep());
}

function buildDots() {
  dotsEl.innerHTML = "";
  for (let i = 0; i < getTotalSteps(); i++) {
    const d = document.createElement("button");
    d.className =
      "w-2 h-2 rounded-full transition-all " +
      (i === current ? "bg-teal-600 scale-125" : "bg-gray-300");
    d.setAttribute("aria-label", "Slide " + (i + 1));
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
  }
}

function updateActiveCards() {
  const step = getStep();
  cards.forEach((article, i) => {
    const card = article.querySelector("[data-card]");
    const inView = i >= current * step && i < (current + 1) * step;
    card.classList.toggle("border-teal-600", inView);
    card.classList.toggle("border-transparent", !inView);
  });
}

function goTo(idx) {
  const steps = getTotalSteps();
  current = Math.max(0, Math.min(steps - 1, idx));
  const step = getStep();
  track.style.transform = `translateX(-${current * step * (100 / step)}%)`;

  dotsEl.querySelectorAll("button").forEach((d, i) => {
    d.className =
      "w-2 h-2 rounded-full transition-all " +
      (i === current ? "bg-teal-600 scale-125" : "bg-gray-300");
  });

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === steps - 1;
  updateActiveCards();
}

prevBtn.onclick = () => goTo(current - 1);
nextBtn.onclick = () => goTo(current + 1);

const wrapper = document.getElementById("wrapper");

wrapper.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
    deltaX = 0;
  },
  { passive: true },
);
wrapper.addEventListener(
  "touchmove",
  (e) => {
    deltaX = e.touches[0].clientX - startX;
  },
  { passive: true },
);
wrapper.addEventListener("touchend", () => {
  if (deltaX < -50) goTo(current + 1);
  else if (deltaX > 50) goTo(current - 1);
});

window.addEventListener("resize", () => {
  current = 0;
  buildDots();
  goTo(0);
});

buildDots();
goTo(0);
