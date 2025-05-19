import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../shared/post.service';
import { CreatePostDTO } from '../shared/create-post-dto.interface';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  protected formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required)
  });
  private postService = inject(PostService);
  private location = inject(Location);

  protected onSubmit(): void {
    if (!this.formGroup.valid) return;
    const dto: CreatePostDTO = this.formGroup.value as CreatePostDTO;
    this.postService.createPost(dto)
      .subscribe(_ => this.location.back());
  }
}
