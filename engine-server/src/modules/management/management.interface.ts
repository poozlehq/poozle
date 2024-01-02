import {
  IsString,
} from 'class-validator';


export class UserRequestIdBody {
  /**
   * Unique identifier for Integration Account
   */
  @IsString()
  user_id: string;
}