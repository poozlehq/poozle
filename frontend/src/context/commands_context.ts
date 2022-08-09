import { createContext } from 'react';

import { Command } from '../utils/commands';

export const CommandsContext = createContext<Command[]>([]);
