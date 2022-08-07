import { createContext } from 'react';

import { ExtensionCommand } from '../utils/commands';

export const CommandsContext = createContext<ExtensionCommand[]>([]);
