/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Avatar,
  Badge,
  Divider,
  Group,
  Navbar as MNavbar,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import {
  IconHome2,
  IconSettings,
  IconCode,
  IconApps,
} from '@tabler/icons-react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import * as React from 'react';
import { UserContext } from 'store/user_context';

import { ThemeLogo } from 'components/theme_logo';

import styles from './navbar.module.scss';

interface NavbarLinkProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  active?: boolean;
  open: boolean;
  routeKey: string;
  onClick?(link: string): void;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  routeKey,
  open,
}: NavbarLinkProps) {
  return (
    <UnstyledButton
      onClick={() => onClick(routeKey)}
      className={classnames(
        styles.link,
        { [styles.linkActive]: active },
        { [styles.open]: open },
      )}
    >
      <Icon stroke={1.5} size="24" />
      {open && (
        <Text ml="md" size="sm">
          {label}
        </Text>
      )}
    </UnstyledButton>
  );
}

const LINK_DATA = [
  { icon: IconHome2, label: 'Home', routeKey: '/home' },
  { icon: IconApps, label: 'Extensions', routeKey: '/extensions' },
  { icon: IconCode, label: 'Playground', routeKey: '/playground' },
  { icon: IconSettings, label: 'Settings', routeKey: '/settings' },
];

interface NavbarProps {
  open: boolean;
  onToggle: () => void;
}

export function Navbar({ open }: NavbarProps) {
  const router = useRouter();
  const {
    query: { workspaceId },
  } = router;
  const { firstname, Workspace } = React.useContext(UserContext);
  const workspace = Workspace.find(
    (workspace) => workspace.workspaceId === workspaceId,
  );

  const links = LINK_DATA.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      open={open}
      active={router.route.includes(link.routeKey)}
      onClick={(routeKey) =>
        router.push(`/workspaces/${workspaceId}${routeKey}`)
      }
    />
  ));

  return (
    <MNavbar width={{ base: open ? 240 : 80 }} pt={0}>
      <MNavbar.Section px="sm">
        <UnstyledButton className={classnames(styles.button)}>
          <Group position="left">
            <Avatar color="blue">{firstname.slice(0, 2).toUpperCase()}</Avatar>
            {open && (
              <div className={styles.flexContainer}>
                <Title order={6}>{firstname}</Title>
                <Text size="xs" color="gray">
                  {workspace.slug}
                </Text>
              </div>
            )}
          </Group>
        </UnstyledButton>
      </MNavbar.Section>
      <Divider className={classnames(styles.divider)} />
      <MNavbar.Section
        grow
        mt="sm"
        px="sm"
        className={classnames(styles.section, { [styles.openedSection]: open })}
      >
        {links}
      </MNavbar.Section>
      <MNavbar.Section
        className={classnames(styles.section, styles.bottomSection, {
          [styles.openedSection]: open,
        })}
      >
        <Group
          position={open ? 'apart' : 'center'}
          p="md"
          className={classnames(styles.logoContainer)}
        >
          {open && (
            <Group>
              <ThemeLogo variant="filled" size="lg" />
              <div>
                <Badge className={styles.versionBadge}>
                  {process.env.NEXT_PUBLIC_VERSION}
                </Badge>
              </div>
            </Group>
          )}

          {/* Enable this later/ */}
          {/* <Group>
            {open ? (
              <ActionIcon onClick={onToggle} size="xl">
                <IconArrowBarLeft size={20} />
              </ActionIcon>
            ) : (
              <ActionIcon onClick={onToggle} size="xl">
                <IconArrowBarRight size={20} />
              </ActionIcon>
            )}
          </Group> */}
        </Group>
      </MNavbar.Section>
    </MNavbar>
  );
}
