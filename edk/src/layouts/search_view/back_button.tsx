/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Kbd, Tooltip, UnstyledButton } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons';
import * as React from 'react';

import styles from './back_button.module.scss';

interface Props {
  onBack?: () => void;
}

export const BackButton = ({ onBack: onBackParent }: Props): React.ReactElement => {
  const onBack = () => {
    if (onBackParent) {
      onBackParent();
    }
  };

  const backElement = (
    <div className={styles.tooltip}>
      <Kbd>Esc</Kbd> to go back <Kbd>Cmd + Esc</Kbd>
      to root search
    </div>
  );

  return (
    <div className={styles.backAction}>
      <Tooltip label={backElement} position="top">
        <UnstyledButton className={styles.iconContainer} onClick={onBack}>
          <IconArrowNarrowLeft />
        </UnstyledButton>
      </Tooltip>
    </div>
  );
};
