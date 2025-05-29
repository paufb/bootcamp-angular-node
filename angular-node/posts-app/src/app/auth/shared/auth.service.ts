import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../../users/shared/user.interface';
import { UserService } from '../../users/shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = '/api/auth';
  private readonly LOCAL_STORAGE_ITEM_KEY = 'user_details';
  private readonly httpClient = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly _loggedInUser = signal<IUser | null>(null);
  readonly loggedInUser = this._loggedInUser.asReadonly();
  readonly isLoggedIn = computed(() => !!this.getLocalStorageItem() || !!this._loggedInUser());

  constructor() {
    const localStorageItem = this.getLocalStorageItem();
    if (!localStorageItem?.username) return;
    this.userService.getUser(localStorageItem.username)
      .subscribe({
        next: user => this._loggedInUser.set(user)
      });
  }

  private getLocalStorageItem(): { username: string } | null {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_ITEM_KEY)!);
  }

  logIn(username: string, password: string): Observable<IUser> {
    const requestBody = { username, password };
    return this.httpClient.post<IUser>(this.URL, requestBody).pipe(
      tap(user => {
        this._loggedInUser.set(user);
        localStorage.setItem(this.LOCAL_STORAGE_ITEM_KEY, JSON.stringify({ username: user.username }));
      })
    );
  }

  logOut(): Observable<null> {
    localStorage.removeItem(this.LOCAL_STORAGE_ITEM_KEY);
    return this.httpClient.post<null>(`${this.URL}/logout`, null);
  }
}
