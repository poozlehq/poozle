import { Input, Skeleton } from '@mantine/core';

import useFetchData from '../../utils/fetch_data';

import Select, { SelectProps } from './select';

import styles from './select.module.scss';

export type SelectWithFetchProps = Omit<SelectProps, 'data'> & {
  fetchDataId?: string;
  data?: any;
};

function SelectWithFetch(props: SelectWithFetchProps) {
  const { fetchDataId, data, ...restProps } = props;
  const selectData = useFetchData(fetchDataId, data);

  if (selectData) {
    return <Select {...restProps} data={selectData} />;
  }

  return (
    <Input.Wrapper label={restProps.label} description={restProps.description}>
      <Skeleton height={30} mt={6} width="100%" radius="xl" className={styles.skeleton} />
    </Input.Wrapper>
  );
}

export default SelectWithFetch;
