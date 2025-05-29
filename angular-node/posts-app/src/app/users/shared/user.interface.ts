export interface IUser {
  _id: string;
  name: string;
  username: string;
  following: {
    count: number;
  };
  followers: {
    count: number;
  };
  isFollowedByUser?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
