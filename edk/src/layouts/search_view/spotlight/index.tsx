/** Copyright (c) 2022, Poozle, all rights reserved. **/

import type { SpotlightAction, SpotlightActionProps } from '@mantine/spotlight';

import { MantineProvider } from '@mantine/core';
import { WebviewWindow } from '@tauri-apps/api/window';
import { defaultColorScheme, theme } from 'config';
import * as React from 'react';
import { useState } from 'react';
import { registerAppWindow } from 'utils/app_window';

import { CustomActionWithLoader } from './CustomActionWithLoading';
import { Spotlight } from './Spotlight/Spotlight';

interface Props {
  actions: SpotlightAction[];
  placeholder: string;
  actionComponent?: React.FC<SpotlightActionProps>;
  loading?: boolean;
  prefixInputComponent?: React.ReactNode;
  searchIcon?: React.ReactNode;
  onQuery?: (query: string) => void;
  noFilter?: boolean;
  withinPortal?: boolean;
  onClose(): void;
}

function filter(_query: string, actions: SpotlightAction[]) {
  return actions ?? [];
}

const SpotlightComponent = ({
  actions,
  placeholder,
  actionComponent,
  loading,
  searchIcon,
  prefixInputComponent,
  onQuery,
  noFilter,
  onClose,
}: Props) => {
  const [query, setQuery] = useState('');

  const close = React.useCallback(
    (_appWindow: WebviewWindow) => {
      // TODO (harshith) This will not call the onQuerychange thus the data won't change
      if (query) {
        setQuery('');
      } else {
        // eslint-disable-next-line no-lonely-if
        if (onClose) {
          onClose();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query],
  );

  React.useEffect(() => {
    // This ensure the behaviour of the ESC functionality
    registerAppWindow(close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const ActionComponent = loading ? CustomActionWithLoader : actionComponent;
  const finalActions = loading ? [{ title: 'loading', onTrigger: () => null }] : actions;
  const extraParams =
    noFilter || loading
      ? {
          filter,
        }
      : {};

  return (
    <MantineProvider
      theme={theme(defaultColorScheme)}
      inherit
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <Spotlight
        actions={finalActions}
        searchPlaceholder={placeholder}
        transitionDuration={0}
        withinPortal
        nothingFoundMessage="Nothing found..."
        filter={(query, actions) => {
          if (loading) {
            return actions;
          }

          return actions.filter((action) =>
            action.title.toLowerCase().includes(query.toLowerCase()),
          );
        }}
        maxWidth={800}
        topOffset={0}
        opened
        overlayBlur={0}
        actionComponent={ActionComponent}
        closeOnActionTrigger={false}
        overlayOpacity={0}
        centered={false}
        searchIcon={searchIcon}
        prefixInputComponent={prefixInputComponent}
        onClose={() => null}
        query={query}
        onQueryChange={function (query: string): void {
          if (onQuery) {
            onQuery(query);
          }
          setQuery(query);
        }}
        {...extraParams}
      />
    </MantineProvider>
  );
};

export default SpotlightComponent;
