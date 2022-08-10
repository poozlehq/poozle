import { Kbd, Tooltip, UnstyledButton } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons';

import styles from './header.module.scss';

type Props = {
  onBack: () => void;
};

function Header({ onBack }: Props) {
  const backElement = (
    <div className={styles.tooltip}>
      <Kbd>Esc</Kbd> to go back <Kbd>Cmd + Esc</Kbd>
      to root search
    </div>
  );

  return (
    <div className={styles.header}>
      <div className={styles.backAction}>
        <Tooltip label={backElement} position="top">
          <UnstyledButton className={styles.iconContainer} onClick={onBack}>
            <IconArrowNarrowLeft className={styles.icon} />
          </UnstyledButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Header;
