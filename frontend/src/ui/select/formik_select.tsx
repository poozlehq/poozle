/* eslint-disable @typescript-eslint/ban-types */
import { SelectProps as MantineSelectProps } from '@mantine/core';
import { FieldProps } from 'formik';
import React, { ReactElement } from 'react';

import Field from '../field/field';
import Select from './select';

interface FormikSelectProps {
  name: string;
  placeholder?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate?: any;
  label?: string;
  fast?: boolean;
  type?: string;
  onChange?: (value: string) => void;
}

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = (touched[name] && errors[name]) as any;

      const change = (value: string) => {
        onChange(value);
        if ($onChange) {
          $onChange(value);
        }
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
