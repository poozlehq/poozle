/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  applyRequestTransforms,
  applyResultTransforms,
  applySchemaTransforms,
} from '@graphql-mesh/utils';
import { Transform } from '@graphql-tools/delegate';
import { selectObjectFields } from '@graphql-tools/utils';
import { WrapType } from '@graphql-tools/wrap';
import { GraphQLSchema } from 'graphql';

const DEFUALT_APPLY_TO = {
  query: true,
  mutation: true,
  subscription: true,
};

// type RootType = 'Query' | 'Mutation' | 'Subscription';

export default class EncapsulateTransform {
  private transformMap: any = {};
  private transforms: Transform[] = [];

  constructor(name: string) {
    if (!name) {
      throw new Error(
        `Unable to execute encapsulate transform without a name. Please make sure to use it over a specific schema, or specify a name in your configuration!`,
      );
    }

    const applyTo = { ...DEFUALT_APPLY_TO };

    if (applyTo.query) {
      this.transformMap.Query = new WrapType(
        'Query',
        `${name}Query`,
        name,
      ) as any;
    }
    if (applyTo.mutation) {
      this.transformMap.Mutation = new WrapType(
        'Mutation',
        `${name}Mutation`,
        name,
      ) as any;
    }
    if (applyTo.subscription) {
      this.transformMap.Subscription = new WrapType(
        'Subscription',
        `${name}Subscription`,
        name,
      ) as any;
    }
  }

  *generateSchemaTransforms(originalWrappingSchema: GraphQLSchema) {
    for (const typeName of Object.keys(this.transformMap)) {
      const fieldConfigMap = selectObjectFields(
        originalWrappingSchema,
        typeName,
        () => true,
      );
      if (Object.keys(fieldConfigMap).length) {
        yield this.transformMap[typeName];
      }
    }
  }

  transformSchema(
    originalWrappingSchema: any,
    subschemaConfig: any,
    transformedSchema?: any,
  ) {
    this.transforms = [
      ...this.generateSchemaTransforms(originalWrappingSchema),
    ];
    return applySchemaTransforms(
      originalWrappingSchema,
      subschemaConfig,
      transformedSchema,
      this.transforms,
    );
  }

  transformRequest(
    originalRequest: any,
    delegationContext: any,
    transformationContext: Record<string, any>,
  ) {
    return applyRequestTransforms(
      originalRequest,
      delegationContext,
      transformationContext,
      this.transforms,
    );
  }

  transformResult(
    originalResult: any,
    delegationContext: any,
    transformationContext: any,
  ) {
    return applyResultTransforms(
      originalResult,
      delegationContext,
      transformationContext,
      this.transforms,
    );
  }
}
