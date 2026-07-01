export class CharacterModel {
  id: number;
  name: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: {
    name?: string;
    url?: string;
  };
  location?: {
    name?: string;
    url?: string;
  };
  image?: string;
  episode?: string[];
  url?: string;
  created?: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}