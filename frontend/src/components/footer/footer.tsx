/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ActionIcon, Kbd, Menu, ThemeIcon } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconArchive, IconInfoCircle, IconSettings } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

import logoURL from '../../icons/icon.png';
import styles from './footer.module.scss';

interface FooterProps {
  title?: string;
  actionsOpen: boolean;
  setActionsOpened: (value: boolean) => void;
}

export const Footer = ({ title, actionsOpen, setActionsOpened }: FooterProps) => {
  const navigate = useNavigate();

  useHotkeys([
    [
      'mod+k',
      () => {
        setActionsOpened(!actionsOpen);
      },
    ],
  ]);

  return (
    <div className={styles.footer}>
      <div className={styles.icon}>
        <ThemeIcon variant="filled">
          <img src={logoURL} alt="logo" />
        </ThemeIcon>

        {title && <div className={styles.title}>{title}</div>}
      </div>

      <div className={styles.rightActions}>
        <div className={styles.kbd}>
          <Kbd>⌘</Kbd> + <Kbd>k</Kbd>
        </div>
        <Menu shadow="md" width={200} opened={actionsOpen}>
          <Menu.Target>
            <ActionIcon
              color="gray"
              variant="filled"
              onClick={() => setActionsOpened(!actionsOpen)}
            >
              <IconSettings size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconArchive size={16} />} onClick={() => navigate('/extensions')}>
              Extensions
            </Menu.Item>
            <Menu.Item icon={<IconInfoCircle size={16} />} onClick={() => navigate('/extensions')}>
              About
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};
