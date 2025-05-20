import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileHeaderComponent } from '../shared/user-profile-header/user-profile-header.component';
import { IUser } from '../shared/user.interface';
import { UserService } from '../shared/user.service';
import { PostCardSkeletonComponent } from '../../posts/shared/post-card-skeleton/post-card-skeleton.component';
import { PostCardComponent } from '../../posts/shared/post-card/post-card.component';
import { IPost } from '../../posts/shared/post.interface';
import { PostService } from '../../posts/shared/post.service';
import { fadeIn, fadeOut } from '../../shared/animations';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe, PostCardComponent, PostCardSkeletonComponent, UserProfileHeaderComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  animations: [fadeIn, fadeOut]
})
export class UserProfileComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly postService = inject(PostService);
  protected readonly user = signal<IUser | null>(null);
  protected userPosts$!: Observable<IPost[]>;

  ngOnInit(): void {
    const { username } = this.activatedRoute.snapshot.params;
    this.userService.getUser(username)
      .subscribe({
        next: user => this.user.set(user),
        error: error => window.alert(`Could not fetch user: ${error.message}`)
      });
    this.userPosts$ = this.postService.getPosts({ username });
  }
}
