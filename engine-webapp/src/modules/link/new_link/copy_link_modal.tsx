/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Link } from '@@generated/link/entities';
import { ActionIcon, CopyButton, Modal, Text, TextInput } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import React from 'react';

interface CopyLinkModalProps {
  opened: boolean;
  link: Link;
  onClose: () => void;
}

export function CopyLinkModal({ opened, onClose, link }: CopyLinkModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Send link via URL">
      <Text size="sm" color="gray">
        Generate a secure URL that opens Link in a browser window for
        authorizing integrations between your app and a third-party platform.
      </Text>

      <TextInput
        mt="md"
        value={link.linkId}
        disabled
        label={`Link Id for ${link.linkName}`}
        rightSection={
          <CopyButton value={link.linkId} timeout={2000}>
            {({ copied, copy }) => (
              <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
            )}
          </CopyButton>
        }
      />
    </Modal>
  );
}
