import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  imports: [],
  template: `
    <img
      [src]="src()"
      [width]="width()"
      [height]="height()"
      alt="Profile picture"
    />
  `,
  styles: `
    :host {
      display: flex;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
    }
  `,
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()'
  }
})
export class ProfilePictureComponent {
  src = input<string>('circle-user.svg');
  width = input<string>('3rem');
  height = input<string>('3rem');
}
