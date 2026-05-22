// -------------------------------
// Typewriter Effect (No Jumping)
// -------------------------------
const subtitle = document.getElementById("subtitle");
const measure = document.getElementById("subtitle-measure");

const messages = [
  "Computer Programming Student",
  "Software Developer",
  "Problem Solver",
  "Web developer",
  "Game developer"
];

let index = 0;
let charIndex = 0;
let deleting = false;

// Lock subtitle height to max
const longest = messages.reduce((a, b) => (a.length > b.length ? a : b));
measure.textContent = longest;
subtitle.style.minHeight = measure.offsetHeight + "px";

function type() {
  const current = messages[index];

  if (!deleting) {
    subtitle.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    subtitle.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      index = (index + 1) % messages.length;
    }
  }

  setTimeout(type, deleting ? 60 : 80);
}

type();


// -------------------------------
// Scroll Reveal Animations
// -------------------------------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".fade").forEach(el => observer.observe(el));


// -------------------------------
// Dark Mode Toggle
// -------------------------------
const toggle = document.querySelector("[data-theme-toggle]");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggle.textContent = "☀️";
}

// Reflect initial state in aria-pressed
toggle.setAttribute('aria-pressed', body.classList.contains('dark-mode') ? 'true' : 'false');

toggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const dark = body.classList.contains("dark-mode");
  toggle.textContent = dark ? "☀️" : "🌙";
  toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
  localStorage.setItem("theme", dark ? "dark" : "light");
});

// Smooth scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});