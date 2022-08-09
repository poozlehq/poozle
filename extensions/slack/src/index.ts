import { AbstractExtension, Builder } from '@poozle/edk';
import { NewIssue } from './commands/new_issue';

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

  get_commands(): any {
    return [new NewIssue()];
  }
}

function main() {
  const extension = new GithubExtension();

  extension.run();
}

main();
