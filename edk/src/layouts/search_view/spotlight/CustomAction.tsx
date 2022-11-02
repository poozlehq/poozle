import { Center, Group, UnstyledButton, Text } from '@mantine/core';
import { SpotlightActionProps } from '@mantine/spotlight';
import classnames from 'classnames';
import * as React from 'react';

import { Image } from 'components/image';

import styles from './CustomAction.module.scss';

export const CustomAction = ({
  action,
  classNames,
  hovered,
  onTrigger,
  ...others
}: SpotlightActionProps): React.ReactElement => {
  return (
    <UnstyledButton
      className={classnames(styles.action, { [styles.actionHovered]: hovered })}
      tabIndex={-1}
      onMouseDown={(event: any) => event.preventDefault()}
      onClick={onTrigger}
      {...others}
    >
      <Group noWrap>
        {action.icon && (
          <Center>
            <Image src={action.icon} />
          </Center>
        )}

        <div className={styles.actionBody}>
          <Text>{action.title}</Text>

          {action.description && (
            <Text color="dimmed" size="xs">
              {action.description}
            </Text>
          )}
        </div>

        <div className={styles.actionType}>{action.type}</div>
      </Group>
    </UnstyledButton>
  );
};
