import { BaseDirectory } from '@tauri-apps/api/fs';

import { Image } from '../image';

import styles from './action_list.module.scss';
import { useEffect } from 'react';

export type Action = {
  image: string;
  text: string;
  description: string;
  key: string;
};

type Props = {
  actions: Action[];
};

function Action({ image, text, description, key }: Action) {
  return (
    <div className={styles.action} key={key}>
      <div className={styles.icon}>
        <Image src={image} html_renderer />
      </div>
      <div className={styles.details}>
        <div className={styles.name}>{text}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
}

function ActionList({ actions }: Props) {
  useEffect(() => {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
    };
  }, []);

  return (
    <div className={styles.action_list}>
      {actions.map((action) => (
        <Action {...action} key={action.text} />
      ))}
    </div>
  );
}

export default ActionList;
