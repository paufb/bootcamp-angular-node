import type { IPostReply } from '../../interfaces/post-reply.interface';
import { booleanAttribute, Component, input, output } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { fadeIn, fadeOut, scaleFadeInFromTop } from '../../animations';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostCardSkeletonComponent } from '../post-card-skeleton/post-card-skeleton.component';
import { PostReplyComponent } from '../post-reply/post-reply.component';

@Component({
  selector: 'app-post-reply-grid',
  imports: [InfiniteScrollDirective, PostCardComponent, PostCardSkeletonComponent, PostReplyComponent],
  templateUrl: './post-reply-grid.component.html',
  styleUrl: './post-reply-grid.component.scss',
  animations: [fadeIn, fadeOut, scaleFadeInFromTop]
})
export class PostReplyGridComponent {
  readonly postReplies = input.required<IPostReply[] | null>();
  readonly displayPostRepliedTo = input(false, { transform: booleanAttribute });
  readonly loadMorePostReplies = output();

  protected onScroll() {
    this.loadMorePostReplies.emit();
  }
}
