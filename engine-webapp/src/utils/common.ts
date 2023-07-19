/** Copyright (c) 2023, Poozle, all rights reserved. **/

import dayjs from 'dayjs';

/**
 * Checks whether the function is being invoked in Server or Client.
 * @returns True if this function is beinvoked in Next Server, False if it is in browser.
 */
export function isServer() {
  return typeof window === 'undefined';
}

export function showDateInUI(date: Date) {
  return dayjs(date).format('MMMM D, YYYY h:mm A');
}

export function showDateInTable(date: Date) {
  return dayjs(date).format('MMMM D - h:mm A');
}
