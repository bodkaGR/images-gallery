import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {Image} from "../../../../core/models/image.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent implements OnInit {
  imageId!: string;
  image!: Image;

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadImage();
  }

  loadImage(): void {
    this.imageId = this.route.snapshot.paramMap.get("id")!;

    this.imageService.getById(this.imageId).subscribe({
      next: (image: Image) => this.image = image,
      error: err => console.error(`Image load error: ${err}`),
    });
  }

  deleteImage(id: string): void {
    this.imageService.delete(id).subscribe(
      () => this.router.navigate(['/images']));
  }

  updateImage(id: string): void {
    this.router.navigate([`/images/${id}/edit`]);
  }
}
