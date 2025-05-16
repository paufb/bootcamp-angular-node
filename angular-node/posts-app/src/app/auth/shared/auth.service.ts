import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = '/api/auth';
  private readonly httpClient = inject(HttpClient);
  private readonly _username = signal<string | null>(null);
  readonly username = this._username.asReadonly();
  readonly isLoggedIn = computed(() => !!this._username());

  logIn(username: string, password: string): Observable<{ username: string }> {
    const requestBody = { username, password };
    return this.httpClient.post<{ username: string }>(this.url, requestBody).pipe(
      tap(response => this._username.set(response.username))
    );
  }

  signUp() {

  }
}
