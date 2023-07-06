/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { Link } from '@@generated/link/entities';
import {
  Flex,
  Paper,
  Stack,
  Title,
  Text,
  Group,
  ActionIcon,
  Divider,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import React from 'react';

import { IntegrationIcon } from 'components';

import { NewIntegrationForm } from './add_integration_form';
import styles from './public_link.module.scss';
import { makeId } from './public_link_utils';

export interface PublicLinkProps {
  link: Link;
}

interface PublicLinkInterface extends PublicLinkProps {
  integrationsDefinitions: IntegrationDefinition[];
}

export function PublicLink({
  integrationsDefinitions,
  link,
}: PublicLinkInterface) {
  const [selectedDefinitionId, setDefinitionId] = React.useState(undefined);

  if (selectedDefinitionId) {
    return (
      <div>
        <Group p="md">
          <ActionIcon
            size="sm"
            color="gray"
            onClick={() => setDefinitionId(undefined)}
          >
            <IconChevronLeft />
          </ActionIcon>
          <Title order={5}> Create Integration </Title>
        </Group>
        <Divider className={styles.divider} mb="lg" />

        <NewIntegrationForm
          integrationDefinitionId={selectedDefinitionId}
          workspaceId={link.workspaceId}
          linkId={link.linkId}
          onComplete={() => {
            setDefinitionId(undefined);
          }}
          integrationAccountNameDefault={`${link.linkName}_${makeId(5)}`}
        />
      </div>
    );
  }

  return (
    <div>
      <Group p="md">
        <Title order={5}> Select Integration </Title>
      </Group>
      <Divider className={styles.divider} />

      <div className={styles.linkContainer}>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'apart' }}
        >
          {integrationsDefinitions.map((integrationDefinition) => (
            <Paper
              withBorder
              radius="md"
              className={styles.integrationContainer}
              onClick={() =>
                setDefinitionId(integrationDefinition.integrationDefinitionId)
              }
            >
              <Stack justify="center" align="center" p="sm">
                <IntegrationIcon
                  icon={integrationDefinition.icon}
                  width={30}
                  height={30}
                />
                <Text size="sm" align="center">
                  {integrationDefinition.name}
                </Text>
              </Stack>
            </Paper>
          ))}
        </Flex>
      </div>
    </div>
  );
}
