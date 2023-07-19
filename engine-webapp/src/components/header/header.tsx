/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { ActionIcon, Group, Title, Text, Stack } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/router';

import styles from './header.module.scss';

interface HeaderProps {
  title: React.ReactElement | string;
  description?: React.ReactElement | string;
  actions?: React.ReactNode;
  showBack?: boolean;
}

export function Header({ title, description, actions, showBack }: HeaderProps) {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Group position="apart" px="xl" pt="lg">
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
            <Stack justify="center" spacing={2}>
              <Title order={4}>{title}</Title>
              {description &&
                (typeof description === 'string' ? (
                  <Text size="sm" color="gray">
                    {description}
                  </Text>
                ) : (
                  <>{description}</>
                ))}
            </Stack>
          </Group>
          <div>{actions}</div>
        </Group>
      </div>
    </div>
  );
}

export function PlainHeader({ title, actions, showBack }: HeaderProps) {
  const router = useRouter();

  return (
    <div className={styles.plainHeader}>
      <Group position="apart" px="lg" className={styles.container}>
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
          <Title order={3}>{title}</Title>
        </Group>
        <div>{actions}</div>
      </Group>
    </div>
  );
}
