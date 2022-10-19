"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMentionsCommand = void 0;
const edk_1 = require("@poozle/edk");
const actions_1 = require("../actions");
const api_1 = require("../utils/api");
const { Option } = edk_1.Builder;
class GetMentionsCommand extends edk_1.AbstractCommand {
    constructor() {
        super(...arguments);
        this.key = 'get-mentions';
        this.name = 'Get Mentions';
        this.description = 'Get Mentions';
        this.icon = 'jira.svg';
        this.fetchDataKeys = ['search_mentions'];
        this.path = 'https://{subdomain}.atlassian.net';
    }
    // TODO: hard type it later
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getActions() {
        return [new actions_1.GetMentionsAction()];
    }
    fetchDataController(key, params, spec) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key === 'project_name') {
                const path = `https://${spec.jira_domain}.atlassian.net/rest/api/3/project/search`;

                const apiParams = {
                  cql: `mention = currentUser() order by lastmodified desc`,
                  maxResults: 15,
                };
                
                const contents = yield (0, api_1.apiGet)(path, spec.email_id, spec.api_key, apiParams);

                return contents.results.map((content) => {
                    return (0, builder_1.SearchResult)({
                        text: content.title,
                        icon: null,
                        description: content.excerpt,
                        url: content.content._links.self,
                    }).build();
                });
            }
        });
    }
}
exports.GetMentionsCommand = GetMentionsCommand;
//# sourceMappingURL=new_issue.js.map