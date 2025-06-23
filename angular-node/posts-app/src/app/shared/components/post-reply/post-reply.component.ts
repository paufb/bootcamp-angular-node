import type { IPostReply } from '../../interfaces/post-reply.interface';
import { Component, input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'app-post-reply',
  imports: [MatCard, ProfilePictureComponent, RouterLink, TimeAgoPipe],
  templateUrl: './post-reply.component.html',
  styleUrl: './post-reply.component.scss'
})
export class PostReplyComponent {
  readonly postReply = input.required<IPostReply>();
}
