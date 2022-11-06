/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ActionIcon, Button, CopyButton, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { BasicView } from '@poozle/edk';
import { IconCopy, IconCheck } from '@tabler/icons';
import Pass from 'pw-simplified';
import * as React from 'react';

import styles from './index.module.scss';

interface CommandProps {
  resetCommand: () => void;
}

export const GeneratePassword = (_props: CommandProps): React.ReactElement => {
  const [password, setPassword] = React.useState<string>('');
  const clipboard = useClipboard({ timeout: 500 });

  React.useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generatePassword() {
    const pw = new Pass(
      {
        length: 24, // must set
        lowercase: true, // optional
        uppercase: true, // optional
        numbers: true, // optional
        special: true, // optional also possible to add own "" with symbols - when true: ~`!@#$%^&*()_-+={[}]|\:;"'<,>.?/
      },
      {
        minLength: 24, // must set
        maxLength: 24, // optional
        lowercase: true, // optional
        uppercase: true, // optional
        numbers: true, // optional
        special: true, // optional
      },
    );
    const password = pw.generate();
    setPassword(password);
    clipboard.copy(password);
  }

  return (
    <BasicView
      onClose={() => resetCommand()}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.passwordContainer}>
            <div className={styles.password}>
              <h3>{password}</h3>
              <CopyButton value={password} timeout={2000}>
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
              <Button onClick={() => generatePassword()}> Generate </Button>
            </div>
          </div>
        </div>
      </div>
    </BasicView>
  );
};
