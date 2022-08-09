export type Spec =
  | {
      bearer_token: string;
    }
  | { [x: string]: string };
