import { MantineProvider } from '@mantine/core';
import { theme } from 'config';
import * as React from 'react';

import styles from './form_view.module.scss';
import { Header } from './header';

export interface FormViewProps {
  onClose(): void;
  children: JSX.Element;
}

const FormView = ({ onClose, children }: FormViewProps): React.ReactElement => {
  return (
    <MantineProvider
      theme={theme('dark')}
      inherit
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <div className={styles.formContainer}>
        <Header onClose={onClose} />
        <div className={styles.content}>{children}</div>
      </div>
    </MantineProvider>
  );
};

export { FormView };
