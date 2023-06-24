/* eslint-disable @typescript-eslint/ban-types */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import type { AjaxBaseConfig, XHRErrorResponse } from './ajaxBase';

import normalize from 'normalize-object';

import { triggerError, triggerSuccess } from './ajaxEvents';
import { isServer } from '../common';

/**
 * @internal
 * `onSuccess` handler parameters.
 */
interface OnSuccessParams<T, E> {
  /** Ajax Configuration Object */
  config: AjaxBaseConfig<unknown, T, E>;
  /** Response Data */
  data: T | string;
  /** Response Headers */
  headers: Record<string, string>;
  /** Resolver Function */
  resolve: Function;
}

/**
 * @internal
 * Handles Success of a XHR with Promise Fulfillment.
 * @param param - `onSuccess` handler parameters.
 */
export function onSuccess<T, E>({
  config,
  data: rawData,
  headers,
  resolve,
}: OnSuccessParams<T, E>) {
  const { disableEvents, onSuccess } = config;

  /** Transform Payload Keys into camelCase */
  const data = normalize(rawData, 'camel');

  if (onSuccess) {
    onSuccess(data as string | T, headers);
  }

  resolve(data);

  if (!isServer() && !disableEvents) {
    triggerSuccess(data, config);
  }
}

/**
 * @internal
 * `onError` handler parameters.
 */
interface OnErrorParams<T, E> {
  /** Ajax Configuration Object */
  config: AjaxBaseConfig<unknown, T, E>;
  /** Response Error */
  error: XHRErrorResponse<E>;
  /** Response Headers */
  headers?: Record<string, string>;
  /** Rejection Function */
  reject: Function;
}

/**
 * @internal
 * Handles Failure of a XHR with Promise Rejection.
 * @param param - `onError` handler parameters.
 */
export function onError<T, E>({
  config,
  error: { errors, ...rawError },
  reject,
}: OnErrorParams<T, E>) {
  const { disableEvents, onError } = config;

  /** Transform Payload Keys into camelCase */
  const error = {
    ...rawError,
    ...(errors ? { errors: normalize(errors, 'camel') } : {}),
  };

  if (onError) {
    onError(error);
  }

  reject(error);

  if (!isServer() && !disableEvents) {
    triggerError(error, config);
  }
}
