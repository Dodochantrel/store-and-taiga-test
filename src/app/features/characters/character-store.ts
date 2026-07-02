import { signalStore, withComputed, withMethods, withProps } from '@ngrx/signals';
import { CharactersRoutes } from '../../core/api/characters/characters-routes';
import { httpResource } from '@angular/common/http';
import { InfoDto } from '../../core/api/info-dto';
import { GetAllCharactersDto, mapToCharacterModels } from '../../core/api/characters/dtos/get-all-characters-dto';
import { inject } from '@angular/core';
import { CharactersUrlStateService } from './characters-url-state.service';

export const CharacterStore = signalStore(
    { providedIn: 'root' },
     withProps(() => ({
        charactersApi: new CharactersRoutes(),
        queryState: inject(CharactersUrlStateService),
    })),
    withProps(({ charactersApi, queryState }) => ({
        _characters: httpResource<InfoDto<GetAllCharactersDto>>(() => {
            return charactersApi.getAllUrl(queryState.currentPage(), queryState.searchTerm());
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
    })),
    withMethods((store) => ({
        goToPage: (page: number) => {
            store.queryState.setCurrentPage(page);
        },
        setSearchTerm: (searchTerm: string) => {
            store.queryState.setSearchTerm(searchTerm);
        },
    })),
)