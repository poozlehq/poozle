/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Chip } from '@mantine/core';
import { SpotlightAction } from '@mantine/spotlight';
import { Image } from '@poozle/edk';
import { appWindow, WebviewWindow } from '@tauri-apps/api/window';
import { useCallback, useEffect, useState } from 'react';
import { useSegmentPage } from 'react-segment-analytics';

import { Footer } from 'components/footer';
import Spotlight from 'components/spotlight';
import { CustomAction } from 'components/spotlight/CustomAction';

import { registerAppWindow } from 'utils/application';
import { capitalizeFirstLetter } from 'utils/common';

import { Command } from 'types/common';

import styles from './search.module.scss';
import { DEFAULT_ACTIONS, SPOTLIGHT_GROUPS } from './search_helper';
import { useHotkeys } from '@mantine/hooks';

interface Extension {
  title: string;
  icon: string;
  description?: string;
  id: string;
}

interface Props {
  onCommandSelect: (command: Command) => void;
  commands: Command[];
}

export const Search = ({ onCommandSelect, commands: allCommands }: Props) => {
  const [selectedExtension, selectExtension] = useState<Extension | undefined>(undefined);
  const [query, setQuery] = useState('');
  const page = useSegmentPage();

  useHotkeys([
    [
      'Esc',
      () => {
        console.log('here');
        if (selectedExtension) {
          selectExtension(undefined);
        } else {
          appWindow.hide();
        }
      },
    ],
  ]);

  useEffect(() => {
    page('Command Search Page');
  }, [page]);

  // TODO (harshith) move these into services
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

    return [...extensions, ...commands, ...DEFAULT_ACTIONS];
  }, [allCommands, getAllExtensions, onCommandSelect, selectedExtension]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <Spotlight
          actions={getActions() ?? []}
          query={query}
          onQuery={(query: string) => setQuery(query)}
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
        <Footer />
      </div>
    </div>
  );
};
