/** Copyright (c) 2023, Poozle, all rights reserved. **/
import Cookies from 'cookies';

export default function handler(req, res) {
  const cookies = new Cookies(req, res);

  cookies.set('auth-token', null, { expires: new Date(0) });

  res.status(200).json({ logout: true });
}
