import { Component, inject } from '@angular/core';
import { CharacterStore } from '../../character-store';
import { TuiInput } from '@taiga-ui/core';

@Component({
  selector: 'app-characters-list-page',
  imports: [TuiInput],
  templateUrl: './characters-list-page.html',
  styleUrl: './characters-list-page.css',
})
export class CharactersListPage {
  protected readonly store: InstanceType<typeof CharacterStore> = inject(CharacterStore);
}
