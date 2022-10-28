import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json' assert { type: 'json' };

const extensions = ['.js', '.jsx', '.ts', '.tsx']

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
]

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
    input: 'jira/types/index.d.ts',
    output: [{ file: 'jira/index.d.ts', format: 'esm' }],
    external: [/\.scss$/],
    plugins: [dts()],
  },
]
