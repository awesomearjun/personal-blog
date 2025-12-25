import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from "./global";


@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private http = inject(HttpClient);

  posts = signal<Post[]>([]);

  ngOnInit() {
    this.http.get<Post[]>(
      '/assets/sites.json'
    ).subscribe(data => {
      console.table(data);
      this.posts.set(data);
      console.log(JSON.stringify(this.posts(), null, 2));
    });
  }

  trackByLink(index: number, link: Post) {
    return link;
  }
}

