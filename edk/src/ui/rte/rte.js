var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { Input as MantineInput } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
var RTE = function (_a) {
    var name = _a.name, required = _a.required, label = _a.label, value = _a.value, error = _a.error, description = _a.description, onChange = _a.onChange;
    return (_jsx(MantineInput.Wrapper, __assign({ id: name, required: required, label: label, error: error, description: description }, { children: _jsx(RichTextEditor, { value: value !== null && value !== void 0 ? value : '', onChange: onChange }) })));
};
export default RTE;
//# sourceMappingURL=rte.js.map