import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from "../../shared/global";
import { format, parseISO } from 'date-fns';


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
      this.posts.set(data);
    });
  }

  trackByLink(index: number, link: Post) {
    return link;
  }
}

