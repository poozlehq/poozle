import * as React from 'react';

import Spotlight from 'ui/spotlight';

import { SpotlightAction } from '../../ui/spotlight/types';
import { BackButton } from './back_button';
import styles from './search_view.module.scss';

export interface SearchViewProps {
  actions: SpotlightAction[];
  CustomAction: React.FC<any>;
  placeholder: string;
}

const SearchView = ({
  actions,
  placeholder,
  CustomAction,
}: SearchViewProps): React.ReactElement => {
  return (
    <div className={styles.mainContainer}>
      <Spotlight
        actions={actions}
        placeholder={placeholder}
        withinPortal
        prefixInputComponent={<BackButton />}
        actionComponent={CustomAction}
      />
    </div>
  );
};

export { SearchView };
