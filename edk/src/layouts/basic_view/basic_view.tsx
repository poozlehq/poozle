/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { MantineProvider } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import { defaultColorScheme, theme } from 'config';
import * as React from 'react';
import { registerAppWindow } from 'utils/app_window';

import { Header } from '../form_view/header';
import styles from './basic_view.module.scss';

export interface BasicViewProps {
  onClose(): void;
  children: JSX.Element;
}

const BasicView = ({ onClose, children }: BasicViewProps): React.ReactElement => {
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
      <div className={styles.basicContainer}>
        <Header onClose={onClose} />
        <div className={styles.content} ref={focusTrapRef}>
          {children}
        </div>
      </div>
    </MantineProvider>
  );
};

export { BasicView };
