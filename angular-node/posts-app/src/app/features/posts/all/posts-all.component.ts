import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PostGridComponent } from '../../../shared/components/post-grid/post-grid.component';
import { IPost } from '../../../shared/interfaces/post.interface';
import { PostService } from '../../../shared/services/post.service';
import { PostFeedService } from '../../../shared/services/post-feed.service';

@Component({
  selector: 'app-posts-all',
  imports: [PostGridComponent],
  template: `
    <app-post-grid
      [posts]="posts()"
      (loadMorePosts)="fetchMorePosts()"
      (deletePost)="deletePost($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsAllComponent implements OnInit {
  private readonly postFeedService = inject(PostFeedService);
  private readonly postService = inject(PostService);
  protected readonly posts = this.postFeedService.posts;
  private lastPostCreatedAt?: string;

  ngOnInit(): void {
    this.postFeedService.clearPosts();
    this.fetchMorePosts();
  }

  protected fetchMorePosts() {
    this.postService.getPosts({ pageSize: 10, createdBefore: this.lastPostCreatedAt })
      .subscribe({
        next: posts => {
          this.postFeedService.appendPosts(posts);
          if (posts.length > 0)
            this.lastPostCreatedAt = posts[posts.length - 1].createdAt;
        },
        error: error => window.alert(`Could not fetch posts: ${error.message}`)
      });
  }

  protected deletePost(postId: IPost['_id']) {
    this.postFeedService.removePost(postId);
  }
}
