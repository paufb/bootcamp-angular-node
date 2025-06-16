import { Injectable, signal } from '@angular/core';

type AppTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class AppThemeService {
  private readonly _LOCALSTORAGE_ITEM_KEY = 'theme';
  private readonly _currentTheme = signal<AppTheme>('light');
  readonly currentTheme = this._currentTheme.asReadonly();

  constructor() {
    let theme = localStorage.getItem(this._LOCALSTORAGE_ITEM_KEY) as AppTheme | null;
    if (!theme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }
    this.setTheme(theme);
  }

  setTheme(theme: AppTheme) {
    document.documentElement.dataset['theme'] = theme;
    localStorage.setItem(this._LOCALSTORAGE_ITEM_KEY, theme);
    this._currentTheme.set(theme);
  }
}
