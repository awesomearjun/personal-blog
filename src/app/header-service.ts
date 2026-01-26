import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  header = signal<string>("");
  subTitle = signal<string>("");
}
