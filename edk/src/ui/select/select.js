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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select as MantineSelect, Input as MantineInput, Group, Text, Avatar, } from '@mantine/core';
import classnames from 'classnames';
import { forwardRef } from 'react';
import styles from './select.module.scss';
var Select = function (props) {
    var name = props.name, label = props.label, value = props.value, error = props.error, required = props.required, $onChange = props.onChange, ref = props.ref, _a = props.selectOnBlur, selectOnBlur = _a === void 0 ? true : _a, _b = props.searchable, searchable = _b === void 0 ? true : _b, _c = props.size, size = _c === void 0 ? 'sm' : _c, description = props.description, className = props.className, restProps = __rest(props, ["name", "label", "value", "error", "required", "onChange", "ref", "selectOnBlur", "searchable", "size", "description", "className"]);
    var onChange = function (value) {
        if ($onChange) {
            $onChange(value);
        }
    };
    var SelectItem = forwardRef(function (_a, ref) {
        var image = _a.image, label = _a.label, description = _a.description, others = __rest(_a, ["image", "label", "description"]);
        return (_jsx("div", __assign({ ref: ref }, others, { children: _jsxs(Group, __assign({ noWrap: true }, { children: [_jsx(Avatar, { src: image, size: "xs" }), _jsxs("div", { children: [_jsx(Text, __assign({ size: "sm" }, { children: label })), _jsx(Text, __assign({ size: "xs", color: "dimmed" }, { children: description }))] })] })) })));
    });
    return (_jsx(MantineInput.Wrapper, __assign({ id: name, required: required, label: label, error: error, description: description }, { children: _jsx(MantineSelect, __assign({ ref: ref, size: size, searchable: searchable, itemComponent: SelectItem, selectOnBlur: selectOnBlur, id: name, value: value, onChange: onChange, className: classnames(styles.select, className) }, restProps)) })));
};
export { Select };
//# sourceMappingURL=select.js.map