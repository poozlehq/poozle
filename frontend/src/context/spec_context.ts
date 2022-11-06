/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionSpecDataType } from '@poozle/edk';
import { createContext } from 'react';

export const SpecContext = createContext<ExtensionSpecDataType | undefined>(undefined);
