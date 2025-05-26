import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { filter } from 'rxjs';
import { PostPromptComponent } from '../shared/post-prompt/post-prompt.component';
import { PostService } from '../shared/post.service';
import { IPost } from '../shared/post.interface';
import { fadeIn, fadeOut, scaleFadeInFromTop } from '../../shared/animations';

@Component({
  selector: 'app-post-list',
  imports: [MatButtonModule, MatIconModule, MatTabsModule, PostPromptComponent, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  animations: [fadeIn, fadeOut, scaleFadeInFromTop]
})
export class PostListComponent implements OnInit {
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
