/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useClipboard, useDebouncedState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { SearchView, ExtensionSpecDataType } from '@poozle/edk';
import { open } from '@tauri-apps/api/shell';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import styles from '../common.module.scss';
import { TeamProjects, ProjectFiles, File } from '../utils';

const queryClient = new QueryClient();

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

const SearchFiles = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [searchText, setSearchText] = useDebouncedState('', 500);
  const clipboard = useClipboard({ timeout: 500 });
  const url = 'https://figma.com/file/';

  async function fetchTeamProjects(): Promise<TeamProjects> {
    try {
      const response = await fetch(
        `https://api.figma.com/v1/teams/${specData?.data.team_id}/projects`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Figma-Token': specData?.data.access_token,
          },
        },
      );

      if (!response.ok) {
        return Promise.reject(response);
      }

      const json = (await response.json()) as TeamProjects;
      return json;
    } catch (error) {
      console.error(error);
      showNotification({ message: 'Could not load team', color: 'red' });
      return Promise.resolve({ name: 'No team found', projects: [] });
    }
  }

  async function fetchFiles(): Promise<ProjectFiles[]> {
    const teamProjects = await fetchTeamProjects();
    const projects = (teamProjects.projects || []).map(async (project) => {
      try {
        const response = await fetch(`https://api.figma.com/v1/projects/${project.id}/files`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Figma-Token': specData?.data.access_token,
          },
        });

        const json = (await response.json()) as ProjectFiles;
        return { name: project.name, files: (json.files || []) as File[] };
      } catch (error) {
        console.error(error);
        showNotification({ message: 'Could not load files', color: 'red' });
        return Promise.resolve([]);
      }
    });

    return Promise.all(projects) as Promise<ProjectFiles[]>;
  }

  const { isLoading, data }: any = useQuery(['searchFiles', searchText, specData], async () => {
    const newFiles = await fetchFiles();
    return newFiles;
  });

  const rawResult = isLoading || !data ? [] : data?.map((projectFile: ProjectFiles) =>
    projectFile.files?.map((file: File) => ({
      id: file.key,
      title: file.name,
      description: ``,
      icon: 'https://poozle-assets.s3.ap-south-1.amazonaws.com/figma-assets/icons8-figma.svg',
      linkText: file.name,
      link: url+file.key,
      onTrigger: async () => {
          clipboard.copy(url + file.key);
          await open(url + file.key);
        },
    })),
  );

  const mappedResult = [].concat.apply([], rawResult);
  return (
    <div className={styles.container}>
      <SearchView
        actions={mappedResult}
        loading={isLoading}
        placeholder=""
        onQuery={(e) => setSearchText(e)}
        onClose={() => {
          resetCommand();
        }}
      />
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export, react/function-component-definition
export default function (props: CommandProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchFiles {...props} />
    </QueryClientProvider>
  );
}
