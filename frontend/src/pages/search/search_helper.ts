/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { openPath } from '@poozle/edk';

import { SpotlightAction } from 'components/spotlight/types';

export const SPOTLIGHT_GROUPS = {
  COMMANDS: 'COMMANDS',
  EXTENSIONS: 'EXTENSIONS',
};

export const DEFAULT_ACTIONS: SpotlightAction[] = [
  {
    title: 'Search Google',
    description: 'Search the text on google',
    image: 'https://raw.githubusercontent.com/poozlehq/extensions/main/icons/google.svg',
    group: SPOTLIGHT_GROUPS.COMMANDS,
    type: 'Command',
    default: true,
    onTrigger: (_action: SpotlightAction, text: string) => {
      if (text) {
        openPath(`https://google.com/search?q=${text}`);
      }
    },
  },
];
