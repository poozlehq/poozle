import type { SpotlightAction, SpotlightActionProps } from '@mantine/spotlight';

import * as React from 'react';
import { useState } from 'react';

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
}

function filter(_query: string, actions: SpotlightAction[]) {
  return actions;
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
}: Props) => {
  const [query, setQuery] = useState('');

  const ActionComponent = loading ? CustomActionWithLoader : actionComponent;
  const finalActions = loading ? [{ title: 'loading', onTrigger: () => null }] : actions;
  const extraParams =
    noFilter || loading
      ? {
          filter,
        }
      : {};

  return (
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

        return actions.filter((action) => action.title.toLowerCase().includes(query.toLowerCase()));
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
      onClose={function (): void {
        throw new Error('Function not implemented.');
      }}
      query={query}
      onQueryChange={function (query: string): void {
        if (onQuery) {
          onQuery(query);
        }
        setQuery(query);
      }}
      {...extraParams}
    />
  );
};

export default SpotlightComponent;
