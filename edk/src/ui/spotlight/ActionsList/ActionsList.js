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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Text } from '@mantine/core';
import styles from './ActionsList.module.scss';
export var ActionsList = function (_a) {
    var actions = _a.actions, Action = _a.actionComponent, hovered = _a.hovered, onActionHover = _a.onActionHover, onActionTrigger = _a.onActionTrigger, query = _a.query, nothingFoundMessage = _a.nothingFoundMessage, highlightQuery = _a.highlightQuery, highlightColor = _a.highlightColor, radius = _a.radius;
    var items = actions.map(function (item) {
        if (item.type === 'item') {
            return (_jsx(Action, { query: query, action: item.item, hovered: item.index === hovered, onMouseEnter: function () { return onActionHover(item.index); }, styles: styles, radius: radius, onTrigger: function () { return onActionTrigger(item.item); }, highlightQuery: highlightQuery, highlightColor: highlightColor }, item.item.id));
        }
        return (_jsx(Text, __assign({ className: styles.actionsGroup, color: "dimmed" }, { children: item.label }), item.label));
    });
    var shouldRenderActions = items.length > 0 || (!!nothingFoundMessage && query.trim().length > 0);
    return (_jsx(_Fragment, { children: shouldRenderActions && (_jsx("div", __assign({ className: styles.actions }, { children: items.length > 0 ? (items) : (_jsx(Text, __assign({ color: "dimmed", align: "center", size: "lg", py: "md" }, { children: nothingFoundMessage }))) }))) }));
};
ActionsList.displayName = '@mantine/spotlight/ActionsList';
//# sourceMappingURL=ActionsList.js.map