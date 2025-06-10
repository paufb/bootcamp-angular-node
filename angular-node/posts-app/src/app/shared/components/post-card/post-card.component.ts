import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, model, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IPost } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'app-post-card',
  imports: [DatePipe, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatRippleModule, ProfilePictureComponent, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent implements OnInit {
  readonly post = input.required<IPost>();
  readonly dynamicReplyCount = input<number>();
  private readonly postService = inject(PostService);
  private readonly router = inject(Router);
  protected readonly hasBeenLiked = signal<boolean>(false);
  protected readonly likeCount = computed(() => {
    const post = this.post();
    const hasBeenLiked = this.hasBeenLiked();
    const likeCount = post.likes.count;
    return hasBeenLiked
      ? post.isLikedByUser ? likeCount : likeCount + 1
      : post.isLikedByUser ? likeCount - 1 : likeCount
  });

  ngOnInit(): void {
    this.hasBeenLiked.set(this.post().isLikedByUser);
  }

  protected stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  protected likePost(event: MouseEvent) {
    this.stopPropagation(event);
    this.postService.likePost(!this.hasBeenLiked(), this.post()._id)
      .subscribe({
        error: error => window.alert(`Error liking post: ${error.message}`),
        complete: () => this.hasBeenLiked.update(value => !value)
      });
  }

  protected navigateToPostPage() {
    this.router.navigate(['/posts', this.post()._id]);
  }
}
