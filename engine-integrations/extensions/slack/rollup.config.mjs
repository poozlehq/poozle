/** Copyright (c) 2022, Poozle, all rights reserved. **/

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

const extensions = [".ts"];

const plugins = [
  json(),
  resolve({ extensions, exportConditions: ["node"], preferBuiltins: true }),
  commonjs({
    include: /\/node_modules\//,
  }),
  typescript(),
  terser(),
];

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: "src/server.ts",
    output: [
      {
        file: "slack/index.js",
        sourcemap: false,
        format: "cjs",
        exports: "named",
        preserveModules: false,
      },
    ],
    plugins,
  },
];
