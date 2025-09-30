import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Image} from "../../../../core/models/image.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-image-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './image-edit.component.html',
  styleUrl: './image-edit.component.scss'
})
export class ImageEditComponent implements OnInit {
  imageId!: string;

  imageForm = this.fb.nonNullable.group({
    author: ['', Validators.required],
    filename: ['', Validators.required],
    uploadDate: ['', Validators.required],
  });

  constructor(
    private imageService: ImageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.imageId = this.route.snapshot.paramMap.get("id")!;

    this.imageService.getById(this.imageId).subscribe({
      next: (image: Image) => {
        const formattedDate = image.uploadDate
          ? new Date(image.uploadDate).toISOString().split('T')[0] : '';

        this.imageForm.patchValue({
          author: image.author,
          filename: image.filename,
          uploadDate: formattedDate,
        });
      },
      error: err => {
        console.error(`Image upload error: ${err}`);
      }
    });
  }

  onSubmit(): void {
    if (this.imageForm.valid) {
      this.imageService.update(this.imageId, this.imageForm.value).subscribe({
        next: (updated) => {
          console.log(`Updated: ${updated}`);
          this.router.navigate(['/images']);
        },
        error: err => {
          console.error(`Image update error: ${err}`);
        }
      });
    }
  }
}
