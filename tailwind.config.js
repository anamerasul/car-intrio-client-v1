module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional)
  // daisyui: {
  //   styled: true,
  //   themes: true,
  //   base: false,
  //   utils: true,
  //   logs: true,
  //   rtl: false,
  //   prefix: "",
  //   darkTheme: "light",
  // },

  daisyui: {
    styled: true,
    themes: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "mytheme",
    themes: [
      {
        mytheme: {
          primary: "#1e40af",

          secondary: "#0369a1",

          accent: "#9ca3af",

          neutral: "#10b981",

          "base-100": "#38bdf8",

          info: "#1c1917",

          success: "#0c4a6e",

          warning: "#FBBF18",

          error: "#b91c1c",
        },
      },
    ],
  },
};
