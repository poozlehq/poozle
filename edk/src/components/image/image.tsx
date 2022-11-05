/** Copyright (c) 2022, Poozle, all rights reserved. **/

import classNames from 'classnames';
import * as React from 'react';

import styles from './image.module.scss';

export const Image = ({
  src,
  html_renderer = false,
  base64 = false,
  className,
  alt = 'component',
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: any;
  html_renderer?: boolean;
  className?: string;
  base64?: boolean;
  alt?: string;
}): React.ReactElement => {
  if (html_renderer) {
    return (
      <div
        className={classNames(className, styles.imageContainer)}
        dangerouslySetInnerHTML={{ __html: src }}
        style={{ display: 'flex' }}
      />
    );
  }

  if (base64) {
    return <img className={className} src={`data:image/svg+xml;utf8,${src}`} alt={alt} />;
  }

  return <img className={className} src={src} alt={alt} />;
};
