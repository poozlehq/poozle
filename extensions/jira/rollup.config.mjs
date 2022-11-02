import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json' assert { type: 'json' };

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const plugins = [
  json(),
  resolve({ extensions }),
  commonjs({
    include: /\/node_modules\//,
  }),
  typescript(),
  babel({
    extensions,
    presets: ['@babel/preset-react'],
  }),
  terser(),
  postcss({ modules: true }),
];

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: 'src/app/index.tsx',
    external: ['react', 'react-dom', 'react-scripts'],
    output: [
      {
        file: pkg.module,
        sourcemap: true,
        format: 'esm',
        exports: 'named',
        preserveModules: false,
      },
    ],
    plugins,
  },
  {
    input: 'jira/types/app/index.d.ts',
    output: [{ file: 'jira/index.d.ts', format: 'esm' }],
    external: [/\.scss$/],
    plugins: [dts()],
  },
];
