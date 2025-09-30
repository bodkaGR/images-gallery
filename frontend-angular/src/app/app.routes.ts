import { Routes } from '@angular/router';
import {ImageListComponent} from "./features/images/components/image-list/image-list.component";
import {ImageCreateComponent} from "./features/images/components/image-create/image-create.component";
import {ImageEditComponent} from "./features/images/components/image-edit/image-edit.component";
import {ImageComponent} from "./features/images/components/image/image.component";
import {HomeComponent} from "./features/images/pages/home/home.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'images', component: ImageListComponent},
  {path: 'images/create', component: ImageCreateComponent},
  {path: 'images/:id/edit', component: ImageEditComponent},
  {path: 'images/:id', component: ImageComponent},
  {path: '**', redirectTo: ''}
];
