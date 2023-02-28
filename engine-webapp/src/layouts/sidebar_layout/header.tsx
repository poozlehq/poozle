/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Header as MHeader, Group, Badge } from '@mantine/core';

import { ThemeLogo } from 'components/theme_logo';

import { WorkspaceSelect } from './workspace_select';

export function Header() {
  return (
    <MHeader height={60}>
      <Group sx={{ height: '100%' }} px="xl" position="apart">
        <div>
          <Group sx={{ height: '100%' }}>
            <ThemeLogo variant="filled" size="lg" />
            <div>
              <Badge color="gray">{process.env.NEXT_PUBLIC_VERSION}</Badge>
            </div>
          </Group>
        </div>
        <div>
          <WorkspaceSelect />
        </div>
      </Group>
    </MHeader>
  );
}
