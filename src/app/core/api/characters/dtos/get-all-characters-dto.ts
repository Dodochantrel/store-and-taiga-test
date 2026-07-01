import { CharacterModel } from "../../../models/character-model";

export interface GetAllCharactersDto {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export function mapToCharacterModel(dto: GetAllCharactersDto): CharacterModel {
  const characterModel = new CharacterModel(dto.id, dto.name);
  characterModel.status = dto.status;
  characterModel.species = dto.species;
  characterModel.type = dto.type;
  characterModel.gender = dto.gender;
  characterModel.origin = {
    name: dto.origin.name,
    url: dto.origin.url,
  };
  characterModel.location = {
    name: dto.location.name,
    url: dto.location.url,
  };
  characterModel.image = dto.image;
  characterModel.episode = dto.episode;
  characterModel.url = dto.url;
  characterModel.created = dto.created;

  return characterModel;
}

export function mapToCharacterModels(dtos: GetAllCharactersDto[]): CharacterModel[] {
  return dtos.map((dto) => mapToCharacterModel(dto));
}