/** @type {import('tailwindcss').Config} */
// Tailwind is kept for its Preflight reset only (@tailwind base in
// src/index.css); the page is styled with plain CSS. Brand tokens live as
// custom properties on :root in src/index.css.
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
