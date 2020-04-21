export default {
  input: "src/index.js",
  output: {
    file: `dist/ryan.${process.env.FORMAT}.js`,
    format: process.env.FORMAT,
    name: "ryan"
  }
}