import { useContext, useEffect, useState } from 'react';
import { Notification } from '@mantine/core';

import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';

import { Command, ExtensionSpecDataType, getCommandView } from '../../utils/commands';
import { specChecker } from '../../wrapper/spec_checker';
import { SpecContext } from '../../context/spec_context';

import { ViewType, CommandViewType } from './types';
import FormView from '../form_view/form_view';

import styles from './command_view.module.scss';

type Props = {
  command: Command;
  resetCommand: () => void;
};

function CommandView({ command, resetCommand }: Props) {
  const [currentCommandView, setCurrentCommandView] = useState<CommandViewType | undefined>(
    undefined,
  );
  const [currentView, setCurrentView] = useState<ViewType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const specData = useContext(SpecContext) as ExtensionSpecDataType;

  useEffect(() => {
    getCommandResponse();
  }, []);

  const getCommandResponse = async () => {
    const commandView = await getCommandView(command.extension_path, command.key, specData);
    const record = JSON.parse(commandView.record);
    setCurrentCommandView(record);
    setCurrentView(record.type as ViewType);
    setLoading(false);
  };

  return (
    <div className={styles.commandView}>
      {loading && (
        <>
          <Header onBack={resetCommand} />
          <Loader />
        </>
      )}
      {!loading && currentView === ViewType.Form && currentCommandView && (
        <FormView formData={currentCommandView} resetCommand={resetCommand} />
      )}
    </div>
  );
}

export default specChecker(CommandView);
