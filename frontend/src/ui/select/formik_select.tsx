/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement } from 'react';
import { SelectProps as MantineSelectProps } from '@mantine/core';
import { FieldProps } from 'formik';

import Select from './select';
import Field from '../field/field';
import useFetchData from '../../utils/fetch_data';
import Loader from '../../components/loader/loader';

type FormikSelectProps = {
  name: string;
  placeholder?: string;
  description?: string;
  validate?: any;
  label?: string;
  fast?: boolean;
  type?: string;
  onChange?: (value: string) => void;
};

export type SelectProps = FormikSelectProps & MantineSelectProps;

const FormikSelect = React.forwardRef(
  (
    {
      name,
      validate,
      fast = false,
      onChange: $onChange,
      label,
      required,
      ...restProps
    }: SelectProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ): ReactElement => {
    const FieldFunctionC = (props: FieldProps): ReactElement => {
      const {
        field: { value, onChange },
        form,
      } = props;
      const { touched, errors } = form;
      const error = (touched[name] && errors[name]) as any;

      const change = (value: string) => {
        console.log(value);
        onChange(value);
        if ($onChange) $onChange(value);
      };

      return (
        <Select
          ref={ref}
          required={required}
          name={name}
          value={value}
          label={label}
          error={error}
          onChange={change}
          {...restProps}
        />
      );
    };

    return <Field name={name} validate={validate} fast={fast} component={FieldFunctionC} />;
  },
);

export default FormikSelect;
