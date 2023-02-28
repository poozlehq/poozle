/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Navbar as MNavbar,
  Text,
  UnstyledButton,
  createStyles,
} from '@mantine/core';
import {
  IconHome2,
  IconSettings,
  IconLogout,
  IconCode,
  IconApps,
} from '@tabler/icons-react';
import classnames from 'classnames';
import { useRouter } from 'next/router';

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
    color: `${theme.colors.blue[9]} !important`,
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.colors.blue[9],
    },
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
  { icon: IconHome2, label: 'Home', routeKey: '/home' },
  { icon: IconApps, label: 'Integrations', routeKey: '/integrations' },
  { icon: IconCode, label: 'Playground', routeKey: '/playground' },
  { icon: IconSettings, label: 'Settings', routeKey: '/settings' },
];

interface NavbarProps {
  open: boolean;
}

export function Navbar({ open }: NavbarProps) {
  const router = useRouter();

  const links = LINK_DATA.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      open={open}
      active={link.routeKey === router.route}
      onClick={(routeKey) => router.replace(routeKey)}
    />
  ));

  return (
    <MNavbar width={{ base: open ? 240 : 80 }} p="sm" pt={0}>
      <MNavbar.Section
        grow
        mt="md"
        className={classnames(styles.section, { [styles.openedSection]: open })}
      >
        {links}
      </MNavbar.Section>
      <MNavbar.Section
        className={classnames(styles.section, { [styles.openedSection]: open })}
      >
        <NavbarLink
          icon={IconLogout}
          label="Logout"
          open={open}
          routeKey="logout"
        />
      </MNavbar.Section>
    </MNavbar>
  );
}
