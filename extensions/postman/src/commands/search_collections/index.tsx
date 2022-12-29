/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { SearchView, ExtensionSpecDataType } from '@poozle/edk';
import { open } from '@tauri-apps/api/shell';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import styles from '../common.module.scss';
import { Collection } from './utils';

const queryClient = new QueryClient();

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}
let url = `https://web.postman.co/workspace/`;

const SearchCollections = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  const clipboard = useClipboard({ timeout: 500 });

  const { isLoading, data }: any = useQuery(['searchCollections', searchText], async () => {
    const response = await fetch(`https://api.getpostman.com/collections`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': specData?.data.api_key,
      },
    });
    return await response.json();
  });

  const filterData =
    isLoading || !data
      ? []
      : data?.collections?.filter((item: Collection) =>
          item.name?.toLowerCase().includes(searchText.toLowerCase()),
        );

  url = `${url}${specData?.data.workspace_id}/collection/`;

  const mappedResult = !filterData
    ? []
    : filterData?.map((collection: Collection) => ({
        id: collection.id,
        title: collection.name,
        description: ``,
        icon: 'https://poozle-assets.s3.ap-south-1.amazonaws.com/postman-assets/postman.svg',
        // accessoryIcon: statusIcon(issue.fields.status),
        // accessoryTitle: issue.fields.status.name,
        url: url + collection.uid,
        onTrigger: async () => {
          clipboard.copy(url + collection.uid);
          await open(url + collection.uid);
        },
        linkText: collection.name,
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
      <SearchCollections {...props} />
    </QueryClientProvider>
  );
}
