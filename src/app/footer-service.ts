import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  footer = signal<string>("Arjun's Prologue, no copyrights");
}
