/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Button, Group, Title } from '@mantine/core';

import styles from './header.module.scss';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className={styles.header}>
      <Group
        position="apart"
        align="center"
        px="md"
        className={styles.container}
      >
        <Title order={4}>{title}</Title>
        <Button> + New Integration </Button>
      </Group>
    </div>
  );
}
