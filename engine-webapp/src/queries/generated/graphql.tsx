import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['JWT'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT'];
  user: User;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type Duration = {
  __typename?: 'Duration';
  p75: Scalars['Int'];
  p90: Scalars['Int'];
  p95: Scalars['Int'];
  p99: Scalars['Int'];
};

export type DurationOverTimeObject = {
  __typename?: 'DurationOverTimeObject';
  date: Scalars['String'];
  duration: Duration;
};

export type ExtensionAccount = {
  __typename?: 'ExtensionAccount';
  authType: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deleted?: Maybe<Scalars['DateTime']>;
  extensionAccountId: Scalars['ID'];
  extensionAccountName: Scalars['String'];
  extensionConfiguration?: Maybe<Scalars['JSON']>;
  extensionDefinition: ExtensionDefinition;
  extensionDefinitionId: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  workspace: Workspace;
  workspaceId: Scalars['String'];
};

export type ExtensionAccountCreateBody = {
  authType: Scalars['String'];
  extensionAccountName: Scalars['String'];
  extensionConfiguration?: InputMaybe<Scalars['JSON']>;
  extensionDefinitionId: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type ExtensionAccountGetRequestBody = {
  workspaceId: Scalars['String'];
};

export type ExtensionAccountMasked = {
  __typename?: 'ExtensionAccountMasked';
  createdAt: Scalars['DateTime'];
  deleted?: Maybe<Scalars['DateTime']>;
  extensionAccountId: Scalars['ID'];
  extensionAccountName: Scalars['String'];
  extensionDefinition: ExtensionDefinition;
  extensionDefinitionId: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  workspace: Workspace;
  workspaceId: Scalars['String'];
};

export type ExtensionAccountRequestIdBody = {
  extensionAccountId: Scalars['String'];
};

export type ExtensionAccountUpdateBody = {
  authType: Scalars['String'];
  extensionAccountId: Scalars['String'];
  extensionAccountName: Scalars['String'];
  extensionConfiguration?: InputMaybe<Scalars['JSON']>;
};

export type ExtensionAuth = {
  __typename?: 'ExtensionAuth';
  clientId: Scalars['String'];
  clientSecret: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deleted?: Maybe<Scalars['DateTime']>;
  extensionAuthId: Scalars['ID'];
  extensionAuthName: Scalars['String'];
  extensionDefinition: ExtensionDefinition;
  extensionDefinitionId: Scalars['String'];
  scopes: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  workspace?: Maybe<Workspace>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type ExtensionAuthCreateBody = {
  clientId: Scalars['String'];
  clientSecret: Scalars['String'];
  extensionAuthName: Scalars['String'];
  extensionDefinitionId: Scalars['String'];
  scopes: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type ExtensionAuthRequestIdBody = {
  extensionAuthId: Scalars['String'];
};

export type ExtensionAuthRequestUpdateBody = {
  clientId: Scalars['String'];
  clientSecret: Scalars['String'];
  extensionAuthId: Scalars['String'];
  extensionAuthName: Scalars['String'];
  scopes: Scalars['String'];
};

export type ExtensionAuthRequestWorkspaceIdBody = {
  workspaceId: Scalars['String'];
};

export type ExtensionDefinition = {
  __typename?: 'ExtensionDefinition';
  ExtensionAccount?: Maybe<Array<ExtensionAccount>>;
  ExtensionAuth?: Maybe<Array<ExtensionAuth>>;
  _count: ExtensionDefinitionCount;
  createdAt: Scalars['DateTime'];
  deleted?: Maybe<Scalars['DateTime']>;
  extensionDefinitionId: Scalars['ID'];
  extensionType: ExtensionType;
  icon?: Maybe<Scalars['String']>;
  key: Scalars['String'];
  name: Scalars['String'];
  releaseStage: ReleaseStage;
  source: Scalars['String'];
  spec: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  version: Scalars['String'];
  workspace?: Maybe<Workspace>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type ExtensionDefinitionCheck = {
  __typename?: 'ExtensionDefinitionCheck';
  error: Scalars['String'];
  status: Scalars['Boolean'];
};

export type ExtensionDefinitionCheckBody = {
  config: Scalars['JSON'];
  extensionDefinitionId: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type ExtensionDefinitionCount = {
  __typename?: 'ExtensionDefinitionCount';
  ExtensionAccount: Scalars['Int'];
  ExtensionAuth: Scalars['Int'];
};

export type ExtensionDefinitionCreateBody = {
  extensionType: Scalars['String'];
  icon: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  releaseStage: Scalars['String'];
  source: Scalars['String'];
  spec: Scalars['String'];
  version: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type ExtensionDefinitionRequestIdBody = {
  extensionDefinitionId: Scalars['String'];
  workspaceId?: InputMaybe<Scalars['String']>;
};

export type ExtensionDefinitionRequestWorkspaceIdBody = {
  workspaceId: Scalars['String'];
};

export type ExtensionDefinitionSpec = {
  __typename?: 'ExtensionDefinitionSpec';
  spec: Scalars['JSON'];
};

export type ExtensionDefinitionUpdateBody = {
  extensionDefinitionId: Scalars['String'];
  extensionType: Scalars['String'];
  icon: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  releaseStage: Scalars['String'];
  source: Scalars['String'];
  spec: Scalars['String'];
  version: Scalars['String'];
};

export enum ExtensionType {
  Custom = 'CUSTOM',
  Graphql = 'GRAPHQL',
  Rest = 'REST'
}

export type Gateway = {
  __typename?: 'Gateway';
  gatewayTokenId: Scalars['ID'];
  hiveToken: Scalars['String'];
  workspace?: Maybe<Workspace>;
  workspaceId?: Maybe<Scalars['String']>;
};

export type GatewayAuthToken = {
  __typename?: 'GatewayAuthToken';
  token: Scalars['String'];
};

export type GatewayAuthTokenCreateInput = {
  days?: InputMaybe<Scalars['String']>;
  workspaceId: Scalars['String'];
};

export type GeneralStats = {
  __typename?: 'GeneralStats';
  duration: Duration;
  durationOverTime: Array<DurationOverTimeObject>;
  failuresOverTime: Array<OverTimeObject>;
  requestsOverTime: Array<OverTimeObject>;
  totalFailures: Scalars['Int'];
  totalOperations: Scalars['Int'];
  totalRequests: Scalars['Int'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Logout = {
  __typename?: 'Logout';
  logout: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  createExtensionAccount: ExtensionAccountMasked;
  createExtensionAuth: ExtensionAuth;
  createExtensionDefinition: ExtensionDefinition;
  createGatewayAccessToken: GatewayAuthToken;
  createWorkspace: Workspace;
  deleteWorkspace: Workspace;
  login: Auth;
  logout: Logout;
  refreshToken: Token;
  signup: Auth;
  updateExtensionAccount: ExtensionAccountMasked;
  updateExtensionAuth: ExtensionAuth;
  updateExtensionDefinition: ExtensionDefinition;
  updateUser: User;
  updateWorkspace: Workspace;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreateExtensionAccountArgs = {
  data: ExtensionAccountCreateBody;
};


export type MutationCreateExtensionAuthArgs = {
  data: ExtensionAuthCreateBody;
};


export type MutationCreateExtensionDefinitionArgs = {
  data: ExtensionDefinitionCreateBody;
};


export type MutationCreateGatewayAccessTokenArgs = {
  data: GatewayAuthTokenCreateInput;
};


export type MutationCreateWorkspaceArgs = {
  data: WorkspaceCreateBody;
};


export type MutationDeleteWorkspaceArgs = {
  data: WorkspaceRequestIdBody;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['JWT'];
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationUpdateExtensionAccountArgs = {
  data: ExtensionAccountUpdateBody;
};


export type MutationUpdateExtensionAuthArgs = {
  data: ExtensionAuthRequestUpdateBody;
};


export type MutationUpdateExtensionDefinitionArgs = {
  data: ExtensionDefinitionUpdateBody;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateWorkspaceArgs = {
  data: WorkspaceUpdateBody;
};

export type Node = {
  __typename?: 'Node';
  count: Scalars['Int'];
  countOk: Scalars['Int'];
  duration: Duration;
  id: Scalars['String'];
  kind: Scalars['String'];
  name: Scalars['String'];
  operationHash: Scalars['String'];
  percentage: Scalars['Int'];
};

export type Operation = {
  __typename?: 'Operation';
  nodes: Array<Node>;
  total: Scalars['Int'];
};

export type OperationStats = {
  __typename?: 'OperationStats';
  operations: Array<Operation>;
};

export type OverTimeObject = {
  __typename?: 'OverTimeObject';
  date: Scalars['String'];
  value: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getExtensionAccount: ExtensionAccountMasked;
  getExtensionAccountsByWorkspace: Array<ExtensionAccountMasked>;
  getExtensionAuth: ExtensionAuth;
  getExtensionAuthsByWorkspace: Array<ExtensionAuth>;
  getExtensionDefinitionById: ExtensionDefinition;
  getExtensionDefinitions: Array<ExtensionDefinition>;
  getExtensionDefinitionsByWorkspace: Array<ExtensionDefinition>;
  getGeneralStats: GeneralStats;
  getOperations: OperationStats;
  getSpecForExtensionDefinition: ExtensionDefinitionSpec;
  getWorkspaceWithId: Workspace;
  getWorkspaces: Array<Workspace>;
  me: User;
  validateExtensionCredentials: ExtensionDefinitionCheck;
};


export type QueryGetExtensionAccountArgs = {
  data: ExtensionAccountRequestIdBody;
};


export type QueryGetExtensionAccountsByWorkspaceArgs = {
  data: ExtensionAccountGetRequestBody;
};


export type QueryGetExtensionAuthArgs = {
  data: ExtensionAuthRequestIdBody;
};


export type QueryGetExtensionAuthsByWorkspaceArgs = {
  data: ExtensionAuthRequestWorkspaceIdBody;
};


export type QueryGetExtensionDefinitionByIdArgs = {
  data: ExtensionDefinitionRequestIdBody;
};


export type QueryGetExtensionDefinitionsByWorkspaceArgs = {
  data: ExtensionDefinitionRequestWorkspaceIdBody;
};


export type QueryGetGeneralStatsArgs = {
  data: StatsInput;
};


export type QueryGetOperationsArgs = {
  data: StatsInput;
};


export type QueryGetSpecForExtensionDefinitionArgs = {
  data: ExtensionDefinitionRequestIdBody;
};


export type QueryGetWorkspaceWithIdArgs = {
  data: WorkspaceRequestIdBody;
};


export type QueryValidateExtensionCredentialsArgs = {
  data: ExtensionDefinitionCheckBody;
};

export enum ReleaseStage {
  Alpha = 'ALPHA',
  Beta = 'BETA',
  Custom = 'CUSTOM',
  GenerallyAvailable = 'GENERALLY_AVAILABLE'
}

export type SignupInput = {
  email: Scalars['String'];
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type StatsInput = {
  from: Scalars['String'];
  to: Scalars['String'];
  workspace: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['JWT'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT'];
};

export type UpdateUserInput = {
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  Workspace?: Maybe<Array<Workspace>>;
  _count: UserCount;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export type UserCount = {
  __typename?: 'UserCount';
  Workspace: Scalars['Int'];
};

export type Workspace = {
  __typename?: 'Workspace';
  ExtensionAccount?: Maybe<Array<ExtensionAccount>>;
  ExtensionAuth?: Maybe<Array<ExtensionAuth>>;
  ExtensionDefinition?: Maybe<Array<ExtensionDefinition>>;
  Gateway?: Maybe<Array<Gateway>>;
  _count: WorkspaceCount;
  anonymousDataCollection: Scalars['Boolean'];
  deleted?: Maybe<Scalars['DateTime']>;
  initialSetupComplete: Scalars['Boolean'];
  slug: Scalars['String'];
  user: User;
  userId: Scalars['String'];
  workspaceId: Scalars['ID'];
};

export type WorkspaceCount = {
  __typename?: 'WorkspaceCount';
  ExtensionAccount: Scalars['Int'];
  ExtensionAuth: Scalars['Int'];
  ExtensionDefinition: Scalars['Int'];
  Gateway: Scalars['Int'];
};

export type WorkspaceCreateBody = {
  slug: Scalars['String'];
};

export type WorkspaceRequestIdBody = {
  workspaceId: Scalars['String'];
};

export type WorkspaceUpdateBody = {
  initialSetupComplete: Scalars['Boolean'];
  workspaceId: Scalars['String'];
};

export type GetAuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthenticatedUserQuery = { __typename?: 'Query', me: { __typename?: 'User', firstname?: string | null, lastname?: string | null, email: string } };

export type LoginUserMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', accessToken: any, user: { __typename?: 'User', email: string } } };

export type SignupUserMutationVariables = Exact<{
  data: SignupInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signup: { __typename?: 'Auth', user: { __typename?: 'User', email: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Logout', logout: boolean } };

export type ExtensionAccountsQueryVariables = Exact<{
  workspaceId: Scalars['String'];
}>;


export type ExtensionAccountsQuery = { __typename?: 'Query', getExtensionAccountsByWorkspace: Array<{ __typename?: 'ExtensionAccountMasked', name: string, extensionAccountName: string, extensionAccountId: string, updatedAt: any, extensionDefinition: { __typename?: 'ExtensionDefinition', name: string, icon?: string | null } }> };

export type GetExtensionAccountQueryVariables = Exact<{
  extensionAccountId: Scalars['String'];
}>;


export type GetExtensionAccountQuery = { __typename?: 'Query', getExtensionAccount: { __typename?: 'ExtensionAccountMasked', extensionAccountId: string, extensionAccountName: string, extensionDefinitionId: string } };

export type CreateExtensionAccountMutationVariables = Exact<{
  extensionCreateBody: ExtensionAccountCreateBody;
}>;


export type CreateExtensionAccountMutation = { __typename?: 'Mutation', createExtensionAccount: { __typename?: 'ExtensionAccountMasked', extensionAccountId: string, extensionAccountName: string } };

export type UpdateExtensionAccountMutationVariables = Exact<{
  extensionUpdateBody: ExtensionAccountUpdateBody;
}>;


export type UpdateExtensionAccountMutation = { __typename?: 'Mutation', updateExtensionAccount: { __typename?: 'ExtensionAccountMasked', extensionAccountId: string, extensionAccountName: string } };

export type ExtensionAuthsQueryVariables = Exact<{
  workspaceId: Scalars['String'];
}>;


export type ExtensionAuthsQuery = { __typename?: 'Query', getExtensionAuthsByWorkspace: Array<{ __typename?: 'ExtensionAuth', extensionAuthName: string, extensionAuthId: string, updatedAt: any, extensionDefinition: { __typename?: 'ExtensionDefinition', name: string, icon?: string | null } }> };

export type GetExtensionAuthQueryVariables = Exact<{
  extensionAuthId: Scalars['String'];
}>;


export type GetExtensionAuthQuery = { __typename?: 'Query', getExtensionAuth: { __typename?: 'ExtensionAuth', extensionAuthId: string, extensionAuthName: string, extensionDefinitionId: string, clientId: string, scopes: string } };

export type CreateExtensionAuthMutationVariables = Exact<{
  extensionCreateBody: ExtensionAuthCreateBody;
}>;


export type CreateExtensionAuthMutation = { __typename?: 'Mutation', createExtensionAuth: { __typename?: 'ExtensionAuth', extensionAuthId: string, extensionAuthName: string } };

export type UpdateExtensionAuthMutationVariables = Exact<{
  extensionUpdateBody: ExtensionAuthRequestUpdateBody;
}>;


export type UpdateExtensionAuthMutation = { __typename?: 'Mutation', updateExtensionAuth: { __typename?: 'ExtensionAuth', extensionAuthId: string, extensionAuthName: string, clientId: string, clientSecret: string, scopes: string } };

export type ExtensionDefinitionsQueryVariables = Exact<{
  workspaceId: Scalars['String'];
}>;


export type ExtensionDefinitionsQuery = { __typename?: 'Query', getExtensionDefinitionsByWorkspace: Array<{ __typename?: 'ExtensionDefinition', name: string, icon?: string | null, releaseStage: ReleaseStage, extensionDefinitionId: string }> };

export type SpecForExtensionDefinitionQueryVariables = Exact<{
  workspaceId: Scalars['String'];
  extensionDefinitionId: Scalars['String'];
}>;


export type SpecForExtensionDefinitionQuery = { __typename?: 'Query', getSpecForExtensionDefinition: { __typename?: 'ExtensionDefinitionSpec', spec: any } };

export type ValidateCredentialsForExtensionQueryVariables = Exact<{
  workspaceId: Scalars['String'];
  extensionDefinitionId: Scalars['String'];
  config: Scalars['JSON'];
}>;


export type ValidateCredentialsForExtensionQuery = { __typename?: 'Query', validateExtensionCredentials: { __typename?: 'ExtensionDefinitionCheck', status: boolean } };

export type CreateGatewayAuthTokenMutationVariables = Exact<{
  workspaceId: Scalars['String'];
}>;


export type CreateGatewayAuthTokenMutation = { __typename?: 'Mutation', createGatewayAccessToken: { __typename?: 'GatewayAuthToken', token: string } };

export type GeneralStatsQueryVariables = Exact<{
  statsInput: StatsInput;
}>;


export type GeneralStatsQuery = { __typename?: 'Query', getGeneralStats: { __typename?: 'GeneralStats', totalFailures: number, totalOperations: number, totalRequests: number, duration: { __typename?: 'Duration', p90: number, p95: number, p99: number }, durationOverTime: Array<{ __typename?: 'DurationOverTimeObject', date: string, duration: { __typename?: 'Duration', p90: number, p95: number, p99: number } }>, failuresOverTime: Array<{ __typename?: 'OverTimeObject', date: string, value: number }>, requestsOverTime: Array<{ __typename?: 'OverTimeObject', date: string, value: number }> } };

export type OperationsStatsQueryVariables = Exact<{
  statsInput: StatsInput;
}>;


export type OperationsStatsQuery = { __typename?: 'Query', getOperations: { __typename?: 'OperationStats', operations: Array<{ __typename?: 'Operation', total: number, nodes: Array<{ __typename?: 'Node', count: number, countOk: number, id: string, kind: string, name: string, operationHash: string, percentage: number, duration: { __typename?: 'Duration', p90: number, p95: number, p99: number } }> }> } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', me: { __typename?: 'User', firstname?: string | null, lastname?: string | null, email: string, Workspace?: Array<{ __typename?: 'Workspace', workspaceId: string, slug: string, anonymousDataCollection: boolean, initialSetupComplete: boolean }> | null } };

export type UpdateUserMutationVariables = Exact<{
  updateUser: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', firstname?: string | null, lastname?: string | null } };

export type GetWorkspacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkspacesQuery = { __typename?: 'Query', getWorkspaces: Array<{ __typename?: 'Workspace', workspaceId: string, slug: string, initialSetupComplete: boolean }> };

export type UpdateWorkspaceMutationVariables = Exact<{
  workspaceUpdateBody: WorkspaceUpdateBody;
}>;


export type UpdateWorkspaceMutation = { __typename?: 'Mutation', updateWorkspace: { __typename?: 'Workspace', workspaceId: string } };


export const GetAuthenticatedUserDocument = gql`
    query GetAuthenticatedUser {
  me {
    firstname
    lastname
    email
  }
}
    `;

/**
 * __useGetAuthenticatedUserQuery__
 *
 * To run a query within a React component, call `useGetAuthenticatedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthenticatedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthenticatedUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthenticatedUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>(GetAuthenticatedUserDocument, options);
      }
export function useGetAuthenticatedUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>(GetAuthenticatedUserDocument, options);
        }
export type GetAuthenticatedUserQueryHookResult = ReturnType<typeof useGetAuthenticatedUserQuery>;
export type GetAuthenticatedUserLazyQueryHookResult = ReturnType<typeof useGetAuthenticatedUserLazyQuery>;
export type GetAuthenticatedUserQueryResult = Apollo.QueryResult<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginInput!) {
  login(data: $data) {
    user {
      email
    }
    accessToken
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const SignupUserDocument = gql`
    mutation SignupUser($data: SignupInput!) {
  signup(data: $data) {
    user {
      email
    }
  }
}
    `;
export type SignupUserMutationFn = Apollo.MutationFunction<SignupUserMutation, SignupUserMutationVariables>;

/**
 * __useSignupUserMutation__
 *
 * To run a mutation, you first call `useSignupUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupUserMutation, { data, loading, error }] = useSignupUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupUserMutation(baseOptions?: Apollo.MutationHookOptions<SignupUserMutation, SignupUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupUserMutation, SignupUserMutationVariables>(SignupUserDocument, options);
      }
export type SignupUserMutationHookResult = ReturnType<typeof useSignupUserMutation>;
export type SignupUserMutationResult = Apollo.MutationResult<SignupUserMutation>;
export type SignupUserMutationOptions = Apollo.BaseMutationOptions<SignupUserMutation, SignupUserMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    logout
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ExtensionAccountsDocument = gql`
    query ExtensionAccounts($workspaceId: String!) {
  getExtensionAccountsByWorkspace(data: {workspaceId: $workspaceId}) {
    name
    extensionAccountName
    extensionAccountId
    extensionDefinition {
      name
      icon
    }
    updatedAt
  }
}
    `;

/**
 * __useExtensionAccountsQuery__
 *
 * To run a query within a React component, call `useExtensionAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExtensionAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExtensionAccountsQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useExtensionAccountsQuery(baseOptions: Apollo.QueryHookOptions<ExtensionAccountsQuery, ExtensionAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExtensionAccountsQuery, ExtensionAccountsQueryVariables>(ExtensionAccountsDocument, options);
      }
export function useExtensionAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExtensionAccountsQuery, ExtensionAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExtensionAccountsQuery, ExtensionAccountsQueryVariables>(ExtensionAccountsDocument, options);
        }
export type ExtensionAccountsQueryHookResult = ReturnType<typeof useExtensionAccountsQuery>;
export type ExtensionAccountsLazyQueryHookResult = ReturnType<typeof useExtensionAccountsLazyQuery>;
export type ExtensionAccountsQueryResult = Apollo.QueryResult<ExtensionAccountsQuery, ExtensionAccountsQueryVariables>;
export const GetExtensionAccountDocument = gql`
    query GetExtensionAccount($extensionAccountId: String!) {
  getExtensionAccount(data: {extensionAccountId: $extensionAccountId}) {
    extensionAccountId
    extensionAccountName
    extensionDefinitionId
  }
}
    `;

/**
 * __useGetExtensionAccountQuery__
 *
 * To run a query within a React component, call `useGetExtensionAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExtensionAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExtensionAccountQuery({
 *   variables: {
 *      extensionAccountId: // value for 'extensionAccountId'
 *   },
 * });
 */
export function useGetExtensionAccountQuery(baseOptions: Apollo.QueryHookOptions<GetExtensionAccountQuery, GetExtensionAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExtensionAccountQuery, GetExtensionAccountQueryVariables>(GetExtensionAccountDocument, options);
      }
export function useGetExtensionAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExtensionAccountQuery, GetExtensionAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExtensionAccountQuery, GetExtensionAccountQueryVariables>(GetExtensionAccountDocument, options);
        }
export type GetExtensionAccountQueryHookResult = ReturnType<typeof useGetExtensionAccountQuery>;
export type GetExtensionAccountLazyQueryHookResult = ReturnType<typeof useGetExtensionAccountLazyQuery>;
export type GetExtensionAccountQueryResult = Apollo.QueryResult<GetExtensionAccountQuery, GetExtensionAccountQueryVariables>;
export const CreateExtensionAccountDocument = gql`
    mutation CreateExtensionAccount($extensionCreateBody: ExtensionAccountCreateBody!) {
  createExtensionAccount(data: $extensionCreateBody) {
    extensionAccountId
    extensionAccountName
  }
}
    `;
export type CreateExtensionAccountMutationFn = Apollo.MutationFunction<CreateExtensionAccountMutation, CreateExtensionAccountMutationVariables>;

/**
 * __useCreateExtensionAccountMutation__
 *
 * To run a mutation, you first call `useCreateExtensionAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExtensionAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExtensionAccountMutation, { data, loading, error }] = useCreateExtensionAccountMutation({
 *   variables: {
 *      extensionCreateBody: // value for 'extensionCreateBody'
 *   },
 * });
 */
export function useCreateExtensionAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateExtensionAccountMutation, CreateExtensionAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExtensionAccountMutation, CreateExtensionAccountMutationVariables>(CreateExtensionAccountDocument, options);
      }
export type CreateExtensionAccountMutationHookResult = ReturnType<typeof useCreateExtensionAccountMutation>;
export type CreateExtensionAccountMutationResult = Apollo.MutationResult<CreateExtensionAccountMutation>;
export type CreateExtensionAccountMutationOptions = Apollo.BaseMutationOptions<CreateExtensionAccountMutation, CreateExtensionAccountMutationVariables>;
export const UpdateExtensionAccountDocument = gql`
    mutation UpdateExtensionAccount($extensionUpdateBody: ExtensionAccountUpdateBody!) {
  updateExtensionAccount(data: $extensionUpdateBody) {
    extensionAccountId
    extensionAccountName
  }
}
    `;
export type UpdateExtensionAccountMutationFn = Apollo.MutationFunction<UpdateExtensionAccountMutation, UpdateExtensionAccountMutationVariables>;

/**
 * __useUpdateExtensionAccountMutation__
 *
 * To run a mutation, you first call `useUpdateExtensionAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExtensionAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExtensionAccountMutation, { data, loading, error }] = useUpdateExtensionAccountMutation({
 *   variables: {
 *      extensionUpdateBody: // value for 'extensionUpdateBody'
 *   },
 * });
 */
export function useUpdateExtensionAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExtensionAccountMutation, UpdateExtensionAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExtensionAccountMutation, UpdateExtensionAccountMutationVariables>(UpdateExtensionAccountDocument, options);
      }
export type UpdateExtensionAccountMutationHookResult = ReturnType<typeof useUpdateExtensionAccountMutation>;
export type UpdateExtensionAccountMutationResult = Apollo.MutationResult<UpdateExtensionAccountMutation>;
export type UpdateExtensionAccountMutationOptions = Apollo.BaseMutationOptions<UpdateExtensionAccountMutation, UpdateExtensionAccountMutationVariables>;
export const ExtensionAuthsDocument = gql`
    query ExtensionAuths($workspaceId: String!) {
  getExtensionAuthsByWorkspace(data: {workspaceId: $workspaceId}) {
    extensionAuthName
    extensionAuthId
    extensionDefinition {
      name
      icon
    }
    updatedAt
  }
}
    `;

/**
 * __useExtensionAuthsQuery__
 *
 * To run a query within a React component, call `useExtensionAuthsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExtensionAuthsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExtensionAuthsQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useExtensionAuthsQuery(baseOptions: Apollo.QueryHookOptions<ExtensionAuthsQuery, ExtensionAuthsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExtensionAuthsQuery, ExtensionAuthsQueryVariables>(ExtensionAuthsDocument, options);
      }
export function useExtensionAuthsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExtensionAuthsQuery, ExtensionAuthsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExtensionAuthsQuery, ExtensionAuthsQueryVariables>(ExtensionAuthsDocument, options);
        }
export type ExtensionAuthsQueryHookResult = ReturnType<typeof useExtensionAuthsQuery>;
export type ExtensionAuthsLazyQueryHookResult = ReturnType<typeof useExtensionAuthsLazyQuery>;
export type ExtensionAuthsQueryResult = Apollo.QueryResult<ExtensionAuthsQuery, ExtensionAuthsQueryVariables>;
export const GetExtensionAuthDocument = gql`
    query GetExtensionAuth($extensionAuthId: String!) {
  getExtensionAuth(data: {extensionAuthId: $extensionAuthId}) {
    extensionAuthId
    extensionAuthName
    extensionDefinitionId
    clientId
    scopes
  }
}
    `;

/**
 * __useGetExtensionAuthQuery__
 *
 * To run a query within a React component, call `useGetExtensionAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExtensionAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExtensionAuthQuery({
 *   variables: {
 *      extensionAuthId: // value for 'extensionAuthId'
 *   },
 * });
 */
export function useGetExtensionAuthQuery(baseOptions: Apollo.QueryHookOptions<GetExtensionAuthQuery, GetExtensionAuthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExtensionAuthQuery, GetExtensionAuthQueryVariables>(GetExtensionAuthDocument, options);
      }
export function useGetExtensionAuthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExtensionAuthQuery, GetExtensionAuthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExtensionAuthQuery, GetExtensionAuthQueryVariables>(GetExtensionAuthDocument, options);
        }
export type GetExtensionAuthQueryHookResult = ReturnType<typeof useGetExtensionAuthQuery>;
export type GetExtensionAuthLazyQueryHookResult = ReturnType<typeof useGetExtensionAuthLazyQuery>;
export type GetExtensionAuthQueryResult = Apollo.QueryResult<GetExtensionAuthQuery, GetExtensionAuthQueryVariables>;
export const CreateExtensionAuthDocument = gql`
    mutation CreateExtensionAuth($extensionCreateBody: ExtensionAuthCreateBody!) {
  createExtensionAuth(data: $extensionCreateBody) {
    extensionAuthId
    extensionAuthName
  }
}
    `;
export type CreateExtensionAuthMutationFn = Apollo.MutationFunction<CreateExtensionAuthMutation, CreateExtensionAuthMutationVariables>;

/**
 * __useCreateExtensionAuthMutation__
 *
 * To run a mutation, you first call `useCreateExtensionAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExtensionAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExtensionAuthMutation, { data, loading, error }] = useCreateExtensionAuthMutation({
 *   variables: {
 *      extensionCreateBody: // value for 'extensionCreateBody'
 *   },
 * });
 */
export function useCreateExtensionAuthMutation(baseOptions?: Apollo.MutationHookOptions<CreateExtensionAuthMutation, CreateExtensionAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExtensionAuthMutation, CreateExtensionAuthMutationVariables>(CreateExtensionAuthDocument, options);
      }
export type CreateExtensionAuthMutationHookResult = ReturnType<typeof useCreateExtensionAuthMutation>;
export type CreateExtensionAuthMutationResult = Apollo.MutationResult<CreateExtensionAuthMutation>;
export type CreateExtensionAuthMutationOptions = Apollo.BaseMutationOptions<CreateExtensionAuthMutation, CreateExtensionAuthMutationVariables>;
export const UpdateExtensionAuthDocument = gql`
    mutation UpdateExtensionAuth($extensionUpdateBody: ExtensionAuthRequestUpdateBody!) {
  updateExtensionAuth(data: $extensionUpdateBody) {
    extensionAuthId
    extensionAuthName
    clientId
    clientSecret
    scopes
  }
}
    `;
export type UpdateExtensionAuthMutationFn = Apollo.MutationFunction<UpdateExtensionAuthMutation, UpdateExtensionAuthMutationVariables>;

/**
 * __useUpdateExtensionAuthMutation__
 *
 * To run a mutation, you first call `useUpdateExtensionAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExtensionAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExtensionAuthMutation, { data, loading, error }] = useUpdateExtensionAuthMutation({
 *   variables: {
 *      extensionUpdateBody: // value for 'extensionUpdateBody'
 *   },
 * });
 */
export function useUpdateExtensionAuthMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExtensionAuthMutation, UpdateExtensionAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExtensionAuthMutation, UpdateExtensionAuthMutationVariables>(UpdateExtensionAuthDocument, options);
      }
export type UpdateExtensionAuthMutationHookResult = ReturnType<typeof useUpdateExtensionAuthMutation>;
export type UpdateExtensionAuthMutationResult = Apollo.MutationResult<UpdateExtensionAuthMutation>;
export type UpdateExtensionAuthMutationOptions = Apollo.BaseMutationOptions<UpdateExtensionAuthMutation, UpdateExtensionAuthMutationVariables>;
export const ExtensionDefinitionsDocument = gql`
    query ExtensionDefinitions($workspaceId: String!) {
  getExtensionDefinitionsByWorkspace(data: {workspaceId: $workspaceId}) {
    name
    icon
    releaseStage
    extensionDefinitionId
  }
}
    `;

/**
 * __useExtensionDefinitionsQuery__
 *
 * To run a query within a React component, call `useExtensionDefinitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExtensionDefinitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExtensionDefinitionsQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useExtensionDefinitionsQuery(baseOptions: Apollo.QueryHookOptions<ExtensionDefinitionsQuery, ExtensionDefinitionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExtensionDefinitionsQuery, ExtensionDefinitionsQueryVariables>(ExtensionDefinitionsDocument, options);
      }
export function useExtensionDefinitionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExtensionDefinitionsQuery, ExtensionDefinitionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExtensionDefinitionsQuery, ExtensionDefinitionsQueryVariables>(ExtensionDefinitionsDocument, options);
        }
export type ExtensionDefinitionsQueryHookResult = ReturnType<typeof useExtensionDefinitionsQuery>;
export type ExtensionDefinitionsLazyQueryHookResult = ReturnType<typeof useExtensionDefinitionsLazyQuery>;
export type ExtensionDefinitionsQueryResult = Apollo.QueryResult<ExtensionDefinitionsQuery, ExtensionDefinitionsQueryVariables>;
export const SpecForExtensionDefinitionDocument = gql`
    query SpecForExtensionDefinition($workspaceId: String!, $extensionDefinitionId: String!) {
  getSpecForExtensionDefinition(
    data: {extensionDefinitionId: $extensionDefinitionId, workspaceId: $workspaceId}
  ) {
    spec
  }
}
    `;

/**
 * __useSpecForExtensionDefinitionQuery__
 *
 * To run a query within a React component, call `useSpecForExtensionDefinitionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpecForExtensionDefinitionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpecForExtensionDefinitionQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      extensionDefinitionId: // value for 'extensionDefinitionId'
 *   },
 * });
 */
export function useSpecForExtensionDefinitionQuery(baseOptions: Apollo.QueryHookOptions<SpecForExtensionDefinitionQuery, SpecForExtensionDefinitionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpecForExtensionDefinitionQuery, SpecForExtensionDefinitionQueryVariables>(SpecForExtensionDefinitionDocument, options);
      }
export function useSpecForExtensionDefinitionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpecForExtensionDefinitionQuery, SpecForExtensionDefinitionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpecForExtensionDefinitionQuery, SpecForExtensionDefinitionQueryVariables>(SpecForExtensionDefinitionDocument, options);
        }
export type SpecForExtensionDefinitionQueryHookResult = ReturnType<typeof useSpecForExtensionDefinitionQuery>;
export type SpecForExtensionDefinitionLazyQueryHookResult = ReturnType<typeof useSpecForExtensionDefinitionLazyQuery>;
export type SpecForExtensionDefinitionQueryResult = Apollo.QueryResult<SpecForExtensionDefinitionQuery, SpecForExtensionDefinitionQueryVariables>;
export const ValidateCredentialsForExtensionDocument = gql`
    query ValidateCredentialsForExtension($workspaceId: String!, $extensionDefinitionId: String!, $config: JSON!) {
  validateExtensionCredentials(
    data: {config: $config, extensionDefinitionId: $extensionDefinitionId, workspaceId: $workspaceId}
  ) {
    status
  }
}
    `;

/**
 * __useValidateCredentialsForExtensionQuery__
 *
 * To run a query within a React component, call `useValidateCredentialsForExtensionQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateCredentialsForExtensionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateCredentialsForExtensionQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      extensionDefinitionId: // value for 'extensionDefinitionId'
 *      config: // value for 'config'
 *   },
 * });
 */
export function useValidateCredentialsForExtensionQuery(baseOptions: Apollo.QueryHookOptions<ValidateCredentialsForExtensionQuery, ValidateCredentialsForExtensionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateCredentialsForExtensionQuery, ValidateCredentialsForExtensionQueryVariables>(ValidateCredentialsForExtensionDocument, options);
      }
export function useValidateCredentialsForExtensionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateCredentialsForExtensionQuery, ValidateCredentialsForExtensionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateCredentialsForExtensionQuery, ValidateCredentialsForExtensionQueryVariables>(ValidateCredentialsForExtensionDocument, options);
        }
export type ValidateCredentialsForExtensionQueryHookResult = ReturnType<typeof useValidateCredentialsForExtensionQuery>;
export type ValidateCredentialsForExtensionLazyQueryHookResult = ReturnType<typeof useValidateCredentialsForExtensionLazyQuery>;
export type ValidateCredentialsForExtensionQueryResult = Apollo.QueryResult<ValidateCredentialsForExtensionQuery, ValidateCredentialsForExtensionQueryVariables>;
export const CreateGatewayAuthTokenDocument = gql`
    mutation createGatewayAuthToken($workspaceId: String!) {
  createGatewayAccessToken(data: {workspaceId: $workspaceId}) {
    token
  }
}
    `;
export type CreateGatewayAuthTokenMutationFn = Apollo.MutationFunction<CreateGatewayAuthTokenMutation, CreateGatewayAuthTokenMutationVariables>;

/**
 * __useCreateGatewayAuthTokenMutation__
 *
 * To run a mutation, you first call `useCreateGatewayAuthTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGatewayAuthTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGatewayAuthTokenMutation, { data, loading, error }] = useCreateGatewayAuthTokenMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useCreateGatewayAuthTokenMutation(baseOptions?: Apollo.MutationHookOptions<CreateGatewayAuthTokenMutation, CreateGatewayAuthTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGatewayAuthTokenMutation, CreateGatewayAuthTokenMutationVariables>(CreateGatewayAuthTokenDocument, options);
      }
export type CreateGatewayAuthTokenMutationHookResult = ReturnType<typeof useCreateGatewayAuthTokenMutation>;
export type CreateGatewayAuthTokenMutationResult = Apollo.MutationResult<CreateGatewayAuthTokenMutation>;
export type CreateGatewayAuthTokenMutationOptions = Apollo.BaseMutationOptions<CreateGatewayAuthTokenMutation, CreateGatewayAuthTokenMutationVariables>;
export const GeneralStatsDocument = gql`
    query GeneralStats($statsInput: StatsInput!) {
  getGeneralStats(data: $statsInput) {
    duration {
      p90
      p95
      p99
    }
    durationOverTime {
      date
      duration {
        p90
        p95
        p99
      }
    }
    failuresOverTime {
      date
      value
    }
    requestsOverTime {
      date
      value
    }
    totalFailures
    totalOperations
    totalRequests
  }
}
    `;

/**
 * __useGeneralStatsQuery__
 *
 * To run a query within a React component, call `useGeneralStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneralStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneralStatsQuery({
 *   variables: {
 *      statsInput: // value for 'statsInput'
 *   },
 * });
 */
export function useGeneralStatsQuery(baseOptions: Apollo.QueryHookOptions<GeneralStatsQuery, GeneralStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeneralStatsQuery, GeneralStatsQueryVariables>(GeneralStatsDocument, options);
      }
export function useGeneralStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneralStatsQuery, GeneralStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeneralStatsQuery, GeneralStatsQueryVariables>(GeneralStatsDocument, options);
        }
export type GeneralStatsQueryHookResult = ReturnType<typeof useGeneralStatsQuery>;
export type GeneralStatsLazyQueryHookResult = ReturnType<typeof useGeneralStatsLazyQuery>;
export type GeneralStatsQueryResult = Apollo.QueryResult<GeneralStatsQuery, GeneralStatsQueryVariables>;
export const OperationsStatsDocument = gql`
    query OperationsStats($statsInput: StatsInput!) {
  getOperations(data: $statsInput) {
    operations {
      total
      nodes {
        count
        countOk
        duration {
          p90
          p95
          p99
        }
        id
        kind
        name
        operationHash
        percentage
      }
    }
  }
}
    `;

/**
 * __useOperationsStatsQuery__
 *
 * To run a query within a React component, call `useOperationsStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOperationsStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOperationsStatsQuery({
 *   variables: {
 *      statsInput: // value for 'statsInput'
 *   },
 * });
 */
export function useOperationsStatsQuery(baseOptions: Apollo.QueryHookOptions<OperationsStatsQuery, OperationsStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OperationsStatsQuery, OperationsStatsQueryVariables>(OperationsStatsDocument, options);
      }
export function useOperationsStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OperationsStatsQuery, OperationsStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OperationsStatsQuery, OperationsStatsQueryVariables>(OperationsStatsDocument, options);
        }
export type OperationsStatsQueryHookResult = ReturnType<typeof useOperationsStatsQuery>;
export type OperationsStatsLazyQueryHookResult = ReturnType<typeof useOperationsStatsLazyQuery>;
export type OperationsStatsQueryResult = Apollo.QueryResult<OperationsStatsQuery, OperationsStatsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser {
  me {
    firstname
    lastname
    email
    Workspace {
      workspaceId
      slug
      anonymousDataCollection
      initialSetupComplete
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUser: UpdateUserInput!) {
  updateUser(data: $updateUser) {
    firstname
    lastname
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUser: // value for 'updateUser'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetWorkspacesDocument = gql`
    query GetWorkspaces {
  getWorkspaces {
    workspaceId
    slug
    initialSetupComplete
  }
}
    `;

/**
 * __useGetWorkspacesQuery__
 *
 * To run a query within a React component, call `useGetWorkspacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWorkspacesQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkspacesQuery, GetWorkspacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkspacesQuery, GetWorkspacesQueryVariables>(GetWorkspacesDocument, options);
      }
export function useGetWorkspacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspacesQuery, GetWorkspacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkspacesQuery, GetWorkspacesQueryVariables>(GetWorkspacesDocument, options);
        }
export type GetWorkspacesQueryHookResult = ReturnType<typeof useGetWorkspacesQuery>;
export type GetWorkspacesLazyQueryHookResult = ReturnType<typeof useGetWorkspacesLazyQuery>;
export type GetWorkspacesQueryResult = Apollo.QueryResult<GetWorkspacesQuery, GetWorkspacesQueryVariables>;
export const UpdateWorkspaceDocument = gql`
    mutation UpdateWorkspace($workspaceUpdateBody: WorkspaceUpdateBody!) {
  updateWorkspace(data: $workspaceUpdateBody) {
    workspaceId
  }
}
    `;
export type UpdateWorkspaceMutationFn = Apollo.MutationFunction<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>;

/**
 * __useUpdateWorkspaceMutation__
 *
 * To run a mutation, you first call `useUpdateWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkspaceMutation, { data, loading, error }] = useUpdateWorkspaceMutation({
 *   variables: {
 *      workspaceUpdateBody: // value for 'workspaceUpdateBody'
 *   },
 * });
 */
export function useUpdateWorkspaceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(UpdateWorkspaceDocument, options);
      }
export type UpdateWorkspaceMutationHookResult = ReturnType<typeof useUpdateWorkspaceMutation>;
export type UpdateWorkspaceMutationResult = Apollo.MutationResult<UpdateWorkspaceMutation>;
export type UpdateWorkspaceMutationOptions = Apollo.BaseMutationOptions<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>;