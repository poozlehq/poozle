/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionCommand, ExtensionSpecDataType, ExtensionSpec } from '@poozle/edk';
import { invoke } from '@tauri-apps/api';

export async function getCommandsFromBackend(): Promise<string> {
  return await invoke('get_all_commands');
}

export async function getCommandDataFromBackend(
  extensionId: string,
  commandKey: string,
): Promise<string> {
  const data = await invoke('get_command', { extensionId, commandKey });
  return data as string;
}

// Create commands in the database
export async function createCommands(spec: ExtensionSpec) {
  return Promise.all(
    spec.commands.map(async (command: ExtensionCommand) => {
      return await invoke('create_command', {
        name: command.name,
        description: command.description,
        commandKey: command.key,
        extensionId: spec.key,
        icon: command.icon ?? spec.icon,
        data: '',
        commandType: command.command_type,
        hasQuickAction: command.hasQuickAction ? command.hasQuickAction : false,
      });
    }),
  );
}

export async function setExtensionSpecDataInBackend(extensionId: string, data: string) {
  return await invoke('save_spec', {
    spec: data,
    extensionId,
  });
}

export async function updateExtensionSpecDataInBackend(
  extensionId: string,
  data: string,
  id: number,
) {
  return await invoke('update_spec', {
    spec: data,
    extensionId,
    id,
  });
}

export async function deleteCommandsForExtension(extensionId: string) {
  return await invoke('delete_commands', {
    extensionId,
  });
}

export async function getExtensionSpecDataFromBackend(
  extensionId: string,
): Promise<ExtensionSpecDataType | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storageData: any = await invoke('get_spec', {
    extensionId,
  });

  if (storageData) {
    return {
      data: JSON.parse(storageData.data),
      id: storageData.id,
      extensionId: storageData.extension_id,
    };
  }

  return undefined;
}
