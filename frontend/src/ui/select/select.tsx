/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select as MantineSelect,
  Input as MantineInput,
  SelectProps as MSelectProps,
  Group,
  Text,
  Avatar,
} from '@mantine/core';
import classnames from 'classnames';
import { forwardRef, Ref } from 'react';

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

const Select = (props: SelectProps) => {
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
    if ($onChange) {
      $onChange(value);
    }
  };

  const SelectItem = forwardRef<HTMLDivElement, any>(
    ({ image, label, description, ...others }: any, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} size="xs" />

          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    ),
  );

  return (
    <MantineInput.Wrapper
      id={name}
      required={required}
      label={label}
      error={error}
      description={description}
    >
      <MantineSelect
        ref={ref}
        size={size}
        searchable={searchable}
        itemComponent={SelectItem}
        selectOnBlur={selectOnBlur}
        id={name}
        value={value}
        onChange={onChange}
        className={classnames(styles.select, className)}
        {...restProps}
      />
    </MantineInput.Wrapper>
  );
};

export default Select;
