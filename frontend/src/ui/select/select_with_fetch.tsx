import { Input, Skeleton } from '@mantine/core';

import useFetchData from '../../utils/fetch_data';
import Select, { SelectProps } from './select';

export type SelectWithFetchProps = Omit<SelectProps, 'data'> & {
  fetchDataId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

const SelectWithFetch = (props: SelectWithFetchProps) => {
  const { fetchDataId, data, ...restProps } = props;
  const { data: selectData } = useFetchData(fetchDataId, data);

  if (selectData) {
    return <Select {...restProps} data={selectData} />;
  }

  return (
    <Input.Wrapper label={restProps.label} description={restProps.description}>
      <Skeleton height={30} mt={6} width="100%" radius="xl" />
    </Input.Wrapper>
  );
};

export default SelectWithFetch;
