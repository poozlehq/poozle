/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Box, Paper, useMantineTheme, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useGetIntegrationDefinitionsQuery } from 'services/integration_definition';
import { useGetLinkQuery } from 'services/link';

import { Loader } from 'components';

import { PublicLink, PublicLinkProps } from './public_link';
import styles from './public_link.module.scss';

export function PublicLinkIntegrationDefinitions({ link }: PublicLinkProps) {
  const { data: integrationDefinitions, isLoading } =
    useGetIntegrationDefinitionsQuery({
      workspaceId: link.workspaceId,
      category: link.category,
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PublicLink link={link} integrationsDefinitions={integrationDefinitions} />
  );
}

export function PublicLinkWrapper() {
  const { query } = useRouter();
  const { linkId } = query;

  const theme = useMantineTheme();

  const {
    data: linkDetails,
    isLoading,
    error,
  } = useGetLinkQuery({
    linkId: linkId as string,
  });

  if (!linkId || error) {
    return <Loader />;
  }

  return (
    <div
      className={styles.mainContainer}
      style={{
        backgroundColor: theme.other.backgroundColor,
      }}
    >
      <div className={styles.childrenContainer}>
        <Box
          sx={{
            paddingTop: 0,
            maxWidth: '100%',
            minWidth: '200px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Paper withBorder radius="md" className={styles.paper}>
            {isLoading && <Loader />}

            {error && (
              <Alert
                color="red"
                mt="md"
                icon={<IconAlertCircle size="1rem" />}
                title="Error!"
              >
                {error.message}
              </Alert>
            )}

            {!isLoading &&
              !error &&
              linkDetails &&
              !linkDetails.expired &&
              linkDetails && (
                <PublicLinkIntegrationDefinitions link={linkDetails} />
              )}

            {!isLoading && !error && linkDetails && linkDetails.expired && (
              <Alert
                color="red"
                m="md"
                icon={<IconAlertCircle size="1rem" />}
                title="Error!"
              >
                Link is expired
              </Alert>
            )}

            <div className={styles.footer}>
              <Text size="sm"> Integrate Fast. </Text>
              <div>
                <Image src="/logo.svg" alt="logo" width={60} height={40} />
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  );
}
