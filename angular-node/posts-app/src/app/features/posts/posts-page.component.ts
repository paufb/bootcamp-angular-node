import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { filter } from 'rxjs';
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
export class PostsPageComponent implements OnInit {
  private readonly postFeedService = inject(PostFeedService);
  private readonly router = inject(Router);
  protected readonly navLinks = [
    { href: '/posts/all', name: 'All' },
    { href: '/posts/following', name: 'Following' }
  ];

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(_ => this.postFeedService.clearPosts());
  }

  protected onCreatePost(post: IPost) {
    this.postFeedService.prependPost(post);
  }
}
