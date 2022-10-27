import { Command } from '@poozle/edk';
import { createContext } from 'react';

export const CommandsContext = createContext<Command[]>([]);
