import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatFabAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTabLink, MatTabNav } from '@angular/material/tabs';
import { PostPromptComponent } from '../../shared/components/post-prompt/post-prompt.component';
import { IPost } from '../../shared/interfaces/post.interface';
import { PostFeedService } from '../../shared/services/post-feed.service';

@Component({
  selector: 'app-posts-page',
  imports: [MatFabAnchor, MatIcon, MatTabLink, MatTabNav, PostPromptComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss'
})
export class PostsPageComponent {
  private readonly postFeedService = inject(PostFeedService);
  protected readonly navLinks = [
    { href: 'all', name: 'All' },
    { href: 'following', name: 'Following' }
  ];

  protected onCreatePost(post: IPost) {
    this.postFeedService.prependPost(post);
  }
}
