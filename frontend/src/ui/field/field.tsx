import { Field as FormikField, FastField } from 'formik';

interface FieldProps {
  fast: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

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
