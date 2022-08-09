import { invoke } from '@tauri-apps/api';
import { readDir, BaseDirectory, readBinaryFile } from '@tauri-apps/api/fs';
import { Command as CommandType } from '@poozle/edk';

import { getData, setData } from './storage';
import { appDir } from '@tauri-apps/api/path';

export type Extension = {
  name: string;
  path: string;
};

export type ExtensionSpecDataType = { extensionId: string; data: any };

export type Command = {
  extension_id: string;
  extension_path: string;
} & CommandType;

export const COMMAND_STORAGE_KEY = 'command';
export const EXTENSION_STORAGE_KEY = 'extension_';

export async function getImage(path: string): Promise<string> {
  const contents = await readBinaryFile(`icons/${path}`, { dir: BaseDirectory.App });
  return new TextDecoder('utf-8').decode(contents);
}

export async function getAllCommands(): Promise<Command[]> {
  const response = await invoke('get_all_commands');
  const commands = JSON.parse(response as string) as Command[];
  if (commands.length > 0) {
    return Promise.all(
      commands.map(async (command: Command) => ({
        ...command,
        icon: await getImage(command.icon),
      })),
    );
  } else {
    const baseAppPath = await appDir();
    await invoke('prefill_all_commands', { basePath: baseAppPath });
    return getAllCommands();
  }
}

export async function getCommandSpec(extensionPath: string) {
  const commandView = (await invoke('spec_controller', {
    path: extensionPath,
  })) as string;

  return JSON.parse(commandView);
}

export async function getCommandView(
  extensionPath: String,
  callbackId: string,
  specData: any,
  params?: string,
) {
  const commandView = (await invoke('get_action_data', {
    path: extensionPath,
    callbackId,
    params: params ? params : '',
    specData: JSON.stringify(specData.data),
  })) as string;

  return JSON.parse(commandView);
}

export async function getExtensionSpecData(
  extensionId: string,
): Promise<ExtensionSpecDataType | undefined> {
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

export async function setExtensionSpecData(extensionId: string, data: string) {
  await invoke('save_spec', {
    spec: data,
    extensionId,
  });
}
