import { IUser } from '../../users/shared/user.interface';

export interface IEditUserDTO {
  name: IUser['name'];
  username: IUser['username'];
}
