/** Copyright (c) 2022, Poozle, all rights reserved. **/

import type { SpotlightActionProps } from '@mantine/spotlight';

import { CustomActionWithLoader } from './CustomActionWithLoading';
import { Spotlight } from './Spotlight/Spotlight';
import { SpotlightAction } from './types';

interface Props {
  actions: SpotlightAction[];
  placeholder: string;
  query: string;
  actionComponent?: React.FC<SpotlightActionProps>;
  loading?: boolean;
  prefixInputComponent?: React.ReactNode;
  searchIcon?: React.ReactNode;
  onQuery?: (query: string) => void;
  noFilter?: boolean;
  withinPortal?: boolean;
  onClose: () => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
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
  query,
  onClose,
  onKeyPress,
  noFilter,
}: Props) => {
  const getFinalActions = () => {
    return loading ? [{ title: 'loading', onTrigger: () => null }] : actions;
  };

  const ActionComponent = loading ? CustomActionWithLoader : actionComponent;
  const finalActions = getFinalActions();
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
        return actions.filter((action) => {
          if (action.default) {
            return true;
          }
          return action.title.toLowerCase().includes(query.toLowerCase());
        });
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
      onClose={onClose}
      onKeyPress={onKeyPress}
      query={query}
      onQueryChange={function (query: string): void {
        if (onQuery) {
          onQuery(query);
        }
      }}
      {...extraParams}
    />
  );
};

export default SpotlightComponent;
