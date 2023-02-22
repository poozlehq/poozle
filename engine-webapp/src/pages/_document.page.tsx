/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { createGetInitialProps } from '@mantine/next';
import Document from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;
}
