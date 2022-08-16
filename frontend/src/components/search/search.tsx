import { SpotlightAction } from '@mantine/spotlight';
import { useContext, useEffect } from 'react';

import { CommandsContext } from '../../context/commands_context';
import { registerAppWindow } from '../../utils/application';
import { Command } from '../../utils/commands';

import Spotlight from '../spotlight';

type Props = {
  onCommandSelect: (command: Command) => void;
  resetCommand: () => void;
};

function Search({ onCommandSelect, resetCommand }: Props) {
  const allCommands = useContext(CommandsContext);

  useEffect(() => {
    if (document) {
      registerAppWindow(resetCommand);
    }
  }, []);

  function getActions(): SpotlightAction[] {
    return allCommands.map(
      (command: Command) =>
        ({
          title: command.name,
          description: command.description,
          icon: command.icon,
          type: 'Command',
          onTrigger: () => onCommandSelect(command),
        } as SpotlightAction),
    );
  }

  return <Spotlight actions={getActions() ?? []} />;
}

export default Search;
