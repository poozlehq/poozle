import { AbstractExtension, Builder } from '@poozle/edk';
import { GetMentionsCommand, SearchContentCommand } from './commands';

const { Form, Input, TextInput } = Builder;

export class ConfluenceExtension extends AbstractExtension {
  name = 'Confluence';
  icon = 'Confluence.svg';
  description = 'Confluence extension';

  spec() {
    return Form().blocks(
      Input({
        label: 'Confluence Domain',
      }).element(
        TextInput({
          placeholder: 'Enter your Confluence Sub Domain Name.',
        }).actionId('confluence_domain'),
      ),
      Input({
        label: 'Email',
      }).element(
        TextInput({
          placeholder: 'Enter your Email ID',
        }).actionId('email_id'),
      ),
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
    return [new SearchContentCommand(), new GetMentionsCommand()];
  }
}

function main() {
  const extension = new ConfluenceExtension();

  extension.run();
}

main();
