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
import { createStyles } from '@mantine/core';
export default createStyles(function (theme, _a) {
    var centered = _a.centered, maxWidth = _a.maxWidth, topOffset = _a.topOffset, radius = _a.radius, zIndex = _a.zIndex;
    return ({
        root: __assign(__assign({}, theme.fn.cover()), { position: 'fixed', zIndex: zIndex }),
        spotlight: {
            position: 'relative',
            zIndex: 2,
            backgroundColor: 'transparent',
            borderRadius: theme.fn.radius(radius),
            width: '100%',
            maxWidth: maxWidth,
            overflow: 'hidden',
            marginLeft: 'calc(var(--removed-scroll-width, 0px) * -1)',
        },
        overlay: __assign(__assign({}, theme.fn.cover()), { position: 'fixed' }),
        inner: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: centered ? theme.spacing.md : topOffset,
            justifyContent: centered ? 'center' : 'flex-start',
            alignItems: 'center',
        },
        searchInput: {
            border: 0,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            backgroundColor: 'transparent',
        },
    });
});
//# sourceMappingURL=Spotlight.styles.js.map