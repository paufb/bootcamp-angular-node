import { User } from '../../users/shared/user.interface';

export interface Post {
  id: number;
  createdAt: Date;
  title: string;
  body: string;
  user?: User;
}
