/** Copyright (c) 2023, Poozle, all rights reserved. **/

declare global {
  /**
   * Value can be defined in T or could otherwise be null or undefined.
   */
  type Probably<T> = T | null | void;

  /**
   * Primitive Data Types.
   */
  type Primitive = boolean | number | string;

  /**
   * Extract PropType from components
   */
  type ExtractProps<TComponentOrTProps> =
    TComponentOrTProps extends React.ComponentType<infer TProps>
      ? TProps
      : TComponentOrTProps;
}
/**
 * This file has no import/export statements (i.e. is a script).
 * Hence convert it into a module by adding an empty export statement.
 */
export {};
