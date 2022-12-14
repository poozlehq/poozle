/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Grid } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { Loader } from '@poozle/edk';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentExtensions } from 'service/extension';
import { useRemoteExtensions } from 'service/remote_extension_helper';

import { Footer } from 'components/footer';

import { ExtensionCard } from './extension_card';
import styles from './extensions.module.scss';
import { Header } from './header';

export const Extensions = () => {
  const { extensions } = useRemoteExtensions();
  const navigate = useNavigate();
  const { currentExtensions, refetch } = useCurrentExtensions();
  const [actionsOpened, setActionsOpened] = useState(false);

  const onClose = React.useCallback(() => {
    navigate('/search');
  }, [navigate]);

  useHotkeys([
    [
      'Esc',
      () => {
        onClose();
      },
    ],
  ]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.basicContainer}>
        <Header onClose={onClose} />
        <div className={styles.content}>
          {extensions.length === 0 && <Loader />}
          <Grid>
            {extensions.map((extension) => (
              <ExtensionCard
                name={extension.name}
                key={extension.key}
                isInstalled={extension.key in currentExtensions}
                isLatest={
                  currentExtensions[extension.key] &&
                  extension.version === currentExtensions[extension.key].currentVersion
                }
                extensionKey={extension.key}
                icon={extension.icon}
                version={extension.version}
                description={extension.spec.description}
                refetch={refetch}
              />
            ))}
          </Grid>
        </div>
        <Footer actionsOpen={actionsOpened} setActionsOpened={setActionsOpened} />
      </div>
    </div>
  );
};
