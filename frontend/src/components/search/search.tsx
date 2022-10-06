import { Chip } from '@mantine/core';
import { SpotlightAction } from '@mantine/spotlight';
import { useCallback, useContext, useEffect, useState } from 'react';

import { CommandsContext } from 'context/commands_context';
import { Command } from 'types/common';
import { registerAppWindow, registerEsc } from 'utils/application';
import { capitalizeFirstLetter } from 'utils/common';

import { Image } from '../image';
import Spotlight from '../spotlight';
import { CustomAction } from '../spotlight/CustomAction';
import styles from './search.module.scss';

const SPOTLIGHT_GROUPS = {
  COMMANDS: 'COMMANDS',
  EXTENSIONS: 'EXTENSIONS',
};

interface Extension {
  title: string;
  icon: string;
  description?: string;
  id: string;
}

interface Props {
  onCommandSelect: (command: Command) => void;
  resetCommand: () => void;
}

const Search = ({ onCommandSelect, resetCommand }: Props) => {
  const allCommands = useContext(CommandsContext);
  const [selectedExtension, selectExtension] = useState<Extension | undefined>(undefined);

  useEffect(() => {
    if (document) {
      registerAppWindow(resetCommand);
      registerEsc(() => selectExtension(undefined));
    }
  }, [resetCommand]);

  const getAllExtensions = useCallback((): Extension[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allExtensions: Record<string, any> = {};

    allCommands.forEach((command) => {
      if (!allExtensions[command.extension_id]) {
        allExtensions[command.extension_id] = {
          icon: command.icon,
          name: command.extension_id,
        };
      }
    });

    return Object.keys(allExtensions).map((extension) => {
      return {
        title: capitalizeFirstLetter(extension),
        icon: allExtensions[extension].icon as string,
        id: extension,
      };
    });
  }, [allCommands]);

  const getActions = useCallback((): SpotlightAction[] => {
    const commands = allCommands
      .filter((command) => {
        if (selectedExtension) {
          return command.extension_id === selectedExtension.id;
        }
        return true;
      })
      .map(
        (command: Command) =>
          ({
            title: command.name,
            description: command.description,
            icon: command.icon,
            group: SPOTLIGHT_GROUPS.COMMANDS,
            type: 'Command',
            onTrigger: () => onCommandSelect(command),
          } as SpotlightAction),
      );

    const extensions = selectedExtension
      ? []
      : getAllExtensions().map(
          (extension: Extension) =>
            ({
              title: extension.title,
              description: extension.description ?? '',
              icon: extension.icon,
              group: SPOTLIGHT_GROUPS.EXTENSIONS,
              type: 'Extension',
              onTrigger: () => {
                selectExtension(extension);
              },
            } as SpotlightAction),
        );

    return [...extensions, ...commands];
  }, [allCommands, getAllExtensions, onCommandSelect, selectedExtension]);

  return (
    <div className={styles.mainContainer}>
      <Spotlight
        actions={getActions() ?? []}
        placeholder="Search for commands"
        withinPortal
        prefixInputComponent={
          <>
            {selectedExtension && (
              <Chip checked={false} value={selectedExtension.id} className={styles.chip}>
                <Image src={selectedExtension.icon} html_renderer />
                {selectedExtension.title}
              </Chip>
            )}
          </>
        }
        actionComponent={CustomAction}
      />
    </div>
  );
};

export default Search;
