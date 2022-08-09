import { useForm } from '@mantine/form';
import React, { useState } from 'react';

import { SubmitButton } from '../../ui/button/button';
import InputWrapper from '../input_wrapper/input_wrapper';

import { Block } from '../../types/form';

import styles from './form.module.scss';

export type FormValues = {
  [x: string]: string;
};

export type FormHelpers = {
  setLoading: (value: boolean) => void;
};

type FormProps = {
  blocks: Block[];
  onSubmit: (values: FormValues, helpers: FormHelpers) => void;
};

export function getInputWrapperFromBlocks(blocks: Block[], form: any): React.ReactElement {
  return (
    <>
      {blocks.map((block: Block, index: number) => (
        <div className={styles.input}>
          <InputWrapper
            block={block}
            inputProps={form.getInputProps(block.element.action_id)}
            key={index}
          />
        </div>
      ))}
    </>
  );
}

function getInitialValues(blocks: Block[]) {
  let initialValues: { [x: string]: any } = {};

  blocks.map((block) => {
    initialValues[block.element.action_id] = '';
  });

  return initialValues;
}

function Form({ blocks, onSubmit }: FormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: getInitialValues(blocks),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        setLoading(true);
        onSubmit(values, { setLoading });
      })}
    >
      {getInputWrapperFromBlocks(blocks, form)}
      <div className={styles.actions}>
        <SubmitButton size="sm" className={styles.submitButton} loading={loading}>
          Connect
        </SubmitButton>
      </div>
    </form>
  );
}

export default Form;
