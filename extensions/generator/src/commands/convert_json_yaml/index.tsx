/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ActionIcon, Button, CopyButton, Tooltip, JsonInput, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { BasicView } from '@poozle/edk';
import { IconCopy, IconCheck } from '@tabler/icons';
import * as React from 'react';
import yaml from 'yaml';
/// <reference path="./typings/js-yaml/js-yaml.d.ts"/>
import * as y from 'js-yaml';

import styles from './index.module.scss';

interface CommandProps {
  resetCommand: () => void;
}

export const JsonYamlConverter = ({ resetCommand }: CommandProps): React.ReactElement => {
  const [vJson, setVjson] = React.useState<string>('');
  const [vYaml, setVyaml] = React.useState<string>('');

  const convertToYaml = React.useCallback(() => {
    //setVyaml(yaml.parse(vJson));
    var obj = JSON.parse(vJson); 
    setVyaml(YAML.stringify(obj)); 
  }, [vJson]);

  const convertToJson = React.useCallback(() => {
    try {
      setVjson(yaml.stringify(vYaml));
    } catch (e) {
      console.log('here');
      showNotification({ message: 'Invalid YAML', color: 'red' });
    }
  }, [vYaml]);

  return (
    <BasicView onClose={() => resetCommand()}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.passwordContainer}>
            <JsonInput
              label="Json"
              description="Click the arrow to convert to YAML"
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
              <Button size="xs" onClick={convertToYaml}>
                {' '}
                {String.fromCharCode(8595)}{' '}
              </Button>
              <Button size="xs" onClick={convertToJson}>
                {' '}
                {String.fromCharCode(8593)}{' '}
              </Button>
            </div>
            <Textarea
              label="YAML"
              description="Click arrow to convert YAML to JSON"
              value={vYaml}
              className={styles.input}
              autosize
              minRows={2}
              maxRows={5}
              onChange={(e) => setVyaml(e.target.value)}
              rightSection={
                <CopyButton value={vYaml} timeout={2000}>
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
