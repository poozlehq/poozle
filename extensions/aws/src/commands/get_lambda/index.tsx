/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { FunctionConfiguration, LambdaClient, ListFunctionsCommand } from '@aws-sdk/client-lambda';
import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { SearchView, ExtensionSpecDataType } from '@poozle/edk';
import { open } from '@tauri-apps/api/shell';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import styles from '../common.module.scss';
// import { Issue } from './utils';
import { AWS_URL_BASE } from '../constants';

// import CostExplorer from 'aws-sdk/clients/costexplorer'
// FunctionConfiguration,
//
const queryClient = new QueryClient();

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

const GetLambda = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  const clipboard = useClipboard({ timeout: 500 });

  async function fetchFunctions(
    specData?: ExtensionSpecDataType,
    nextMarker?: string,
    functions?: FunctionConfiguration[],
  ): Promise<FunctionConfiguration[]> {
    const { NextMarker, Functions } = await new LambdaClient({
      credentials: {
        accessKeyId: specData?.data.access_key,
        secretAccessKey: specData?.data.secret_key,
      },
      region: specData?.data.region,
    }).send(new ListFunctionsCommand({ Marker: nextMarker }));

    const combinedFunctions = [...(functions || []), ...(Functions || [])];

    if (NextMarker) {
      return fetchFunctions(specData, NextMarker, combinedFunctions);
    }

    return combinedFunctions;
  }

  const { isLoading, data }: any = useQuery(['getLambdas', searchText, specData], async () => {
    const response = fetchFunctions(specData);
    return response;
  });

  console.log(data);
  const mappedResult =
    isLoading || !data
      ? []
      : data?.map((lambdaFunction: FunctionConfiguration) => ({
          id: lambdaFunction.CodeSha256,
          title: lambdaFunction.FunctionName,
          description: lambdaFunction.Description,
          icon: null,
          url: `${AWS_URL_BASE}/lambda/home?region=${specData?.data.region}#/functions/${lambdaFunction.FunctionName}?tab=monitoring`,
          onTrigger: async () => {
            clipboard.copy(lambdaFunction.FunctionArn);
            await open(
              `${AWS_URL_BASE}/lambda/home?region=${specData?.data.region}#/functions/${lambdaFunction.FunctionName}?tab=monitoring`,
            );
          },
          linkText: lambdaFunction.FunctionName,
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
      <GetLambda {...props} />
    </QueryClientProvider>
  );
}
