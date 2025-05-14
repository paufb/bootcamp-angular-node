import { Injectable, Signal, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = signal<User>({
    id: 1,
    profileName: 'My Profile Name',
    userName: 'myusername'
  });

  getCurrentUser(): Signal<User> {
    return this.user.asReadonly();
  }

  getUserByUserName(userName: string): Observable<User> {
    return of(this.user());
  }
}
