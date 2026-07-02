import { httpResource } from '@angular/common/http';
import { Component, inject, linkedSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersRoutes } from '../../../../core/api/characters/characters-routes';
import { GetCharacterDto, mapToCharacterModel } from '../../../../core/api/characters/dtos/get-character-dto';
import { TuiTitle } from '@taiga-ui/core';
import { TuiHeader } from '@taiga-ui/layout';

@Component({
  selector: 'app-character-details-component',
  imports: [TuiTitle, TuiHeader],
  templateUrl: './character-details-component.html',
  styleUrl: './character-details-component.css',
})
export class CharacterDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private charactersApi = new CharactersRoutes();

  characterId!: number;

  ngOnInit(): void {
    this.characterId = Number(this.route.snapshot.paramMap.get('id'));
    this.id.set(this.characterId);
  }

  private id: WritableSignal<number> = signal(0);

  private readonly charactersResource = httpResource<GetCharacterDto>(() => {
    return this.charactersApi.getOneUrl(this.id());
  });
  public character = linkedSignal(() => {
    const resource = this.charactersResource.value();
    return resource ? mapToCharacterModel(resource) : null;
  });
  public isLoadingCharacter = this.charactersResource.isLoading;
}