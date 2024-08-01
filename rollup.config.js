import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import fileSize from "rollup-plugin-filesize"; // 打包输出打包大小

const babelOptions = {
  presets: [["@babel/preset-env"], "@babel/preset-react"],
  babelHelpers: 'bundled'
};

export default {
  input: "./src/index.tsx",
  output: {
    dir: "dist",
    filename: "index.js",
    format: "esm",
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel(babelOptions),
    typescript(),
    terser(),
    fileSize()
  ],
  external: ['react'],
};
