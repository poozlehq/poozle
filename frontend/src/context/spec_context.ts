import { createContext } from 'react';

import { ExtensionSpecDataType } from '../utils/extension';

export const SpecContext = createContext<ExtensionSpecDataType | undefined>(undefined);
