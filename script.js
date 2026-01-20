const circle = document.getElementById("circle");
const square = document.getElementById("square");
const glow = document.querySelector(".glow");
const randomizeButton = document.getElementById("randomize");
const toggleGlowButton = document.getElementById("toggle-glow");
const sizeInput = document.getElementById("size");

const palettes = [
  { accent: "#4a90e2", accent2: "#00d2ff" },
  { accent: "#f97316", accent2: "#facc15" },
  { accent: "#22c55e", accent2: "#14b8a6" },
  { accent: "#e11d48", accent2: "#f472b6" },
  { accent: "#8b5cf6", accent2: "#38bdf8" },
];

let currentPalette = 0;
let glowOn = false;

const applyPalette = (palette) => {
  document.documentElement.style.setProperty("--accent", palette.accent);
  document.documentElement.style.setProperty("--accent-2", palette.accent2);
  glow.style.background = `radial-gradient(circle, ${palette.accent2}aa, transparent 60%)`;
};

const updateGlowState = () => {
  glow.classList.toggle("active", glowOn);
  toggleGlowButton.textContent = `Glød: ${glowOn ? "på" : "av"}`;
};

const togglePulse = () => {
  const active = circle.classList.toggle("pulse");
  circle.setAttribute("aria-pressed", active ? "true" : "false");
};

const updateSize = (value) => {
  circle.style.width = `${value}px`;
  circle.style.height = `${value}px`;
  glow.style.width = `${value * 1.4}px`;
  glow.style.height = `${value * 1.4}px`;
};

randomizeButton.addEventListener("click", () => {
  currentPalette = (currentPalette + 1) % palettes.length;
  applyPalette(palettes[currentPalette]);
  square.animate(
    [
      { transform: "scale(1)", boxShadow: "inset 0 0 25px rgba(15, 23, 42, 0.35)" },
      { transform: "scale(1.02)", boxShadow: "inset 0 0 35px rgba(15, 23, 42, 0.45)" },
      { transform: "scale(1)" },
    ],
    {
      duration: 500,
      easing: "ease-out",
    }
  );
});

toggleGlowButton.addEventListener("click", () => {
  glowOn = !glowOn;
  updateGlowState();
});

sizeInput.addEventListener("input", (event) => {
  updateSize(event.target.value);
});

circle.addEventListener("click", togglePulse);

circle.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    togglePulse();
  }
});

applyPalette(palettes[currentPalette]);
updateGlowState();
updateSize(sizeInput.value);
