export interface IUser {
  _id: string;
  name: string;
  username: string;
  imageUrl: string | null;
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
