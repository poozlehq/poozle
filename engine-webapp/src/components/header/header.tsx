/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Group, Title } from '@mantine/core';

import styles from './header.module.scss';

interface HeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export function Header({ title, actions }: HeaderProps) {
  return (
    <div className={styles.header}>
      <Group
        position="apart"
        align="center"
        px="md"
        className={styles.container}
      >
        <Title order={4}>{title}</Title>
        <div>{actions}</div>
      </Group>
    </div>
  );
}
