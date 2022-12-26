/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ActionIcon, Button, CopyButton, Tooltip } from '@mantine/core';
// import { useClipboard } from '@mantine/hooks';
import { BasicView, Input } from '@poozle/edk';
import { IconCopy, IconCheck } from '@tabler/icons';
import * as React from 'react';
import { LoremIpsum } from "lorem-ipsum";
import styles from './index.module.scss';

interface CommandProps {
  resetCommand: () => void;
}

// const LOREM_IPSUM_MAX_NUMBER = 1000;

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

export const GenerateLoremIpsum = ({ resetCommand }: CommandProps): React.ReactElement => {
  const [sentence, setSentence] = React.useState<string>('');
  const [paragraph, setParagraph] = React.useState<string>('');
  // const clipboard = useClipboard({ timeout: 500 });

  React.useEffect(() => {
    generateLoremIpsum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateParagraphs (count: number) {
    return Array.from(Array(count))
      .map(() =>
        generator.generateSentences(
          Math.floor(
            Math.random() *
              (loremIpsumOptions.sentencesPerParagraph.max - loremIpsumOptions.sentencesPerParagraph.min + 1)
          ) + loremIpsumOptions.sentencesPerParagraph.min
        )
      )
      .join("\r\n\r\n");
  };

  function generateSentences (count: number) {
    return generator.generateSentences(count);
  };

  function generateLoremIpsum() {
    const sentences = generateSentences(4) //hardcoded sentences 
    const paragraphs = generateParagraphs(3)
    setParagraph(paragraphs)
    setSentence(sentences);
    // clipboard.copy(sentences)
  }

  return (
    <BasicView onClose={() => resetCommand()}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.passwordContainer}>
            <Input
              label="Sentence"
              description="Click generate button for random sentences"
              value={sentence}
              className={styles.input}
              rightSection={
                <CopyButton value={sentence} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              }
            />
            <Input
              label="Paragraph"
              description="Click generate button for random paragraph"
              value={paragraph}
              className={styles.input}
              rightSection={
                <CopyButton value={paragraph} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              }
            />
            <div className={styles.actions}>
              <Button size="xs" onClick={() => generateLoremIpsum()}>
                {' '}
                Generate{' '}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BasicView>
  );
};
