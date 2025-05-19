import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private readonly URL = '/api/auth';
  private readonly LOCAL_STORAGE_ITEM_KEY = 'user_details';
  private readonly httpClient = inject(HttpClient);
  private readonly _username = signal<string | null>(null);
  readonly username = this._username.asReadonly();
  readonly isLoggedIn = computed(() => !!this.getLocalStorageItem() || !!this._username());

  ngOnInit(): void {
    const localStorageItem = this.getLocalStorageItem();
    if (localStorageItem)
      this._username.set(localStorageItem.username);
  }

  private getLocalStorageItem(): { username: string } | null {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_ITEM_KEY)!);
  }

  logIn(username: string, password: string): Observable<{ username: string }> {
    const requestBody = { username, password };
    return this.httpClient.post<{ username: string }>(this.URL, requestBody).pipe(
      tap(response => {
        this._username.set(response.username);
        localStorage.setItem(this.LOCAL_STORAGE_ITEM_KEY, JSON.stringify({ username }));
      })
    );
  }

  logOut(): Observable<null> {
    localStorage.removeItem(this.LOCAL_STORAGE_ITEM_KEY);
    return this.httpClient.post<null>(`${this.URL}/logout`, null);
  }

  signUp() {

  }
}
