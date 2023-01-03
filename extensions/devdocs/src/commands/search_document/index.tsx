/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useDebouncedState } from '@mantine/hooks';
import { Select, SelectItem } from '@mantine/core';
import { SearchView, ExtensionSpecDataType, getHTTPApiClient, ResponseType } from '@poozle/edk';
// import { open } from '@tauri-apps/api/shell';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import styles from '../common.module.scss';
import { resolveConfig } from 'prettier';
import { entry } from '../utils';

const queryClient = new QueryClient();

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

export const DEVDOCS_BASE_URL = "https://devdocs.io";


const SearchDocs = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  // const [searchValue, onSearchChange] = React.useState<string>('');
  // const clipboard = useClipboard({ timeout: 500 });

  const { isLoading, data }: any = useQuery(['searchDocs', searchText, specData], async () => {
    // const { data: docs, isLoading: docLoading } = useFetch<Record<string, Doc>>(`${DEVDOCS_BASE_URL}/docs/docs.json`, {
    //   parseResponse: async (response) => {
    //     const payload = (await response.json()) as Doc[];
    //     return Object.fromEntries(payload.map((doc) => [doc.slug, doc]));
    //   },
    // });
    // const response = await fetch(
    //   `${DEVDOCS_BASE_URL}/docs/docs.json`,
    // );
    // return await response.json();
    const client = await getHTTPApiClient();

    const x = await client.get(
      `${DEVDOCS_BASE_URL}/docs/docs.json`,
      {
        timeout: 30,
        // the expected response type
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: ResponseType.JSON,
      },
    );
    console.log(`x:${x}`)

    return await x
  });

  const mappedResult =
    isLoading || !data
      ? [] : []
      // : data?.items?.map((issue: Issue) => ({
      //     id: issue.id,
      //     title: issue.title,
      //     description: `#${issue.number}`,
      //     icon: issue.user.avatar_url,
      //     // accessoryIcon: statusIcon(issue.fields.status),
      //     // accessoryTitle: issue.fields.status.name,
      //     url: issue.url,
      //     onTrigger: async () => {
      //       clipboard.copy(issue.html_url);
      //       await open(issue.html_url);
      //     },
      //     linkText: issue.title,
      //   }));

  // const actionComponent =   (<div className="filters">


  const fetchPosts = async (): Promise<entry[]> => {
    const client = await getHTTPApiClient();
    const result = await client.get(
      `${DEVDOCS_BASE_URL}/docs/docs.json`,
      {
        timeout: 30,
        // the expected response type
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: ResponseType.JSON,
      },
    );
  
    // const 
    return []
  };

  console.log(fetchPosts)


  async function Demo(){
    const [searchValue, onSearchChange] = React.useState<string>('');

    return (
      <Select
        searchable
        onSearchChange={onSearchChange}
        searchValue={searchValue}
        nothingFound="No options"
        placeholder="Select One"
        data={fetchPosts}
      />
    );
  }

  return (
    <div className={styles.container}>
      <SearchView
        actions={mappedResult}
        loading={isLoading}
        placeholder="Search Docs"
        onQuery={(e) => setSearchText(e)}
        onClose={() => {
          resetCommand();
        }}
        suffixAction={Demo()}
      />
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export, react/function-component-definition
export default function (props: CommandProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchDocs {...props} />
    </QueryClientProvider>
  );
}
