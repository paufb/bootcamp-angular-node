import type { IUser } from '../../interfaces/user.interface';
import { Component, input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatRipple } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'app-user-card',
  imports: [MatCard, MatRipple, ProfilePictureComponent, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  readonly user = input.required<IUser | null>();
}
