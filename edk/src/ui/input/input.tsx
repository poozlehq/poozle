import { Input as MantineInput, InputBaseProps } from '@mantine/core';
import classnames from 'classnames';
import { Ref } from 'react';
import * as React from 'react';

import styles from './input.module.scss';

type InputProps = {
  label?: string;
  value?: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any;
  ref?: Ref<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} & InputBaseProps;

const Input = (props: InputProps): React.ReactElement => {
  const {
    name,
    label,
    value,
    error,
    required,
    onChange: $onChange,
    onBlur: $onBlur,
    ref,
    size = 'sm',
    description,
    placeholder,
    className,
    ...restProps
  } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ($onChange) {
      $onChange(event);
    }
  };
  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ($onBlur) {
      $onBlur(event);
    }
  };

  return (
    <MantineInput.Wrapper
      id={name}
      required={required}
      label={label}
      error={error}
      description={description}
      className={styles.inputWrapper}
    >
      <MantineInput
        ref={ref}
        size={size}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={classnames(styles.input, className)}
        {...restProps}
      />
    </MantineInput.Wrapper>
  );
};

export { Input };
