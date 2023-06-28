export interface Meta {
  limit: number;
  cursors: {
    before: string;
    current: string;
    next: string;
  };
}

export interface Response<T> {
  data: Partial<T>;
  meta?: Meta;
  error?: string;
}

export interface ResponseArray<T> {
  data: Partial<T>[];
  meta?: Meta;
  error?: string;
}

export type PathResponse<T> = Partial<T> | { raw_data: Record<any, any> };
