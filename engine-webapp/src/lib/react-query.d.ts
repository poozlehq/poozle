/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { DehydratedState } from 'react-query';

declare module 'react-query' {
  /** Interface for Exposed Props from Next Server */
  export interface ServerSidePropsWithState {
    /** QueryClient state must be dehydrated and returned from `getServerSideProps` to enable Client-side hydration. */
    dehydratedState: DehydratedState;
  }
}
