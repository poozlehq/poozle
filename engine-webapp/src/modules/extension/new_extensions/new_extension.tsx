/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Container, Divider, Group, Paper, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import * as React from 'react';

import { useExtensionDefinitionsQuery } from 'queries/generated/graphql';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Header, Select } from 'components';

import styles from './new_extension.module.scss';
import { NewExtensionForm } from './new_extension_form';

export function NewExtension() {
  const {
    query: { workspaceId },
  } = useRouter();
  const { data } = useExtensionDefinitionsQuery({
    variables: {
      workspaceId: workspaceId as string,
    },
  });
  const [selectedExtensionDefinition, setExtensionDefinition] =
    React.useState(undefined);

  const getSelectData = () => {
    if (data) {
      return data.getExtensionDefinitionsByWorkspace.map(
        (extensionDefinition) => ({
          value: extensionDefinition.extensionDefinitionId,
          label: extensionDefinition.name,
          image: `${extensionDefinition.name}.svg`,
        }),
      );
    }

    return [];
  };

  return (
    <>
      <Header title="New Extension" />
      <Container>
        <Paper mt="lg" className={styles.container}>
          <Group p="md">
            <Title order={5}>Set up the extension </Title>
          </Group>
          <Divider className={styles.divider} />

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
              />
            )}
          </Group>
        </Paper>
      </Container>
    </>
  );
}

NewExtension.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
};
