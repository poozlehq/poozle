import { Ref } from 'react';
import classnames from 'classnames';
import {
  Select as MantineSelect,
  Input as MantineInput,
  SelectProps as MSelectProps,
} from '@mantine/core';

import styles from './select.module.scss';

export type SelectProps = {
  label?: string;
  value: string;
  name?: string;
  error?: any;
  description?: any;
  ref?: Ref<HTMLInputElement>;
  onChange?: (value: string) => void;
  searchable?: boolean;
  className?: string;
} & MSelectProps;

function Select(props: SelectProps) {
  const {
    name,
    label,
    value,
    error,
    required,
    onChange: $onChange,
    ref,
    selectOnBlur = true,
    searchable = true,
    size = 'sm',
    description,
    className,
    ...restProps
  } = props;

  const onChange = (value: string) => {
    if ($onChange) $onChange(value);
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
      <MantineSelect
        ref={ref}
        size={size}
        searchable={searchable}
        selectOnBlur={selectOnBlur}
        id={name}
        value={value}
        onChange={onChange}
        className={classnames(styles.select, className)}
        {...restProps}
      />
    </MantineInput.Wrapper>
  );
}

export default Select;
