import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../../../core/models/image.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly apiUrl: string = `${environment.apiUrl}/images`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl);
  }

  getById(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/${id}`);
  }

  create(image: Partial<Image>): Observable<Image> {
    return this.http.post<Image>(this.apiUrl, image);
  }

  update(id: string, image: Partial<Image>): Observable<Image> {
    return this.http.put<Image>(`${this.apiUrl}/${id}`, image);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
