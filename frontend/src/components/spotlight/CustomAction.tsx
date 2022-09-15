import { Center, createStyles, Group, UnstyledButton, Text } from '@mantine/core';
import { SpotlightActionProps } from '@mantine/spotlight';

import { Image } from '../image';

const useStyles = createStyles((theme) => ({
  action: {
    position: 'relative',
    display: 'block',
    width: '100%',
    padding: '10px 12px',
    borderRadius: theme.radius.sm,
  },

  actionHovered: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
  },

  actionBody: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  actionType: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
  },
}));

export const CustomAction = ({
  action,
  styles,
  classNames,
  hovered,
  onTrigger,
  ...others
}: SpotlightActionProps) => {
  const { classes, cx } = useStyles(null, { styles, classNames, name: 'Spotlight' });

  return (
    <UnstyledButton
      className={cx(classes.action, { [classes.actionHovered]: hovered })}
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

        <div className={classes.actionBody}>
          <Text>{action.title}</Text>

          {action.description && (
            <Text color="dimmed" size="xs">
              {action.description}
            </Text>
          )}
        </div>

        <div className={classes.actionType}>{action.type}</div>
      </Group>
    </UnstyledButton>
  );
};
