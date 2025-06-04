import { IUser } from './user.interface';

export interface IEditUserDTO {
  name: IUser['name'];
  username: IUser['username'];
}
