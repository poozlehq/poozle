import { useEffect, useState } from 'react';
import { Formik, Form, FormikValues } from 'formik';

import Loader from '../../components/loader/loader';
import Header from '../../components/header/header';
import { Image } from '../../components/image';
import InputWrapper from '../../components/input_wrapper/input_wrapper';

import { Command, getCommandSpec, setExtensionSpecData } from '../../utils/commands';
import { Block } from '../../types/block';

import styles from './spec_view.module.scss';
import { SubmitButton } from '../../ui/button/button';

type Props = {
  command: Command;
  getSpecData: () => void;
  resetCommand: () => void;
};

function SpecView(props: Props) {
  const {
    command: { extension },
    command,
    getSpecData,
    resetCommand,
  } = props;
  const [specData, setSpecData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSpec();
  }, []);

  async function getSpec() {
    const specData = await getCommandSpec(extension);
    setSpecData(specData);
    setLoading(false);
  }

  const onSubmit = async (values: FormikValues) => {
    await setExtensionSpecData(extension, JSON.stringify(values));
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
      <Formik initialValues={{}} onSubmit={onSubmit}>
        <div className={styles.formContainer}>
          <Form className={styles.form}>
            {specData &&
              getBlocks().map((block: Block) => (
                <InputWrapper
                  label={block.label}
                  element={block.element}
                  type={block.type}
                  key={block.label}
                  {...block}
                />
              ))}

            <div className={styles.actions}>
              <SubmitButton size="sm" className={styles.submitButton}>
                Connect
              </SubmitButton>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}

export default SpecView;
