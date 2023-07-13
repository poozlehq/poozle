/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Alert,
  Loader,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import React from 'react';

import { useGetIntegrationOAuthAppsJustIds } from 'services/integration_oauth';

import { IntegrationIcon } from 'components';

import { NewIntegrationForm } from './add_integration_form';
import styles from './public_link.module.scss';
import { makeId, getConnectedAccounts } from './public_link_utils';

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

  const { data: oAuthApps, isLoading: oAuthAppsLoading } =
    useGetIntegrationOAuthAppsJustIds({
      workspaceId: link.workspaceId,
    });
  const connectedAccounts = getConnectedAccounts(link);

  if (oAuthAppsLoading) {
    return <Loader />;
  }

  const integrationsDefinitionsFinal = link.preferOAuth
    ? integrationsDefinitions.filter((id) => {
        const oAuthApp = oAuthApps.find(
          (oAuthA) =>
            oAuthA.integrationDefinitionId === id.integrationDefinitionId,
        );

        return oAuthApp ? true : false;
      })
    : integrationsDefinitions;

  if (selectedDefinitionId) {
    const integrationDefinition = integrationsDefinitionsFinal.find(
      (id) => id.integrationDefinitionId === selectedDefinitionId,
    );

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
          <Title order={5}>
            {' '}
            Connect {integrationDefinition.name} Integration
          </Title>
        </Group>
        <Divider className={styles.divider} mb="lg" />

        <NewIntegrationForm
          integrationDefinition={integrationDefinition}
          workspaceId={link.workspaceId}
          preferOAuth={link.preferOAuth}
          linkId={link.linkId}
          oAuthApp={oAuthApps.find(
            (oAuthA) => oAuthA.integrationDefinitionId === selectedDefinitionId,
          )}
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
          wrap="wrap"
        >
          {integrationsDefinitionsFinal.map((integrationDefinition) => (
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

      {link &&
        link.integrationAccounts.length > 0 &&
        Object.keys(connectedAccounts).length > 0 && (
          <div>
            <Alert color="green" m="md">
              You already have{' '}
              {Object.keys(connectedAccounts).map((account: any) => (
                <>
                  <b>
                    {connectedAccounts[account]} {account}
                  </b>{' '}
                </>
              ))}
              connected
            </Alert>
          </div>
        )}
    </div>
  );
}
