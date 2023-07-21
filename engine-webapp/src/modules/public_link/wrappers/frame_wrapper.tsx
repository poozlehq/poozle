/** Copyright (c) 2023, Poozle, all rights reserved. **/

import React from 'react';

import { Loader } from 'components';

import { PublicLinkLayout } from '../public_link_layout';

interface State {
  linkId: string;
  accountIdentifier?: string;
  redirectURL?: string;
}

export function FrameLinkWrapper() {
  const [state, setState] = React.useState<State>(undefined);

  React.useEffect(() => {
    // Define the function to handle the received message
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMessage = (event: any) => {
      // Do something with the received message data

      if (event.data.messageType === 'SEND_INFO_TO_IFRAME') {
        setState({
          linkId: event.data.linkId,
          accountIdentifier: event.data.accountIdentifier,
          redirectURL: event.data.redirectURL,
        });
      }
    };

    // Add the message event listener when the component is mounted
    window.addEventListener('message', handleMessage);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  if (!(state && state.linkId)) {
    return <Loader />;
  }

  const onClose = () => {
    window.parent.postMessage(
      {
        messageType: 'CLOSE_LINKING_FLOW',
      },
      '*',
    );
  };

  return (
    <PublicLinkLayout
      linkId={state.linkId}
      accountIdentifier={state.accountIdentifier}
      redirectURL={state.redirectURL}
      onClose={onClose}
    />
  );
}
