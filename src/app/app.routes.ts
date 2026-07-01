import { Routes } from '@angular/router';
import { PageWithHeaderTemplate } from './shared/templates/page-with-header-template/page-with-header-template';
import { charactersRoutes } from './features/characters/charactes.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters/list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PageWithHeaderTemplate,
    children: [...charactersRoutes],
  },
];
