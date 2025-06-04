import { Component, input, output } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { fadeIn, fadeOut, scaleFadeInFromTop } from '../../../shared/animations';
import { PostCardSkeletonComponent } from '../post-card-skeleton/post-card-skeleton.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-grid',
  imports: [InfiniteScrollDirective, PostCardComponent, PostCardSkeletonComponent],
  templateUrl: './post-grid.component.html',
  styleUrl: './post-grid.component.scss',
  animations: [fadeIn, fadeOut, scaleFadeInFromTop]
})
export class PostGridComponent {
  readonly posts = input.required<IPost[] | null>();
  readonly newlyCreatedPosts = input<IPost[]>([]);
  readonly loadMorePosts = output();

  protected onScroll() {
    this.loadMorePosts.emit();
  }
}
