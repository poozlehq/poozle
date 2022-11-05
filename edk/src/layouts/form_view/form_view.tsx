/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { MantineProvider } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import { defaultColorScheme, theme } from 'config';
import * as React from 'react';
import { registerAppWindow } from 'utils/app_window';

import styles from './form_view.module.scss';
import { Header } from './header';

export interface FormViewProps {
  onClose(): void;
  children: JSX.Element;
}

const FormView = ({ onClose, children }: FormViewProps): React.ReactElement => {
  React.useEffect(() => {
    registerAppWindow(onClose);
  }, [onClose]);
  const focusTrapRef = useFocusTrap();

  return (
    <MantineProvider
      theme={theme(defaultColorScheme)}
      inherit
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <div className={styles.formContainer}>
        <Header onClose={onClose} />
        <div className={styles.content} ref={focusTrapRef}>
          {children}
        </div>
      </div>
    </MantineProvider>
  );
};

export { FormView };
