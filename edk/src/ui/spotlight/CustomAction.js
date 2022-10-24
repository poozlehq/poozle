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
import { Center, Group, UnstyledButton, Text } from '@mantine/core';
import classnames from 'classnames';
import { Image } from '../image';
import styles from './CustomAction.module.scss';
export var CustomAction = function (_a) {
    var _b;
    var action = _a.action, classNames = _a.classNames, hovered = _a.hovered, onTrigger = _a.onTrigger, others = __rest(_a, ["action", "classNames", "hovered", "onTrigger"]);
    return (_jsx(UnstyledButton, __assign({ className: classnames(styles.action, (_b = {}, _b[styles.actionHovered] = hovered, _b)), tabIndex: -1, onMouseDown: function (event) { return event.preventDefault(); }, onClick: onTrigger }, others, { children: _jsxs(Group, __assign({ noWrap: true }, { children: [action.icon && (_jsx(Center, { children: _jsx(Image, { src: action.icon, html_renderer: true }) })), _jsxs("div", __assign({ className: styles.actionBody }, { children: [_jsx(Text, { children: action.title }), action.description && (_jsx(Text, __assign({ color: "dimmed", size: "xs" }, { children: action.description })))] })), _jsx("div", __assign({ className: styles.actionType }, { children: action.type }))] })) })));
};
//# sourceMappingURL=CustomAction.js.map