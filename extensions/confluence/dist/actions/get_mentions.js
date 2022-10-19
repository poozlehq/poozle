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
exports.GetMentionsAction = void 0;
const edk_1 = require("@poozle/edk");
const api_1 = require("../utils/api");
const { Input, Form, TextInput, Select, TextEditor, Section } = edk_1.Builder;
class GetMentionsAction extends edk_1.HTTPAction {
    constructor() {
        super(...arguments);
        this.defaultHeaders = {};
        this.baseUrl = 'https://{subdomain}.atlassian.net';
        this.key = /get-mentions*/i;
        this.path = '';
    }
    run(callback_id, params, spec) {
        return __awaiter(this, void 0, void 0, function* () {
            if (callback_id === 'get-mentions') {
                return Search()
                .blocks().fetchDataId('get_mentions').callbackId('search-content-open');
              }
              else if(callback_id == 'get-mentions-open') {
                return QuickAction({
                  quickActionType: QuickActionTypeEnum.OPEN,
                  value: params.url,
                  title: params.text
                })
              }
        })
    }
}
exports.GetMentionsAction = GetMentionsAction;
//# sourceMappingURL=new_issue.js.map