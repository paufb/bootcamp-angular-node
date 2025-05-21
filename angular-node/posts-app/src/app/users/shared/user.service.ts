import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './user.interface';
import { ISignupFormData } from '../../auth/shared/signup-form-data.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly URL = '/api/users';
  private readonly httpClient = inject(HttpClient);

  getUser(username: IUser['username']): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.URL}/${username}`);
  }

  createUser(formData: ISignupFormData): Observable<{ username: string; }> {
    return this.httpClient.post<{ username: string; }>(this.URL, formData);
  }
}
