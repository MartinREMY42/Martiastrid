import {IAuthority} from './IAuthority';

export interface IUser {
  username: string;
  password: string;
  enabled: boolean;
  nonExpired: boolean;
  nonLocked: boolean;
  credentialsNonExpired: boolean;
  authorities: IAuthority[];
  birthDate: Date;
  creationDate: Date;
  orders: any[];

}
