import { ExtensionSpecDataType } from '@poozle/edk';
import { createContext } from 'react';

export const SpecContext = createContext<ExtensionSpecDataType | undefined>(undefined);
