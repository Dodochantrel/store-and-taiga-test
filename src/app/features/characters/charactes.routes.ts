import { Routes } from '@angular/router';
import { tuiGenerateDialogableRoute as tuiRouteDialog } from '@taiga-ui/kit';
import { CharacterDetailsComponent } from './components/character-details-component/character-details-component';

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
        children: [
          tuiRouteDialog(CharacterDetailsComponent, {path: 'details/:id'}),
        ],
      },
    ],
  },
];
