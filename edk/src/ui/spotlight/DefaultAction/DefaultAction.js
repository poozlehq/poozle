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
import { Highlight, UnstyledButton, Group, Center, Text, } from '@mantine/core';
import useStyles from './DefaultAction.styles';
export var DefaultAction = function (_a) {
    var _b;
    var action = _a.action, styles = _a.styles, classNames = _a.classNames, hovered = _a.hovered, onTrigger = _a.onTrigger, highlightQuery = _a.highlightQuery, highlightColor = _a.highlightColor, query = _a.query, radius = _a.radius, others = __rest(_a, ["action", "styles", "classNames", "hovered", "onTrigger", "highlightQuery", "highlightColor", "query", "radius"]);
    var _c = useStyles({ radius: radius }, { styles: styles, classNames: classNames, name: 'Spotlight' }), classes = _c.classes, cx = _c.cx;
    return (_jsx(UnstyledButton, __assign({ className: cx(classes.action, (_b = {}, _b[classes.actionHovered] = hovered, _b)), tabIndex: -1, onMouseDown: function (event) { return event.preventDefault(); }, onClick: onTrigger }, others, { children: _jsxs(Group, __assign({ noWrap: true }, { children: [action.icon && _jsx(Center, __assign({ className: classes.actionIcon }, { children: action.icon })), _jsxs("div", __assign({ className: classes.actionBody }, { children: [_jsx(Highlight, __assign({ highlightColor: highlightColor, highlight: [] }, { children: action.title })), action.description && (_jsx(Text, __assign({ color: "dimmed", size: "xs" }, { children: action.description })))] }))] })) })));
};
DefaultAction.displayName = '@mantine/spotlight/DefaultAction';
//# sourceMappingURL=DefaultAction.js.map