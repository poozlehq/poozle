/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Image } from '@poozle/edk';
import { useEffect } from 'react';

import styles from './action_list.module.scss';

export interface Action {
  image: string;
  text: string;
  description: string;
  key: string;
}

interface Props {
  actions: Action[];
}

const ActionComponent = ({ image, text, description, key }: Action) => {
  return (
    <div className={styles.action} key={key}>
      <div className={styles.icon}>
        <Image src={image} html_renderer />
      </div>
      <div className={styles.details}>
        <div>{text}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

const ActionList = ({ actions }: Props) => {
  useEffect(() => {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
    };
  }, []);

  return (
    <div>
      {actions.map((action) => (
        <ActionComponent {...action} key={action.text} />
      ))}
    </div>
  );
};

export default ActionList;
