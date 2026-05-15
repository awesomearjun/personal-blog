import { Component, inject } from '@angular/core';
import { HeaderService } from '../header-service';
import { FooterService } from '../footer-service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.html',
  styleUrls: ['../static-page.css'],
})
export class ContactPage {
  private header = inject(HeaderService);
  private footer = inject(FooterService);

  ngOnInit() {
    this.header.header.set('contact');
    this.header.subTitle.set('say hello');
    this.footer.footer.set("Arjun's Blog, no copyrights");
  }
}
