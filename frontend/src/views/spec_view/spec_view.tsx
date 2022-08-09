import { useEffect, useState } from 'react';

import Loader from '../../components/loader/loader';
import Header from '../../components/header/header';
import { Image } from '../../components/image';
import Form, { FormValues } from '../../components/form/form';

import { Command, getCommandSpec, setExtensionSpecData } from '../../utils/commands';

import styles from './spec_view.module.scss';

type Props = {
  command: Command;
  getSpecData: () => void;
  resetCommand: () => void;
};

function SpecView(props: Props) {
  const { command, getSpecData, resetCommand } = props;
  const [specData, setSpecData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSpec();
  }, []);

  async function getSpec() {
    const specData = await getCommandSpec(command.extension_path);
    setSpecData(specData);
    setLoading(false);
  }

  const onSubmit = async (values: FormValues) => {
    await setExtensionSpecData(command.extension_id, JSON.stringify(values));
    getSpecData();
  };

  if (loading) {
    return <Loader />;
  }

  const getBlocks = () => {
    return JSON.parse(specData.record).blocks;
  };

  return (
    <div className={styles.specView}>
      <Header onBack={resetCommand} />

      <div className={styles.logo}>
        <Image src={command.icon} html_renderer className={styles.icon} />
      </div>

      <div className={styles.form}>
        <div className={styles.innerContainer}>
          <Form blocks={getBlocks() ?? []} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}

export default SpecView;
