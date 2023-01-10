/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useClipboard } from '@mantine/hooks';
import {
  SearchView,
  ExtensionSpecDataType,
  getHTTPApiClient,
  ResponseType,
  Select,
  SelectItem,
} from '@poozle/edk';
import { open } from '@tauri-apps/api/shell';
import Fuse from 'fuse.js';
import * as React from 'react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import styles from '../common.module.scss';
import { Doc, Entry, Index } from '../utils';

const queryClient = new QueryClient();

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

export const DEVDOCS_BASE_URL = 'https://devdocs.io';

function useFuse<U>(
  items: U[] | undefined,
  options: Fuse.IFuseOptions<U>,
  limit: number,
): [U[], Dispatch<SetStateAction<string>>] {
  const [query, setQuery] = useState('');
  const fuse = useMemo(() => {
    return new Fuse(items || [], options);
  }, [items]);

  if (!query) {
    return [(items || []).slice(0, limit), setQuery];
  }
  const results = fuse.search(query, { limit });
  return [results.map((result) => result.item), setQuery];
}

function getFavicon(sourceLink: string) {
  const reg = /(?!w{1,3}\.)(\w+\.\w+)/g;
  const validLink = sourceLink.match(reg);
  const base_link = `https://icons.duckduckgo.com/ip3/${validLink ? validLink[0] : `x`}.ico`;

  return base_link;
}

const SearchDocs = ({ resetCommand }: CommandProps): React.ReactElement => {
  const [selectedDoc, setSelectedDoc] = React.useState<Doc | undefined>();

  const selectDocs = (): React.ReactElement => {
    const [searchValue, onSearchChange] = React.useState<string>('');

    const { isLoading, data: docs }: any = useQuery(['getDocs'], async () => {
      const client = await getHTTPApiClient();
      const result = await client.get(`${DEVDOCS_BASE_URL}/docs/docs.json`, {
        timeout: 30,
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: ResponseType.JSON,
      });
      const data = (await result.data) as Doc[];
      return Object.fromEntries(data.map((doc) => [doc.slug, doc]));
    });

    const selectResult: SelectItem[] =
      isLoading || !docs
        ? []
        : Object.entries(docs).map(([key, doc]: any) => ({
            value: key,
            image: doc.links?.home ? getFavicon(doc.links.home) : null,
            label: doc.version ? `${doc.name} ${doc.version}` : doc.name,
          }));

    return (
      <div className={styles.selectDiv}>
        <Select
          value={selectedDoc ? selectedDoc.slug : ''}
          data={selectResult}
          label=""
          placeholder="Select any Language"
          loading={isLoading}
          onSearchChange={onSearchChange}
          onChange={(slug) => (slug ? setSelectedDoc(docs[slug]) : null)}
          searchValue={searchValue}
          searchable
          nothingFound="No Options"
          defaultValue="react"
        />
      </div>
    );
  };

  const clipboard = useClipboard({ timeout: 500 });
  const { data: index, isLoading: docLoading }: any = useQuery(
    ['getDoc', selectedDoc],
    async () => {
      const client = await getHTTPApiClient();
      const response = await client.get(
        `${DEVDOCS_BASE_URL}/docs/${selectedDoc?.slug}/index.json`,
        {
          timeout: 30,
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: ResponseType.JSON,
        },
      );

      const index = (await response.data) as Index[];
      return index;
    },
  );

  const [results, setQuery] = useFuse(index?.entries, { keys: ['name', 'type'] }, 500);

  const entryResults = results as Entry[];
  const mappedResult =
    docLoading || !results
      ? []
      : entryResults?.map((entry: Entry) => ({
          id: entry.name + entry.path,
          title: entry.name,
          description: entry.type,
          url: `${DEVDOCS_BASE_URL}/${selectedDoc?.slug}/${entry.path}`,
          onTrigger: async () => {
            clipboard.copy(`${DEVDOCS_BASE_URL}/${selectedDoc?.slug}/${entry.path}`);
            await open(`${DEVDOCS_BASE_URL}/${selectedDoc?.slug}/${entry.path}`);
          },
          icon: selectedDoc?.links?.home ? getFavicon(selectedDoc?.links?.home) : null,
        }));

  return (
    <div className={styles.container}>
      <SearchView 
        actions={mappedResult}
        loading={docLoading}
        placeholder="Search Docs"
        onQuery={(e) => setQuery(e)}
        onClose={() => {
          resetCommand();
        }}
        suffixAction={selectDocs()}
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
