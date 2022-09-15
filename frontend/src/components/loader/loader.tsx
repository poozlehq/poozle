import { Loader as LoaderComponent } from '@mantine/core';

import styles from './loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <LoaderComponent />
    </div>
  );
};

export default Loader;
