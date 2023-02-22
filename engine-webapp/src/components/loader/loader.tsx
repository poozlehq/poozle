/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Loader, LoaderProps } from '@mantine/core';

import styles from './loader.module.scss';

function LoaderComponent(props: LoaderProps): React.ReactElement {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderContainer}>
        <Loader {...props} />
      </div>
    </div>
  );
}

export default LoaderComponent;
