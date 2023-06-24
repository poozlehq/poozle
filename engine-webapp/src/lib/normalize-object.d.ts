/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

// Type definitions for Normalize Object 2.0.4
// Project: https://github.com/duereg/normalize-object

// TypeScript Version: 4.0

declare module 'normalize-object' {
  declare const normalize: NormalizationMethod;

  type Casing =
    | 'upper'
    | 'lower'
    | 'snake'
    | 'pascal'
    | 'camel'
    | 'kebab'
    | 'constant'
    | 'title'
    | 'capital'
    | 'sentence';

  interface NormalizationMethod {
    (object: any, casing: Casing): any;
  }

  export default normalize;
}
