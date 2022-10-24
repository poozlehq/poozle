import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
import styles from './image.module.scss';
export var Image = function (_a) {
    var src = _a.src, _b = _a.html_renderer, html_renderer = _b === void 0 ? false : _b, _c = _a.base64, base64 = _c === void 0 ? false : _c, className = _a.className, _d = _a.alt, alt = _d === void 0 ? 'component' : _d;
    if (html_renderer) {
        return (_jsx("div", { className: classNames(className, styles.imageContainer), dangerouslySetInnerHTML: { __html: src }, style: { display: 'flex' } }));
    }
    if (base64) {
        return _jsx("img", { className: className, src: "data:image/svg+xml;utf8,".concat(src), alt: alt });
    }
    return _jsx("img", { className: className, src: src, alt: alt });
};
//# sourceMappingURL=image.js.map