/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { SearchView, ExtensionSpecDataType } from '@poozle/edk';
import { open } from '@tauri-apps/api/shell';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { cqlFor, fields, Issue } from './utils';

const queryClient = new QueryClient();

interface CommandProps {
  specData: ExtensionSpecDataType | undefined;
  resetCommand: () => void;
}

const SearchIssue = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  const clipboard = useClipboard({ timeout: 500 });

  const { isLoading, data }: any = useQuery(['searchDocuments', searchText], async () => {
    // const client = await getHTTPApiClient();
    const response = await fetch(
      `https://${specData?.data.conflunce_domain}/wiki/rest/api/search?cql=${cqlFor(
        searchText,
      )}&fields=${fields}`,
      {
        // the expected response type
        headers: {
          'Content-Type': 'application/json',
          'X-Atlassian-Token': 'no-check',
          Authorization: `Basic ${btoa(`${specData?.data.email}:${specData?.data.api_key}`)}`,
        },
      },
    );
    return await response.json()
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
