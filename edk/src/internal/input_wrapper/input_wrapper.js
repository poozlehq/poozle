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
import { InputBlockType } from 'types/extension';
import { Input } from 'ui/input';
import { Select } from 'ui/select';
var InputWrapper = function (props) {
    var _a = props.block, type = _a.type, name = _a.name, key = _a.key, description = _a.description;
    var Component = null;
    var onChange = function (e) {
        props.inputProps.onChange(e);
    };
    if (type === InputBlockType.SELECT) {
        Component = (_jsx(Select, __assign({ label: name, name: key, placeholder: description, required: true, data: props.block.data, value: props.inputProps.value }, props.inputProps, { onChange: onChange })));
    }
    if (type === InputBlockType.INPUT) {
        Component = (_jsx(Input, __assign({ label: name, name: key, placeholder: description, required: true }, props.inputProps, { onChange: onChange })));
    }
    return _jsx("div", { children: Component }, props.key);
};
export { InputWrapper };
//# sourceMappingURL=input_wrapper.js.map