/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Command } from '@poozle/edk';
import { createContext } from 'react';

interface CommandsContextType {
  refetchCommands(): void;
  commands: Command[];
}

export const CommandsContext = createContext<CommandsContextType>([]);
