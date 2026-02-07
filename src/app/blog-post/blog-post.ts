import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { Post } from '../../../shared/global';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostFetcher } from '../post-fetcher';
import { HttpClient } from '@angular/common/http';
import { Title, Meta, SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderService } from '../header-service';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.html',
  styleUrls: ['./blog-post.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogPost {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private postFetcher = inject(PostFetcher);
  private sanitizer = inject(DomSanitizer);
  private title = inject(Title);
  private meta = inject(Meta);
  private header = inject(HeaderService);
  posts = signal<Post[]>([]);
  slug!: string;

  content = signal<SafeHtml>(this.sanitizer.bypassSecurityTrustHtml('<h1>Loading...</h1>'));

  ngOnInit() {
    this.header.header.set('');
    this.header.subTitle.set('');
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug')!;

      let shadyContent: string = '';
      this.postFetcher.getPosts().subscribe((posts) => {
        let currentPost!: Post;

        const findPost: Post | undefined = posts.find((post) => post.slug === this.slug);
        if (!findPost) {
          this.content.set('<h1>Post not found</h1>');
          return;
        }

        currentPost = findPost;
        const currentPostPath = currentPost.path;

        this.http.get(currentPostPath, { responseType: 'text' }).subscribe((data) => {
          shadyContent = data;
          this.content.set(this.sanitizer.bypassSecurityTrustHtml(shadyContent));
        });

        this.title.setTitle(currentPost.title || 'Blog Post');
        this.header.header.set(currentPost.title || '');
        this.header.subTitle.set(currentPost.description || '');
        this.meta.updateTag({
          name: 'description',
          content: currentPost.description || 'No description available.',
        });
      });
    });
  }
}
