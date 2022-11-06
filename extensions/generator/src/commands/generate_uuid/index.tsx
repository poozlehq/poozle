/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ActionIcon, Button, CopyButton, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { BasicView } from '@poozle/edk';
import { IconCopy, IconCheck } from '@tabler/icons';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './index.module.scss';

interface CommandProps {
  resetCommand: () => void;
}

export const GenerateUUID = (_props: CommandProps): React.ReactElement => {
  const [UUID, setUUID] = React.useState<string>('');
  const clipboard = useClipboard({ timeout: 500 });

  const generateUUID = React.useCallback(() => {
    const UUID = uuidv4();
    setUUID(UUID);
    clipboard.copy(UUID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    generateUUID();
  }, [generateUUID]);

  return (
    <BasicView
      onClose={function (): void {
        throw new Error('Function not implemented.');
      }}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.UUIDContainer}>
            <div className={styles.UUID}>
              <h3>{UUID}</h3>
              <CopyButton value={UUID} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                    <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </div>
            <div>
              <Button onClick={() => generateUUID()}> Generate </Button>
            </div>
          </div>
        </div>
      </div>
    </BasicView>
  );
};
