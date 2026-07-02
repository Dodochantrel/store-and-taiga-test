export class CharacterModel {
  id: number;
  name: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
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

  get iconForStatus(): string {
    switch (this.status) {
      case 'alive':
        return 'smile';
      case 'dead':
        return 'skull';
      default:
        return 'circle-question-mark';
    }
  }

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export type CharacterStatus = 'alive' | 'dead' | 'unknown';
export type CharacterGender = 'female' | 'male' | 'genderless' | 'unknown';