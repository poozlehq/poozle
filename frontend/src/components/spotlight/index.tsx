import type { SpotlightAction, SpotlightActionProps } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons';
import { useState } from 'react';

import { Spotlight } from './Spotlight/Spotlight';
import { CustomAction } from './CustomAction';

type Props = {
  actions: SpotlightAction[];
};

function SpotlightComponent({ actions }: Props) {
  const [query, setQuery] = useState('');

  return (
    <Spotlight
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search for commands"
      transitionDuration={0}
      nothingFoundMessage="Nothing found..."
      maxWidth={800}
      topOffset={0}
      opened
      overlayBlur={0}
      actionComponent={CustomAction}
      closeOnActionTrigger={false}
      overlayOpacity={0}
      centered={false}
      onClose={function (): void {
        throw new Error('Function not implemented.');
      }}
      query={query}
      onQueryChange={function (query: string): void {
        setQuery(query);
      }}
    />
  );
}

export default SpotlightComponent;
