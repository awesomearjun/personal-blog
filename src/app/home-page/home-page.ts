import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Post } from '../../../shared/global';
import { format, parseISO } from 'date-fns';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private http = inject(HttpClient);

  posts = signal<Post[]>([]);

  ngOnInit() {
    this.http.get<Post[]>(
      `/assets/sites.json?v=${Date.now()}`
    ).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.posts.set([
          { ...data[i], date: format(parseISO(data[i].date), 'MMMM dd, yyyy') },
          ...this.posts(),
        ]);
      }
    });
  }
}
