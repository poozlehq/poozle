/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ExtensionSpec } from '@poozle/edk';
import {
  BaseDirectory,
  createDir,
  readTextFile,
  writeTextFile,
  exists,
  removeDir,
} from '@tauri-apps/api/fs';
import React from 'react';

import EXTENSIONS from '../../extensions.json';
import { deleteCommandsForExtension } from './backend';
import { prefillCommandsForExtension } from './extension';

interface ExtensionMap {
  version: string;
  name: string;
  key: string;
  icon: string;
}

interface Extension {
  spec: ExtensionSpec;
  icon: string;
  key: string;
  name: string;
  version: string;
}

const specFileName = 'spec.json';
const indexViewFile = 'index.js';
const extensionMappingFile = 'extensionMapping.json';
const extensionRemoteURL = 'https://raw.githubusercontent.com/poozlehq/extensions/main/';

// Get spec from remote github location
export async function getRemoteExtensionSpec(
  extensionId: string,
  version: string,
): Promise<ExtensionSpec> {
  const contents: ExtensionSpec = await fetch(
    `${extensionRemoteURL}/${extensionId}/${version}/${specFileName}`,
  ).then((res) => res.json());

  return contents;
}

export async function getAllExtensions(): Promise<Extension[]> {
  return Promise.all(
    EXTENSIONS.extensions.map(async (extension: ExtensionMap) => {
      const spec = await getRemoteExtensionSpec(extension.key, extension.version);
      return {
        spec,
        icon: `${extensionRemoteURL}/icons/${extension.icon}`,
        key: extension.key,
        name: extension.name,
        version: extension.version,
      };
    }),
  );
}

// Util to get all the extensions Poozle supports
export const useRemoteExtensions = () => {
  const [loading, setLoading] = React.useState(true);
  const [extensions, setExtensions] = React.useState<Extension[]>([]);

  const fetchData = async () => {
    const extensions = await getAllExtensions();
    setExtensions(extensions);
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return { extensions, loading };
};

export async function updateExtensionMapping(extensionId: string, version: string) {
  const isExist = await exists(extensionMappingFile, { dir: BaseDirectory.AppConfig });
  let content = {};

  if (isExist) {
    const mappingContent = await readTextFile(extensionMappingFile, {
      dir: BaseDirectory.AppConfig,
    });
    content = JSON.parse(mappingContent);
  }

  return await writeTextFile(
    {
      path: extensionMappingFile,
      contents: JSON.stringify({ ...content, [extensionId]: { currentVersion: version } }),
    },
    { dir: BaseDirectory.AppConfig },
  );
}

export async function deleteExtensionFromMapping(extensionId: string) {
  const mappingContent = await readTextFile(extensionMappingFile, { dir: BaseDirectory.AppConfig });
  const content = JSON.parse(mappingContent);

  delete content[extensionId];

  return await writeTextFile(
    {
      path: extensionMappingFile,
      contents: JSON.stringify(content),
    },
    { dir: BaseDirectory.AppConfig },
  );
}

export const useDownloadExtension = () => {
  const [loading, setLoading] = React.useState(false);

  const download = async (extensionId: string, version: string) => {
    setLoading(true);

    await createDir(extensionId, { dir: BaseDirectory.AppConfig, recursive: true });

    // Download appCode from the github remote and save to the app folder
    const appCode: string = await fetch(
      `${extensionRemoteURL}/${extensionId}/${version}/${indexViewFile}`,
    ).then((res) => res.text());
    await writeTextFile(
      { path: `${extensionId}/${indexViewFile}`, contents: appCode },
      { dir: BaseDirectory.AppConfig },
    );

    // Download spec from the github remote and save to the app folder
    const spec: string = await fetch(
      `${extensionRemoteURL}/${extensionId}/${version}/${specFileName}`,
    ).then((res) => res.text());
    await writeTextFile(
      { path: `${extensionId}/${specFileName}`, contents: spec },
      { dir: BaseDirectory.AppConfig },
    );

    // Set the extensionMapping with the latest version
    await updateExtensionMapping(extensionId, version);

    await prefillCommandsForExtension(extensionId);

    setLoading(false);
  };

  return { download, loading };
};

export const useDeleteExtension = () => {
  const [loading, setLoading] = React.useState(false);

  const deleteExtension = async (extensionId: string) => {
    setLoading(true);

    // Delete the extension folder
    await removeDir(extensionId, { dir: BaseDirectory.AppConfig, recursive: true });

    // Delete the extension from the extension mapping
    await deleteExtensionFromMapping(extensionId);

    // Delete the commads from the table
    await deleteCommandsForExtension(extensionId);

    setLoading(false);
  };

  return { deleteExtension, loading };
};

export const useUpdateExtension = () => {
  const [loading, setLoading] = React.useState(false);
  const { download } = useDownloadExtension();
  const { deleteExtension } = useDeleteExtension();

  const updateExtension = async (extensionId: string, version: string) => {
    setLoading(true);
    await deleteExtension(extensionId);
    await download(extensionId, version);
    setLoading(false);
  };

  return { updateExtension, loading };
};
