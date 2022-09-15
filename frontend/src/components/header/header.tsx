import { Kbd, Tooltip, UnstyledButton } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons';
import { useContext } from 'react';

import { CommandTreeContext } from '../../context/command_tree_context';
import styles from './header.module.scss';

interface Props {
  onBack?: () => void;
}

export const BackButton = ({ onBack: onBackParent }: Props) => {
  const contextValue = useContext(CommandTreeContext);

  const onBack = () => {
    if (contextValue?.setLastView) {
      contextValue?.setLastView();
    }

    if (onBackParent) {
      onBackParent();
    }
  };

  const backElement = (
    <div className={styles.tooltip}>
      <Kbd>Esc</Kbd> to go back <Kbd>Cmd + Esc</Kbd>
      to root search
    </div>
  );

  return (
    <div className={styles.backAction}>
      <Tooltip label={backElement} position="top">
        <UnstyledButton className={styles.iconContainer} onClick={onBack}>
          <IconArrowNarrowLeft />
        </UnstyledButton>
      </Tooltip>
    </div>
  );
};

const Header = ({ onBack }: Props) => {
  return (
    <div className={styles.header}>
      <BackButton onBack={onBack} />
    </div>
  );
};

export default Header;
