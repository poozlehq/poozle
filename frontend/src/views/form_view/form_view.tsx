import { useContext } from 'react';
import { useForm } from '@mantine/form';

import Header from '../../components/header/header';
import InputWrapper from '../../components/input_wrapper/input_wrapper';
import { CommandContext } from '../../context/command_context';

import { Block } from '../../types/block';
import { SubmitButton } from '../../ui/button/button';
import { Command } from '../../utils/commands';
import { CommandViewType } from '../command_view/types';

import styles from './form_view.module.scss';

type Props = {
  formData: CommandViewType;
  resetCommand: () => void;
};

function FormView({ resetCommand, formData }: Props) {
  const command = useContext(CommandContext) as Command;
  const form = useForm({
    initialValues: {
      repository_name: '',
      issue_title: '',
      issue_description: '',
    },
  });

  const getBlocks = () => {
    return formData.blocks;
  };

  return (
    <div className={styles.formView}>
      <Header onBack={resetCommand} />

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div className={styles.formContainer}>
          {formData &&
            getBlocks().map((block: Block) => (
              <div className={styles.input}>
                <InputWrapper
                  block={block}
                  inputProps={form.getInputProps(block.element.action_id)}
                />
              </div>
            ))}

          <div className={styles.actions}>
            <SubmitButton size="sm" className={styles.submitButton}>
              {command.name}
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormView;
