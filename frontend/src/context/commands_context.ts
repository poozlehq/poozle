import { createContext } from 'react';

import { Command } from '../utils/extension';

export const CommandsContext = createContext<Command[]>([]);
