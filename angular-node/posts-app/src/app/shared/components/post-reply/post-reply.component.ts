import type { IPostReply } from '../../interfaces/post-reply.interface';
import { Component, computed, inject, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { PostReplyService } from '../../services/post-reply.service';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'app-post-reply',
  imports: [MatCard, MatIcon, MatIconButton, MatMenu, MatMenuItem, MatMenuTrigger, ProfilePictureComponent, RouterLink, TimeAgoPipe],
  templateUrl: './post-reply.component.html',
  styleUrl: './post-reply.component.scss'
})
export class PostReplyComponent {
  readonly postReply = input.required<IPostReply>();
  readonly deleted = output<IPostReply['_id']>();
  private readonly authService = inject(AuthService);
  private readonly postReplyService = inject(PostReplyService);
  protected readonly isOwn = computed(() => this.authService.authenticatedUser()?._id === this.postReply().user?._id);

  protected deleteReply() {
    this.postReplyService.deletePostReply(this.postReply()._id)
      .subscribe({
        error: error => window.alert(`Could not delete post reply: ${error.message}`),
        complete: () => this.deleted.emit(this.postReply()._id)
      });
  }
}
