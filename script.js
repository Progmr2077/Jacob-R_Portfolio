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

toggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const dark = body.classList.contains("dark-mode");
  toggle.textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("theme", dark ? "dark" : "light");
});