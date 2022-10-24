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
import Spotlight from 'ui/spotlight';
import { BackButton } from './back_button';
import styles from './search_view.module.scss';
var SearchView = function (_a) {
    var actions = _a.actions, placeholder = _a.placeholder, CustomAction = _a.CustomAction;
    return (_jsx("div", __assign({ className: styles.mainContainer }, { children: _jsx(Spotlight, { actions: actions, placeholder: placeholder, withinPortal: true, prefixInputComponent: _jsx(BackButton, {}), actionComponent: CustomAction }) })));
};
export { SearchView };
//# sourceMappingURL=search_view.js.map