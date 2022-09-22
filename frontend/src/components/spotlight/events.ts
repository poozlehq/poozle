import type { SpotlightAction } from './types';

import { createUseExternalEvents } from '@mantine/utils';

export interface SpotlightEvents {
  open(): void;
  close(): void;
  toggle(): void;
  triggerAction(id: string): void;
  registerActions(actions: SpotlightAction[]): void;
  removeActions(ids: string[]): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const [useSpotlightEvents, createEvent] = createUseExternalEvents<any>('mantine-spotlight');

export const openSpotlight = createEvent('open');
export const closeSpotlight = createEvent('close');
export const toggleSpotlight = createEvent('toggle');
export const triggerSpotlightAction = createEvent('triggerAction');
export const registerSpotlightActions = createEvent('registerActions');
export const removeSpotlightActions = createEvent('removeActions');
