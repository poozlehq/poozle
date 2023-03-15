/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useMantineTheme } from '@mantine/core';
import { ReactElement } from 'react';

import { Logo } from 'components';

import styles from './authentication_layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export function AuthenticationLayout(props: Props): ReactElement {
  const { children } = props;
  const theme = useMantineTheme();

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: theme.other.backgroundColor,
      }}
    >
      <div className={styles.childrenContainer}>
        <div className={styles.logo}>
          <Logo width={50} height={50} />
        </div>

        {children}
      </div>
    </div>
  );
}
