module.exports = {
  mode: "jit",
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      spaceing: {
        4.5: "1.125rem",
        15: "3.75rem",
        18: "4.5rem",
        21: "5.25rem",
        "10vh": "10vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "10vw": "10vw",
        "20vw": "20vw",
        "30vw": "30vw",
        "40vw": "40vw",
        "50vw": "50vw",
        "60vw": "60vw",
        "70vw": "70vw",
        "80vw": "80vw",
        "90vw": "90vw",
      },
      height: {
        max: "max-content",
      },
      transitionProperty: {
        "clip-path": "clip-path",
        base: "opacity, transform",
      },
    },
  },
  variants: {
    borderWidth: ["last"],
    margin: ["last", "first"],
    borderRadius: ["last", "first"],
  },
  purge: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}"],
}
