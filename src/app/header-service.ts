import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  header = signal<string>("Arjun's Blog");
  subTitle = signal<string>("me just trying to code stuff");
}
