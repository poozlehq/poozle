import { ExtensionSpec } from '@poozle/edk';
import {
  BaseDirectory,
  FileEntry,
  readBinaryFile,
  readDir,
  readTextFile,
} from '@tauri-apps/api/fs';
import {
  createCommands,
  getCommandsFromBackend,
  getExtensionSpecDataFromBackend,
  setExtensionSpecDataInBackend,
} from 'service/backend';

import { Command } from 'types/common';

const specFileName = 'spec.json';

export async function getImage(extension_id: string, path: string): Promise<string> {
  const contents = await readBinaryFile(`extensions/${extension_id}/${path}`, {
    dir: BaseDirectory.App,
  });
  return new TextDecoder('utf-8').decode(contents);
}

export async function getAllCommands(): Promise<Command[]> {
  const response = await getCommandsFromBackend();
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

  return await getAllCommands();
}

export async function getCommandSpec(extensionId: string) {
  const specContent = await readTextFile(`extensions/${extensionId}/${specFileName}`, {
    dir: BaseDirectory.App,
  });

  return (JSON.parse(specContent) as ExtensionSpec).inputBlocks;
}

export async function getExtensionSpecData(extensionId: string) {
  return await getExtensionSpecDataFromBackend(extensionId);
}
export async function setExtensionSpecData(extensionId: string, data: string) {
  return await setExtensionSpecDataInBackend(extensionId, data);
}

export async function prefillCommands() {
  const entries: FileEntry[] = await readDir('extensions', {
    dir: BaseDirectory.App,
    recursive: true,
  });

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
