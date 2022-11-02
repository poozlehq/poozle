import { ExtensionSpecDataType } from './extension';

export interface AppProps {
  commandKey: string;
  resetCommand: () => void;
  specData: ExtensionSpecDataType;
}
