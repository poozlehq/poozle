import { invoke } from '@tauri-apps/api';
import { readDir, BaseDirectory, readBinaryFile } from '@tauri-apps/api/fs';
import { Command as CommandType } from '@look-dev/sdk';

import { getData, setData } from './storage';

export type Extension = {
  name: string;
  path: string;
};

export type ExtensionSpecDataType = { [x: string]: string };

export type ExtensionCommand = {
  commands: Command[];
  icon: string;
};

export type Command = {
  extension: Extension;
} & CommandType;

export const COMMAND_STORAGE_KEY = 'command';
export const EXTENSION_STORAGE_KEY = 'extension_';

export async function getAllExtensions(): Promise<Extension[]> {
  return (await readDir('extensions', { dir: BaseDirectory.App, recursive: true })) as Extension[];
}

export async function getCommandForExtension(extension: Extension): Promise<Command[]> {
  const commands = (await invoke('command_controller', { path: extension.path })) as string;
  const parsedCommands = JSON.parse(commands).record as Command[];

  return Promise.all(
    parsedCommands.map(async (command) => {
      return {
        ...command,
        icon: await getImage(command.icon),
        extension,
      };
    }),
  );
}

export async function getImage(path: string): Promise<string> {
  const contents = await readBinaryFile(`icons/${path}`, { dir: BaseDirectory.App });
  return new TextDecoder('utf-8').decode(contents);
}

export async function getAllCommands(): Promise<ExtensionCommand[]> {
  // const storedCommands = await getData(COMMAND_STORAGE_KEY);

  // if (!storedCommands) {
  const allExtensions = await getAllExtensions();
  const commands = await Promise.all(
    allExtensions.map(async (extension) => ({
      commands: await getCommandForExtension(extension),
      icon: await getImage(`${extension.name}.svg`),
      name: extension.name,
    })),
  );

  await setData(COMMAND_STORAGE_KEY, commands);
  return commands;
  // }

  // return JSON.parse(storedCommands) as ExtensionCommand[];
}

export async function getCommandSpec(extension: Extension) {
  const commandView = (await invoke('spec_controller', {
    path: extension.path,
  })) as string;

  return JSON.parse(commandView);
}

export async function getCommandView(extension: Extension, actionId: string) {
  const commandView = (await invoke('get_action_data', {
    path: extension.path,
    actionId,
  })) as string;

  return JSON.parse(commandView);
}

export async function getExtensionSpecData(
  extension: Extension,
): Promise<ExtensionSpecDataType | undefined> {
  const storageData = await getData(`${EXTENSION_STORAGE_KEY}${extension.name}`);

  if (storageData) {
    return JSON.parse(storageData);
  }

  return undefined;
}

export async function setExtensionSpecData(extension: Extension, data: string) {
  await setData(`${EXTENSION_STORAGE_KEY}${extension.name}`, data);
}
