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
exports.apiPost = exports.apiGet = void 0;
const axios_1 = require("axios");
function apiGet(path, emailID, apiKey, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            Accept: 'application/json',
            Authorization: `Basic ${Buffer.from(`${emailID}:${apiKey}`).toString('base64')}`,
        };
        const response = yield axios_1.default.get(path, {
            headers,
            params: params,
        });
        return response.data;
    });
}
exports.apiGet = apiGet;
function apiPost(path, emailID, apiKey, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            Accept: 'application/json',
            Authorization: `Basic ${Buffer.from(`${emailID}:${apiKey}`).toString('base64')}`,
            'Content-Type': 'application/json',
        };
        const response = yield axios_1.default.post(path, values, {
            headers,
        });
        return response.data;
    });
}
exports.apiPost = apiPost;
//# sourceMappingURL=api.js.map