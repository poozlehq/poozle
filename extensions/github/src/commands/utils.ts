/** Copyright (c) 2022, Poozle, all rights reserved. **/

export interface Repo {
  html_url: string;
  id: BigInteger;
  full_name: string;
  name: string;
  owner: {
    avatar_url: string;
  };
}

export interface Issue {
  url: string;
  id: BigInteger;
  title: string;
  body: string;
  html_url: string;
  user: {
    avatar_url: string;
  };
  number: BigInteger;
}

export interface Issues {
  items?: Issue[];
}

export interface Repos {
  items?: Repo[];
}
