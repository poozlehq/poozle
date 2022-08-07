import { createContext } from 'react';

import { Command } from '../utils/commands';

export const CommandContext = createContext<Command | undefined>(undefined);
