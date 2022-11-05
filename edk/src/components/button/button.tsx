/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Button as MantineButton, MantineProvider } from '@mantine/core';
import classnames from 'classnames';
import { defaultColorScheme, theme } from 'config/defaultTheme';
import * as React from 'react';

import styles from './button.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any;

const Button = (props: Props): React.ReactElement => {
  const { className, size = 'md', radius = 'sm', ...restProps } = props;

  return (
    <MantineProvider
      theme={theme(defaultColorScheme)}
      inherit
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <MantineButton
        size={size}
        radius={radius}
        className={classnames(styles.uiButton, className)}
        type="button"
        {...restProps}
      />
    </MantineProvider>
  );
};

const SubmitButton = ({ Component = Button, className, disabled, loading, ...props }: Props) => {
  return (
    <Component
      htmltype="submit"
      type="submit"
      loading={loading}
      className={classnames(
        'ui-button-submit',
        className,
        { 'ui-btn-disabled': disabled },
        { 'ui-btn-loading': loading },
      )}
      {...props}
    />
  );
};

export { SubmitButton, Button };
