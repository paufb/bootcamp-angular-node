export interface IUser {
  _id: string;
  name: string;
  username: string;
  followed: {
    count: number;
  };
  follower: {
    count: number;
  };
  isFollowedByUser: boolean;
  createdAt: Date;
  updatedAt: Date;
}
