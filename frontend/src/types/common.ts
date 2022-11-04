export interface Command {
  key: string;
  description: string;
  name: string;
  command_type: string;
  icon: string;
  extension_id: string;
}

export interface ExtensionInformation {
  currentVersion: string;
}

export type ExtensionMapping = Record<string, ExtensionInformation>;
