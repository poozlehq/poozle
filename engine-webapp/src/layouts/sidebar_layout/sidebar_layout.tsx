/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { AppShell } from '@mantine/core';
import * as React from 'react';

import { GetUserData } from 'wrappers/get_user_data';

import { Navbar } from './navbar';

interface SideBarLayoutProps {
  children: React.ReactElement;
}

export function SideBarLayout({ children }: SideBarLayoutProps) {
  const [navbarOpen, setNavbarOpen] = React.useState(true);

  return (
    <AppShell
      fixed
      navbar={
        <GetUserData>
          <Navbar
            open={navbarOpen}
            onToggle={() => setNavbarOpen((value) => !value)}
          />
        </GetUserData>
      }
      header={null}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.other.backgroundColor,
          paddingLeft: 'calc(var(--mantine-navbar-width, 0px))',
          paddingTop: `calc(var(--mantine-header-height, 0px))`,
          paddingBottom: 'calc(var(--mantine-footer-height, 0px))',
          paddingRight: 'calc(var(--mantine-aside-width, 0px))',
        },
      })}
    >
      <>
        <div
          style={{
            height: 'calc(100vh)',
          }}
        >
          <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            {children}
          </div>
        </div>
      </>
    </AppShell>
  );
}
