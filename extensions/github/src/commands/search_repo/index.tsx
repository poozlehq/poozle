/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { SearchView, ExtensionSpecDataType } from '@poozle/edk';
import { open } from '@tauri-apps/api/shell';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import styles from '../common.module.scss';
import { Repo } from '../utils';

const queryClient = new QueryClient();

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

const SearchRepo = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  const clipboard = useClipboard({ timeout: 500 });

  const { isLoading, data }: any = useQuery(['searchRepo', searchText, specData], async () => {
    const response = await fetch(
      ` https://api.github.com/search/repositories?q=${searchText}&order=desc&per_page=10`,
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

  console.log(data);

  const mappedResult =
    isLoading || !data
      ? []
      : data?.items?.map((repo: Repo) => ({
          id: repo.id,
          title: repo.name,
          description: `#${repo.full_name}`,
          icon: repo.owner.avatar_url,
          // accessoryIcon: statusIcon(issue.fields.status),
          // accessoryTitle: issue.fields.status.name,
          url: repo.html_url,
          onTrigger: async () => {
            clipboard.copy(repo.html_url);
            await open(repo.html_url);
          },
          linkText: repo.name,
        }));

  return (
    <div className={styles.container}>
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
      <SearchRepo {...props} />
    </QueryClientProvider>
  );
}
