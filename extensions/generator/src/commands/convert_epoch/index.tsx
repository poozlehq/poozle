/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ActionIcon, Button, CopyButton, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { BasicView, Input } from '@poozle/edk';
import { IconCopy, IconCheck } from '@tabler/icons';
import * as React from 'react';

import styles from './index.module.scss';

interface CommandProps {
  resetCommand: () => void;
}

export const ConvertEpoch = ({ resetCommand }: CommandProps): React.ReactElement => {
  const [Epoch, setEpoch] = React.useState<string>(String(new Date().getTime()/1000.0));
  const [DateTime, setDateTime] = React.useState<string>(new Date().toISOString());
  const clipboard = useClipboard({ timeout: 500 });

  const convertEpoch = React.useCallback(() => {
    console.log(`Epoch: ${Epoch}`)
    const myDate = new Date( Number(Epoch) * 1000);
    setDateTime(myDate.toISOString());
    clipboard.copy(myDate.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Epoch]);

  const convertDate = React.useCallback(() => {
    var myDate = new Date(Date.parse(DateTime))
    console.log(`Date: ${myDate.toString()}`)
    var myEpoch = myDate.getTime()/1000;
    setEpoch(String(myEpoch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DateTime]);

  return (
    <BasicView onClose={() => resetCommand()}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.UUIDContainer}>
            <Input
              label="Epoch Time"
              description="Click arrow to generate date time"
              value={Epoch}
              className={styles.input}
              onChange={(e) => setEpoch(e.target.value)}
              rightSection={
                <CopyButton value={Epoch} timeout={2000}>
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
              <Button size="xs" onClick={convertEpoch}>
                {' '}{String.fromCharCode(8595)}{' '}
              </Button>
              <Button size="xs" onClick={convertDate}>
                {' '}{String.fromCharCode(8593)}{' '}
              </Button>
            </div>
            <Input
              label="Readable Date"
              description="Click arrow to convert date time to epoch time"
              value={DateTime}
              className={styles.input}
              onChange={(e) => setDateTime(e.target.value)}
              rightSection={
                <CopyButton value={DateTime} timeout={2000}>
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
