import { signalStore, withComputed, withProps, withState } from '@ngrx/signals';
import { CharactersRoutes } from '../../core/api/characters/characters-routes';
import { httpResource } from '@angular/common/http';
import { InfoDto } from '../../core/api/info-dto';
import { GetAllCharactersDto } from '../../core/api/characters/dtos/get-all-characters-dto';

type CharacterState = {
  currentPage: number;
  count: number;
  isLoading: boolean;
  searchTerm: string;
};

const initialState: CharacterState = {
  currentPage: 0,
  count: 0,
  isLoading: false,
  searchTerm: '',
};

export const CharacterStore = signalStore(
    { providedIn: 'root' },
     withState(initialState),
     withProps(() => ({
        charactersApi: new CharactersRoutes(),
    })),
    withProps(({ charactersApi, currentPage, searchTerm }) => ({
        _characters: httpResource<InfoDto<GetAllCharactersDto>>(() => {
            return charactersApi.getAllUrl(currentPage(), searchTerm());
        }),
    })),
    withComputed(({ _characters }) => ({
        users: () => {
            return _characters.hasValue() ? _characters.value().results : [];
        },
        usersLoading: () => {
            return _characters.isLoading();
        },
        usersError: () => {
            return _characters.error();
        },
        totalPages: () => {
            return _characters.value()?.info.pages ?? 0;
        },
    }))
)