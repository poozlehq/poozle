/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionSpec, ExtensionSpecDataType, Loader } from '@poozle/edk';
import { useCallback, useEffect, useState } from 'react';

import { Command } from 'types/common';
import { getExtensionSpec, getExtensionSpecData } from 'utils/extension';

import { SpecContext } from '../context/spec_context';
import SpecView from '../views/spec_view/spec_view';

interface Props {
  command: Command;
  resetCommand: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function specChecker(Component: React.FC<any>) {
  return (props: Props) => {
    const { command, resetCommand } = props;
    const [loading, setLoading] = useState(true);
    const [specData, setSpecData] = useState<ExtensionSpecDataType | undefined>(undefined);
    const [spec, setSpec] = useState<ExtensionSpec | undefined>(undefined);

    const getSpecData = useCallback(async () => {
      try {
        const spec = await getExtensionSpec(command.extension_id);
        const specData = await getExtensionSpecData(command.extension_id);
        setSpec(spec);
        setSpecData(specData);
      } catch (e) {
        console.log(e);
        setSpecData(undefined);
      }
      setLoading(false);
    }, [command.extension_id]);

    useEffect(() => {
      getSpecData();
    }, [getSpecData]);

    if (loading || !spec) {
      return <Loader />;
    }

    // If input is not needed for the extension don't show spec view.
    if (!specData && spec?.inputBlocks.length > 0) {
      return <SpecView command={command} getSpecData={getSpecData} resetCommand={resetCommand} />;
    }

    return (
      <SpecContext.Provider value={specData}>
        <Component {...props} />
      </SpecContext.Provider>
    );
  };
}
