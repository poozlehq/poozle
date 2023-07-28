/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import * as React from 'react';

import { NewIntegrationForm } from 'modules/integration_account/new_integration_account/new_integration_account_form';

import { useGetIntegrationDefinitionsQuery } from 'services/integration_definition';

import { Select } from 'components';

import styles from './first_integration.module.scss';

export function FirstIntegration() {
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
      return integrationDefinitions.map((integrationDefinition) => ({
        value: integrationDefinition.integrationDefinitionId,
        label: integrationDefinition.name,
        image: integrationDefinition.icon,
      }));
    }

    return [];
  };

  return (
    <div>
      <Group mt="xl" spacing={1}>
        <Title order={1}>👋 Welcome to Poozle! </Title>
        <Text>
          Set your first integration. Integration represents the API you want to
          talk to. You will connect a new integration. Common examples of
          integration are Shopify, Stripe, Github, etc.
        </Text>
      </Group>

      <div className={styles.container}>
        <div className={styles.header}>
          <Title order={6}>Let's connect your first integration</Title>
        </div>

        <Group p="md" className={styles.group}>
          <Select
            label="Integration type"
            data={getSelectData()}
            searchable
            onChange={(value: string) => setIntegrationDefinition(value)}
            className={styles.integrationSelect}
          />
        </Group>

        <Group>
          {selectedIntegrationDefinition && (
            <NewIntegrationForm
              integrationDefinition={integrationDefinitions.find(
                (id) =>
                  id.integrationDefinitionId === selectedIntegrationDefinition,
              )}
              workspaceId={workspaceId as string}
              onComplete={() => {
                // TODO (harshith): Change the status in workspace
                console.log('completed');
              }}
            />
          )}
        </Group>
      </div>
    </div>
  );
}
