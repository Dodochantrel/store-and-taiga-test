import { Component, effect, inject, signal } from '@angular/core';
import { CharacterStore } from '../../character-store';
import { TuiButton, TuiDataList, TuiIcon, TuiInput, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiChevron, TuiDataListWrapper, TuiLike, TuiPagination, TuiSelect } from '@taiga-ui/kit';
import { RouterLink, RouterOutlet } from '@angular/router';
import { characterGenders } from '../../../../shared/resources/character-genders';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-characters-list-page',
  imports: [
    FormsModule,
    TuiInput,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    TuiIcon,
    TuiLike,
    TuiPagination,
    RouterOutlet,
    TuiButton,
    RouterLink,
    TuiChevron, 
    TuiDataListWrapper, 
    TuiSelect,
    TuiDataList,
  ],
  templateUrl: './characters-list-page.html',
  styleUrl: './characters-list-page.css',
})
export class CharactersListPage {
  protected readonly store: InstanceType<typeof CharacterStore> = inject(CharacterStore);
  protected readonly searchValue = signal('');
  private readonly searchTermInput$ = new Subject<string>();

  protected characterGenders = characterGenders;

  constructor() {
    effect(() => {
      this.searchValue.set(this.store.searchTerm());
    });

    this.searchTermInput$
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((searchTerm) => {
        this.store.setSearchTerm(searchTerm);
      });
  }

  protected onSearchInput(searchTerm: string): void {
    this.searchValue.set(searchTerm);
    this.searchTermInput$.next(searchTerm);
  }
}
