/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Button, Container, Group, UnstyledButton } from '@mantine/core';
import * as React from 'react';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Header } from 'components';

import { Account } from './account/account';
import styles from './settings.module.scss';

const enum TAB_KEYS {
  'ACCOUNT' = 'account',
}

export function Settings() {
  const [currentTab, setCurrentTab] = React.useState<TAB_KEYS>(
    TAB_KEYS.ACCOUNT,
  );

  const getComponent = (buttonText: string, key: TAB_KEYS, active: boolean) => {
    if (active) {
      return (
        <Button
          variant="light"
          className={styles.button}
          onClick={() => setCurrentTab(key)}
        >
          {buttonText}
        </Button>
      );
    }

    return (
      <UnstyledButton
        variant="light"
        className={styles.button}
        onClick={() => setCurrentTab(key)}
      >
        {buttonText}
      </UnstyledButton>
    );
  };

  return (
    <div>
      <Header title="Settings" />

      <Container mt="xl">
        <Group spacing="md" position="center">
          {getComponent(
            'Account',
            TAB_KEYS.ACCOUNT,
            currentTab === TAB_KEYS.ACCOUNT,
          )}
        </Group>

        <Group mt="xl" grow>
          {currentTab === TAB_KEYS.ACCOUNT && <Account />}
        </Group>
      </Container>
    </div>
  );
}

Settings.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
