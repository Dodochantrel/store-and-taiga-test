import { signalStore, withComputed, withMethods, withProps } from '@ngrx/signals';
import { CharactersRoutes } from '../../core/api/characters/characters-routes';
import { httpResource } from '@angular/common/http';
import { InfoDto } from '../../core/api/info-dto';
import { GetCharacterDto, mapToCharacterModels } from '../../core/api/characters/dtos/get-character-dto';
import { inject } from '@angular/core';
import { CharactersUrlStateService } from './characters-url-state.service';
import { CharacterGender } from '../../core/models/character-model';

export const CharacterStore = signalStore(
    { providedIn: 'root' },
     withProps(() => ({
        charactersApi: new CharactersRoutes(),
        queryState: inject(CharactersUrlStateService),
    })),
    withProps(({ charactersApi, queryState }) => ({
        _characters: httpResource<InfoDto<GetCharacterDto>>(() => {
            return charactersApi.getAllUrl(queryState.currentPage(), queryState.searchTerm(), queryState.gender());
        }),
    })),
    withComputed(({ _characters, queryState }) => ({
        characters: () => {
            return _characters.hasValue() ? mapToCharacterModels(_characters.value().results) : [];
        },
        charactersLoading: () => {
            return _characters.isLoading();
        },
        charactersError: () => {
            return _characters.error();
        },
        totalPages: () => {
            return _characters.value()?.info.pages ?? 0;
        },
        count: () => {
            return _characters.value()?.info.count ?? 0;
        },
        currentPage: () => {
            return queryState.currentPage();
        },
        searchTerm: () => {
            return queryState.searchTerm();
        },
        gender: () => {
            return queryState.gender();
        }
    })),
    withMethods((store) => ({
        goToPage: (page: number) => {
            store.queryState.setCurrentPage(page);
        },
        setSearchTerm: (searchTerm: string) => {
            store.queryState.setSearchTerm(searchTerm);
        },
        setGender: (gender: CharacterGender) => {
            store.queryState.setGender(gender);
        }
    })),
)