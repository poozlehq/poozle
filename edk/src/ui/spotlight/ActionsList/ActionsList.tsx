/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SpotlightAction } from '../types';

import { Text, MantineNumberSize, MantineColor } from '@mantine/core';
import React from 'react';

import styles from './ActionsList.module.scss';

interface GetGroupOptionsItem<T extends any[]> {
  type: 'item';
  item: T[number];
  index: number;
}
interface GetGroupOptionsLabel {
  type: 'label';
  label: string;
}

export interface ActionsListProps {
  actions: Array<GetGroupOptionsItem<SpotlightAction[]> | GetGroupOptionsLabel>;
  actionComponent?: any;
  hovered: number;
  query: string;
  nothingFoundMessage?: React.ReactNode;
  onActionHover(index: number): void;
  onActionTrigger(action: SpotlightAction): void;
  highlightQuery: boolean;
  highlightColor: MantineColor;
  radius: MantineNumberSize;
}

export const ActionsList = ({
  actions,
  actionComponent: Action,
  hovered,
  onActionHover,
  onActionTrigger,
  query,
  nothingFoundMessage,
  highlightQuery,
  highlightColor,
  radius,
}: ActionsListProps) => {
  const items = actions.map((item) => {
    if (item.type === 'item') {
      return (
        <Action
          query={query}
          key={item.item.id}
          action={item.item}
          hovered={item.index === hovered}
          onMouseEnter={() => onActionHover(item.index)}
          styles={styles}
          radius={radius}
          onTrigger={() => onActionTrigger(item.item)}
          highlightQuery={highlightQuery}
          highlightColor={highlightColor}
        />
      );
    }

    return (
      <Text className={styles.actionsGroup} color="dimmed" key={item.label}>
        {item.label}
      </Text>
    );
  });

  const shouldRenderActions =
    items.length > 0 || (!!nothingFoundMessage && query.trim().length > 0);

  return (
    <>
      {shouldRenderActions && (
        <div className={styles.actions}>
          {items.length > 0 ? (
            items
          ) : (
            <Text color="dimmed" align="center" size="lg" py="md">
              {nothingFoundMessage}
            </Text>
          )}
        </div>
      )}
    </>
  );
};

ActionsList.displayName = '@mantine/spotlight/ActionsList';
