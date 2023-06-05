export interface BaseModelInterface {
  // Return all paths of this model
  // TODO (harshith): Return path type
  paths(): any[];

  hasPath(path: string, method: string): boolean;
}

export type Schema = Record<string, any>;
