import type { IUser } from '../../interfaces/user.interface';
import { Component, input, output } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { fadeIn, fadeOut } from '../../animations';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-grid',
  imports: [InfiniteScrollDirective, UserCardComponent],
  templateUrl: './user-grid.component.html',
  styleUrl: './user-grid.component.scss',
  animations: [fadeIn, fadeOut]
})
export class UserGridComponent {
  readonly users = input.required<IUser[] | null>();
  readonly loadMoreUsers = output();

  protected onScroll() {
    this.loadMoreUsers.emit();
  }
}
