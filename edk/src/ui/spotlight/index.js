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
import { useState } from 'react';
import { CustomActionWithLoader } from './CustomActionWithLoading';
import { Spotlight } from './Spotlight/Spotlight';
function filter(_query, actions) {
    return actions;
}
var SpotlightComponent = function (_a) {
    var actions = _a.actions, placeholder = _a.placeholder, actionComponent = _a.actionComponent, loading = _a.loading, searchIcon = _a.searchIcon, prefixInputComponent = _a.prefixInputComponent, onQuery = _a.onQuery, noFilter = _a.noFilter;
    var _b = useState(''), query = _b[0], setQuery = _b[1];
    var ActionComponent = loading ? CustomActionWithLoader : actionComponent;
    var finalActions = loading ? [{ title: 'loading', onTrigger: function () { return null; } }] : actions;
    var extraParams = noFilter || loading
        ? {
            filter: filter,
        }
        : {};
    return (_jsx(Spotlight, __assign({ actions: finalActions, searchPlaceholder: placeholder, transitionDuration: 0, withinPortal: true, nothingFoundMessage: "Nothing found...", filter: function (query, actions) {
            if (loading) {
                return actions;
            }
            return actions.filter(function (action) { return action.title.toLowerCase().includes(query.toLowerCase()); });
        }, maxWidth: 800, topOffset: 0, opened: true, overlayBlur: 0, actionComponent: ActionComponent, closeOnActionTrigger: false, overlayOpacity: 0, centered: false, searchIcon: searchIcon, prefixInputComponent: prefixInputComponent, onClose: function () {
            throw new Error('Function not implemented.');
        }, query: query, onQueryChange: function (query) {
            if (onQuery) {
                onQuery(query);
            }
            setQuery(query);
        } }, extraParams)));
};
export default SpotlightComponent;
//# sourceMappingURL=index.js.map