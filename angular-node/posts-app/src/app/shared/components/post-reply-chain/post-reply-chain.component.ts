import type { IPost } from '../../interfaces/post.interface';
import type { IPostReply } from '../../interfaces/post-reply.interface';
import { Component, input, output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostReplyComponent } from '../post-reply/post-reply.component';

@Component({
  selector: 'app-post-reply-chain',
  imports: [MatCard, PostCardComponent, PostReplyComponent],
  templateUrl: './post-reply-chain.component.html',
  styleUrl: './post-reply-chain.component.scss'
})
export class PostReplyChainComponent {
  readonly postReply = input.required<IPostReply>();
  readonly deletedPost = output<IPost['_id']>();
  readonly deletedPostReply = output<IPostReply['_id']>();

  protected onDeletedPost(postId: IPost['_id']) {
    this.deletedPost.emit(postId);
  }

  protected onDeletedPostReply(postReplyId: IPostReply['_id']) {
    this.deletedPostReply.emit(postReplyId);
  }
}
