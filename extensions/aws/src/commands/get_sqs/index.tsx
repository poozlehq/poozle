/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ListQueuesCommand, SQSClient } from '@aws-sdk/client-sqs';
import { useDebouncedState, useClipboard } from '@mantine/hooks';
import { SearchView, ExtensionSpecDataType } from '@poozle/edk';
import { open } from '@tauri-apps/api/shell';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import styles from '../common.module.scss';
import { AWS_URL_BASE } from '../constants';

const queryClient = new QueryClient();

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

const GetSqs = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  const clipboard = useClipboard({ timeout: 500 });

  async function fetchQueues(
    specData?: ExtensionSpecDataType,
    nextMarker?: string,
    queues?: string[],
  ): Promise<string[]> {
    const { NextToken, QueueUrls } = await new SQSClient({
      credentials: {
        accessKeyId: specData?.data.access_key,
        secretAccessKey: specData?.data.secret_key,
      },
      region: specData?.data.region,
    }).send(new ListQueuesCommand({ NextToken: nextMarker }));
    const combinedQueues = [...(queues ?? []), ...(QueueUrls ?? [])];

    if (NextToken) {
      fetchQueues(specData, NextToken, combinedQueues);
    }

    return combinedQueues;
  }

  const { isLoading, data }: any = useQuery(['getSqs', searchText, specData], async () => {
    const response = await fetchQueues(specData);
    console.log(response);
    // const a = response.json()
    const filterData = response.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase()),
    );
    return filterData;
  });

  console.log(data);
  console.log(__dirname);
  const mappedResult =
    isLoading || !data
      ? []
      : data?.map((queue: string) => ({
          id: queue,
          title: queue.slice(queue.lastIndexOf('/') + 1),
          description: null,
          icon: `https://poozle-assets.s3.ap-south-1.amazonaws.com/aws-assets/assets/Architecture-Service-Icons_07312022/Arch_App-Integration/Arch_48/Arch_Amazon-Simple-Queue-Service_48.svg`,
          url: `${AWS_URL_BASE}/sqs/v2/home?region=${
            specData?.data.region
          }#/queues/${encodeURIComponent(queue)}`,
          onTrigger: async () => {
            clipboard.copy(
              `${AWS_URL_BASE}/sqs/v2/home?region=${
                specData?.data.region
              }#/queues/${encodeURIComponent(queue)}`,
            );
            await open(
              `${AWS_URL_BASE}/sqs/v2/home?region=${
                specData?.data.region
              }#/queues/${encodeURIComponent(queue)}`,
            );
          },
          linkText: queue,
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
      <GetSqs {...props} />
    </QueryClientProvider>
  );
}
