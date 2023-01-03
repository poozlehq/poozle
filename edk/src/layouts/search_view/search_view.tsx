/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { MantineProvider } from '@mantine/core';
import { defaultColorScheme, theme } from 'config';
import * as React from 'react';

import { BackButton } from './back_button';
import styles from './search_view.module.scss';
import Spotlight from './spotlight';
import { CustomAction as DefaultCustomAction } from './spotlight/CustomAction';
import { SpotlightAction } from './spotlight/types';

export interface SearchViewProps {
  actions: SpotlightAction[];
  CustomAction?: React.FC<any>;
  loading?: boolean;
  onQuery?: (query: string) => void;
  placeholder: string;
  onClose(): void;
  suffixAction?: JSX.Element;
}

const SearchView = ({
  actions,
  placeholder,
  CustomAction,
  onQuery,
  loading,
  onClose,
  suffixAction
}: SearchViewProps): React.ReactElement => {
  const ActionComponent = CustomAction ?? DefaultCustomAction;

  return (
    <MantineProvider
      theme={theme(defaultColorScheme)}
      inherit
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <div className={styles.mainContainer}>
        <Spotlight
          actions={actions}
          noFilter
          loading={loading}
          placeholder={placeholder}
          withinPortal
          prefixInputComponent={<BackButton onBack={() => onClose()} />}
          actionComponent={ActionComponent}
          onQuery={onQuery}
          onClose={onClose}
          suffixInputComponent={suffixAction}
        />
      </div>
    </MantineProvider>
  );
};

export { SearchView };
