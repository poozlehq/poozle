import { invoke } from '@tauri-apps/api';
import { useContext, useEffect, useState } from 'react';

import { Command } from './commands';
import { CommandContext } from '../context/command_context';

function useFetchData(fetchDataId: string | undefined, defaultData?: any[]) {
  const [data, setData] = useState<any>(undefined);
  const currentCommand = useContext(CommandContext) as Command;

  useEffect(() => {
    if (fetchDataId) {
      getDataFromExtension();
    } else {
      setData(defaultData);
    }
  }, [fetchDataId]);

  async function getDataFromExtension() {
    const dataFromExtension = await invoke('fetch_data_for_id', {
      path: currentCommand.extension.path,
      fetchDataId: fetchDataId,
    });

    const response = JSON.parse(dataFromExtension as string);
    const parsedData = response.record.map((record: any) => ({
      ...record,
      label: record.text,
      image: record.icon,
    }));
    setData(parsedData);
  }

  return data;
}

export default useFetchData;
