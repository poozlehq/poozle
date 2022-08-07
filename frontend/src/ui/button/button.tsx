import { Button as MantineButton, ButtonProps } from '@mantine/core';
import classnames from 'classnames';

import styles from './button.module.scss';

type Props = any;

function Button(props: Props) {
  const { className, size = 'md', radius = 'sm', ...restProps } = props;

  return (
    <MantineButton
      size={size}
      radius={radius}
      className={classnames(styles.uiButton, className)}
      type="button"
      {...restProps}
    />
  );
}

function SubmitButton({ Component = Button, className, disabled, loading, ...props }: Props) {
  return (
    <Component
      htmltype="submit"
      type="submit"
      loading={loading}
      className={classnames(
        'ui-button-submit',
        className,
        { 'ui-btn-disabled': disabled },
        { 'ui-btn-loading': loading },
      )}
      {...props}
    />
  );
}

export { SubmitButton };

export default Button;
