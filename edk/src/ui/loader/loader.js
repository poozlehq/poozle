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
import { Loader as LoaderComponent } from '@mantine/core';
import styles from './loader.module.scss';
var Loader = function () {
    return (_jsx("div", __assign({ className: styles.loader }, { children: _jsx(LoaderComponent, {}) })));
};
export default Loader;
//# sourceMappingURL=loader.js.map