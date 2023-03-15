/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Group, Select, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  useExtensionDefinitionsQuery,
  useUpdateWorkspaceMutation,
} from 'queries/generated/graphql';

import { NewExtensionForm } from 'modules/extension/new_extensions/new_extension_form';

import styles from './first_extension.module.scss';

export function FirstExtension() {
  const {
    query: { workspaceId },
  } = useRouter();
  const { data } = useExtensionDefinitionsQuery({
    variables: {
      workspaceId: workspaceId as string,
    },
  });
  const [updateWorkspace] = useUpdateWorkspaceMutation();

  const [selectedExtensionDefinition, setExtensionDefinition] =
    React.useState(undefined);
  const getSelectData = () => {
    if (data) {
      return data.getExtensionDefinitionsByWorkspace.map(
        (extensionDefinition) => ({
          value: extensionDefinition.extensionDefinitionId,
          label: extensionDefinition.name,
        }),
      );
    }

    return [];
  };

  return (
    <div>
      <Group mt="xl" spacing={1}>
        <Title order={1}>Set your first extension</Title>
        <Text>
          Your extension represents the API you want to talk to. You will
          connect a new extension. Common examples of extension are Shopify,
          Stripe, Github, etc.
        </Text>
      </Group>

      <div className={styles.container}>
        <div className={styles.header}>
          <Title order={6}>Let's connect your first extension</Title>
        </div>

        <Group p="md" className={styles.group}>
          <Select
            label="Extension type"
            data={getSelectData()}
            searchable
            onChange={(value: string) => setExtensionDefinition(value)}
            className={styles.integrationSelect}
          ></Select>
        </Group>

        <Group>
          {selectedExtensionDefinition && (
            <NewExtensionForm
              extensionDefinitionId={selectedExtensionDefinition}
              onComplete={() => {
                updateWorkspace({
                  variables: {
                    workspaceUpdateBody: {
                      workspaceId: workspaceId as string,
                      initialSetupComplete: true,
                    },
                  },
                });
              }}
            />
          )}
        </Group>
      </div>
    </div>
  );
}
