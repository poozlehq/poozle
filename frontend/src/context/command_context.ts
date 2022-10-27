import { Command } from '@poozle/edk';
import { createContext } from 'react';

export const CommandContext = createContext<Command | undefined>(undefined);
