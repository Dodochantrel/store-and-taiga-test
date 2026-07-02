import { CharacterGender, CharacterModel, CharacterStatus } from "../../../models/character-model";

export interface GetCharacterDto {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
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

export function mapToCharacterModel(dto: GetCharacterDto): CharacterModel {
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

export function mapToCharacterModels(dtos: GetCharacterDto[]): CharacterModel[] {
  return dtos.map((dto) => mapToCharacterModel(dto));
}