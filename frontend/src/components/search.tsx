import { SpotlightAction } from '@mantine/spotlight';
import { useContext } from 'react';

import { CommandsContext } from '../context/commands_context';
import { Command, ExtensionCommand } from '../utils/commands';

import Spotlight from './spotlight';

type Props = {
  onCommandSelect: (command: Command) => void;
};

function Search({ onCommandSelect }: Props) {
  const extentionCommands = useContext(CommandsContext);

  function flatAllCommands() {
    let totalCommands: Command[] = [];
    extentionCommands.forEach((extentionCommand: ExtensionCommand) => {
      totalCommands = totalCommands.concat(extentionCommand.commands);
    });

    return totalCommands;
  }

  function getActions(): SpotlightAction[] {
    const allCommands = flatAllCommands();

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
