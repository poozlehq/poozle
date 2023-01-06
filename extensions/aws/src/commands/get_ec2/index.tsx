/** Copyright (c) 2022, Poozle, all rights reserved. **/
import { DescribeInstancesCommand, EC2Client, Instance } from '@aws-sdk/client-ec2';
import { useClipboard, useDebouncedState } from '@mantine/hooks';
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

const GetEc2 = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  const clipboard = useClipboard({ timeout: 500 });

  async function fetchEc2s(
    specData?: ExtensionSpecDataType,
    nextMarker?: string,
    accInstances?: Instance[],
  ): Promise<Instance[]> {
    const { NextToken, Reservations } = await new EC2Client({
      credentials: {
        accessKeyId: specData?.data.access_key,
        secretAccessKey: specData?.data.secret_key,
      },
      region: specData?.data.region,
    }).send(new DescribeInstancesCommand({ NextToken: nextMarker }));
    const instances = (Reservations || []).reduce<Instance[]>(
      (acc, reservation) => [...acc, ...(reservation.Instances || [])],
      [],
    );
    const combinedInstances = [...(accInstances || []), ...instances];

    if (NextToken) {
      return fetchEc2s(specData, NextToken, combinedInstances);
    }

    return combinedInstances;
  }

  const { isLoading, data }: any = useQuery(['getLambdas', searchText, specData], async () => {
    const response = await fetchEc2s(specData);
    const filterData = response.filter((item) =>
      (item.Tags ? item.Tags[0].Value : item.InstanceId)
        ?.toLowerCase()
        .includes(searchText.toLowerCase()),
    );
    return filterData;
  });

  console.log(data);
  const mappedResult =
    isLoading || !data
      ? []
      : data?.map((instance: Instance) => ({
          id: instance.InstanceId,
          title: instance.Tags ? instance.Tags[0].Value : instance.InstanceId,
          description: `Sate: ${instance.State?.Name} | Public IP: ${instance.PublicIpAddress} | Privite IP: ${instance.PrivateIpAddress}`,
          icon: `https://poozle-assets.s3.ap-south-1.amazonaws.com/aws-assets/assets/Architecture-Service-Icons_07312022/Arch_Compute/48/Arch_Amazon-EC2_48.svg`,
          url: `${AWS_URL_BASE}/ec2/v2/home?region=${specData?.data.region}#InstanceDetails:instanceId=${instance.InstanceId}`,
          onTrigger: async () => {
            clipboard.copy(instance.InstanceId);
            await open(
              `${AWS_URL_BASE}/ec2/v2/home?region=${specData?.data.region}#InstanceDetails:instanceId=${instance.InstanceId}`,
            );
          },
          linkText: instance.Tags,
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
      <GetEc2 {...props} />
    </QueryClientProvider>
  );
}
