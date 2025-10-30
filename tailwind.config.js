/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // The key is 'extend'. This is the ONLY thing
    // directly under 'theme'.
    extend: {
      // Our custom fonts go INSIDE extend
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      // Our custom colors go INSIDE extend
      colors: {
        "brand-primary": "#0D6EFD",
        "brand-secondary": "#6C757D",
        "brand-dark": "#212529",
        "brand-light": "#F8F9FA",
        "brand-success": "#198754",
        "brand-danger": "#DC3545",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/forms")],
};
