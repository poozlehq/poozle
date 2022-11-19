/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionSpec, ExtensionSpecDataType } from '@poozle/edk';
import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import { appConfigDir, appDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import React from 'react';
import {
  createCommands,
  deleteCommandsForExtension,
  getCommandDataFromBackend,
  getCommandsFromBackend,
  getExtensionSpecDataFromBackend,
  setExtensionSpecDataInBackend,
  updateExtensionSpecDataInBackend,
} from 'service/backend';

import { Command, ExtensionMapping } from 'types/common';

const specFileName = 'spec.json';
const extensionMapping = 'extensionMapping.json';
const indexViewFile = 'index.js';

const extensionRemoteURL = 'https://raw.githubusercontent.com/poozlehq/extensions/main/';

export async function getImage(extensionId: string): Promise<string> {
  const contents = await fetch(`${extensionRemoteURL}/icons/${extensionId}.svg`).then((res) =>
    res.text(),
  );
  return contents;
}

export async function getCommandData(extensionId: string, commandKey: string): Promise<Command> {
  const response = await getCommandDataFromBackend(extensionId, commandKey);
  return JSON.parse(response) as Command;
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

  return [];
}

export async function getExtensionSpec(extensionId: string): Promise<ExtensionSpec> {
  const mappingContent = await readTextFile(`${extensionId}/${specFileName}`, {
    dir: BaseDirectory.App,
  });

  return JSON.parse(mappingContent) as ExtensionSpec;
}

export async function getExtensionMapping() {
  const mapping = await readTextFile(extensionMapping, {
    dir: BaseDirectory.App,
  });

  return JSON.parse(mapping) as ExtensionMapping;
}

// React util for the above function
export const useCurrentExtensions = () => {
  const [loading, setLoading] = React.useState(true);
  const [currentExtensions, setCurrentExtensions] = React.useState<ExtensionMapping>({});

  const fetchData = async () => {
    try {
      const currentExtensionMap = await getExtensionMapping();
      setCurrentExtensions(currentExtensionMap);
    } catch (error) {
      setCurrentExtensions({});
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return { currentExtensions, loading, refetch: fetchData };
};

export async function getExtensionViewURL(extensionId: string) {
  const appPath = await appConfigDir();
  const filePath = await join(appPath, `${extensionId}/${indexViewFile}`);
  const assetUrl = convertFileSrc(filePath);
  return assetUrl;
}

export async function getExtensionSpecData(extensionId: string) {
  return await getExtensionSpecDataFromBackend(extensionId);
}

export const useSpecData = (extensionKey: string) => {
  const [loading, setLoading] = React.useState(true);
  const [specData, setSpecData] = React.useState<ExtensionSpecDataType | undefined>(undefined);
  const fetchData = React.useCallback(async () => {
    try {
      const specData = await getExtensionSpecData(extensionKey);
      setSpecData(specData);
    } catch (error) {
      setSpecData(undefined);
    }
    setLoading(false);
  }, [extensionKey]);

  React.useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return { loading, specData };
};

export async function setExtensionSpecData(extensionId: string, data: string) {
  return await setExtensionSpecDataInBackend(extensionId, data);
}

export async function updateExtensionSpecData(extensionId: string, data: string, id: number) {
  return await updateExtensionSpecDataInBackend(extensionId, data, id);
}

export async function refetchCommandsForExtension(extensionId: string) {
  await deleteCommandsForExtension(extensionId);
  return await prefillCommandsForExtension(extensionId);
}

export async function prefillCommandsForExtension(extensionId: string) {
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
