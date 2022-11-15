/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ActionIcon, Menu, ThemeIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons';

import logoURL from '../../icons/icon.png';
import styles from './search_footer.module.scss';

const SearchFooter = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.icon}>
        <ThemeIcon variant="filled">
          <img src={logoURL} alt="logo" />
        </ThemeIcon>
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
            <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default SearchFooter;
