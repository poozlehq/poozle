/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { AppShell } from '@mantine/core';
import * as React from 'react';

import { Header } from './header';
import { Navbar } from './navbar';

interface SideBarLayoutProps {
  children: React.ReactElement;
}

export function SideBarLayout({ children }: SideBarLayoutProps) {
  return (
    <AppShell
      fixed
      navbar={<Navbar open />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
          paddingLeft: 'calc(var(--mantine-navbar-width, 0px))',
          paddingTop: `calc(var(--mantine-header-height, 0px))`,
          paddingBottom: 'calc(var(--mantine-footer-height, 0px))',
          paddingRight: 'calc(var(--mantine-aside-width, 0px))',
        },
      })}
    >
      {children}
    </AppShell>
  );
}
