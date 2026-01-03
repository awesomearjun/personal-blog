import { Component, inject, signal } from '@angular/core';
import { Post } from '../../../shared/global';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostFetcher } from '../post-fetcher';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css',
})
export class BlogPost {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private postFetcher = inject(PostFetcher);
  private sanitizer = inject(DomSanitizer);
  private title = inject(Title);
  private meta = inject(Meta);
  posts = signal<Post[]>([]);
  slug!: string;

  content = signal<string>('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug')!;

      let shadyContent: string = '';
      this.postFetcher.getPosts().subscribe(posts => {
        let currentPost!: Post;

        const findPost: Post | undefined = posts.find(post => post.slug === this.slug);
        if (!findPost) {
          this.content.set('<h1>Post not found</h1>');
          return;
        }

        currentPost = findPost;
        const currentPostPath = currentPost.path;

        this.http.get(currentPostPath, { responseType: 'text' })
          .subscribe(data => {
            shadyContent = data;
            this.content.set(this.sanitizer.bypassSecurityTrustHtml(shadyContent) as string);
        });

        this.title.setTitle(currentPost.title || 'Blog Post');
        this.meta.updateTag({ name: 'description', content: currentPost.description || 'No description available.' });
      });
    });
  }
}
