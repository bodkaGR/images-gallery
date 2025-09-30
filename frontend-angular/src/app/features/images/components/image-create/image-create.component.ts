import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-image-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './image-create.component.html',
  styleUrl: './image-create.component.scss'
})
export class ImageCreateComponent {
  imageForm = this.fb.nonNullable.group({
    author: ['', Validators.required],
    filename: ['', Validators.required],
    uploadDate: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService
  ) {}

  onSubmit(): void {
    if (this.imageForm.valid) {
      this.imageService.create(this.imageForm.value).subscribe({
        next: res => {
          console.log(`Image created successfully: ${res}`);
          this.imageForm.reset();
        },
        error: err => {
          console.error(`Image create failed: ${err}`);
        }
      })
    }
  }
}
