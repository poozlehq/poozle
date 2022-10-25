import { Loader as LoaderComponent } from '@mantine/core';
import * as React from 'react';

import styles from './loader.module.scss';

const Loader = (): React.ReactElement => {
  return (
    <div className={styles.loader}>
      <LoaderComponent />
    </div>
  );
};

export default Loader;
