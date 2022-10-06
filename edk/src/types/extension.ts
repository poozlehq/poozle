export interface ExtensionCommand {
  key: string;
  description: string;
  name: string;
  command_type: string;
  icon?: string;
}

export interface Extension {
  name: string;
  path: string;
}

export interface ExtensionSpecDataType {
  extensionId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export declare enum InputBlockType {
  INPUT = 'input',
  SELECT = 'select',
}

export interface SelectItem {
  value: string;
  label?: string;
  disabled?: boolean;
  group?: string;
}

export interface ExtensionInputBlock {
  name: string;
  description: string;
  key: string;
  type: InputBlockType;

  data: SelectItem[];
}

export interface ExtensionSpec {
  name: string;
  key: string;
  description: string;
  icon: string;
  commands: ExtensionCommand[];
  inputBlocks: ExtensionInputBlock[];
}
