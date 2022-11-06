/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Select, Input, InputBlockType } from '@poozle/edk';

import { FormBlock } from 'types/form';

export interface Props {
  block: FormBlock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputProps: Record<string, any>;
  key?: number;
}

const InputWrapper = (props: Props) => {
  const { type, name, key, description } = props.block;
  let Component: React.ReactElement | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    props.inputProps.onChange(e);
  };

  if (type === InputBlockType.SELECT) {
    Component = (
      <Select
        label={name}
        name={key}
        placeholder={description}
        required
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={props.block.data as any}
        value={props.inputProps.value}
        {...props.inputProps}
        onChange={onChange}
      />
    );
  }

  if (type === InputBlockType.INPUT) {
    Component = (
      <Input
        label={name}
        name={key}
        placeholder={description}
        required
        {...props.inputProps}
        onChange={onChange}
      />
    );
  }

  return <div key={props.key}>{Component}</div>;
};

export default InputWrapper;
