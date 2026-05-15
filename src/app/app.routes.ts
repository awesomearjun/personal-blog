import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { AboutPage } from './about-page/about-page';
import { ProjectsPage } from './projects-page/projects-page';
import { ContactPage } from './contact-page/contact-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: 'projects', component: ProjectsPage },
  { path: 'contact', component: ContactPage },
  {
    path: 'post/:slug',
    loadComponent: () => import('./blog-post/blog-post').then((m) => m.BlogPost),
  },
];
