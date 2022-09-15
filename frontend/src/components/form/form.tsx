import { useForm } from '@mantine/form';
import React, { useState } from 'react';

import InputWrapper from 'components/input_wrapper/input_wrapper';

import { Block } from 'types/common';
import { SubmitButton } from 'ui/button/button';

import styles from './form.module.scss';

export type FormValues = Record<string, string>;

export interface FormHelpers {
  setLoading: (value: boolean) => void;
}

interface FormProps {
  blocks: Block[];
  onSubmit: (values: FormValues, helpers: FormHelpers) => void;
  submitText?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialValues: Record<string, any> = {};

  // eslint-disable-next-line array-callback-return
  blocks.map((block) => {
    initialValues[block.element.action_id] = '';
  });

  return initialValues;
}

const Form = ({ blocks, onSubmit, submitText }: FormProps) => {
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
        <SubmitButton size="sm" loading={loading}>
          {submitText ? submitText : 'Submit'}
        </SubmitButton>
      </div>
    </form>
  );
};

export default Form;
