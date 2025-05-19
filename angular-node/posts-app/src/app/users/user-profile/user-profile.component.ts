import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../shared/user.interface';
import { UserService } from '../shared/user.service';
import { PostCardComponent } from '../../posts/shared/post-card/post-card.component';
import { IPost } from '../../posts/shared/post.interface';
import { PostService } from '../../posts/shared/post.service';
import { ProfilePictureComponent } from '../../shared/profile-picture/profile-picture.component';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, PostCardComponent, ProfilePictureComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly postService = inject(PostService);
  protected user$!: Observable<IUser>;
  protected userPosts$!: Observable<IPost[]>;

  ngOnInit(): void {
    const { username } = this.activatedRoute.snapshot.params;
    this.user$ = this.userService.getUser(username);
    this.userPosts$ = this.postService.getPosts({ username });
  }
}
