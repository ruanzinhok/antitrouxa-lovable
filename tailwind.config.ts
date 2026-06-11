import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display:   ["var(--font-display)", "serif"],
        ui:        ["var(--font-ui)", "sans-serif"],
        hero:      ["var(--font-hero)", "serif"],
        editorial: ["var(--font-editorial)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
