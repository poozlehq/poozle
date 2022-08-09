import { createContext } from 'react';

import { ExtensionSpecDataType } from '../utils/commands';

export const SpecContext = createContext<ExtensionSpecDataType | undefined>(undefined);
