import { Input as MantineInput } from '@mantine/core';
import { RichTextEditor, RichTextEditorProps } from '@mantine/rte';

type RTEProps = {
  label?: string;
  value?: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any;
  className?: string;
} & RichTextEditorProps;

const RTE = ({ name, required, label, value, error, description, onChange }: RTEProps) => {
  return (
    <MantineInput.Wrapper
      id={name}
      required={required}
      label={label}
      error={error}
      description={description}
    >
      <RichTextEditor value={value ?? ''} onChange={onChange} />
    </MantineInput.Wrapper>
  );
};

export default RTE;
