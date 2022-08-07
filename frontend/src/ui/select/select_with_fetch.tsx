import Loader from '../../components/loader/loader';

import useFetchData from '../../utils/fetch_data';

import FormikSelect, { SelectProps } from './formik_select';

export type SelectWithFetchProps = Omit<SelectProps, 'data'> & {
  fetchDataId?: string;
  data?: any;
};

function SelectWithFetch(props: SelectWithFetchProps) {
  const { fetchDataId, data } = props;
  const selectData = useFetchData(fetchDataId, data);

  if (selectData) {
    return <FormikSelect {...props} data={selectData} />;
  }

  return <Loader />;
}

export default SelectWithFetch;
