/** @type {import('tailwindcss').Config} */
// Brand tokens: Wael Kabouk identity v1 ("one identity across many views").
// Source of truth: LinkedIn/brand/BRAND.md. Gold carries meaning only
// (the trace, the point, the photo ring, the active state), never paragraphs.
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Ground and surfaces: navy, separated by tone steps, not lines
        primary: "#0A1326", // navy ground
        tertiary: "#122041", // raised surface (cards, panels)
        "black-100": "#0F1A34", // quiet surface
        "black-200": "#1B2C52", // inner surface, chips
        "black-300": "#22365F", // hover step
        // Ink
        white: "#F4F1EA", // off-white: headlines and main text
        "white-100": "#DCD9D2", // point text
        secondary: "#A9B1C2", // mist: secondary text, citations
        // Accent and paper
        gold: "#C9A45C",
        paper: "#F7F5F0",
        "paper-200": "#EBE6DA",
        navy: "#0A1326",
      },
      fontFamily: {
        serif: ['"Newsreader"', "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        arabic: ['"IBM Plex Sans Arabic"', '"IBM Plex Sans"', "sans-serif"],
      },
      borderRadius: {
        // Brand: no rounded cards. Corners stay square; circles stay circles.
        lg: "2px",
        xl: "2px",
        "2xl": "2px",
        "3xl": "2px",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
