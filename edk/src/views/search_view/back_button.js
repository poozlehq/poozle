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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Kbd, Tooltip, UnstyledButton } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons';
import styles from './back_button.module.scss';
export var BackButton = function (_a) {
    var onBackParent = _a.onBack;
    var onBack = function () {
        if (onBackParent) {
            onBackParent();
        }
    };
    var backElement = (_jsxs("div", __assign({ className: styles.tooltip }, { children: [_jsx(Kbd, { children: "Esc" }), " to go back ", _jsx(Kbd, { children: "Cmd + Esc" }), "to root search"] })));
    return (_jsx("div", __assign({ className: styles.backAction }, { children: _jsx(Tooltip, __assign({ label: backElement, position: "top" }, { children: _jsx(UnstyledButton, __assign({ className: styles.iconContainer, onClick: onBack }, { children: _jsx(IconArrowNarrowLeft, {}) })) })) })));
};
//# sourceMappingURL=back_button.js.map