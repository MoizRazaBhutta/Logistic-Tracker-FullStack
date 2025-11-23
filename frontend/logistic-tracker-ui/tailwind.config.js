module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // <---- disables @tailwind base
  },
  plugins: [],
};
