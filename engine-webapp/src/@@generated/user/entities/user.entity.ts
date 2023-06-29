
import {Workspace} from '../../workspace/entities/workspace.entity'


export class User {
  userId: string ;
createdAt: Date ;
updatedAt: Date ;
firstname: string  | null;
lastname: string  | null;
email: string ;
Workspace?: Workspace[] ;
}
