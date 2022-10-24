import { Form, FormValues } from '@poozle/edk';
import { useCallback, useEffect, useState } from 'react';

import Header from 'components/header/header';
import { Image } from 'components/image';
import Loader from 'components/loader/loader';

import { Command } from 'types/common';
import { getCommandSpec, setExtensionSpecData } from 'utils/extension';

import styles from './spec_view.module.scss';

interface Props {
  command: Command;
  getSpecData: () => void;
  resetCommand: () => void;
}

const SpecView = (props: Props) => {
  const { command, getSpecData, resetCommand } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [specData, setSpecData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  const getSpec = useCallback(async () => {
    const specData = await getCommandSpec(command.extension_id);
    setSpecData(specData);
    setLoading(false);
  }, [command.extension_id]);

  useEffect(() => {
    getSpec();
  }, [getSpec]);

  const onSubmit = async (values: FormValues) => {
    await setExtensionSpecData(command.extension_id, JSON.stringify(values));
    getSpecData();
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.specView}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.specView}>
        <Header onBack={resetCommand} />

        <div className={styles.logo}>
          <Image src={command.icon} html_renderer />
        </div>

        <div className={styles.form}>
          <div className={styles.innerContainer}>
            {specData && <Form blocks={specData} onSubmit={onSubmit} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecView;
