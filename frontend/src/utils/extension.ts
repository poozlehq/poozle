/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionSpec } from '@poozle/edk';
import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import {
  createCommands,
  deleteCommandsForExtension,
  getCommandsFromBackend,
  getExtensionSpecDataFromBackend,
  setExtensionSpecDataInBackend,
} from 'service/backend';

import { Command, ExtensionMapping } from 'types/common';

const specFileName = 'spec.json';
const extensionMapping = 'extensionMapping.json';
const indexViewFile = 'index.js';

const extensionRemoteURL = 'https://raw.githubusercontent.com/poozlehq/extensions/main/';

export async function getImage(extension_id: string): Promise<string> {
  const contents = await fetch(`${extensionRemoteURL}/icons/${extension_id}.svg`).then((res) =>
    res.text(),
  );
  return contents;
}

export async function getAllCommands(): Promise<Command[]> {
  const response = await getCommandsFromBackend();
  const commands = JSON.parse(response as string) as Command[];
  if (commands.length > 0) {
    return Promise.all(
      commands.map(async (command: Command) => ({
        ...command,
        icon: await getImage(command.extension_id),
      })),
    );
  }

  // This is called when commands don't exist in the database
  await prefillCommands();

  return await getAllCommands();
}

export async function getExtensionSpec(extensionId: string): Promise<ExtensionSpec> {
  const mapping = await getExtensionMapping();
  const currentVersion = mapping[extensionId].currentVersion;
  const contents: ExtensionSpec = await fetch(
    `${extensionRemoteURL}/${extensionId}/${currentVersion}/${specFileName}`,
  ).then((res) => res.json());

  return contents;
}

export async function getExtensionMapping() {
  const mapping = await readTextFile(extensionMapping, {
    dir: BaseDirectory.App,
  });

  return JSON.parse(mapping) as ExtensionMapping;
}

export async function getExtensionViewURL(extensionId: string) {
  const mapping = await getExtensionMapping();
  const currentVersion = mapping[extensionId].currentVersion;

  return `${extensionRemoteURL}/${extensionId}/${currentVersion}/${indexViewFile}`;
}

export async function getExtensionSpecData(extensionId: string) {
  return await getExtensionSpecDataFromBackend(extensionId);
}
export async function setExtensionSpecData(extensionId: string, data: string) {
  return await setExtensionSpecDataInBackend(extensionId, data);
}

export async function refetchCommandsForExtension(extensionId: string) {
  await deleteCommandsForExtension(extensionId);
  return await prefillCommandsForExtesion(extensionId);
}

export async function prefillCommandsForExtesion(extensionId: string) {
  const spec = await getExtensionSpec(extensionId);
  return await createCommands(spec);
}

export async function prefillCommands() {
  const mapping = await getExtensionMapping();
  const extensions = Object.keys(mapping);

  await Promise.all(
    extensions.map(async (extension: string) => {
      const spec = await getExtensionSpec(extension);
      return await createCommands(spec);
    }),
  );
}
