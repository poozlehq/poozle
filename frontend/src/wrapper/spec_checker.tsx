import { useEffect, useState } from 'react';

import Loader from '../components/loader/loader';
import SpecView from '../views/spec_view/spec_view';
import { SpecContext } from '../context/spec_context';

import { ExtensionSpecDataType, getExtensionSpecData, Command } from '../utils/commands';

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
      try {
        const specData = await getExtensionSpecData(command.extension_id);
        setSpecData(specData);
      } catch (e) {
        console.log(e);
        setSpecData(undefined);
      }
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
        <SpecContext.Provider value={specData}>
          <Component {...props} />
        </SpecContext.Provider>
      </>
    );
  };
}
