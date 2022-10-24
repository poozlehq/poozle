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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { randomId } from '@mantine/hooks';
import { useState, useEffect } from 'react';
function prepareAction(action) {
    return __assign(__assign({}, action), { id: action.id || randomId() });
}
function filterDuplicateActions(actions) {
    var ids = [];
    return actions
        .reduceRight(function (acc, action) {
        if (!ids.includes(action.id)) {
            ids.push(action.id);
            acc.push(action);
        }
        return acc;
    }, [])
        .reverse();
}
function prepareActions(initialActions) {
    return filterDuplicateActions(initialActions.map(function (action) { return prepareAction(action); }));
}
export function useActionsState(initialActions, query) {
    var _a = useState(prepareActions(typeof initialActions === 'function' ? initialActions(query) : initialActions)), actions = _a[0], setActions = _a[1];
    useEffect(function () {
        if (typeof initialActions === 'function') {
            setActions(prepareActions(initialActions(query)));
        }
    }, [initialActions, query]);
    var updateActions = function (payload) {
        return setActions(prepareActions(typeof payload === 'function' ? payload(query) : payload));
    };
    var registerActions = function (payload) {
        return setActions(function (current) { return prepareActions(__spreadArray(__spreadArray([], current, true), payload, true)); });
    };
    var removeActions = function (ids) {
        return setActions(function (current) { return current.filter(function (action) { return !ids.includes(action.id); }); });
    };
    var triggerAction = function (id) {
        var _a;
        var action = actions.find(function (item) { return item.id === id; });
        (_a = action === null || action === void 0 ? void 0 : action.onTrigger) === null || _a === void 0 ? void 0 : _a.call(action, action);
    };
    return [
        actions,
        {
            registerActions: registerActions,
            updateActions: updateActions,
            removeActions: removeActions,
            triggerAction: triggerAction,
        },
    ];
}
//# sourceMappingURL=use-actions-state.js.map