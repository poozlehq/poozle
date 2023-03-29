/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Group,
  Paper,
  Title,
  Text,
  Stack,
  Button,
  TextInput,
  CopyButton,
} from '@mantine/core';
import { useRouter } from 'next/router';
import * as React from 'react';

import { useCreateGatewayAuthTokenMutation } from 'queries/generated/graphql';

import styles from './keys.module.scss';

export function Keys() {
  const {
    query: { workspaceId },
  } = useRouter();
  const [createGatewayAuthToken] = useCreateGatewayAuthTokenMutation();
  const [token, setToken] = React.useState(undefined);

  const onCreate = () => {
    createGatewayAuthToken({
      variables: {
        workspaceId: workspaceId as string,
      },
      onCompleted: (data) => {
        setToken(data.createGatewayAccessToken.token);
      },
    });
  };

  return (
    <Paper>
      <div>
        <Title order={5}>API Keys</Title>
      </div>

      <Stack mt="xs">
        <Text color="gray" size="sm">
          We generate token using the JWT Secret. Thus we are not storing any
          tokens in the database. You can generate new token and please don't
          share that with anyone.
        </Text>

        <Group position="left">
          <Button onClick={onCreate}>Create new token</Button>
        </Group>

        {token && (
          <Group position="apart" mt="xl">
            <TextInput value={token} className={styles.input} />
            <CopyButton value={token}>
              {({ copied, copy }) => (
                <Button color={copied ? 'teal' : 'primary'} onClick={copy}>
                  {copied ? 'Copied token' : 'Copy token'}
                </Button>
              )}
            </CopyButton>
          </Group>
        )}
      </Stack>
    </Paper>
  );
}
