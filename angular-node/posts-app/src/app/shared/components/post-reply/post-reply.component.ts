import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { IPostReply } from '../../interfaces/post-reply.interface';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'app-post-reply',
  imports: [DatePipe, MatCard, MatCardContent, ProfilePictureComponent, RouterLink],
  templateUrl: './post-reply.component.html',
  styleUrl: './post-reply.component.scss'
})
export class PostReplyComponent {
  readonly postReply = input.required<IPostReply>();
}
