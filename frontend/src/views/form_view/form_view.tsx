import { useContext } from 'react';

import Header from '../../components/header/header';

import Form, { FormHelpers, FormValues } from '../../components/form/form';

import { CommandViewType } from '../command_view/types';
import { Command, ExtensionSpecDataType, getCommandView } from '../../utils/commands';

import { CommandContext } from '../../context/command_context';
import { SpecContext } from '../../context/spec_context';

import styles from './form_view.module.scss';

type Props = {
  formData: CommandViewType;
  resetCommand: () => void;
};

function FormView({ resetCommand, formData }: Props) {
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
    <div className={styles.formView}>
      <Header onBack={resetCommand} />

      <div className={styles.formContainer}>
        <Form blocks={getBlocks() ?? []} onSubmit={onSubmit} submitText={currentCommand.name} />
      </div>
    </div>
  );
}

export default FormView;
