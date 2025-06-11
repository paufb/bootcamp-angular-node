import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fadeIn, fadeOut } from '../../../shared/animations';
import { ProfilePictureDialogComponent } from '../profile-picture-dialog/profile-picture-dialog.component';

@Component({
  selector: 'app-profile-picture',
  imports: [],
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.scss',
  animations: [fadeIn, fadeOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()'
  }
})
export class ProfilePictureComponent {
  readonly src = input.required<string | null | undefined>();
  readonly openable = input(false, { transform: booleanAttribute });
  readonly width = input<string>('3rem');
  readonly height = input<string>('3rem');
  private readonly matDialog = inject(MatDialog);
  protected readonly isDialogOpen = signal<boolean>(false);
  protected readonly imgSrc = computed(() => this.src() ?? 'assets/circle-user.svg');

  protected openImageDialog() {
    this.matDialog.open(ProfilePictureDialogComponent, {
      panelClass: 'profile-picture-dialog',
      data: { src: this.src() }
    });
  }
}
