import { AbstractExtension, Builder } from '@poozle/edk';
import { NewIssueCommand } from './commands/new_issue';

const { Form, Input, TextInput } = Builder;

export class GithubExtension extends AbstractExtension {
  name = 'Github';
  icon = 'github.svg';
  description = 'Github extension';

  spec() {
    return Form().blocks(
      Input({
        label: 'Api Key',
      }).element(
        TextInput({
          placeholder: 'Enter the API key',
        }).actionId('api_key'),
      ),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get_commands(): any {
    return [new NewIssueCommand()];
  }
}

function main() {
  const extension = new GithubExtension();

  extension.run();
}

main();
