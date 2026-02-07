import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../shared/global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostFetcher {
  private postsFilePath = '/assets/sites.json';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsFilePath);
  }
}
