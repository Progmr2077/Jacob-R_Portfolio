const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const year = document.getElementById("year");
const toast = document.getElementById("toast");

year.textContent = new Date().getFullYear();

function setTheme(theme) {
  body.classList.toggle("light", theme === "light");
  themeToggle.textContent = theme === "light" ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
  localStorage.setItem("jacob-theme", theme);
}

const savedTheme = localStorage.getItem("jacob-theme");
setTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

themeToggle.addEventListener("click", () => {
  setTheme(body.classList.contains("light") ? "dark" : "light");
  showToast(body.classList.contains("light") ? "Light theme enabled" : "Dark theme enabled");
});

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = scrollable > 0 ? `${(window.scrollY / scrollable) * 100}%` : "0%";
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener("click", () => showToast("Opening your email app…"));
});