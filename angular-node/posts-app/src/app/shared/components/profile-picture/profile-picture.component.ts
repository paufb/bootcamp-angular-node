import { Component, computed, input } from '@angular/core';
import { fadeIn, fadeOut } from '../../../shared/animations';

@Component({
  selector: 'app-profile-picture',
  imports: [],
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.scss',
  animations: [fadeIn, fadeOut],
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()'
  }
})
export class ProfilePictureComponent {
  readonly src = input.required<string | null | undefined>();
  readonly width = input<string>('3rem');
  readonly height = input<string>('3rem');
  protected readonly imgSrc = computed(() => this.src() ?? 'assets/circle-user.svg');
}
