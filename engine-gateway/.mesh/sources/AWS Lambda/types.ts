// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace AwsLambdaTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Query = {
  aws_lambda_1: aws_lambda_1Query;
};

export type AWSLambda_ListFunctionsResponse = {
  functions?: Maybe<Array<Maybe<AWSLambda_FunctionsListItem>>>;
  /** The pagination token that's included if more results are available. */
  nextMarker?: Maybe<Scalars['String']>;
};

export type AWSLambda_FunctionsListItem = {
  /** The SHA256 hash of the function's deployment package. */
  codeSha256?: Maybe<Scalars['String']>;
  /** The size of the function's deployment package, in bytes. */
  codeSize?: Maybe<Scalars['Int']>;
  /** The function's dead letter queue. */
  deadLetterConfig?: Maybe<AWSLambda_DeadLetterConfig>;
  /** The function's description. */
  description?: Maybe<Scalars['String']>;
  /** The function's <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html">environment variables</a>. */
  environment?: Maybe<AWSLambda_Environment>;
  /** Connection settings for an <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem.html">Amazon EFS file system</a>. */
  fileSystemConfigs?: Maybe<Array<Maybe<AWSLambda_FileSystemConfigsListItem>>>;
  /** The function's Amazon Resource Name (ARN). */
  functionArn?: Maybe<Scalars['String']>;
  /** The name of the function. */
  functionName?: Maybe<Scalars['String']>;
  /** The function that Lambda calls to begin executing your function. */
  handler?: Maybe<Scalars['String']>;
  /** The function's image configuration values. */
  imageConfigResponse?: Maybe<AWSLambda_ImageConfigResponse>;
  /** The KMS key that's used to encrypt the function's environment variables. This key is only returned if you've configured a customer managed CMK. */
  kMSKeyArn?: Maybe<Scalars['String']>;
  /** The date and time that the function was last updated, in <a href="https://www.w3.org/TR/NOTE-datetime">ISO-8601 format</a> (YYYY-MM-DDThh:mm:ss.sTZD). */
  lastModified?: Maybe<Scalars['String']>;
  /** The status of the last update that was performed on the function. This is first set to <code>Successful</code> after function creation completes. */
  lastUpdateStatus?: Maybe<AWSLambda_LastUpdateStatus>;
  /** The reason for the last update that was performed on the function. */
  lastUpdateStatusReason?: Maybe<Scalars['String']>;
  /** The reason code for the last update that was performed on the function. */
  lastUpdateStatusReasonCode?: Maybe<AWSLambda_LastUpdateStatusReasonCode>;
  /** The function's <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html"> layers</a>. */
  layers?: Maybe<Array<Maybe<AWSLambda_LayersListItem>>>;
  /** For Lambda@Edge functions, the ARN of the master function */
  masterArn?: Maybe<Scalars['String']>;
  /** The amount of memory available to the function at runtime.  */
  memorySize?: Maybe<Scalars['Int']>;
  /** The type of deployment package. Set to <code>Image</code> for container image and set <code>Zip</code> for .zip file archive. */
  packageType?: Maybe<AWSLambda_PackageType>;
  /** The latest updated revision of the function or alias. */
  revisionId?: Maybe<Scalars['String']>;
  /** The function's execution role. */
  role?: Maybe<Scalars['String']>;
  /** The runtime environment for the Lambda function. */
  runtime?: Maybe<AWSLambda_Runtime>;
  /** The ARN of the signing job. */
  signingJobArn?: Maybe<Scalars['String']>;
  /** The ARN of the signing profile version. */
  signingProfileVersionArn?: Maybe<Scalars['String']>;
  /** The current state of the function. When the state is <code>Inactive</code>, you can reactivate the function by invoking it. */
  state?: Maybe<AWSLambda_State>;
  /** The reason for the function's current state. */
  stateReason?: Maybe<Scalars['String']>;
  /** The reason code for the function's current state. When the code is <code>Creating</code>, you can't invoke or modify the function. */
  stateReasonCode?: Maybe<AWSLambda_StateReasonCode>;
  /** The amount of time in seconds that Lambda allows a function to run before stopping it. */
  timeout?: Maybe<Scalars['Int']>;
  /** The function's X-Ray tracing configuration. */
  tracingConfig?: Maybe<AWSLambda_TracingConfig>;
  /** The version of the Lambda function. */
  version?: Maybe<Scalars['String']>;
  /** The function's networking configuration. */
  vpcConfig?: Maybe<AWSLambda_VpcConfig>;
};

/** The function's dead letter queue. */
export type AWSLambda_DeadLetterConfig = {
  /** The Amazon Resource Name (ARN) of an Amazon SQS queue or Amazon SNS topic. */
  targetArn?: Maybe<Scalars['String']>;
};

/** The function's <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html">environment variables</a>. */
export type AWSLambda_Environment = {
  /** Error messages for environment variables that couldn't be applied. */
  error?: Maybe<AWSLambda_Error>;
  /** Environment variable key-value pairs. */
  variables?: Maybe<Scalars['JSON']>;
};

