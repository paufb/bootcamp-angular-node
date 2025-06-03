import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { IUser } from '../../users/shared/user.interface';
import { UserService } from '../../users/shared/user.service';

interface LocalStorageItem {
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = '/api/auth';
  private readonly LOCAL_STORAGE_ITEM_KEY = 'user_details';
  private readonly httpClient = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly _authenticatedUser = signal<IUser | null>(null);
  readonly authenticatedUser = this._authenticatedUser.asReadonly();

  private getLocalStorageItem(): LocalStorageItem | null {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_ITEM_KEY)!);
  }

  private setLocalStorageItem(item: LocalStorageItem): void {
    localStorage.setItem(this.LOCAL_STORAGE_ITEM_KEY, JSON.stringify(item));
  }

  isAuthenticated(): Observable<boolean> {
    const localStorageItem = this.getLocalStorageItem();
    if (!localStorageItem) return of(false);
    if (this._authenticatedUser()) return of(true);
    return this.userService.getUser(localStorageItem.userId).pipe(
      tap(user => this._authenticatedUser.set(user)),
      map(_ => true),
      catchError(() => of(false))
    );
  }

  updateAuthenticatedUser(user: IUser) {
    this._authenticatedUser.set(user);
  }

  logIn(username: string, password: string): Observable<IUser> {
    const requestBody = { username, password };
    return this.httpClient.post<IUser>(this.URL, requestBody).pipe(
      tap(user => {
        this.setLocalStorageItem({ userId: user._id });
        this._authenticatedUser.set(user);
      })
    );
  }

  logOut(): Observable<null> {
    localStorage.removeItem(this.LOCAL_STORAGE_ITEM_KEY);
    return this.httpClient.post<null>(`${this.URL}/logout`, null);
  }
}
