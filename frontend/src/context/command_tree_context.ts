import { createContext } from 'react';

import { CommandTreeRecord } from '../views/command_view/types';

export interface CommandTreeType {
  setCommandTree: (tree: CommandTreeRecord[]) => void;
  commandTree: CommandTreeRecord[];
  setLastView: (completeReset?: boolean) => void;
}

export const CommandTreeContext = createContext<CommandTreeType | undefined>(undefined);
