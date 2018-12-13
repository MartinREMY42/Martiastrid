import {Authority} from './Authority';

export interface User {
  username: string;
  password: string;
  enabled: boolean;
  nonExpired: boolean;
  nonLocked: boolean;
  credentialsNonExpired: boolean;
  authorities: Authority[];
  birthDate: Date;
  creationDate: Date;
  orders: any[];

}
