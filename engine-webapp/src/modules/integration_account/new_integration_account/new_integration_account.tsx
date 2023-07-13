/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { Divider, Group, Paper, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

import { useGetIntegrationDefinitionsQuery } from 'services/integration_definition/get_integration_definitions';

import { Header, Select } from 'components';

import styles from './new_integration_account.module.scss';
import { NewIntegrationForm } from './new_integration_account_form';

export function NewIntegration() {
  const {
    query: { workspaceId },
  } = useRouter();
  const { data: integrationDefinitions } = useGetIntegrationDefinitionsQuery({
    workspaceId: workspaceId as string,
  });
  const [selectedIntegrationDefinition, setIntegrationDefinition] =
    React.useState(undefined);

  const getSelectData = () => {
    if (integrationDefinitions) {
      return integrationDefinitions.map(
        (integrationDefinition: IntegrationDefinition) => ({
          value: integrationDefinition.integrationDefinitionId,
          label: integrationDefinition.name,
          image: integrationDefinition.icon,
        }),
      );
    }

    return [];
  };

  return (
    <>
      <Header title="New Integration Account" showBack />

      <Paper m="xl" className={styles.container}>
        <Group p="md">
          <Title order={5}>Set up the integration </Title>
        </Group>
        <Divider className={styles.divider} />

        <Group p="md" className={styles.group}>
          <Select
            label="Integration type"
            data={getSelectData()}
            searchable
            onChange={(value: string) => setIntegrationDefinition(value)}
            className={styles.integrationSelect}
          ></Select>
        </Group>

        <Group>
          {selectedIntegrationDefinition && (
            <NewIntegrationForm
              integrationDefinitionId={selectedIntegrationDefinition}
              workspaceId={workspaceId as string}
            />
          )}
        </Group>
      </Paper>
    </>
  );
}

NewIntegration.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};
