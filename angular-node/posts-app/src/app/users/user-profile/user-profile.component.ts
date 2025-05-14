import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.interface';
import { UserService } from '../shared/user.service';
import { ProfilePictureComponent } from '../../shared/profile-picture/profile-picture.component';

@Component({
  selector: 'app-user-profile',
  imports: [MatButtonModule, MatCardModule, MatIconModule, ProfilePictureComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  protected user!: User;
  private userSubscription!: Subscription;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    const userName = this.activatedRoute.snapshot.data['userName'];
    this.userSubscription = this.userService.getUserByUserName(userName)
      .subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
