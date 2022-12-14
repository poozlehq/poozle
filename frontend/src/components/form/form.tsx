/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useForm } from '@mantine/form';
import { SubmitButton } from '@poozle/edk';
import React, { useState } from 'react';

import InputWrapper from 'components/input_wrapper/input_wrapper';

import { FormBlock } from 'types/form';

import styles from './form.module.scss';

export type FormValues = Record<string, string>;

export interface FormHelpers {
  setLoading: (value: boolean) => void;
}

interface FormProps {
  blocks: FormBlock[];
  onSubmit: (values: FormValues, helpers: FormHelpers) => void;
  submitText?: string;
  initialValues?: FormValues;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInputWrapperFromBlocks(blocks: FormBlock[], form: any): React.ReactElement {
  return (
    <>
      {blocks.map((block: FormBlock, index: number) => (
        <div className={styles.input}>
          <InputWrapper block={block} inputProps={form.getInputProps(block.key)} key={index} />
        </div>
      ))}
    </>
  );
}

function getInitialValues(blocks: FormBlock[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialValues: Record<string, any> = {};

  // eslint-disable-next-line array-callback-return
  blocks.map((block) => {
    initialValues[block.key] = '';
  });

  return initialValues;
}

export const Form = ({ blocks, onSubmit, submitText, initialValues }: FormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: initialValues ?? getInitialValues(blocks),
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
        <SubmitButton size="sm" loading={loading}>
          {submitText ? submitText : 'Submit'}
        </SubmitButton>
      </div>
    </form>
  );
};
