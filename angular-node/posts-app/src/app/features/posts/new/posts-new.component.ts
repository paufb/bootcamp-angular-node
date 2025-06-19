import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostPromptComponent } from '../../../shared/components/post-prompt/post-prompt.component';

@Component({
  selector: 'app-posts-new',
  imports: [PostPromptComponent],
  templateUrl: './posts-new.component.html',
  styleUrl: './posts-new.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsNewComponent {
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  protected onCreatePost() {
    const { navigationId } = this.location.getState() as any;
    if (navigationId > 1) return this.location.back();
    this.router.navigate(['/posts']);
  }
}
