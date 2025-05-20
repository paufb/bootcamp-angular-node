import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../user.interface';
import { fadeIn, fadeOut } from '../../../shared/animations';
import { ProfilePictureComponent } from '../../../shared/profile-picture/profile-picture.component';

@Component({
  selector: 'app-user-profile-header',
  imports: [MatButtonModule, ProfilePictureComponent],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.css',
  animations: [fadeIn, fadeOut]
})
export class UserProfileHeaderComponent {
  user = input.required<IUser | null>();
}
