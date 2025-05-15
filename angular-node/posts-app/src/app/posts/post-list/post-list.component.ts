import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post.interface';
import { ProfilePictureComponent } from '../../shared/profile-picture/profile-picture.component';
import { UserService } from '../../users/shared/user.service';

@Component({
  selector: 'app-post-list',
  imports: [AsyncPipe, DatePipe, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatProgressSpinner, ProfilePictureComponent, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  private userService = inject(UserService);
  private postService = inject(PostService);
  protected posts$!: Observable<Post[]>;

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts({ includeUser: true });
  }
}
