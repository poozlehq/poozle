/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Button } from '@mantine/core';
import { ExtensionSpecDataType, BasicView } from '@poozle/edk';
import * as React from 'react';

import styles from './index.module.scss';
// import { Group, Result } from './utils';

// import {calendar} from 'googleapis/build/src/apis/calendar'
// import { Auth } from 'googleapis'
import {JWT} from 'google-auth-library'

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

export const GetEvents = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
//   const [totalSpent, setTotalSpent] = React.useState<string>('');
//   const [totalForecast, setTotalForecast] = React.useState<string>('');

  React.useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getEvents() {
    // var cal = calendar({
    //     version: 'v3',
    //     auth: 'XXXXXX-YOUR-API-KEY-HERE-XXXXXX'
    // });
    const serviceAccount = JSON.parse(specData?.data.serviceAccount)
    const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
    const GOOGLE_PRIVATE_KEY=serviceAccount.private_key
    const GOOGLE_CLIENT_EMAIL = serviceAccount.client_email
    const GOOGLE_PROJECT_NUMBER = serviceAccount.project_id
    const GOOGLE_CALENDAR_ID = specData?.data.calendarId

    console.log(SCOPES)
    console.log(GOOGLE_PRIVATE_KEY)
    console.log(GOOGLE_CLIENT_EMAIL)
    console.log(GOOGLE_PROJECT_NUMBER)
    console.log(GOOGLE_CALENDAR_ID)

    const jwtClient = new JWT({email:GOOGLE_CLIENT_EMAIL, key:GOOGLE_PRIVATE_KEY, scopes:SCOPES});

    console.log(jwtClient)
  }

  return (
    <BasicView onClose={() => resetCommand()}>
        <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.passwordContainer}>
            <div className={styles.actions}>
              <Button size="xs" onClick={() => getEvents()}>
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