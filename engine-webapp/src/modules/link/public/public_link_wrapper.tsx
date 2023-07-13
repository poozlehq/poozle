/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Box, Paper, useMantineTheme, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconAlertCircle,
  IconAlertSmall,
  IconCheck,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { useGetLinkQuery } from 'services/link';

import { Loader } from 'components';

import { PublicLink } from './public_link';
import styles from './public_link.module.scss';

export function PublicLinkWrapper() {
  const { query } = useRouter();
  const {
    linkId,
    success,
    error: errorFromServer,
    integrationName,
    accountIdentifier,
  } = query;

  const theme = useMantineTheme();

  React.useEffect(() => {
    if (typeof success !== 'undefined') {
      if (success === 'true') {
        notifications.show({
          icon: <IconCheck />,
          title: 'Status',
          color: 'green',
          message: `${integrationName} is successfully connected`,
        });
      } else {
        notifications.show({
          icon: <IconAlertSmall />,
          title: 'Status',
          color: 'red',
          message: errorFromServer,
        });
      }
    }
  }, [success]);

  const {
    data: linkDetails,
    isLoading,
    error,
  } = useGetLinkQuery({
    linkId: linkId as string,
    accountIdentifier: accountIdentifier as string,
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

            {!isLoading && !error && linkDetails && !linkDetails.expired && (
              <PublicLink
                link={linkDetails}
                integrationsDefinitions={linkDetails.integrationDefinitions}
              />
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
