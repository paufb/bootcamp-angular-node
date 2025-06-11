import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { fadeIn, fadeOut, scaleFadeInFromTop } from '../../shared/animations';
import { PostPromptComponent } from '../../shared/components/post-prompt/post-prompt.component';
import { IPost } from '../../shared/interfaces/post.interface';
import { PostFeedService } from '../../shared/services/post-feed.service';

@Component({
  selector: 'app-posts-page',
  imports: [MatButtonModule, MatIconModule, MatTabsModule, PostPromptComponent, RouterModule],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
  animations: [fadeIn, fadeOut, scaleFadeInFromTop]
})
export class PostsPageComponent {
  private readonly postFeedService = inject(PostFeedService);
  protected readonly navLinks = [
    { href: '/posts/all', name: 'All' },
    { href: '/posts/following', name: 'Following' }
  ];

  protected onCreatePost(post: IPost) {
    this.postFeedService.prependPost(post);
  }
}
