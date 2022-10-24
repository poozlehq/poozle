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
import { useDidUpdate, useDisclosure } from '@mantine/hooks';
import { useState, useRef } from 'react';
import { useSpotlightEvents } from './events';
import { SpotlightContext } from './Spotlight.context';
import { Spotlight } from './Spotlight/Spotlight';
import { useActionsState } from './use-actions-state/use-actions-state';
import { useSpotlightShortcuts } from './use-spotlight-shortcuts/use-spotlight-shortcuts';
export var SpotlightProvider = function (_a) {
    var initialActions = _a.actions, children = _a.children, _b = _a.shortcut, shortcut = _b === void 0 ? 'mod + K' : _b, onSpotlightClose = _a.onSpotlightClose, onSpotlightOpen = _a.onSpotlightOpen, onQueryChange = _a.onQueryChange, _c = _a.cleanQueryOnClose, cleanQueryOnClose = _c === void 0 ? true : _c, _d = _a.transitionDuration, transitionDuration = _d === void 0 ? 150 : _d, others = __rest(_a, ["actions", "children", "shortcut", "onSpotlightClose", "onSpotlightOpen", "onQueryChange", "cleanQueryOnClose", "transitionDuration"]);
    var timeoutRef = useRef(-1);
    var _e = useState(''), query = _e[0], setQuery = _e[1];
    var _f = useActionsState(initialActions, query), actions = _f[0], _g = _f[1], registerActions = _g.registerActions, updateActions = _g.updateActions, removeActions = _g.removeActions, triggerAction = _g.triggerAction;
    useDidUpdate(function () {
        updateActions(initialActions);
    }, [initialActions]);
    var handleQueryChange = function (value) {
        setQuery(value);
        onQueryChange === null || onQueryChange === void 0 ? void 0 : onQueryChange(value);
    };
    var _h = useDisclosure(false, {
        onClose: function () {
            onSpotlightClose === null || onSpotlightClose === void 0 ? void 0 : onSpotlightClose();
            if (cleanQueryOnClose) {
                timeoutRef.current = window.setTimeout(function () {
                    handleQueryChange('');
                }, transitionDuration);
            }
        },
        onOpen: function () {
            onSpotlightOpen === null || onSpotlightOpen === void 0 ? void 0 : onSpotlightOpen();
            window.clearTimeout(timeoutRef.current);
        },
    }), opened = _h[0], _j = _h[1], open = _j.open, close = _j.close, toggle = _j.toggle;
    var ctx = {
        openSpotlight: open,
        closeSpotlight: close,
        toggleSpotlight: toggle,
        registerActions: registerActions,
        removeActions: removeActions,
        triggerAction: triggerAction,
        opened: opened,
        actions: actions,
        query: query,
    };
    useSpotlightShortcuts(shortcut, open);
    useSpotlightEvents({ open: open, close: close, toggle: toggle, registerActions: registerActions, removeActions: removeActions, triggerAction: triggerAction });
    return (_jsxs(SpotlightContext.Provider, __assign({ value: ctx }, { children: [_jsx(Spotlight, __assign({ actions: actions, onClose: close, opened: opened, query: query, onQueryChange: handleQueryChange, transitionDuration: transitionDuration }, others)), children] })));
};
SpotlightProvider.displayName = '@mantine/spotlight/SpotlightProvider';
//# sourceMappingURL=SpotlightProvider.js.map