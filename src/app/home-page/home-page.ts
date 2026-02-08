import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Post } from '../../../shared/global';
import { format, parseISO } from 'date-fns';
import { RouterLink } from '@angular/router';
import { HeaderService } from '../header-service';
import { FooterService } from '../footer-service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private http = inject(HttpClient);
  private header = inject(HeaderService);
  private footer = inject(FooterService);

  featuredPost = signal<Post | null>(null);
  recentPosts = signal<Post[]>([]);
  olderPosts = signal<Post[]>([]);

  ngOnInit() {
    this.header.header.set("arjun's blog");
    this.header.subTitle.set("just playin' around");
    this.footer.footer.set("Arjun's Blog, no copyrights");
    this.http.get<Post[]>(`/assets/sites.json?v=${Date.now()}`).subscribe((data) => {
      const posts = [...data].reverse().map((p) => ({
        ...p,
        date: format(parseISO(p.date), 'MMMM dd, yyyy'),
      }));

      this.featuredPost.set(posts[0] ?? null);
      this.recentPosts.set(posts.slice(1, 4));
      this.olderPosts.set(posts.slice(4));
    });
  }
}
