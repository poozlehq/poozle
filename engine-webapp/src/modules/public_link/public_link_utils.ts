/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp/entities';
import { Link } from '@@generated/link/entities';
import { Specification } from '@poozle/engine-idk';

import {
  getAllInputProperties,
  getProperties,
} from 'modules/integration_account/new_integration_account/new_integration_account_form_utils';

export function makeId(length: number) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function getValidationForInside(initialValues: any, authType: string) {
  const validate: any = {};

  Object.keys(initialValues).forEach((key: any) => {
    validate[key] = (value: string, values: any) => {
      if (values.authType === authType) {
        return value ? null : 'Invalid';
      }

      return null;
    };
  });

  return validate;
}

export function getValidateObject(initialValues: any) {
  const validate: any = {};
  Object.keys(initialValues).forEach((key: any) => {
    validate[key] = (value: string) => (value ? null : `Invalid`);

    if (typeof initialValues[key] === 'object') {
      validate[key] = getValidationForInside(initialValues[key], key);
    }
  });

  return validate;
}

export function getAllProperties(spec: Specification, authType: string) {
  if (authType) {
    if (authType === 'OAuth2') {
      return spec.other_inputs
        ? getProperties(spec.other_inputs.input_specification)
        : [];
    }
    return getAllInputProperties(spec, authType);
  }

  return [];
}

export function getConnectedAccounts(link: Link) {
  const integrationDefinitions: any = {};

  link.integrationAccounts.forEach((ia) => {
    const integrationDefinition = link.integrationDefinitions.find(
      (id) => id.integrationDefinitionId === ia.integrationDefinitionId,
    );

    if (integrationDefinitions[integrationDefinition.name]) {
      integrationDefinitions[integrationDefinition.name] =
        integrationDefinitions[integrationDefinition.name] + 1;
    } else {
      integrationDefinitions[integrationDefinition.name] = 1;
    }
  });

  return integrationDefinitions;
}

export function getSpec(
  oAuthApp: IntegrationOAuthApp,
  initialSpec: Specification,
  preferOAuth: boolean,
) {
  let spec = initialSpec;

  if (!oAuthApp) {
    const currentSpecification = initialSpec.auth_specification;
    delete currentSpecification['OAuth2'];

    spec = {
      ...initialSpec,
      auth_specification: currentSpecification,
    };
  }

  if (
    oAuthApp &&
    Object.keys(spec.auth_specification).includes('OAuth2') &&
    preferOAuth
  ) {
    const currentSpecification = initialSpec.auth_specification['OAuth2'];
    spec = {
      ...initialSpec,
      auth_specification: { OAuth2: currentSpecification },
    };
  }

  return spec;
}
