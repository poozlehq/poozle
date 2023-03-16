/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Group, Text, Select as MSelect, SelectProps } from '@mantine/core';
import { forwardRef } from 'react';

import { ExtensionIcon } from '../extension_icon';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap align="center">
        <ExtensionIcon icon={image} width={20} height={20} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  ),
);

export function Select(props: SelectProps) {
  return <MSelect itemComponent={SelectItem} {...props} />;
}
