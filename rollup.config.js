import resolve from 'rollup-plugin-node-resolve'
import { terser } from "rollup-plugin-terser"

let config

function prodConfig(){
  return {
    input: "src/index.js",
    output: {
      file: `dist/padding.${process.env.FORMAT}.min.js`,
      format: process.env.FORMAT,
      name: "Padding"
    },
    plugins: [
      resolve(),
      terser()
    ]
  }
}

function devConfig(){
  return {
    input: "src/index.js",
    output: {
      file: `dist/padding.${process.env.FORMAT}.js`,
      format: process.env.FORMAT,
      name: "Padding"
    },
  }
}
if(process.env.NODE_ENV === "production"){
  config = prodConfig()
}else{
  config = devConfig()
}
export default config