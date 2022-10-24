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
import { GroupedTransition, Overlay, Paper, TextInput, getDefaultZIndex, } from '@mantine/core';
import { useScrollLock, useFocusTrap, useDidUpdate, useFocusReturn } from '@mantine/hooks';
import { getGroupedOptions } from '@mantine/utils';
import { useState } from 'react';
import { ActionsList } from '../ActionsList/ActionsList';
import { DefaultAction } from '../DefaultAction/DefaultAction';
import { filterActions } from './filter-actions/filter-actions';
import useStyles from './Spotlight.styles';
export var Spotlight = function (_a) {
    var query = _a.query, onQueryChange = _a.onQueryChange, actions = _a.actions, onClose = _a.onClose, opened = _a.opened, _b = _a.transition, transition = _b === void 0 ? 'pop' : _b, transitionDuration = _a.transitionDuration, classNames = _a.classNames, styles = _a.styles, _c = _a.overlayColor, overlayColor = _c === void 0 ? '#000' : _c, _d = _a.overlayOpacity, overlayOpacity = _d === void 0 ? 0.25 : _d, _e = _a.overlayBlur, overlayBlur = _e === void 0 ? 3 : _e, _f = _a.shadow, shadow = _f === void 0 ? 'md' : _f, _g = _a.radius, radius = _g === void 0 ? 'sm' : _g, _h = _a.centered, centered = _h === void 0 ? false : _h, _j = _a.closeOnActionTrigger, closeOnActionTrigger = _j === void 0 ? true : _j, _k = _a.highlightQuery, highlightQuery = _k === void 0 ? false : _k, highlightColor = _a.highlightColor, _l = _a.maxWidth, maxWidth = _l === void 0 ? 600 : _l, _m = _a.topOffset, topOffset = _m === void 0 ? 120 : _m, className = _a.className, searchPlaceholder = _a.searchPlaceholder, searchIcon = _a.searchIcon, _o = _a.filter, filter = _o === void 0 ? filterActions : _o, prefixInputComponent = _a.prefixInputComponent, nothingFoundMessage = _a.nothingFoundMessage, _p = _a.limit, limit = _p === void 0 ? 10 : _p, _q = _a.actionComponent, actionComponent = _q === void 0 ? DefaultAction : _q, _r = _a.actionsWrapperComponent, ActionsWrapper = _r === void 0 ? 'div' : _r, _s = _a.zIndex, zIndex = _s === void 0 ? getDefaultZIndex('max') : _s, others = __rest(_a, ["query", "onQueryChange", "actions", "onClose", "opened", "transition", "transitionDuration", "classNames", "styles", "overlayColor", "overlayOpacity", "overlayBlur", "shadow", "radius", "centered", "closeOnActionTrigger", "highlightQuery", "highlightColor", "maxWidth", "topOffset", "className", "searchPlaceholder", "searchIcon", "filter", "prefixInputComponent", "nothingFoundMessage", "limit", "actionComponent", "actionsWrapperComponent", "zIndex"]);
    var _t = useState(-1), hovered = _t[0], setHovered = _t[1];
    var _u = useState(false), IMEOpen = _u[0], setIMEOpen = _u[1];
    var _v = useStyles({ centered: centered, maxWidth: maxWidth, topOffset: topOffset, radius: radius, zIndex: zIndex }, { classNames: classNames, name: 'Spotlight' }), classes = _v.classes, cx = _v.cx;
    var _w = useScrollLock(), lockScroll = _w[1];
    var focusTrapRef = useFocusTrap(opened);
    var resetHovered = function () { return setHovered(-1); };
    var handleClose = function () {
        resetHovered();
        onClose();
    };
    useFocusReturn({ opened: opened });
    var filteredActions = filter(query, actions).slice(0, limit);
    var groupedWithLabels = getGroupedOptions(filteredActions).items;
    var groupedActions = groupedWithLabels
        .map(function (item) { return (item.type === 'item' ? item.item : undefined); })
        .filter(function (item) { return item; });
    useDidUpdate(function () {
        if (groupedActions.length - 1 < hovered) {
            setHovered(groupedActions.length - 1);
        }
    }, [groupedActions.length]);
    var handleInputKeyDown = function (event) {
        var _a;
        if (IMEOpen) {
            return;
        }
        switch (event.key) {
            case 'ArrowDown': {
                event.preventDefault();
                setHovered(function (current) { return (current < groupedActions.length - 1 ? current + 1 : 0); });
                break;
            }
            case 'ArrowUp': {
                event.preventDefault();
                setHovered(function (current) { return (current > 0 ? current - 1 : groupedActions.length - 1); });
                break;
            }
            case 'Enter': {
                event.preventDefault();
                var action = groupedActions[hovered];
                (_a = action === null || action === void 0 ? void 0 : action.onTrigger) === null || _a === void 0 ? void 0 : _a.call(action, action);
                if (closeOnActionTrigger && (action === null || action === void 0 ? void 0 : action.onTrigger)) {
                    handleClose();
                }
                break;
            }
            case 'Escape': {
                event.preventDefault();
                handleClose();
            }
        }
    };
    var handleInputChange = function (event) {
        onQueryChange(event.currentTarget.value);
        if (hovered === -1) {
            setHovered(0);
        }
    };
    return (_jsx(GroupedTransition, __assign({ onExited: function () { return lockScroll(false); }, onEntered: function () { return lockScroll(true); }, mounted: opened, transitions: {} }, { children: function (transitionStyles) { return (_jsx("div", __assign({ className: cx(classes.root, className) }, others, { children: _jsxs("div", __assign({ className: classes.inner, ref: focusTrapRef }, { children: [_jsxs(Paper, __assign({ style: transitionStyles.spotlight, className: classes.spotlight, shadow: shadow, radius: radius, onMouseLeave: resetHovered }, { children: [_jsxs("div", __assign({ style: { display: 'flex' } }, { children: [prefixInputComponent && prefixInputComponent, _jsx(TextInput, { value: query, onChange: handleInputChange, onKeyDown: handleInputKeyDown, onCompositionStart: function () { return setIMEOpen(true); }, onCompositionEnd: function () { return setIMEOpen(false); }, classNames: { input: classes.searchInput }, size: "lg", placeholder: searchPlaceholder, icon: searchIcon, onMouseEnter: resetHovered, autoComplete: "chrome-please-just-do-not-show-it-thanks" })] })), _jsx(ActionsWrapper, { children: _jsx(ActionsList, { highlightQuery: highlightQuery, highlightColor: "", actions: groupedWithLabels, actionComponent: actionComponent, hovered: hovered, query: query, nothingFoundMessage: nothingFoundMessage, onActionHover: setHovered, onActionTrigger: function (action) {
                                        action.onTrigger(action);
                                        closeOnActionTrigger && handleClose();
                                    }, radius: radius }) })] })), _jsx("div", __assign({ style: transitionStyles.overlay }, { children: _jsx(Overlay, { className: classes.overlay, zIndex: 1, onMouseDown: handleClose, color: overlayColor, opacity: overlayOpacity, blur: overlayBlur }) }))] })) }))); } })));
};
Spotlight.displayName = '@mantine/spotlight/Spotlight';
//# sourceMappingURL=Spotlight.js.map