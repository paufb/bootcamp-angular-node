import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { IPost } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'app-post-card',
  imports: [DatePipe, MatCard, MatChip, MatFabButton, MatIcon, MatIconButton, MatMenu, MatMenuItem, MatMenuTrigger, ProfilePictureComponent, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent implements OnInit {
  readonly post = input.required<IPost>();
  readonly dynamicReplyCount = input<number>();
  readonly delete = output<IPost['_id']>();
  private readonly authService = inject(AuthService);
  private readonly postService = inject(PostService);
  private readonly router = inject(Router);
  protected readonly hasBeenLiked = signal<boolean>(false);
  protected readonly isOwn = computed(() => this.authService.authenticatedUser()?._id === this.post().user?._id);
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

  protected deletePost() {
    this.postService.deletePost(this.post()._id)
      .subscribe({
        error: error => window.alert(`Could not delete post: ${error.message}`),
        complete: () => this.delete.emit(this.post()._id)
      });
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
