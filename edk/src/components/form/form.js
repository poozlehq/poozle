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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { InputWrapper } from 'internal/input_wrapper';
import { SubmitButton } from 'ui/button';
import styles from './form.module.scss';
export function getInputWrapperFromBlocks(blocks, form) {
    return (_jsx(_Fragment, { children: blocks.map(function (block, index) { return (_jsx("div", __assign({ className: styles.input }, { children: _jsx(InputWrapper, { block: block, inputProps: form.getInputProps(block.key) }, index) }))); }) }));
}
function getInitialValues(blocks) {
    var initialValues = {};
    blocks.map(function (block) {
        initialValues[block.key] = '';
    });
    return initialValues;
}
export var Form = function (_a) {
    var blocks = _a.blocks, onSubmit = _a.onSubmit, submitText = _a.submitText;
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var form = useForm({
        initialValues: getInitialValues(blocks),
    });
    return (_jsxs("form", __assign({ onSubmit: form.onSubmit(function (values) {
            setLoading(true);
            onSubmit(values, { setLoading: setLoading });
        }) }, { children: [getInputWrapperFromBlocks(blocks, form), _jsx("div", __assign({ className: styles.actions }, { children: _jsx(SubmitButton, __assign({ size: "sm", loading: loading }, { children: submitText ? submitText : 'Submit' })) }))] })));
};
//# sourceMappingURL=form.js.map