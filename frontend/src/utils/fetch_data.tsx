/* eslint-disable @typescript-eslint/no-explicit-any */
import { invoke } from '@tauri-apps/api';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { CommandContext } from '../context/command_context';
import { SpecContext } from '../context/spec_context';
import { Command, ExtensionSpecDataType } from './commands';

const useFetchData = (fetchDataId: string | undefined, defaultData?: any[], params?: any) => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);
  const currentCommand = useContext(CommandContext) as Command;
  const specData = useContext(SpecContext) as ExtensionSpecDataType;

  const getDataFromExtension = useCallback(
    async (params: any) => {
      const dataFromExtension = await invoke('fetch_data_for_id', {
        path: currentCommand.extension_path,
        fetchDataId,
        specData: JSON.stringify(specData.data),
        params: params ? JSON.stringify(params) : '',
      });

      const response = JSON.parse(dataFromExtension as string);
      const parsedData = response.record.map((record: any) => ({
        ...record,
        label: record.text,
        image: record.icon,
      }));
      setLoading(false);
      setData(parsedData);
    },
    [currentCommand.extension_path, fetchDataId, specData.data],
  );

  useEffect(() => {
    if (fetchDataId) {
      setLoading(true);
      getDataFromExtension(params);
    } else {
      setData(defaultData);
      setLoading(false);
    }
  }, [fetchDataId]);

  const refetch = (newParams: any) => {
    setLoading(true);
    getDataFromExtension(newParams);
  };

  return { data, loading, refetch };
};

export default useFetchData;
