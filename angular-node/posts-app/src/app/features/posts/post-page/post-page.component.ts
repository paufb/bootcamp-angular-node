import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostCardSkeletonComponent } from '../../../shared/components/post-card-skeleton/post-card-skeleton.component';
import { PostCardComponent } from '../../../shared/components/post-card/post-card.component';
import { IPost } from '../../../shared/interfaces/post.interface';
import { PostService } from '../../../shared/services/post.service';

@Component({
  selector: 'app-post-page',
  imports: [PostCardComponent, PostCardSkeletonComponent],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postService = inject(PostService);
  protected readonly post = signal<IPost | null>(null);
  private postId!: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postId = params['id'];
      this.fetchPost();
    });
  }

  private fetchPost() {
    this.postService.getPost(this.postId)
      .subscribe({
        next: post => this.post.set(post),
        error: error => window.alert(`Could not fetch post: ${error.message}`)
      });
  }
}
