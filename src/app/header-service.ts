import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  header = signal<string>("Arjun's Prologue");
  subTitle = signal<string>("getting stuff done");
}
