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
import { Button as MantineButton } from '@mantine/core';
import classnames from 'classnames';
import styles from './button.module.scss';
var Button = function (props) {
    var className = props.className, _a = props.size, size = _a === void 0 ? 'md' : _a, _b = props.radius, radius = _b === void 0 ? 'sm' : _b, restProps = __rest(props, ["className", "size", "radius"]);
    return (_jsx(MantineButton, __assign({ size: size, radius: radius, className: classnames(styles.uiButton, className), type: "button" }, restProps)));
};
var SubmitButton = function (_a) {
    var _b = _a.Component, Component = _b === void 0 ? Button : _b, className = _a.className, disabled = _a.disabled, loading = _a.loading, props = __rest(_a, ["Component", "className", "disabled", "loading"]);
    return (_jsx(Component, __assign({ htmltype: "submit", type: "submit", loading: loading, className: classnames('ui-button-submit', className, { 'ui-btn-disabled': disabled }, { 'ui-btn-loading': loading }) }, props)));
};
export { SubmitButton, Button };
//# sourceMappingURL=button.js.map