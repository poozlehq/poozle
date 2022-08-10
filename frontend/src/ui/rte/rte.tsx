import { Input as MantineInput } from '@mantine/core';
import { RichTextEditor, RichTextEditorProps } from '@mantine/rte';

import styles from './rte.module.scss';

type RTEProps = {
  label?: string;
  value?: string;
  name?: string;
  error?: any;
  required?: boolean;
  description?: any;
  className?: string;
} & RichTextEditorProps;

function RTE({ name, required, label, value, error, description, onChange }: RTEProps) {
  return (
    <MantineInput.Wrapper
      id={name}
      required={required}
      label={label}
      error={error}
      description={description}
      className={styles.inputWrapper}
    >
      <RichTextEditor value={value ?? ''} onChange={onChange} />
    </MantineInput.Wrapper>
  );
}

export default RTE;
