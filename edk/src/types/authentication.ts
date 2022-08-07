export type Authentication =
  | {
      bearer_token: string;
    }
  | { [x: string]: string };
