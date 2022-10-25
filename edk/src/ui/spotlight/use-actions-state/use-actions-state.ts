import type { SpotlightAction } from '../types';

import { randomId } from '@mantine/hooks';
import * as React from 'react';

function prepareAction(action: SpotlightAction) {
  return { ...action, id: action.id || randomId() };
}

function filterDuplicateActions(actions: SpotlightAction[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ids: any[] = [];

  return actions
    .reduceRight<SpotlightAction[]>((acc, action) => {
      if (!ids.includes(action.id)) {
        ids.push(action.id);
        acc.push(action);
      }

      return acc;
    }, [])
    .reverse();
}

function prepareActions(initialActions: SpotlightAction[]) {
  return filterDuplicateActions(initialActions.map((action) => prepareAction(action)));
}

export function useActionsState(
  initialActions: SpotlightAction[] | ((query: string) => SpotlightAction[]),
  query: string,
) {
  const [actions, setActions] = React.useState(
    prepareActions(typeof initialActions === 'function' ? initialActions(query) : initialActions),
  );

  React.useEffect(() => {
    if (typeof initialActions === 'function') {
      setActions(prepareActions(initialActions(query)));
    }
  }, [initialActions, query]);

  const updateActions = (payload: SpotlightAction[] | ((query: string) => SpotlightAction[])) =>
    setActions(prepareActions(typeof payload === 'function' ? payload(query) : payload));

  const registerActions = (payload: SpotlightAction[]) =>
    setActions((current) => prepareActions([...current, ...payload]));

  const removeActions = (ids: string[]) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setActions((current) => current.filter((action: any) => !ids.includes(action.id)));

  const triggerAction = (id: string) => {
    const action = actions.find((item) => item.id === id);
    action?.onTrigger?.(action);
  };

  return [
    actions,
    {
      registerActions,
      updateActions,
      removeActions,
      triggerAction,
    },
  ] as const;
}
