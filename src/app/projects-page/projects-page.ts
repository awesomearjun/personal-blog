import { Component, inject } from '@angular/core';
import { HeaderService } from '../header-service';
import { FooterService } from '../footer-service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.html',
  styleUrls: ['../static-page.css'],
})
export class ProjectsPage {
  private header = inject(HeaderService);
  private footer = inject(FooterService);

  projects: {
    name: string;
    description: string;
    tags: string[];
    images?: string[];
    imageAlt?: string;
  }[] = [
    {
      name: 'robot car',
      description:
        'A smart car using Raspberry Pi and Arduino. It can be controlled from a website and has a camera, radar, and other sensors.',
      images: [
        '../../assets/postAssets/IMG_0359.png',
        '../../assets/postAssets/Screenshot 2026-01-17 at 1.55.27 PM.png',
        '../../assets/postAssets/IMG_0361.png',
      ],
      imageAlt: 'A robot car',
      tags: ['raspberry pi', 'arduino', 'robotics'],
    },
    {
      name: 'markdown pipeline',
      description:
        'A small build step that turns markdown posts into HTML assets. Syntax highlighting and SEO-friendly output included.',
      tags: ['node', 'markdown', 'build'],
    },
    {
      name: 'personal blog',
      description:
        'This site — Angular, static posts, and a nav bar that finally goes somewhere. Built to be fast and easy to write for.',
      tags: ['angular', 'typescript', 'static'],
    },
  ];

  ngOnInit() {
    this.header.header.set('projects');
    this.header.subTitle.set("things i've built");
    this.footer.footer.set("Arjun's Blog, no copyrights");
  }
}
