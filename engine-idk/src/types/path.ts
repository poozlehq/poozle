export interface Meta {
  limit: number;
  cursors: {
    before: string;
    current: string;
    next: string;
  };
}

export interface Response {
  data: any;
  meta?: Meta;
  error?: string;
}
