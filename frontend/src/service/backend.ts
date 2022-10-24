import { ExtensionCommand, ExtensionSpecDataType, ExtensionSpec } from '@poozle/edk';
import { invoke } from '@tauri-apps/api';

export async function getCommandsFromBackend(): Promise<string> {
  return await invoke('get_all_commands');
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
      extensionId: storageData.extension_id,
    };
  }

  return undefined;
}
