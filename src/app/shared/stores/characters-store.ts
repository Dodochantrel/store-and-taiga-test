import { computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, finalize, pipe, switchMap, tap } from 'rxjs';

import { CharacterModel } from '../../core/models/character-model';
import { InfoDto } from '../../core/api/info-dto';
import { GetAllCharactersDto } from '../../core/api/characters/dtos/get-all-characters-dto';
import { CharactersRoutes } from '../../core/api/characters/characters-routes';

type CharacterSearchState = {
  characters: CharacterModel[];
  info: InfoDto<GetAllCharactersDto>['info'] | null;
  isLoading: boolean;
  error: string | null;
  page: number;
  filter: {
    search: string;
  };
};

const initialState: CharacterSearchState = {
  characters: [],
  info: null,
  isLoading: false,
  error: null,
  page: 1,
  filter: {
    search: '',
  },
};

export const CharacterSearchStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((store) => ({
    hasCharacters: computed(() => store.characters().length > 0),
    totalCharacters: computed(() => store.info()?.count ?? 0),
    totalPages: computed(() => store.info()?.pages ?? 0),
    currentSearch: computed(() => store.filter().search),
  })),

  withMethods((store) => {
    const http = inject(HttpClient);
    const charactersRoutes = new CharactersRoutes();

    return {
      loadCharacters: rxMethod<void>(
        pipe(
          tap(() => {
            patchState(store, {
              isLoading: true,
              error: null,
            });
          }),

          switchMap(() => {
            const page = store.page();
            const search = store.filter().search;

            let params = new HttpParams();

            if (search) {
              params = params.set('search', search);
            }

            return http.get<InfoDto<GetAllCharactersDto>>(charactersRoutes.getAllUrl(page), { params }).pipe(
              tap((response) => {
                patchState(store, {
                  characters: response.results,
                  info: response.info,
                });
              }),

              catchError((error: unknown) => {
                console.error(error);

                patchState(store, {
                  characters: [],
                  info: null,
                  error: 'Impossible de charger les personnages.',
                });

                return EMPTY;
              }),

              finalize(() => {
                patchState(store, {
                  isLoading: false,
                });
              }),
            );
          }),
        ),
      ),

      setSearch(search: string): void {
        patchState(store, {
          page: 1,
          filter: {
            ...store.filter(),
            search,
          },
        });
      },

      setPage(page: number): void {
        patchState(store, {
          page,
        });
      },

      resetFilters(): void {
        patchState(store, {
          page: 1,
          filter: {
            search: '',
          },
        });
      },
    };
  }),
);