import {Component, OnInit} from '@angular/core';
import {Image} from "../../../../core/models/image.model";
import {ImageService} from "../../services/image.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.scss'
})
export class ImageListComponent implements OnInit {
  images: Image[] = [];

  constructor(
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.imageService.getAll()
      .pipe(
        tap(images => console.log(images)) // dev
      )
      .subscribe(images => this.images = images);
  }

  openImageDetails(id: string): void {
    this.router.navigate(['/images', id]);
  }

  deleteImage(id: string): void {
    this.imageService.delete(id)
      .subscribe(() => this.loadImages());
  }
}
