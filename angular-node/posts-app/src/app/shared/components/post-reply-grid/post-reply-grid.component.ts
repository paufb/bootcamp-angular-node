import type { IPost } from '../../interfaces/post.interface';
import type { IPostReply } from '../../interfaces/post-reply.interface';
import { booleanAttribute, Component, input, model, output } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { fadeIn, fadeOut, scaleFadeInFromTop } from '../../animations';
import { PostCardSkeletonComponent } from '../post-card-skeleton/post-card-skeleton.component';
import { PostReplyComponent } from '../post-reply/post-reply.component';
import { PostReplyChainComponent } from '../post-reply-chain/post-reply-chain.component';

@Component({
  selector: 'app-post-reply-grid',
  imports: [InfiniteScrollDirective, PostCardSkeletonComponent, PostReplyChainComponent, PostReplyComponent],
  templateUrl: './post-reply-grid.component.html',
  styleUrl: './post-reply-grid.component.scss',
  animations: [fadeIn, fadeOut, scaleFadeInFromTop]
})
export class PostReplyGridComponent {
  readonly postReplies = model.required<IPostReply[] | null>();
  readonly displayPostRepliedTo = input(false, { transform: booleanAttribute });
  readonly loadMorePostReplies = output();
  readonly deletedPostReply = output<IPostReply['_id']>();

  protected onScroll() {
    this.loadMorePostReplies.emit();
  }

  protected onDeletedPost(postId: IPost['_id']) {
    this.postReplies.update(prev => prev!.map(pR =>
      pR.post?._id === postId
        ? { ...pR, post: null }
        : pR
    ));
  }

  protected onDeletedPostReply(postReplyId: IPostReply['_id']) {
    this.deletedPostReply.emit(postReplyId);
  }
}
