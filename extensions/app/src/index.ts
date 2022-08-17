import { AbstractExtension, Builder } from '@poozle/edk';
import { SearchAppCommand } from './commands/search_app';

const { Form, Input, TextInput } = Builder;

export class AppExtension extends AbstractExtension {
  name = 'App';
  icon = 'github.svg';
  description = 'Local App extension';

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
    return [new SearchAppCommand()];
  }
}

function main() {
  const extension = new AppExtension();

  extension.run();
}

main();
