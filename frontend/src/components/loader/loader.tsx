/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Loader } from '@poozle/edk';

import styles from './loader.module.scss';

export const LoaderWithHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Loader />
      </div>
    </div>
  );
};
