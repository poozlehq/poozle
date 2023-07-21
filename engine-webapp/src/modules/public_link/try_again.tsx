/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Box, Button, Group, Paper, useMantineTheme } from '@mantine/core';

import styles from './public_link.module.scss';

interface TryAgainProps {
  retry: () => void;
}

export function TryAgain({ retry }: TryAgainProps) {
  const theme = useMantineTheme();

  return (
    <div
      className={styles.mainContainer}
      style={{
        backgroundColor: theme.other.backgroundColor,
      }}
    >
      <Box
        sx={{
          paddingTop: 0,
          maxWidth: '100%',
          minWidth: '200px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Paper withBorder radius="md" m="xl" p="xl" className={styles.paper}>
          <Group
            align="center"
            position="center"
            className={styles.retryContainer}
          >
            <Button onClick={retry}> Try again </Button>
          </Group>
        </Paper>
      </Box>
    </div>
  );
}
