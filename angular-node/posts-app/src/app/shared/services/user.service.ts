import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEditUserDTO } from '../interfaces/edit-user-dto.interface';
import { ISignupFormData } from '../interfaces/signup-form-data.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly URL = '/api/users';
  private readonly httpClient = inject(HttpClient);

  getUser(userId: IUser['_id']): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.URL}/${userId}`);
  }

  getUserByUsername(username: IUser['username']) {
    return this.httpClient.get<IUser>(`${this.URL}/username/${username}`);
  }

  createUser(formData: ISignupFormData): Observable<{ username: string; }> {
    return this.httpClient.post<{ username: string; }>(this.URL, formData);
  }

  getFollowersUsers(username: IUser['username']) {
    return this.httpClient.get<IUser[]>(`${this.URL}/${username}/followers`);
  }

  getFollowingUsers(username: IUser['username']): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.URL}/${username}/following`);
  }

  editUser(userId: IUser['_id'], data: IEditUserDTO) {
    return this.httpClient.patch<IUser>(`${this.URL}/${userId}`, data);
  }

  followUser(follow: boolean, userId: IUser['_id']): Observable<null> {
    const requestBody = { follow };
    return this.httpClient.put<null>(`${this.URL}/${userId}/follow`, requestBody);
  }
}
