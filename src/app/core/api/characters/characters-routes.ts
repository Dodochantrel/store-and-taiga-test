import { environment } from '../../../../environments/environment';
import { CharacterGender } from '../../models/character-model';

export class CharactersRoutes {
  private readonly baseUrl: string = environment.apiUrl;

  getAllUrl(page: number, name?: string, gender?: CharacterGender): string {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (name) {
      params.append('name', name);
    }
    if (gender) {
      params.append('gender', gender);
    }
    return `${this.baseUrl}/character/?${params.toString()}`;
  }

  getOneUrl(id: number): string {
    return `${this.baseUrl}/character/${id}`;
  }
}
