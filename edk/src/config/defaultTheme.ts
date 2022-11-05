/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ColorScheme, MantineThemeOverride } from '@mantine/core';

export const theme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  colorScheme,
  fontFamily: 'Metropolis',
  defaultRadius: 'md',
  black: '#1f2023',
  white: '#F7F7F8',
});

export const defaultColorScheme = 'dark';
