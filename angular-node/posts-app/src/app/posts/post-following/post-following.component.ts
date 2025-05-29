import { Component, effect, inject, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { PostGridComponent } from '../shared/post-grid/post-grid.component';
import { IPost } from '../shared/post.interface';
import { PostService } from '../shared/post.service';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-post-following',
  imports: [PostGridComponent],
  template: `
    <app-post-grid [posts]="posts()" [newlyCreatedPosts]="newlyCreatedPosts()" />
  `
})
export class PostFollowingComponent {
  protected readonly newlyCreatedPosts = inject<Signal<IPost[]>>(ROUTER_OUTLET_DATA);
  private readonly authService = inject(AuthService);
  private readonly postService = inject(PostService);
  protected readonly posts = signal<IPost[] | null>(null);

  constructor() {
    effect(() => {
      const loggedInUser = this.authService.loggedInUser();
      if (loggedInUser)
        this.postService.getFollowingUsersPosts(loggedInUser.username)
          .subscribe({
            next: posts => this.posts.set(posts),
            error: error => window.alert(`Could not fetch posts: ${error.message}`)
          });
    });
  }
}
