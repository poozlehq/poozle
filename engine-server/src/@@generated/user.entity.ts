
import {Workspace} from './workspace.entity'


export class User {
  userId: string ;
createdAt: Date ;
updatedAt: Date ;
firstname: string  | null;
lastname: string  | null;
Workspace?: Workspace[] ;
}
