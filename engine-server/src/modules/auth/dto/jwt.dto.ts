/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface JwtDto {
  userId: string;
  /**
   * Issued at
   */
  iat: number;
  /**
   * Expiration time
   */
  exp: number;
}
