/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { useTheme } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { Alert, Group } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { GraphiQL } from 'graphiql';
import { useRouter } from 'next/router';
import * as React from 'react';
import { UserContext } from 'store/user_context';

import { Header, Loader } from 'components';

import styles from './playground.module.scss';
import { useCreateGatewayAuthTokenMutation } from '../../queries/generated/graphql';

const GATEWAY_HOST = process.env.NEXT_PUBLIC_GATEWAY_HOST;

interface PlaygroundProps {
  token: string;
}

export function Playground({ token }: PlaygroundProps) {
  const { setTheme } = useTheme();
  const {
    query: { workspaceId },
  } = useRouter();
  const { Workspace } = React.useContext(UserContext);
  const currentWorkspace = Workspace.find(
    (workspace) => workspace.workspaceId === workspaceId,
  );
  const GatewayURL = `${GATEWAY_HOST}/${currentWorkspace.slug}/graphql`;

  const fetcher = createGraphiQLFetcher({
    url: GatewayURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    fetch,
  });

  React.useEffect(() => {
    setTheme('light');
  }, []);

  if (!fetcher) {
    return <Loader />;
  }

  return (
    <>
      {fetch && (
        <div className={styles.playground}>
          <GraphiQL fetcher={fetcher} />
        </div>
      )}
    </>
  );
}

export function PlaygroundLoader() {
  const {
    query: { workspaceId },
  } = useRouter();
  const { Workspace } = React.useContext(UserContext);
  const currentWorkspace = Workspace.find(
    (workspace) => workspace.workspaceId === workspaceId,
  );

  const [token, setToken] = React.useState(undefined);
  const [hosted, setHosted] = React.useState(undefined);
  const GatewayURL = `${process.env.NEXT_PUBLIC_GATEWAY_HOST}/${currentWorkspace.slug}/graphql`;

  const [createGatewayAuthToken] = useCreateGatewayAuthTokenMutation({
    variables: {
      workspaceId: workspaceId as string,
    },
    onCompleted: (data) => {
      setToken(data.createGatewayAccessToken.token);
    },
  });

  const checkHosting = async () => {
    try {
      const response = await fetch(GatewayURL, {
        body: JSON.stringify({
          query: 'query Sample { sample { company { name } } }',
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setHosted(true);
      } else {
        setHosted(false);
      }
    } catch (e) {
      setHosted(false);
    }
  };

  React.useEffect(() => {
    createGatewayAuthToken();
  }, []);

  React.useEffect(() => {
    if (token) {
      checkHosting();
    }
  }, [token]);

  if (!token || typeof hosted === 'undefined') {
    return (
      <>
        <Header title="Playground" />
        <Loader />;
      </>
    );
  }

  if (!hosted) {
    return (
      <>
        <Header title="Playground" />
        <Group grow p="xl">
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Sorry!"
            className={styles.alert}
            color="red"
          >
            Something terrible happened! Please reach out to us at
            support@poozle.dev
          </Alert>
        </Group>
      </>
    );
  }

  return <Playground token={token} />;
}
