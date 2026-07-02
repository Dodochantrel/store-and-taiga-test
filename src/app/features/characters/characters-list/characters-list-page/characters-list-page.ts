import { Component, inject } from '@angular/core';
import { CharacterStore } from '../../character-store';
import { TuiButton, TuiIcon, TuiInput, TuiTitle } from '@taiga-ui/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiLike, TuiPagination } from '@taiga-ui/kit';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-characters-list-page',
  imports: [TuiInput, TuiCardLarge, TuiHeader, TuiTitle, TuiIcon, TuiLike, TuiPagination, RouterOutlet, TuiButton,RouterLink],
  templateUrl: './characters-list-page.html',
  styleUrl: './characters-list-page.css',
})
export class CharactersListPage {
  protected readonly store: InstanceType<typeof CharacterStore> = inject(CharacterStore);
}
