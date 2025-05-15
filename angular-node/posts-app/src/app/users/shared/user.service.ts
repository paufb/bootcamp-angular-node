import { Injectable, Signal, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _user = signal<User>({
    id: 1,
    profileName: 'My Profile Name',
    userName: 'myusername'
  });
  readonly user = this._user.asReadonly();

  getCurrentUser(): Signal<User> {
    return this.user;
  }

  getUserByUserName(userName: string): Observable<User> {
    return of(this.user());
  }
}
