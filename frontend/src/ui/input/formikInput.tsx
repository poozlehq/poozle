/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement } from 'react';
import { InputBaseProps as MantineInputProps } from '@mantine/core';
import { FieldProps } from 'formik';

import Input from './input';
import Field from '../field/field';

type FormikInputProps = {
  name: string;
  placeholder?: string;
  description?: string;
  validate?: any;
  label?: string;
  fast?: boolean;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputProps = FormikInputProps & MantineInputProps;

const FormikInput = React.forwardRef(
  (
    {
      name,
      validate,
      fast = true,
      onChange: $onChange,
      onBlur: $onBlur,
      label,
      required,
      ...restProps
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ): ReactElement => {
    const FieldFunctionC = (props: FieldProps): ReactElement => {
      const {
        field: { value, onChange, onBlur },
        form,
      } = props;
      const { touched, errors } = form;
      const error = (touched[name] && errors[name]) as any;

      const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        if ($onChange) $onChange(event);
      };

      const blur = (event: React.ChangeEvent<HTMLInputElement>) => {
        onBlur(event);
        $onBlur && $onBlur(event);
      };

      return (
        <Input
          ref={ref}
          required={required}
          name={name}
          value={value}
          label={label}
          error={error}
          onChange={change}
          onBlur={blur}
          {...restProps}
        />
      );
    };

    return <Field name={name} validate={validate} fast={fast} component={FieldFunctionC} />;
  },
);

export default FormikInput;
