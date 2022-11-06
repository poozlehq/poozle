/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionSpecDataType } from './extension';

export interface AppProps {
  commandKey: string;
  resetCommand: () => void;
  specData?: ExtensionSpecDataType;
}
