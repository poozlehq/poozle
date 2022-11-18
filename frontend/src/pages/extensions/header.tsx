/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Button } from '@poozle/edk';
import { IconPlus } from '@tabler/icons';
import * as React from 'react';

import { BackButton } from 'components/header';

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

      <div>
        <Button variant="light" size="xs" radius="md">
          <IconPlus size={12} /> Add custom extension
        </Button>
      </div>
    </div>
  );
};
