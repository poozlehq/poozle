/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Loader, LoaderProps } from '@mantine/core';

import styles from './loader.module.scss';

interface LoaderInterface extends LoaderProps {
  height?: number;
}

function LoaderComponent(props: LoaderInterface): React.ReactElement {
  return (
    <div
      className={styles.loader}
      style={{
        minHeight: props.height ? props.height : 300,
      }}
    >
      <div className={styles.loaderContainer}>
        <Loader {...props} />
      </div>
    </div>
  );
}

export default LoaderComponent;
