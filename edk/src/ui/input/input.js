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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { Input as MantineInput } from '@mantine/core';
import classnames from 'classnames';
import styles from './input.module.scss';
var Input = function (props) {
    var name = props.name, label = props.label, value = props.value, error = props.error, required = props.required, $onChange = props.onChange, $onBlur = props.onBlur, ref = props.ref, _a = props.size, size = _a === void 0 ? 'sm' : _a, description = props.description, placeholder = props.placeholder, className = props.className, restProps = __rest(props, ["name", "label", "value", "error", "required", "onChange", "onBlur", "ref", "size", "description", "placeholder", "className"]);
    var onChange = function (event) {
        if ($onChange) {
            $onChange(event);
        }
    };
    var onBlur = function (event) {
        if ($onBlur) {
            $onBlur(event);
        }
    };
    return (_jsx(MantineInput.Wrapper, __assign({ id: name, required: required, label: label, error: error, description: description, className: styles.inputWrapper }, { children: _jsx(MantineInput, __assign({ ref: ref, size: size, id: name, value: value, onChange: onChange, onBlur: onBlur, placeholder: placeholder, className: classnames(styles.input, className) }, restProps)) })));
};
export { Input };
//# sourceMappingURL=input.js.map