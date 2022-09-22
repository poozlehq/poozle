import { Center, Group, UnstyledButton, Text } from '@mantine/core';
import { SpotlightActionProps } from '@mantine/spotlight';
import classnames from 'classnames';

import { Image } from '../image';
import styles from './CustomAction.module.scss';

export const CustomAction = ({
  action,

  classNames,
  hovered,
  onTrigger,
  ...others
}: SpotlightActionProps) => {
  return (
    <UnstyledButton
      className={classnames(styles.action, { [styles.actionHovered]: hovered })}
      tabIndex={-1}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onMouseDown={(event: any) => event.preventDefault()}
      onClick={onTrigger}
      {...others}
    >
      <Group noWrap>
        {action.icon && (
          <Center>
            <Image src={action.icon} html_renderer />
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
