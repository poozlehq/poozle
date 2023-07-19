/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Button } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';

import styles from './docs_button.module.scss';

export function DocsButton() {
  return (
    <Button
      leftIcon={<IconDatabase />}
      variant="filled"
      className={styles.docsButton}
    >
      Docs
    </Button>
  );
}
