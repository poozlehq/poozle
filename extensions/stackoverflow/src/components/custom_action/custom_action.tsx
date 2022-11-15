/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Badge, Divider, Popover, UnstyledButton } from '@mantine/core';
import { SpotlightActionProps } from '@mantine/spotlight';
import { IconMessages } from '@tabler/icons';
import classnames from 'classnames';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import * as React from 'react';

import styles from './custom_action.module.scss';

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

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
      <Popover opened={hovered} width={400}>
        <Popover.Target>
          <div className={styles.actionContainer}>
            <h5 className={styles.title}>{action.title}</h5>
            <div className={styles.information}>
              {action.answered && (
                <>
                  <Badge color="dark" size="sm" className={styles.badge}>
                    Answered
                  </Badge>
                  <Divider orientation="vertical" />
                </>
              )}
              <div className={styles.count}>
                <IconMessages size={12} /> <div>{action.answerCount}</div>
              </div>
              <Divider orientation="vertical" />
              <div>{timeAgo.format(new Date(action.lastActivityDate * 1000))}</div>
              <Divider orientation="vertical" />
              <div>{action.viewCount}</div>
            </div>
            <div className={styles.tags}>
              {action.tags.map((tag: string) => (
                <Badge color="gray" size="md" className={styles.tag}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <div
            dangerouslySetInnerHTML={{ __html: action.body }}
            style={{ height: 200, overflow: 'auto' }}
          />
        </Popover.Dropdown>
      </Popover>
    </UnstyledButton>
  );
};
