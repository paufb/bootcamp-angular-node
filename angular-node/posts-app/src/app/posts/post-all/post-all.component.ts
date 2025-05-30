import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { PostGridComponent } from '../shared/post-grid/post-grid.component';
import { IPost } from '../shared/post.interface';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-all',
  imports: [PostGridComponent],
  template: `
    <app-post-grid
      [posts]="posts()"
      [newlyCreatedPosts]="newlyCreatedPosts()"
      (loadMorePosts)="fetchMorePosts()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostAllComponent implements OnInit {
  protected newlyCreatedPosts = inject<Signal<IPost[]>>(ROUTER_OUTLET_DATA);
  private postService = inject(PostService);
  protected posts = signal<IPost[] | null>(null);
  private page = 0;

  ngOnInit(): void {
    this.fetchMorePosts();
  }

  protected fetchMorePosts() {
    this.postService.getPosts({ pagesize: 10, page: this.page })
      .subscribe({
        next: posts => {
          this.posts.update(previousPosts => [...(previousPosts ?? []), ...posts]);
          this.page++;
        },
        error: error => window.alert(`Could not fetch posts: ${error.message}`)
      });
  }
}
