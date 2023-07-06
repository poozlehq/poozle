/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  ActionIcon,
  Avatar,
  Badge,
  Divider,
  Group,
  Navbar as MNavbar,
  Menu,
  Text,
  Title,
  UnstyledButton,
  createStyles,
} from '@mantine/core';
import {
  IconSettings,
  IconApps,
  IconArrowBarLeft,
  IconArrowBarRight,
  IconUser,
  IconKey,
  IconLink,
} from '@tabler/icons-react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useQueryClient } from 'react-query';
import { signOut } from 'supertokens-auth-react/recipe/emailpassword';

import { GetUserQuery } from 'services/user';

import { ThemeLogo } from 'components/theme_logo';

import { UserContext } from 'store/user_context';

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

const useStyles = createStyles((theme) => ({
  linkActive: {
    background: `${
      theme.fn.variant({
        color: theme.primaryColor,
        variant: 'light',
      }).background
    } !important`,
  },
}));

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  routeKey,
  open,
}: NavbarLinkProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton
      onClick={() => onClick(routeKey)}
      className={classnames(
        styles.link,
        { [styles.linkActive]: active },
        { [classes.linkActive]: active },
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
  // { icon: IconHome2, label: 'Home', routeKey: '/home' },
  { icon: IconApps, label: 'Integrations', routeKey: '/integration' },
  { icon: IconKey, label: 'OAuth', routeKey: '/o_auth' },
  { icon: IconLink, label: 'Link', routeKey: '/link' },
  { icon: IconSettings, label: 'Settings', routeKey: '/settings' },
];

interface NavbarProps {
  open: boolean;
  onToggle: () => void;
}

export function Navbar({ open, onToggle }: NavbarProps) {
  const router = useRouter();
  const {
    query: { workspaceId },
  } = router;
  const { firstname, Workspace: workspaces } = React.useContext(UserContext);
  const workspace = workspaces.find(
    (workspace) => workspace.workspaceId === workspaceId,
  );
  const queryClient = useQueryClient();

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
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <UnstyledButton className={classnames(styles.button)}>
              <Group position="left">
                <Avatar color="primary">
                  {firstname.slice(0, 2).toUpperCase()}
                </Avatar>
                {open && (
                  <div className={styles.flexContainer}>
                    <Title order={6}>{firstname}</Title>
                    <Text size="xs" color="gray">
                      {workspace?.slug}
                    </Text>
                  </div>
                )}
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconUser size={14} />}
              onClick={async () => {
                await signOut();
                await queryClient.invalidateQueries([GetUserQuery]);

                router.replace('/authentication/signin');
              }}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
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

          <Group>
            {open ? (
              <ActionIcon
                onClick={onToggle}
                size="lg"
                className={styles.toggleIcon}
              >
                <IconArrowBarLeft size={18} />
              </ActionIcon>
            ) : (
              <ActionIcon
                onClick={onToggle}
                size="lg"
                className={styles.toggleIcon}
              >
                <IconArrowBarRight size={18} />
              </ActionIcon>
            )}
          </Group>
        </Group>
      </MNavbar.Section>
    </MNavbar>
  );
}
