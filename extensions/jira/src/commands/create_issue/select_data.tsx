/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { getHTTPApiClient, ResponseType, Select, SelectItem } from '@poozle/edk';
import { useQuery } from 'react-query';

interface SelectProps {
  token: string;
  domain: string;
  path: string;
  label: string;
  placeholder: string;
  labelKey?: string;
  valueKey?: string;
  [z: string]: any;
}

export const SelectData = ({
  token,
  domain,
  label,
  placeholder,
  path,
  labelKey = '',
  valueKey = '',
  ...restProps
}: SelectProps) => {
  const { isLoading, data, isError }: any = useQuery([label], async () => {
    const client = await getHTTPApiClient();
    return await client.get(`https://${domain}${path}`, {
      // the expected response type
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      responseType: ResponseType.JSON,
    });
  });

  let selectData: SelectItem[] = [];

  if (!isLoading && !isError) {
    const arrayData = Array.isArray(data?.data) ? data?.data : data?.data.values;

    selectData = arrayData
      ? arrayData.map((record: any) => {
          return {
            label: typeof record === 'string' ? record : record[labelKey],
            value: typeof record === 'string' ? record : record[valueKey],
          };
        })
      : [];
  }

  return (
    <Select
      value=""
      data={selectData}
      label={label}
      placeholder={placeholder}
      loading={isLoading}
      {...restProps}
    />
  );
};
