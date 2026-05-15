import { Component, inject } from '@angular/core';
import { HeaderService } from '../header-service';
import { FooterService } from '../footer-service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.html',
  styleUrls: ['../static-page.css'],
})
export class AboutPage {
  private header = inject(HeaderService);
  private footer = inject(FooterService);

  ngOnInit() {
    this.header.header.set('about');
    this.header.subTitle.set('a little about me');
    this.footer.footer.set("Arjun's Blog, no copyrights");
  }
}
