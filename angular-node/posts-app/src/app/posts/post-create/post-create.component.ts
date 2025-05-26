import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../shared/post.service';
import { PostPromptComponent } from "../shared/post-prompt/post-prompt.component";
import { IPost } from '../shared/post.interface';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, PostPromptComponent],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCreateComponent {
  private readonly postService = inject(PostService);
  private readonly location = inject(Location);

  protected onCreatePost(newPost: IPost) {
    this.postService.createPost(newPost)
      .subscribe({
        error: error => window.alert(`Could not create post: ${error.message}`),
        complete: () => this.location.back()
      });
  }
}
