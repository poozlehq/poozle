/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { SearchView, ExtensionSpecDataType } from '@poozle/edk';
import { open } from '@tauri-apps/api/shell';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { Issue } from '../utils';

const queryClient = new QueryClient();

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

const SearchReviewPR = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  const clipboard = useClipboard({ timeout: 500 });

  const { isLoading, data }: any = useQuery(['reviewPr', searchText], async () => {
    const response = await fetch(
      `https://api.github.com/search/issues?q=${`is:pull-request ${searchText}`} review-requested:${
        specData?.data.user_name
      }&per_page=10&sort=updated&order=desc`,
      {
        // the expected response type
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${specData?.data.api_key}`,
        },
      },
    );
    return await response.json();
  });

  const mappedResult =
    isLoading || !data
      ? []
      : data?.items?.map((issue: Issue) => ({
          id: issue.id,
          title: issue.title,
          description: `#${issue.number}`,
          icon: issue.user.avatar_url,
          // accessoryIcon: statusIcon(issue.fields.status),
          // accessoryTitle: issue.fields.status.name,
          url: issue.url,
          onTrigger: async () => {
            clipboard.copy(issue.html_url);
            await open(issue.html_url);
          },
          linkText: issue.title,
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
      <SearchReviewPR {...props} />
    </QueryClientProvider>
  );
}
