import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  header = signal<string>("arjun's blog");
  subTitle = signal<string>("just playin' around");
}
