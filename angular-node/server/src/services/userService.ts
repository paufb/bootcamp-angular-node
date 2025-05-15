import { User } from '../models/user'

interface CreateUserDTO {
  name: string;
  username: string;
}

const createUser = async (userData: CreateUserDTO) => {
  return await User.create(userData);
}

const getUserByUsername = async (username: string) => {
  return await User.findOne({ username });
}

export default {
  createUser,
  getUserByUsername
};
