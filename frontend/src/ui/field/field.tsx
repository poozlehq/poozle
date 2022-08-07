import { Field as FormikField, FastField } from 'formik';
import React from 'react';

type FieldProps = {
  fast: boolean;
  [x: string]: any;
};

export const Field = ({ fast, children, component, ...restProps }: FieldProps) => {
  if (fast) {
    return (
      <FastField component={component} {...restProps}>
        {children}
      </FastField>
    );
  }

  return (
    <FormikField component={component} {...restProps}>
      {children}
    </FormikField>
  );
};

export default Field;
