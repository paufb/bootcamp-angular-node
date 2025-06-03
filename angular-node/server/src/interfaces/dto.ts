export namespace DTO {
  export interface ICreateUserDTO {
    name: string;
    username: string;
    password: string;
  }
  export interface IUpdateUserDTO {
    name: string;
    username: string;
  }
  export interface ICreatePostDTO {
    body: string;
  }
  export interface ILikePostDTO {
    like: boolean;
  }
}
