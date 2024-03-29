/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Tabs } from '@mantine/core';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { Header } from 'components';

import { Account } from './account/account';
import { APIKeys } from './api_keys/api_keys';
import { Integrations } from './integrations/integrations';
import styles from './settings.module.scss';

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
      <Header
        title="Settings"
        description="Integration and authentication management"
      />

      <Tabs
        value={currentTab}
        onTabChange={(value: string) => setCurrentTab(value as TAB_KEYS)}
        pt="lg"
        px="xl"
      >
        <Tabs.List className={styles.tabList}>
          <Tabs.Tab className={styles.tab} value={TAB_KEYS.ACCOUNT}>
            Accounts
          </Tabs.Tab>

          <Tabs.Tab className={styles.tab} value={TAB_KEYS.INTEGRATIONS}>
            Integrations
          </Tabs.Tab>

          <Tabs.Tab className={styles.tab} value={TAB_KEYS.API_KEYS}>
            API Keys
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TAB_KEYS.ACCOUNT}>
          <Account />
        </Tabs.Panel>

        <Tabs.Panel value={TAB_KEYS.INTEGRATIONS}>
          <Integrations />
        </Tabs.Panel>

        <Tabs.Panel value={TAB_KEYS.API_KEYS}>
          <APIKeys />
        </Tabs.Panel>
      </Tabs>
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
