import { Component, inject, signal } from '@angular/core';
import { Post } from '../../../shared/global';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostFetcher } from '../post-fetcher';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule],
  template: '<div [innerHTML]="content()"></div>',
  styleUrl: './blog-post.css',
})
export class BlogPost {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private postFetcher = inject(PostFetcher);
  private sanitizer = inject(DomSanitizer);
  posts = signal<Post[]>([]);
  slug!: string;

  content = signal<string>('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug')!;

      let shadyContent: string = '';
      this.postFetcher.getPosts().subscribe(posts => {
        const currentPost = posts.find(post => post.slug === this.slug)?.path || 'Post not found.';

        this.http.get(currentPost, { responseType: 'text' })
          .subscribe(data => {
            shadyContent = data;
            this.content.set(this.sanitizer.bypassSecurityTrustHtml(shadyContent) as string);
        });
      });
    });
  }
}
