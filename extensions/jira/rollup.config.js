import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const plugins = [
  json(),
  resolve({ extensions }),
  commonjs({
    include: /\/node_modules\//,
  }),
  babel({
    extensions,
    presets: ['@babel/preset-react'],
  }),
  terser(),
  typescript(),
  postcss({ modules: true }),
]

export default [
  {
    input: 'src/index.tsx',
    external: ['react', 'react-dom'],
    output: [
      {
        file: pkg.module,
        sourcemap: true,
        format: 'esm',
      },
    ],
    plugins,
  },
]
