import { Input as MantineInput, MantineProvider } from '@mantine/core';
import { RichTextEditor, RichTextEditorProps } from '@mantine/rte';
import { theme } from 'config';
import * as React from 'react';

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

const RTE = ({
  name,
  required,
  label,
  value,
  error,
  description,
  onChange,
}: RTEProps): React.ReactElement => {
  return (
    <MantineProvider
      theme={theme('dark')}
      inherit
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <MantineInput.Wrapper
        id={name}
        required={required}
        label={label}
        error={error}
        description={description}
      >
        <RichTextEditor value={value ?? ''} onChange={onChange} />
      </MantineInput.Wrapper>
    </MantineProvider>
  );
};

export default RTE;
