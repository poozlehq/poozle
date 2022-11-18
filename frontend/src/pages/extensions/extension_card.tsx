/** Copyright (c) 2022, Poozle, all rights reserved. **/
import { Grid, Text } from '@mantine/core';
import { Button } from '@poozle/edk';
import { useContext } from 'react';
import {
  useDeleteExtension,
  useDownloadExtension,
  useUpdateExtension,
} from 'service/remote_extension_helper';

import { CommandsContext } from 'context/commands_context';

import styles from './extension_card.module.scss';

interface ExtensionCardProps {
  name: string;
  icon: string;
  description: string;
  extensionKey: string;
  version: string;
  isInstalled: boolean;
  isLatest: boolean;
  refetch(): void;
}

export const ExtensionCard = ({
  name,
  description,
  icon,
  extensionKey,
  version,
  isInstalled,
  isLatest,
  refetch,
}: ExtensionCardProps) => {
  const { download, loading } = useDownloadExtension();
  const { deleteExtension, loading: loadingForDelete } = useDeleteExtension();
  const { updateExtension, loading: updating } = useUpdateExtension();
  const { refetchCommands } = useContext(CommandsContext);

  const onInstall = () => {
    download(extensionKey, version).then(() => refetchData());
  };

  const onDelete = () => {
    deleteExtension(extensionKey).then(() => refetchData());
  };

  const onUpdate = () => {
    updateExtension(extensionKey, version).then(() => refetchData());
  };

  const refetchData = () => {
    // Refetch to check for the existing installed extensions
    refetch();
    // Refetch all the commands for the /search page
    refetchCommands();
  };

  return (
    <Grid.Col span={4}>
      <div className={styles.extensionCard}>
        <div>
          <img src={icon} alt="Extension" className={styles.image} />
        </div>
        <div>
          <div>{name}</div>
          <div className={styles.description}>
            <Text size="xs" lineClamp={2}>
              {description}
            </Text>
          </div>
          <div className={styles.actions}>
            {isInstalled && (
              <Button
                size="xs"
                variant="light"
                color="red"
                compact
                onClick={onDelete}
                loading={loadingForDelete}
              >
                Delete
              </Button>
            )}
            {!isInstalled && (
              <Button size="xs" variant="light" compact onClick={onInstall} loading={loading}>
                Install
              </Button>
            )}
            {isInstalled && !isLatest && (
              <Button size="xs" variant="light" compact onClick={onUpdate} loading={updating}>
                Update
              </Button>
            )}
          </div>
        </div>
      </div>
    </Grid.Col>
  );
};
