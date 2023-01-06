/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ActionIcon, Button, CopyButton, Tooltip, JsonInput, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { BasicView } from '@poozle/edk';
import { IconCopy, IconCheck } from '@tabler/icons';
import * as React from 'react';

import styles from './index.module.scss';

interface CommandProps {
  resetCommand: () => void;
}

export const JsonStringConverter = ({ resetCommand }: CommandProps): React.ReactElement => {
  const [vJson, setVjson] = React.useState<string>('');
  const [vString, setVstring] = React.useState<string>('');

  const convertToString = React.useCallback(() => {
    setVstring(JSON.stringify(vJson));
  }, [vJson]);

  const convertToJson = React.useCallback(() => {
    try {
      setVjson(JSON.parse(vString));
    } catch (e) {
      console.log('here');
      showNotification({ message: 'Invalid Json String', color: 'red' });
    }
  }, [vString]);

  return (
    <BasicView onClose={() => resetCommand()}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.passwordContainer}>
            <JsonInput
              label="Json"
              description="Click the arrow to convert to String"
              value={vJson}
              className={styles.input}
              onChange={setVjson}
              autosize
              minRows={2}
              maxRows={5}
              validationError="Invalid Json"
              rightSection={
                <CopyButton value={vJson} timeout={2000}>
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
              <Button size="xs" onClick={convertToString}>
                {' '}
                {String.fromCharCode(8595)}{' '}
              </Button>
              <Button size="xs" onClick={convertToJson}>
                {' '}
                {String.fromCharCode(8593)}{' '}
              </Button>
            </div>
            <Textarea
              label="Json String"
              description="Click arrow to convert string to Json"
              value={vString}
              className={styles.input}
              autosize
              minRows={2}
              maxRows={5}
              onChange={(e) => setVstring(e.target.value)}
              rightSection={
                <CopyButton value={vString} timeout={2000}>
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
          </div>
        </div>
      </div>
    </BasicView>
  );
};
