import { Component, input } from '@angular/core';
import { PostCardSkeletonComponent } from '../post-card-skeleton/post-card-skeleton.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { IPost } from '../post.interface';
import { fadeIn, fadeOut, scaleFadeInFromTop } from '../../../shared/animations';

@Component({
  selector: 'app-post-grid',
  imports: [PostCardComponent, PostCardSkeletonComponent],
  templateUrl: './post-grid.component.html',
  styleUrl: './post-grid.component.scss',
  animations: [fadeIn, fadeOut, scaleFadeInFromTop]
})
export class PostGridComponent {
  posts = input.required<IPost[] | null>();
  newlyCreatedPosts = input<IPost[]>([]);
}
