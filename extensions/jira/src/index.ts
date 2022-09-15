import { AbstractExtension, Builder } from '@poozle/edk';
import { NewIssueCommand } from './commands/new_issue';
import { SearchIssueCommand } from './commands/search_issue';

const { Form, Input, TextInput } = Builder;

export class JiraExtension extends AbstractExtension {
  name = 'Jira';
  icon = 'Jira.svg';
  description = 'Jira extension';

  spec() {
    return Form().blocks(
      Input({
        label: 'Jira Domain',
      }).element(
        TextInput({
          placeholder: 'Enter your Jira Sub Domain Name.',
        }).actionId('jira_domain'),
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
    return [new SearchIssueCommand(), new NewIssueCommand()];
  }
}

function main() {
  const extension = new JiraExtension();

  extension.run();
}

main();
