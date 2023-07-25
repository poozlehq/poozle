/** Copyright (c) 2023, Poozle, all rights reserved. **/
import ms from 'ms';

export function getOffset(interval: string, date: Date): number {
  const intervalMilliseconds = ms(interval);

  const nowMilliseconds =
    date.getMinutes() * 60 * 1000 +
    date.getSeconds() * 1000 +
    date.getMilliseconds();

  const offset = nowMilliseconds % intervalMilliseconds;

  return offset;
}

export enum SyncPeriod {
  EVERY_HALF_DAY = 'EVERY_HALF_DAY',
  EVERY_HALF_HOUR = 'EVERY_HALF_HOUR',
  EVERY_QUARTER_HOUR = 'EVERY_QUARTER_HOUR',
  EVERY_HOUR = 'EVERY_HOUR',
  EVERY_DAY = 'EVERY_DAY',
}

/**
 * Get Interval
 * @desc get the interval based on the runs property in the yaml. The offset
 * should be the amount of time that the interval should be offset by.
 * If the time is 1536 and the interval is 30m then the next time the sync should run is 1606
 * and then 1636 etc. The offset should be based on the interval and should never be
 * greater than the interval
 */
export function getInterval(
  runs: string,
  date: Date,
): { interval: string; offset: number } {
  if (runs === SyncPeriod.EVERY_HALF_DAY) {
    return { interval: '12h', offset: getOffset('12h', date) };
  }

  if (runs === SyncPeriod.EVERY_HALF_HOUR) {
    return { interval: '30m', offset: getOffset('30m', date) };
  }

  if (runs === SyncPeriod.EVERY_QUARTER_HOUR) {
    return { interval: '15m', offset: getOffset('15m', date) };
  }

  if (runs === SyncPeriod.EVERY_HOUR) {
    return { interval: '1h', offset: getOffset('1h', date) };
  }

  if (runs === SyncPeriod.EVERY_DAY) {
    return { interval: '1d', offset: getOffset('1d', date) };
  }

  const interval = runs.replace('every ', '');

  if (ms(interval) < ms('5m')) {
    throw new Error('interval must be greater than 5 minutes');
  }

  const offset = getOffset(interval, date);

  return { interval, offset };
}
