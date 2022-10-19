"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceParams = void 0;
function replaceParams(urlPath, args) {
    let path = urlPath;
    const data = args;
    const keys = Object.keys(args);
    keys.forEach((key) => {
        const before = path;
        path = path.replace(bracedString(key), args[key]);
        if (before !== path)
            delete data[key];
    });
    return { path, data };
}
exports.replaceParams = replaceParams;
function bracedString(value) {
    return `{${value}}`;
}
//# sourceMappingURL=replace_params.js.map