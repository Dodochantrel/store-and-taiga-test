import { Routes } from '@angular/router';

export const charactersRoutes: Routes = [
  {
    path: 'characters',
    children: [
      {
        path: 'list',
        title: 'Characters - Liste',
        loadComponent: () =>
          import('./characters-list/characters-list-page/characters-list-page').then(
            (m) => m.CharactersListPage,
          ),
        data: {
          title: 'Characters - Liste',
          breadcrumb: [{ label: 'Characters' }, { label: 'Liste' }],
        },
      },
    ],
  },
];
