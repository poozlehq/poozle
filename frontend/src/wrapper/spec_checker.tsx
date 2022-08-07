import { useEffect, useState } from 'react';

import Loader from '../components/loader/loader';
import SpecView from '../views/spec_view/spec_view';

import { Extension, ExtensionSpecDataType, getExtensionSpecData, Command } from '../utils/commands';

type Props = {
  command: Command;
  resetCommand: () => void;
};

export function specChecker(Component: React.FC<any>) {
  return (props: Props) => {
    const { command, resetCommand } = props;
    const [loading, setLoading] = useState(true);
    const [specData, setSpecData] = useState<ExtensionSpecDataType | undefined>(undefined);

    useEffect(() => {
      getSpecData();
    }, []);

    async function getSpecData() {
      const specData = await getExtensionSpecData(command.extension);
      setSpecData(specData);
      setLoading(false);
    }

    if (loading) {
      return <Loader />;
    }

    if (!specData) {
      return <SpecView command={command} getSpecData={getSpecData} resetCommand={resetCommand} />;
    }

    return (
      <>
        <Component {...props} />
      </>
    );
  };
}
