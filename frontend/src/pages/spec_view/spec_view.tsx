/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useNavigate } from 'react-router-dom';
import { useSpec } from 'service/command_helper';
import { setExtensionSpecData } from 'service/extension';
import { useCommandInformation } from 'service/location_helper';

import { LoaderWithHeader } from 'components';
import { FormValues, Form } from 'components/form';
import Header from 'components/header/header';

import styles from './spec_view.module.scss';

const SpecView = () => {
  const { extensionId, commandKey } = useCommandInformation();
  const { loading, spec } = useSpec(extensionId);
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
    await setExtensionSpecData(extensionId, JSON.stringify(values));
    navigate(`/command/${extensionId}/${commandKey}`);
  };

  if (loading) {
    return <LoaderWithHeader />;
  }

  const onBack = () => {
    navigate('/search');
  };

  return (
    <div className={styles.container}>
      <div className={styles.specView}>
        <Header onBack={onBack} />

        <div className={styles.logo} />

        <div className={styles.form}>
          <div className={styles.innerContainer}>
            {spec && (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Form blocks={spec.inputBlocks as any} onSubmit={onSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecView;
