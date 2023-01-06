/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useForm } from '@mantine/form';
import { useClipboard } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { Button, ExtensionSpecDataType, Input } from '@poozle/edk';
import { FormView, Select } from '@poozle/edk';
import { LoremIpsum } from 'lorem-ipsum';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import styles from './index.module.scss';

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

const LOREM_IPSUM_MAX_NUMBER = 100;

const selectData = [
  { label: 'Sentences', value: 'generateSentences' },
  { label: 'Paragraphs', value: 'generateParagraphs' },
  { label: 'Words', value: 'generateWords' },
];

const loremIpsumOptions = {
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
};

const generator = new LoremIpsum(loremIpsumOptions);

const queryClient = new QueryClient();

const GenerateLoremIpsum = ({ resetCommand }: CommandProps): React.ReactElement => {
  const form = useForm({
    initialValues: {
      type: '',
      lines: 1,
    },
  });

  type FormValues = typeof form.values;

  React.useEffect(() => {
    generateParagraphs(3);
    generateSentences(3);
    generateWords(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clipboard = useClipboard({ timeout: 500 });

  function generateParagraphs(count: number) {
    return Array.from(Array(count))
      .map(() =>
        generator.generateSentences(
          Math.floor(
            Math.random() *
              (loremIpsumOptions.sentencesPerParagraph.max -
                loremIpsumOptions.sentencesPerParagraph.min +
                1),
          ) + loremIpsumOptions.sentencesPerParagraph.min,
        ),
      )
      .join('\r\n\r\n');
  }

  function generateSentences(count: number) {
    return generator.generateSentences(count);
  }

  function generateWords(count: number) {
    return generator.generateWords(count);
  }

  const generateLoremIpsum = (values: FormValues) => {
    console.log(values);
    if (values.lines > LOREM_IPSUM_MAX_NUMBER) {
      showNotification({
        color: 'red',
        message: `Please enter a valid integer number, no more than ${LOREM_IPSUM_MAX_NUMBER}`,
      });
    }

    const response = eval(values.type)(values.lines);
    console.log(`response: ${response}`);
    clipboard.copy(response);
    showNotification({
      message: 'Copied to Clipboard 🤥',
    });
  };

  return (
    <FormView onClose={() => resetCommand()}>
      <form onSubmit={form.onSubmit((values) => generateLoremIpsum(values))}>
        <div className={styles.inputContainer}>
          <Select
            value=""
            data={selectData}
            label="Lorem Ipsum Type"
            placeholder="Select Type"
            className={styles.input}
            {...form.getInputProps('type')}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            label="lines"
            placeholder="Number of words, sentences or paragraphs (max 100)"
            className={styles.input}
            {...form.getInputProps('lines')}
          />
        </div>

        <div className={styles.inputContainer}>
          <Button size="sm" type="submit">
            Generate
          </Button>
        </div>
      </form>
    </FormView>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export, react/function-component-definition
export default function (props: CommandProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GenerateLoremIpsum {...props} />
    </QueryClientProvider>
  );
}
