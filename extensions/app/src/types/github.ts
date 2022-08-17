export type Repo = {
  full_name: string;
  name: string;
  owner: {
    avatar_url: string;
  };
};


export type Issue = {
  url: string;
  id: BigInteger;
  title: string;
  body: string;
  user: {
    avatar_url: string;
  };
};
