/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertSmall, IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React from 'react';

import { PublicLinkLayout } from '../public_link_layout';
import { TryAgain } from '../try_again';

export function PublicLinkWrapper() {
  const { query } = useRouter();
  const {
    linkId,
    success,
    error: errorFromServer,
    integrationName,
    accountIdentifier,
    redirectURL,
  } = query;

  const [closed, setClosed] = React.useState(false);

  React.useEffect(() => {
    if (typeof success !== 'undefined') {
      if (success === 'true') {
        notifications.show({
          icon: <IconCheck />,
          title: 'Status',
          color: 'green',
          message: `${integrationName} is successfully connected`,
        });
      } else {
        notifications.show({
          icon: <IconAlertSmall />,
          title: 'Status',
          color: 'red',
          message: errorFromServer,
        });
      }
    }
  }, [success]);

  if (!linkId) {
    return <Alert color="red"> Link Id is required </Alert>;
  }

  if (closed) {
    return <TryAgain retry={() => setClosed(false)} />;
  }

  return (
    <PublicLinkLayout
      linkId={linkId as string}
      accountIdentifier={accountIdentifier as string}
      redirectURL={redirectURL as string}
      onClose={() => setClosed(true)}
    />
  );
}
