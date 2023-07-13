/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { ActionIcon, Group, Title } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/router';

import styles from './header.module.scss';

interface HeaderProps {
  title: string;
  actions?: React.ReactNode;
  showBack?: boolean;
}

export function Header({ title, actions, showBack }: HeaderProps) {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <Group position="apart" px="md" className={styles.container}>
        <Group>
          {showBack && (
            <ActionIcon
              onClick={() => {
                router.back();
              }}
            >
              <IconArrowNarrowLeft />
            </ActionIcon>
          )}
          <Title order={4}>{title}</Title>
        </Group>
        <div>{actions}</div>
      </Group>
    </div>
  );
}
