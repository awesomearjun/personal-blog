import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'post/:slug',
    loadComponent: () => import('./blog-post/blog-post').then((m) => m.BlogPost),
  },
];