/** Error messages for environment variables that couldn't be applied. */
export type AWSLambda_Error = {
  /** The error code. */
  errorCode?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

export type AWSLambda_FileSystemConfigsListItem = {
  /** The Amazon Resource Name (ARN) of the Amazon EFS access point that provides access to the file system. */
  arn: Scalars['String'];
  /** The path where the function can access the file system, starting with <code>/mnt/</code>. */
  localMountPath: Scalars['String'];
};

/** The function's image configuration values. */
export type AWSLambda_ImageConfigResponse = {
  /** Error response to GetFunctionConfiguration. */
  error?: Maybe<AWSLambda_Error2>;
  /** Configuration values that override the container image Dockerfile. */
  imageConfig?: Maybe<AWSLambda_ImageConfig>;
};

/** Error response to GetFunctionConfiguration. */
export type AWSLambda_Error2 = {
  /** Error code. */
  errorCode?: Maybe<Scalars['String']>;
  /** Error message. */
  message?: Maybe<Scalars['String']>;
};

/** Configuration values that override the container image Dockerfile. */
export type AWSLambda_ImageConfig = {
  /** Specifies parameters that you want to pass in with ENTRYPOINT.  */
  command?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specifies the entry point to their application, which is typically the location of the runtime executable. */
  entryPoint?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specifies the working directory. */
  workingDirectory?: Maybe<Scalars['String']>;
};

export type AWSLambda_LastUpdateStatus =
  | 'SUCCESSFUL'
  | 'FAILED'
  | 'INPROGRESS';

export type AWSLambda_LastUpdateStatusReasonCode =
  | 'ENILIMITEXCEEDED'
  | 'INSUFFICIENTROLEPERMISSIONS'
  | 'INVALIDCONFIGURATION'
  | 'INTERNALERROR'
  | 'SUBNETOUTOFIPADDRESSES'
  | 'INVALIDSUBNET'
  | 'INVALIDSECURITYGROUP'
  | 'IMAGEDELETED'
  | 'IMAGEACCESSDENIED'
  | 'INVALIDIMAGE';

export type AWSLambda_LayersListItem = {
  /** The Amazon Resource Name (ARN) of the function layer. */
  arn?: Maybe<Scalars['String']>;
  /** The size of the layer archive in bytes. */
  codeSize?: Maybe<Scalars['Int']>;
  /** The Amazon Resource Name (ARN) of a signing job. */
  signingJobArn?: Maybe<Scalars['String']>;
  /** The Amazon Resource Name (ARN) for a signing profile version. */
  signingProfileVersionArn?: Maybe<Scalars['String']>;
};

export type AWSLambda_PackageType =
  | 'ZIP'
  | 'IMAGE';

export type AWSLambda_Runtime =
  | 'NODEJS'
  | 'NODEJS4_3'
  | 'NODEJS6_10'
  | 'NODEJS8_10'
  | 'NODEJS10_X'
  | 'NODEJS12_X'
  | 'NODEJS14_X'
  | 'JAVA8'
  | 'JAVA8_AL2'
  | 'JAVA11'
  | 'PYTHON2_7'
  | 'PYTHON3_6'
  | 'PYTHON3_7'
  | 'PYTHON3_8'
  | 'PYTHON3_9'
  | 'DOTNETCORE1_0'
  | 'DOTNETCORE2_0'
  | 'DOTNETCORE2_1'
  | 'DOTNETCORE3_1'
  | 'NODEJS4_3_EDGE'
  | 'GO1_X'
  | 'RUBY2_5'
  | 'RUBY2_7'
  | 'PROVIDED'
  | 'PROVIDED_AL2';

export type AWSLambda_State =
  | 'PENDING'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'FAILED';

export type AWSLambda_StateReasonCode =
  | 'IDLE'
  | 'CREATING'
  | 'RESTORING'
  | 'ENILIMITEXCEEDED'
  | 'INSUFFICIENTROLEPERMISSIONS'
  | 'INVALIDCONFIGURATION'
  | 'INTERNALERROR'
  | 'SUBNETOUTOFIPADDRESSES'
  | 'INVALIDSUBNET'
  | 'INVALIDSECURITYGROUP'
  | 'IMAGEDELETED'
  | 'IMAGEACCESSDENIED'
  | 'INVALIDIMAGE';

/** The function's X-Ray tracing configuration. */
export type AWSLambda_TracingConfig = {
  /** The tracing mode. */
  mode?: Maybe<AWSLambda_Mode>;
};

export type AWSLambda_Mode =
  | 'ACTIVE'
  | 'PASSTHROUGH';

/** The function's networking configuration. */
export type AWSLambda_VpcConfig = {
  /** A list of VPC security groups IDs. */
  securityGroupIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** A list of VPC subnet IDs. */
  subnetIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The ID of the VPC. */
  vpcId?: Maybe<Scalars['String']>;
};

export type AWSLambda_FunctionVersion =
  | 'ALL';

export type aws_lambda_1Query = {
  /**
   * <p>Returns a list of Lambda functions, with the version-specific configuration of each. Lambda returns up to 50 functions per call.</p> <p>Set <code>FunctionVersion</code> to <code>ALL</code> to include all published versions of each function in addition to the unpublished version. </p> <note> <p>The <code>ListFunctions</code> action returns a subset of the <a>FunctionConfiguration</a> fields. To get the additional fields (State, StateReasonCode, StateReason, LastUpdateStatus, LastUpdateStatusReason, LastUpdateStatusReasonCode) for a function or version, use <a>GetFunction</a>.</p> </note>
   *
   * Equivalent to GET /2015-03-31/functions/
   */
  listFunctionsResponse?: Maybe<AWSLambda_ListFunctionsResponse>;
};


export type aws_lambda_1QuerylistFunctionsResponseArgs = {
  functionVersion?: InputMaybe<AWSLambda_FunctionVersion>;
  marker?: InputMaybe<Scalars['String']>;
  masterRegion?: InputMaybe<Scalars['String']>;
  maxItems?: InputMaybe<Scalars['Int']>;
};

  export type QuerySdk = {
      /** undefined **/
  aws_lambda_1: InContextSdkMethod<Query['aws_lambda_1'], {}, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["AWS Lambda"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
