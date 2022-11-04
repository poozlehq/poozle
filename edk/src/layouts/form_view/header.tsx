import * as React from 'react';

import { BackButton } from '../search_view/back_button';
import styles from './header.module.scss';

interface HeaderProps {
  onClose: () => void;
}

export const Header = ({ onClose }: HeaderProps): React.ReactElement => {
  return (
    <div className={styles.header}>
      <div>
        <BackButton onBack={() => onClose()} />
      </div>
    </div>
  );
};
