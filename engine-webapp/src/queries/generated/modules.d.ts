
declare module '*/authentication.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetAuthenticatedUser: DocumentNode;
export const LoginUser: DocumentNode;
export const SignupUser: DocumentNode;
export const Logout: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/extension_account.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ExtensionAccounts: DocumentNode;
export const GetExtensionAccount: DocumentNode;
export const CreateExtensionAccount: DocumentNode;
export const UpdateExtensionAccount: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/extension_auth.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ExtensionAuths: DocumentNode;
export const GetExtensionAuth: DocumentNode;
export const CreateExtensionAuth: DocumentNode;
export const UpdateExtensionAuth: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/extension_definition.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ExtensionDefinitions: DocumentNode;
export const SpecForExtensionDefinition: DocumentNode;
export const ValidateCredentialsForExtension: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/gateway_auth.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const createGatewayAuthToken: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/monitoring.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GeneralStats: DocumentNode;
export const OperationsStats: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/user.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetUser: DocumentNode;
export const UpdateUser: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/workspace.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetWorkspaces: DocumentNode;
export const UpdateWorkspace: DocumentNode;

  export default defaultDocument;
}
    