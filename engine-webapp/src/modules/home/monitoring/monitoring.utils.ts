/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { formatISO } from 'date-fns';

export function getStatsFromAndTo(value: string) {
  let goBack = 0;

  if (value.includes('30')) {
    goBack = 30;
  }

  if (value.includes('14')) {
    goBack = 14;
  }

  if (value.includes('7')) {
    goBack = 7;
  }

  if (value.includes('24')) {
    goBack = 1;
  }

  if (value.includes('hour')) {
    const today = new Date();
    const priorDate = new Date(new Date().setHours(today.getHours() - 1));

    return {
      from: formatISO(priorDate),
      to: formatISO(today),
    };
  }

  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - goBack));

  return {
    from: formatISO(priorDate),
    to: formatISO(today),
  };
}

export function getSuccessRate(failedRequests: number, totalRequests: number) {
  return (((totalRequests - failedRequests) / totalRequests) * 100).toFixed(2);
}

export function getErrorRate(failedRequests: number, totalRequests: number) {
  return ((failedRequests / totalRequests) * 100).toFixed(2);
}
