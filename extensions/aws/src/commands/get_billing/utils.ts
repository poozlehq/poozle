/** Copyright (c) 2022, Poozle, all rights reserved. **/

export interface Group {
  Metrics: {
    Amount: string;
    Unit: string;
  };
  Keys: string[];
}

export interface Result {
  Groups: Group[];
}

export interface Results {
  DimensionValueAttributes: string[];
  GroupDefinitions: string[];
  ResultsByTime?: Result[];
}