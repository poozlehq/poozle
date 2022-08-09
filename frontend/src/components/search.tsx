import { SpotlightAction } from '@mantine/spotlight';
import { useContext } from 'react';

import { CommandsContext } from '../context/commands_context';
import { Command } from '../utils/commands';

import Spotlight from './spotlight';

type Props = {
  onCommandSelect: (command: Command) => void;
};

function Search({ onCommandSelect }: Props) {
  const allCommands = useContext(CommandsContext);

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
