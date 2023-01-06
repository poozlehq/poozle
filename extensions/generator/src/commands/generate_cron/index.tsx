/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Divider } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { BasicView } from '@poozle/edk';
import { Input as AntInput } from 'antd';
import * as React from 'react';
import { Cron, CronError } from 'react-js-cron';

import styles from './index.module.scss';
import { useCronReducer } from './utils';

interface CommandProps {
  resetCommand: () => void;
}

export const GenerateCron = ({ resetCommand }: CommandProps): React.ReactElement => {
  const defaultValue = '30 5 * * 1,6';
  const [values, dispatchValues] = useCronReducer(defaultValue);

  return (
    <BasicView onClose={() => resetCommand()}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.inputContainer}>
            <AntInput
              value={values.inputValue}
              className={styles.input}
              onChange={(event) => {
                dispatchValues({
                  type: 'set_input_value',
                  value: event.target.value,
                });
              }}
              onBlur={() => {
                dispatchValues({
                  type: 'set_cron_value',
                  value: values.inputValue,
                });
              }}
              onPressEnter={() => {
                dispatchValues({
                  type: 'set_cron_value',
                  value: values.inputValue,
                });
              }}
            />
            <Divider my="sm" variant="dashed" className={styles.input} />
            <Cron
              value={values.cronValue}
              setValue={(newValue: string) => {
                dispatchValues({
                  type: 'set_values',
                  value: newValue,
                });
              }}
              onError={(event: CronError) => {
                if (event?.description) {
                  showNotification({
                    message: `${event.description}`,
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </BasicView>
  );
};
