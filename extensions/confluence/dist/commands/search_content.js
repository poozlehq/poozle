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
exports.SearchContentCommand = void 0;
const edk_1 = require("@poozle/edk");
const builder_1 = require("@poozle/edk/lib/cjs/builder");
const actions_1 = require("../actions");
const api_1 = require("../utils/api");
const { Option } = edk_1.Builder;
class SearchContentCommand extends edk_1.AbstractCommand {
    constructor() {
        super(...arguments);
        this.key = 'search-content';
        this.name = 'Search Content';
        this.description = 'Search Content';
        this.icon = 'jira.svg';
        this.fetchDataKeys = ['space_name', 'search_content'];
        this.path = '/repos/{owner}/{repo}/issues';
        this.basePath = 'https://gelocity.atlassian.net';
    }
    // TODO: hard type it later
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getActions() {
        return [new actions_1.SearchIssueAction()];
    }
    fetchDataController(key, params, spec) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key === 'space_name') {
                const path = `https://${spec.confluence_domain}.atlassian.net/wiki/rest/api/space`;

                const apiParams = { type: 'global', limit: 100 };
                const spaces = yield (0, api_1.apiGet)(path, spec.email_id, spec.api_key, apiParams);
                return spaces.results.map((space) => {
                    return (0, builder_1.SearchResult)({
                        text: space.name,
                        icon: space._expandable.icon,
                        value: space.key,
                    }).build();
                });
              } else if (key === 'search_content') {
                const path = `https://${spec.confluence_domain}.atlassian.net//wiki/rest/api/search`;

                const apiParams = {
                    cql: `space = ${params.space_key} and text ~'${params.search_key}'`,
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
exports.SearchContentCommand = SearchContentCommand;
//# sourceMappingURL=search_issue.js.map