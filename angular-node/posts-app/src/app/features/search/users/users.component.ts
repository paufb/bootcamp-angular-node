import type { ISearchRouterOutletData } from '../../../shared/interfaces/search-router-outlet-data.interface';
import type { IUser } from '../../../shared/interfaces/user.interface';
import { Component, effect, inject, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { UserGridComponent } from '../../../shared/components/user-grid/user-grid.component';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-users',
  imports: [UserGridComponent],
  template: `
    @if (!query()) {
      <div>Use the search bar to search for users...</div>
    } @else {
      <app-user-grid
        [users]="users()"
        (loadMoreUsers)="fetchSearchedUsers()"
      />
    }
  `,
  styles: `
    div {
      font-size: 1.25rem;
      color: var(--mat-sys-on-surface);
      text-align: center;
      margin-block: 1lh;
    }
  `
})
export class UsersComponent {
  private readonly data = inject(ROUTER_OUTLET_DATA) as Signal<ISearchRouterOutletData>;
  private readonly userService = inject(UserService);
  protected readonly users = signal<IUser[] | null>(null);
  protected query = signal<string | null>(null);
  private lastPage = 0;

  constructor() {
    effect(() => {
      this.query.set(this.data().query);
      this.lastPage = 0;
      this.users.set(null);
      this.fetchSearchedUsers();
    });
  }

  protected fetchSearchedUsers() {
    this.userService.searchUsers(this.query()!, { pageSize: 10, page: this.lastPage })
      .subscribe({
        next: users => {
          this.users.update(prev => [...(prev ?? []), ...users]);
          if (users.length > 0)
            this.lastPage++;
        },
        error: error => window.alert(`Could not search users: ${error.message}`)
      });
  }
}
