import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from '@rollup/plugin-terser';
import typescript from "@rollup/plugin-typescript";

const babelOptions = {
  presets: [["@babel/preset-env"], "@babel/preset-react"],
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
    terser()
  ],
  external: ['react']
};
