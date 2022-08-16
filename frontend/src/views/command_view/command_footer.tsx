import { Chip } from '@mantine/core';

import { Image } from '../../components/image';

import { Command } from '../../utils/commands';
import { CommandTreeRecord } from './types';

import styles from './command_footer.module.scss';

type CommandFooterProps = {
  command: Command;
  currentCommand: CommandTreeRecord;
};

function CommandFooter({ command, currentCommand }: CommandFooterProps) {
  return (
    <div className={styles.footer}>
      <div className={styles.icon}>
        <Image src={command.icon} html_renderer />
      </div>
      <div className={styles.commandTree}>
        <Chip size="xs" checked={false}>
          {currentCommand.command.name}
        </Chip>
      </div>
    </div>
  );
}

export default CommandFooter;
