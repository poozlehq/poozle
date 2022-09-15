import { Center, Group, UnstyledButton, Text, Spoiler } from '@mantine/core';
import { SpotlightActionProps } from '@mantine/spotlight';
import classnames from 'classnames';

import { Image } from '../../components/image';
import styles from './search_result_component.module.scss';

export const SearchResultComponent = ({
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
            <Image src={action.icon as string} className={styles.icon} />
          </Center>
        )}

        <div className={styles.actionBody}>
          <Text>{action.title}</Text>

          {action.description && (
            <Spoiler maxHeight={20} hideLabel={undefined} showLabel={undefined}>
              <span className={styles.description}>{action.description}</span>
            </Spoiler>
          )}
        </div>

        <div className={styles.actionType}>{action.type}</div>
      </Group>
    </UnstyledButton>
  );
};
