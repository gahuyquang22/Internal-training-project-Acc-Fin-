import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        line: "#d8dee8",
        panel: "#f7f8fb",
        moss: "#4f6f52",
        amber: "#b7791f",
        coral: "#b95645",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(31, 41, 51, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
