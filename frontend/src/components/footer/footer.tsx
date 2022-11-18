/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ActionIcon, Menu, ThemeIcon } from '@mantine/core';
import { IconArchive, IconSettings } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

import logoURL from '../../icons/icon.png';
import styles from './footer.module.scss';

interface FooterProps {
  title?: string;
}

export const Footer = ({ title }: FooterProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.footer}>
      <div className={styles.icon}>
        <ThemeIcon variant="filled">
          <img src={logoURL} alt="logo" />
        </ThemeIcon>

        {title && <div className={styles.title}>{title}</div>}
      </div>

      <div>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon color="gray" variant="filled">
              <IconSettings size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item icon={<IconArchive size={16} />} onClick={() => navigate('/extensions')}>
              Extensions
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};
