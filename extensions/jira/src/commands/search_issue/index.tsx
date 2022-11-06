/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { SearchView, getHTTPApiClient, ResponseType, ExtensionSpecDataType } from '@poozle/edk';
import { open } from '@tauri-apps/api/shell';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { jqlFor, fields, Issue } from './utils';

const queryClient = new QueryClient();

interface CommandProps {
  specData: ExtensionSpecDataType | undefined;
  resetCommand: () => void;
}

const SearchIssue = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  const clipboard = useClipboard({ timeout: 500 });

  const { isLoading, data }: any = useQuery(['searchIssues', searchText], async () => {
    const client = await getHTTPApiClient();
    return await client.get(
      `https://${specData?.data.jira_domain}/rest/api/3/search?jql=${jqlFor(
        searchText,
      )}&fields=${fields}`,
      {
        timeout: 30,
        // the expected response type
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${specData?.data.email}:${specData?.data.api_key}`)}`,
        },
        responseType: ResponseType.JSON,
      },
    );
  });

  const mappedResult =
    isLoading || !data
      ? []
      : data?.data?.issues.map((issue: Issue) => ({
          id: issue.id,
          title: issue.fields.summary,
          description: `${issue.key} · ${issue.fields.issuetype.name}`,
          icon: issue.fields.issuetype.iconUrl,
          // accessoryIcon: statusIcon(issue.fields.status),
          accessoryTitle: issue.fields.status.name,
          url: `https://${specData?.data.jira_domain}/browse/${issue.key}`,
          onTrigger: async () => {
            clipboard.copy(`https://${specData?.data.jira_domain}/browse/${issue.key}`);
            await open(`https://${specData?.data.jira_domain}/browse/${issue.key}`);
          },
          linkText: `${issue.key}: ${issue.fields.summary}`,
        }));

  return (
    <div>
      <SearchView
        actions={mappedResult}
        loading={isLoading}
        placeholder=""
        onQuery={(e) => setSearchText(e)}
        onClose={() => {
          resetCommand();
        }}
      />
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export, react/function-component-definition
export default function (props: CommandProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchIssue {...props} />
    </QueryClientProvider>
  );
}
