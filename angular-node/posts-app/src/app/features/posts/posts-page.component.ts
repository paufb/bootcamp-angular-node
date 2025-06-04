import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { filter } from 'rxjs';
import { fadeIn, fadeOut, scaleFadeInFromTop } from '../../shared/animations';
import { PostPromptComponent } from '../../shared/components/post-prompt/post-prompt.component';
import { IPost } from '../../shared/interfaces/post.interface';

@Component({
  selector: 'app-posts-page',
  imports: [MatButtonModule, MatIconModule, MatTabsModule, PostPromptComponent, RouterModule],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
  animations: [fadeIn, fadeOut, scaleFadeInFromTop]
})
export class PostsPageComponent implements OnInit {
  private readonly router = inject(Router);
  protected readonly newlyCreatedPosts = signal<IPost[]>([]);
  protected readonly navLinks = [
    { href: '/posts/all', name: 'All' },
    { href: '/posts/following', name: 'Following' }
  ];

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(_ => this.newlyCreatedPosts.set([]));
  }

  protected onCreatePost(newlyCreatedPost: IPost) {
    this.newlyCreatedPosts.update(posts => [newlyCreatedPost, ...posts]);
  }
}
