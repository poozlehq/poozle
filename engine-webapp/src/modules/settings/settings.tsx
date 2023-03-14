/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Button, Container, Group } from '@mantine/core';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Header } from 'components';

import { Account } from './account/account';
import styles from './settings.module.scss';

export function Settings() {
  return (
    <div>
      <Header title="Settings" />

      <Container mt="xl">
        <Group spacing="md" position="center">
          <Button variant="light" className={styles.button}>
            Account
          </Button>
          {/* <UnstyledButton className={styles.button}>Extensions</UnstyledButton> */}
        </Group>

        <Group mt="xl" grow>
          <Account />
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
