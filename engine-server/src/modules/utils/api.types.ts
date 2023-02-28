
export type ControllerBody = {
  event: string;
  slug: string;
  workspaceSlug?: string;
  dockerImage?: string;
}

export type ControllerResponse = {
  status: boolean;
  avaliableReplicas?: number; 
}

export type ExtensionBody = {
  query: string
}

export type SpecConfig = {
  spec: JSON
}

export type getSpec = {
  getSpec: SpecConfig
}