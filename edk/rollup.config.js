import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import dts from "rollup-plugin-dts";

import pkg from './package.json';

import typescriptOptions from './tsconfig.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const plugins = [
  json(),
  resolve({ extensions }),
  commonjs({
    include: /\/node_modules\//,
  }),
  babel({
    extensions,
    presets: ['@babel/preset-react', '@babel/preset-typescript', '@babel/preset-env'],
  }),
  terser(),
  typescript(typescriptOptions),
  postcss({ modules: true }),
];

export default [
  {
    input: 'src/index.ts',
    external: pkg.peerDependencies,
    output: [
      {
        file: pkg.module,
        sourcemap: true,
        format: 'esm',
      },
      {
        file: pkg.main,
        format: 'esm',
      },
    ],
    plugins,
  },
  {
    input: "edk/types/index.d.ts",
    output: [{ file: "edk/index.d.ts", format: "esm" }],
    external: [/\.scss$/],
    plugins: [dts()],
  }
];
