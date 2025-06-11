import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-picture-dialog',
  imports: [],
  templateUrl: './profile-picture-dialog.component.html',
  styleUrl: './profile-picture-dialog.component.scss'
})
export class ProfilePictureDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ProfilePictureDialogComponent>);
  readonly matDialogData = inject<{ src: string; }>(MAT_DIALOG_DATA);
  protected readonly src = signal<string>(this.matDialogData.src);
}
