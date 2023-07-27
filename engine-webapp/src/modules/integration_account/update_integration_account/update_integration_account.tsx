/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Group, Paper, Stack, Tabs, Text } from '@mantine/core';
import { IconBox, IconLine, IconSettings } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { showDateInUI } from 'utils';
import { isSyncEnabled } from 'utils/sync';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { useGetIntegrationAccountQuery } from 'services/integration_account';

import { Header, IntegrationIcon, IntegrationType, Loader } from 'components';

import { Data } from './data';
import { Settings } from './settings';
import styles from './update_integration_account.module.scss';
import { UpdateIntegrationForm } from './update_integration_account_form';

export function UpdateIntegration() {
  const {
    query: { integrationAccountId },
  } = useRouter();

  const {
    data: integrationAccount,
    isLoading,
    refetch,
  } = useGetIntegrationAccountQuery({
    integrationAccountId: integrationAccountId as string,
  });

  if (isLoading || !integrationAccount) {
    return <Loader />;
  }

  return (
    <>
      <Header
        title={
          <Group align="center">
            <Text>{integrationAccount.integrationAccountName}</Text>
            <IntegrationType
              type={integrationAccount.integrationDefinition.integrationType}
            />
            <IntegrationIcon
              icon={integrationAccount.integrationDefinition.icon}
              height={20}
              width={20}
            />
          </Group>
        }
        description="Manage the integration account"
        actions={
          <Text size="sm" color="gray">
            Connected {showDateInUI(integrationAccount.createdAt)}
          </Text>
        }
      />
      <Stack>
        <Tabs defaultValue="overview" pt="lg" px="xl">
          <Tabs.List className={styles.tabList} mb="xl">
            <Tabs.Tab
              className={styles.tab}
              icon={<IconLine size="1.25rem" />}
              value="overview"
            >
              Overview
            </Tabs.Tab>

            {isSyncEnabled(
              integrationAccount.integrationDefinition.integrationType,
            ) && (
              <Tabs.Tab
                className={styles.tab}
                icon={<IconBox size="1.25rem" />}
                value="data"
              >
                Data
              </Tabs.Tab>
            )}

            <Tabs.Tab
              className={styles.tab}
              icon={<IconSettings size="1.25rem" />}
              value="settings"
            >
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview">
            <Paper className={styles.container}>
              <UpdateIntegrationForm
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                integrationAccount={integrationAccount as any}
                onComplete={() => {
                  refetch();
                }}
              />
            </Paper>
          </Tabs.Panel>

          {isSyncEnabled(
            integrationAccount.integrationDefinition.integrationType,
          ) && (
            <Tabs.Panel value="data">
              <Data integrationAccount={integrationAccount} />
            </Tabs.Panel>
          )}

          <Tabs.Panel value="settings">
            <Settings
              integrationAccount={integrationAccount}
              refetch={refetch}
            />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </>
  );
}

UpdateIntegration.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};
