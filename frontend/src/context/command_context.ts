import { createContext } from 'react';

import { Command } from '../utils/extension';

export const CommandContext = createContext<Command | undefined>(undefined);
