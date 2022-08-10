import { createContext } from 'react';

import { CommandTreeRecord } from '../views/command_view/types';

export type CommandTreeType = {
  setCommandTree: (tree: CommandTreeRecord[]) => void;
  commandTree: CommandTreeRecord[];
};

export const CommandTreeContext = createContext<CommandTreeType | undefined>(undefined);
