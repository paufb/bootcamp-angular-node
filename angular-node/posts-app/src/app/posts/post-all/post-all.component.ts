import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { PostGridComponent } from '../shared/post-grid/post-grid.component';
import { IPost } from '../shared/post.interface';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-all',
  imports: [PostGridComponent],
  template: `
    <app-post-grid [posts]="posts()" [newlyCreatedPosts]="newlyCreatedPosts()" />
  `
})
export class PostAllComponent implements OnInit {
  protected newlyCreatedPosts = inject<Signal<IPost[]>>(ROUTER_OUTLET_DATA);
  private postService = inject(PostService);
  protected posts = signal<IPost[] | null>(null);

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe({
        next: posts => this.posts.set(posts),
        error: error => window.alert(`Could not fetch posts: ${error.message}`)
      });
  }
}
