import { useDebouncedState } from '@mantine/hooks';
import { SpotlightAction } from '@mantine/spotlight';
import { useCallback, useContext, useEffect } from 'react';

import { BackButton } from '../../components/header/header';
import Spotlight from '../../components/spotlight';
import { CommandContext } from '../../context/command_context';
import { SearchResult, Surface } from '../../types/common';
import { Command } from '../../utils/commands';
import useFetchData from '../../utils/fetch_data';
import { SearchResultComponent } from './search_result_component';

interface Props {
  searchData: Surface;
  resetCommand: () => void;
}

const SearchView = ({ searchData }: Props) => {
  const currentCommand = useContext(CommandContext) as Command;
  const [issueName, setIssueName] = useDebouncedState('', 200);
  const {
    data: selectData,
    loading,
    refetch,
  } = useFetchData(searchData.fetch_data_id, [], {
    repository_name: 'airbytehq/airbyte',
    issue_name: '',
  });

  const getActions = useCallback(() => {
    if (selectData) {
      return selectData.map(
        (searchResult: SearchResult) =>
          ({
            title: searchResult.text,
            icon: searchResult.icon,
            type: 'Result',
            onTrigger: () => {
              console.log('triggered');
            },
          } as SpotlightAction),
      );
    }

    return [];
  }, [selectData]);

  useEffect(() => {
    console.log('i am here');
    // refetch({
    //   repository_name: 'airbytehq/airbyte',
    //   issue_name: issueName,
    // });
  }, []);

  const onQuery = (query: string) => {
    setIssueName(query);
  };

  return (
    <Spotlight
      actions={getActions()}
      placeholder={currentCommand.name}
      loading={loading}
      actionComponent={SearchResultComponent}
      searchIcon={<BackButton />}
      onQuery={onQuery}
      noFilter
    />
  );
};

export default SearchView;
