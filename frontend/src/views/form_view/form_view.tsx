import { useContext } from 'react';

import Form, { FormHelpers, FormValues } from 'components/form/form';
import Header from 'components/header/header';

import { CommandContext } from 'context/command_context';
import { SpecContext } from 'context/spec_context';
import { Surface } from 'types/common';

import { Command, ExtensionSpecDataType, getCommandView } from '../../utils/commands';
import styles from './form_view.module.scss';

interface Props {
  formData: Surface;
  resetCommand: () => void;
}

const FormView = ({ formData }: Props) => {
  const currentCommand = useContext(CommandContext) as Command;
  const specData = useContext(SpecContext) as ExtensionSpecDataType;

  const getBlocks = () => {
    return formData.blocks;
  };

  const onSubmit = async (values: FormValues, { setLoading }: FormHelpers) => {
    try {
      const response = await getCommandView(
        currentCommand.extension_path,
        formData.callback_id,
        specData,
        JSON.stringify(values),
      );

      console.log(response);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div className={styles.formContainer}>
        <Form blocks={getBlocks() ?? []} onSubmit={onSubmit} submitText={currentCommand.name} />
      </div>
    </div>
  );
};

export default FormView;
