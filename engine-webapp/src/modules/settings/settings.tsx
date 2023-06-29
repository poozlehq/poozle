/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container, Group, Tabs } from '@mantine/core';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { Header } from 'components';

import { Account } from './account/account';
import { Integrations } from './integrations/integrations';
import { StyledTabs } from './styled_tab';
import { APIKeys } from './api_keys/api_keys';

const enum TAB_KEYS {
  'ACCOUNT' = 'ACCOUNT',
  'INTEGRATIONS' = 'INTEGRATIONS',
  'API_KEYS' = 'API_KEYS',
}

export function Settings() {
  const [currentTab, setCurrentTab] = React.useState<TAB_KEYS>(
    TAB_KEYS.ACCOUNT,
  );

  return (
    <div>
      <Header title="Settings" />
      <Container mt="xl">
        <Group position="center">
          <StyledTabs
            value={currentTab}
            onTabChange={(value: string) => setCurrentTab(value as TAB_KEYS)}
          >
            <Tabs.List>
              <Tabs.Tab value={TAB_KEYS.ACCOUNT}>Accounts</Tabs.Tab>

              <Tabs.Tab value={TAB_KEYS.INTEGRATIONS}>Integrations</Tabs.Tab>

              <Tabs.Tab value={TAB_KEYS.API_KEYS}>API Keys</Tabs.Tab>
            </Tabs.List>
          </StyledTabs>
        </Group>
      </Container>
      <Container mt="xl">
        <Group mt="xl" grow>
          {currentTab === TAB_KEYS.ACCOUNT && <Account />}
          {currentTab === TAB_KEYS.INTEGRATIONS && <Integrations />}
          {currentTab === TAB_KEYS.API_KEYS && <APIKeys />}
        </Group>
      </Container>
    </div>
  );
}

Settings.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};
