"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraExtension = void 0;
const edk_1 = require("@poozle/edk");
const new_issue_1 = require("./commands/new_issue");
const search_issue_1 = require("./commands/search_issue");
const { Form, Input, TextInput } = edk_1.Builder;
class JiraExtension extends edk_1.AbstractExtension {
    constructor() {
        super(...arguments);
        this.name = 'Jira';
        this.icon = 'Jira.svg';
        this.description = 'Jira extension';
    }
    spec() {
        return Form().blocks(Input({
            label: 'Jira Domain',
        }).element(TextInput({
            placeholder: 'Enter your Jira Sub Domain Name.',
        }).actionId('jira_domain')), Input({
            label: 'Email',
        }).element(TextInput({
            placeholder: 'Enter your Email ID',
        }).actionId('email_id')), Input({
            label: 'Api Key',
        }).element(TextInput({
            placeholder: 'Enter the API key',
        }).actionId('api_key')));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get_commands() {
        return [new search_issue_1.SearchIssueCommand(), new new_issue_1.NewIssueCommand()];
    }
}
exports.JiraExtension = JiraExtension;
function main() {
    const extension = new JiraExtension();
    extension.run();
}
main();
//# sourceMappingURL=index.js.map