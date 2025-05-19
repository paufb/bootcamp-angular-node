import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly URL = '/api/users';
  private readonly httpClient = inject(HttpClient);

  getUser(username: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.URL}/${username}`);
  }
}
