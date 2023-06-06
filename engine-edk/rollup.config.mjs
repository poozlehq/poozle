/** Copyright (c) 2023, Poozle, all rights reserved. **/

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.ts'];

const plugins = [
  json(),
  resolve({ extensions, exportConditions: ['node'], preferBuiltins: false }),
  commonjs({
    include: /\/node_modules\//,
  }),
  typescript(),
  terser(),
];

export default [
  {
    input: 'src/index.ts',
    external: [],
    output: [
      {
        file: 'edk/index.esm.js',
        sourcemap: true,
        format: 'es',
      },
    ],
    plugins,
  },
  {
    input: 'src/index.ts',
    external: [],
    output: [
      {
        file: 'edk/index.js',
        sourcemap: true,
        format: 'cjs',
      },
    ],
    plugins,
  },
  {
    input: 'src/index.ts',
    external: [],
    output: [
      {
        file: 'edk/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
];
