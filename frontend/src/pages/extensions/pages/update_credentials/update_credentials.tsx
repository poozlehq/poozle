/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useHotkeys } from '@mantine/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSpec } from 'service/command_helper';
import { setExtensionSpecData, updateExtensionSpecData, useSpecData } from 'service/extension';
import { useCommandInformation } from 'service/location_helper';

import { LoaderWithHeader } from 'components';
import { Footer } from 'components/footer';
import { Form, FormValues } from 'components/form';

import { Header } from 'pages/extensions/header';

import styles from './update_credentials.module.scss';

export const UpdateCredentials = () => {
  const navigate = useNavigate();
  const [actionsOpened, setActionsOpened] = useState(false);
  const { extensionId } = useCommandInformation();
  const { loading, spec } = useSpec(extensionId);
  const { loading: loadingSpecData, specData } = useSpecData(extensionId);

  const onClose = () => {
    navigate(-1);
  };

  useHotkeys([
    [
      'Esc',
      () => {
        onClose();
      },
    ],
  ]);

  if (loading || loadingSpecData) {
    return <LoaderWithHeader />;
  }

  const onSubmit = async (values: FormValues) => {
    await updateExtensionSpecData(extensionId, JSON.stringify(values), specData?.id as number);
    onClose();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.basicContainer}>
        <Header onClose={onClose} />
        <div className={styles.content}>
          {spec && specData && (
            <Form
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              blocks={spec.inputBlocks as any}
              onSubmit={onSubmit}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              initialValues={specData.data as any}
            />
          )}
        </div>
        <Footer
          title={spec?.name}
          actionsOpen={actionsOpened}
          setActionsOpened={setActionsOpened}
        />
      </div>
    </div>
  );
};
