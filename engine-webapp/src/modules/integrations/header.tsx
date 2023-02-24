/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Group, Title, Button } from '@mantine/core';

import styles from './header.module.scss';

export function Header() {
  return (
    <div className={styles.header}>
      <Group sx={{ height: '100%' }} align="center" position="apart">
        <div>
          <Title order={2}>Integrations </Title>
        </div>
        <div>
          <Button> + New Integration </Button>
        </div>
      </Group>
    </div>
  );
}
