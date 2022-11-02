import { Command, Image } from '@poozle/edk';

import styles from './command_footer.module.scss';

interface CommandFooterProps {
  command: Command;
}

const CommandFooter = ({ command }: CommandFooterProps) => {
  return (
    <div className={styles.footer}>
      <div className={styles.icon}>
        <Image src={command.icon} html_renderer />
      </div>
      <div className={styles.commandTree} />
    </div>
  );
};

export default CommandFooter;
