import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterSearchStore } from './shared/stores/characters-store';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app');

  protected readonly characterStore = inject(CharacterSearchStore);

  constructor() {
    this.characterStore.loadCharacters();
  }

  search(search: string): void {
    this.characterStore.setSearch(search);
    this.characterStore.loadCharacters();
  }

  changePage(page: number): void {
    this.characterStore.setPage(page);
    this.characterStore.loadCharacters();
  }
}
