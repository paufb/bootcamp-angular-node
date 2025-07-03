import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEditUserFormData } from '../interfaces/edit-user-form-data.interface';
import { ISignupFormData } from '../interfaces/signup-form-data.interface';
import { IUser } from '../interfaces/user.interface';

interface UserRequestQueryParams {
  pageSize: number;
  page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly URL = '/api/users';
  private readonly httpClient = inject(HttpClient);

  private constructPaginationQueryParams(params: UserRequestQueryParams): Record<string, string | number | boolean> {
    const queryParams: Record<string, string | number | boolean> = {};
    if (params.pageSize) queryParams['page_size'] = params.pageSize;
    if (params.page) queryParams['page'] = params.page;
    return queryParams;
  }

  getUser(userId: IUser['_id']): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.URL}/${userId}`);
  }

  getUserByUsername(username: IUser['username']) {
    return this.httpClient.get<IUser>(`${this.URL}/username/${username}`);
  }

  createUser(data: ISignupFormData): Observable<{ username: string; }> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('password', data.password);
    if (data.profilePicture) formData.append('profile-picture', data.profilePicture);
    return this.httpClient.post<{ username: string; }>(this.URL, formData);
  }

  getFollowersUsers(username: IUser['username']) {
    return this.httpClient.get<IUser[]>(`${this.URL}/${username}/followers`);
  }

  getFollowingUsers(username: IUser['username']): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.URL}/${username}/following`);
  }

  editUser(userId: IUser['_id'], data: IEditUserFormData) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    if (data.password) formData.append('password', data.password);
    if (data.profilePicture) formData.append('profile-picture', data.profilePicture);
    return this.httpClient.patch<IUser>(`${this.URL}/${userId}`, formData);
  }

  followUser(follow: boolean, userId: IUser['_id']): Observable<null> {
    const requestBody = { follow };
    return this.httpClient.put<null>(`${this.URL}/${userId}/follow`, requestBody);
  }

  searchUsers(query: string, params: UserRequestQueryParams) {
    const queryParams = {
      ...this.constructPaginationQueryParams(params),
      q: query
    };
    return this.httpClient.get<IUser[]>(`${this.URL}/search`, { params: queryParams });
  }
}
