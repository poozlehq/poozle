/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ThemeIcon, ThemeIconProps } from '@mantine/core';
import Image from 'next/image';

type ThemeLogoProps = Omit<ThemeIconProps, 'children'>;

export function ThemeLogo(props: ThemeLogoProps) {
  return (
    <ThemeIcon {...props}>
      <Image src="/just-logo.png" alt="logo" width={20} height={20} />
    </ThemeIcon>
  );
}
