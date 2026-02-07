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
    this.footer.footer.set("Arjun's Prologue, no copyrights");
    this.http.get<Post[]>(`/assets/sites.json?v=${Date.now()}`).subscribe((data) => {
      const flippedData = data.reverse();
      for (let i = 0; i < flippedData.length; i++) {
        if (i === 0) {
          this.featuredPost.set({
            ...flippedData[i],
            date: format(parseISO(flippedData[i].date), 'MMMM dd, yyyy'),
          });
        } else if (i > 0 && i < 4) {
          this.recentPosts.set([
            ...this.recentPosts(),
            { ...flippedData[i], date: format(parseISO(flippedData[i].date), 'MMMM dd, yyyy') },
          ]);
        } else {
          this.olderPosts.set([
            { ...flippedData[i], date: format(parseISO(flippedData[i].date), 'MMMM dd, yyyy') },
            ...this.olderPosts(),
          ]);
        }
      }
    });
  }
}
