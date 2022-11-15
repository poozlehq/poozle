/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useDebouncedState } from '@mantine/hooks';
import { SearchView, ExtensionSpecDataType, openPath } from '@poozle/edk';
import { CustomAction } from 'components/custom_action/custom_action';
import * as queryString from 'query-string';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { URL } from '../../constants';
import styles from './index.module.scss';

const queryClient = new QueryClient();

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

const Search = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);

  const { isLoading, data }: any = useQuery(['search', searchText, specData], async () => {
    // !nKzQUR30SM as filter to get the body
    const query = {
      intitle: searchText,
      sort: 'activity',
      order: 'desc',
      pagesize: 100,
      site: 'stackoverflow',
      filter: '!nKzQUR30SM',
    };
    const searchURL = `${URL}/search?${queryString.stringify(query)}`;
    const response = await fetch(searchURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  });

  const mappedResult =
    isLoading || !data
      ? []
      : data?.items?.map((searchResult: any) => ({
          id: searchResult.question_id,
          title: searchResult.title,
          answered: searchResult.is_answered,
          answerCount: searchResult.answer_count,
          viewCount: searchResult.view_count,
          lastActivityDate: searchResult.last_activity_date,
          body: searchResult.body,
          tags: searchResult.tags,
          onTrigger: async () => {
            openPath(searchResult.link);
          },
        }));

  return (
    <div className={styles.container}>
      <SearchView
        actions={mappedResult}
        loading={isLoading}
        CustomAction={CustomAction}
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
      <Search {...props} />
    </QueryClientProvider>
  );
}
