import { Command as CommandType } from '@poozle/edk';
import { invoke } from '@tauri-apps/api';
import {
  BaseDirectory,
  FileEntry,
  readBinaryFile,
  readDir,
  readTextFile,
} from '@tauri-apps/api/fs';

export interface Extension {
  name: string;
  path: string;
}

export interface ExtensionSpec {
  extensionId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface ExtensionCommand {
  key: string;
  description: string;
  name: string;
  command_type: string;
  icon?: string;
}

export interface ExtensionSpec {
  name: string;
  key: string;
  description: string;
  icon: string;
  commands: ExtensionCommand[];
}

export type Command = {
  extension_id: string;
  extension_path: string;
} & CommandType;

export async function getImage(extension_id: string, path: string): Promise<string> {
  const contents = await readBinaryFile(`extensions/${extension_id}/${path}`, {
    dir: BaseDirectory.App,
  });
  return new TextDecoder('utf-8').decode(contents);
}

export async function getAllCommands(): Promise<Command[]> {
  const response = await invoke('get_all_commands');
  const commands = JSON.parse(response as string) as Command[];
  if (commands.length > 0) {
    return Promise.all(
      commands.map(async (command: Command) => ({
        ...command,
        icon: await getImage(command.extension_id, command.icon),
      })),
    );
  }

  // This is called when commands don't exist in the database
  await prefillCommands();

  return getAllCommands();
}

export async function prefillCommands() {
  const entries: FileEntry[] = await readDir('extensions', {
    dir: BaseDirectory.App,
    recursive: true,
  });

  const specFileName = 'spec.json';

  await Promise.all(
    entries.map(async (entry: FileEntry) => {
      const specPath = entry.children?.filter((file) => file.name === specFileName)[0];
      if (specPath) {
        const specContent = await readTextFile(specPath.path);
        const spec: ExtensionSpec = JSON.parse(specContent) as ExtensionSpec;
        return await createCommands(spec);
      }

      return null;
    }),
  );
}

// Create commands in the database
export async function createCommands(spec: ExtensionSpec) {
  return Promise.all(
    spec.commands.map(async (command) => {
      console.log(command);
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

export async function getCommandSpec(extensionPath: string) {
  const commandView = (await invoke('spec_controller', {
    path: extensionPath,
  })) as string;

  return JSON.parse(commandView);
}

export async function getCommandView(
  extensionPath: string,
  callbackId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  specData: any,
  params?: string,
) {
  const commandView = (await invoke('get_action_data', {
    path: extensionPath,
    callbackId,
    params: params ? params : '',
    specData: JSON.stringify(specData.data),
  })) as string;

  console.log(commandView);
  return JSON.parse(commandView);
}

export async function getExtensionSpecData(
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

export async function setExtensionSpecData(extensionId: string, data: string) {
  await invoke('save_spec', {
    spec: data,
    extensionId,
  });
}
