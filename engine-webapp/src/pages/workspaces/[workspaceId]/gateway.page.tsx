/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Button,
  CopyButton,
  Group,
  Paper,
  Stack,
  TextInput,
  Text,
  Title,
} from '@mantine/core';
import { Prism } from '@mantine/prism';
import { useRouter } from 'next/router';
import * as React from 'react';
import { UserContext } from 'store/user_context';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { AuthGuard } from 'wrappers/auth_guard';
import { GetUserData } from 'wrappers/get_user_data';

import { Keys } from 'modules/settings/keys/keys';

import { Header } from 'components';

import styles from './gateway.module.scss';

const SAMPLE_QUERY = `
  query combined_2 {
    github {
      repository(name: "engine", owner: "poozlehq") {
        issues(first: 2) {
          nodes {
            title
            url
            author {
              login
              url
            }
          }
        }
      }
    }
  }
`;

const SAMPLE_CURL = `
  curl --location --request POST {gatewayURL} \
  --header 'Authorization: Bearer {token}' \
  --header 'Content-Type: application/json' \
  --data-raw '{"query":"query GetGithub {\n  github {\n    repository(name: \"engine\", owner: \"poozlehq\") {\n      issues(first: 2) {\n        nodes {\n          title\n        }\n      }\n    }\n  }\n\n\n}","variables":{}}'
`;

const SAMPLE_NODEJS_AXIOS = `
  var axios = require('axios');
  var data = JSON.stringify({
    query: \`query GetGithub {
    github {
      repository(name: "engine", owner: "poozlehq") {
        issues(first: 2) {
          nodes {
            title
          }
        }
      }
    }


  }\`,
    variables: {}
  });

  var config = {
    method: 'post',
    url: {gatewayURL},
    headers: { 
      'Authorization': 'Bearer {token}', 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
`;

export function Gateway() {
  const {
    query: { workspaceId },
  } = useRouter();
  const { Workspace } = React.useContext(UserContext);
  const currentWorkspace = Workspace.find(
    (workspace) => workspace.workspaceId === workspaceId,
  );

  const gatewayURL = `https://gateway.poozle.dev/${currentWorkspace.slug}/graphql`;

  return (
    <div>
      <Header title="Gateway" />
      <Stack p="md">
        <Paper withBorder p="md">
          <Title order={4} mb={0}>
            Gateway Information
          </Title>
          <Stack>
            <Group position="apart" mt="xl">
              <TextInput value={gatewayURL} className={styles.input} />
              <CopyButton value={gatewayURL}>
                {({ copied, copy }) => (
                  <Button color={copied ? 'teal' : 'primary'} onClick={copy}>
                    {copied ? 'Copied gateway URL' : 'Copy gateway URL'}
                  </Button>
                )}
              </CopyButton>
            </Group>
            <Keys />
          </Stack>
        </Paper>

        <Paper withBorder p="md" mt="xl">
          <Title order={4} mb={0}>
            How to connect to gateway
          </Title>
          <Text size="sm">
            You can connect to gateway in multiple ways. Here are some examples
            on how you can get the information from the gateway
          </Text>
          <Stack spacing="xs">
            <Title order={4} mt="xl">
              a. Using postman
            </Title>

            <Stack spacing={0} ml="lg">
              <Text size="sm">
                1. Copy the above gateway URL and use that as a URL in postman
              </Text>
              <Text size="sm">2. Generate a new API Key and copy the key</Text>
              <Text size="sm">
                3. In Postman use the key in Authorization as a Bearer token.
              </Text>
              <Text size="sm">
                4. Choose a query to pass in the body as GraphQL
              </Text>
              <Prism color="teal" language="graphql">
                {SAMPLE_QUERY}
              </Prism>

              <Text size="sm">5. Hurray !!</Text>
            </Stack>
          </Stack>

          <Stack spacing="xs">
            <Title order={4} mt="xl">
              b. Using Apollo client (Frontend: react, angular etc)
            </Title>

            <Stack spacing={0} ml="lg">
              <Text size="sm">
                You can read on how you can integrate with Apollo client
                <a
                  href="https://www.apollographql.com/docs/react/"
                  className={styles.link}
                >
                  here.
                </a>{' '}
                and then start writing the queries directly from frontend
              </Text>
            </Stack>
          </Stack>

          <Stack spacing="xs">
            <Title order={4} mt="xl">
              c. Using general cURL
            </Title>

            <Stack spacing={0} ml="lg">
              <Prism color="teal" language="bash">
                {SAMPLE_CURL}
              </Prism>
              <Text size="sm">
                You can replace the Gateway URL and the token
              </Text>
            </Stack>
          </Stack>

          <Stack spacing="xs">
            <Title order={4} mt="xl">
              d. Using NodeJS
            </Title>

            <Stack spacing={0} ml="lg">
              <Prism color="teal" language="javascript">
                {SAMPLE_NODEJS_AXIOS}
              </Prism>
              <Text size="sm">
                {' '}
                You can replace the Gateway URL and the token{' '}
              </Text>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </div>
  );
}

export default function () {
  return (
    <AuthGuard>
      <GetUserData>
        <SideBarLayout>
          <Gateway />
        </SideBarLayout>
      </GetUserData>
    </AuthGuard>
  );
}
