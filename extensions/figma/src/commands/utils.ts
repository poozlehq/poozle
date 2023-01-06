/** Copyright (c) 2022, Poozle, all rights reserved. **/

export interface Project {
  id: string;
  name: string;
}

export interface TeamProjects {
  name: string;
  projects: Project[];
}

export interface ProjectFiles {
  files?: File[];
  name: string;
}

export interface File {
  key: string;
  last_modified: string;
  name: string;
  thumbnail_url: string;
}
