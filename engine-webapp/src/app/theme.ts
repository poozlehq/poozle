/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const primaryColor: string[] = [
  '#def1ff',
  '#afd3ff',
  '#7db6ff',
  '#4b98ff',
  '#1a7bff',
  '#1a77f6',
  '#0061e6',
  '#004cb4',
  '#003682',
  '#002051',
];

export const theme = {
  colors: {
    // TODO (harshith): Change this to more strict type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    primary: primaryColor as any,
  },
  primaryColor: 'primary',
  primaryShade: 5,
  defaultRadius: 'md',
  components: {
    Select: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      styles: (theme: any) => ({
        input: {
          borderColor: theme.colors.gray[2],
        },
      }),
    },
    TextInput: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      styles: (theme: any) => ({
        input: {
          borderColor: theme.colors.gray[2],
        },
      }),
    },
    PasswordInput: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      styles: (theme: any) => ({
        input: {
          borderColor: theme.colors.gray[2],
        },
      }),
    },
  },
};
