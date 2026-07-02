import { environment } from '../../../../environments/environment';

export class CharactersRoutes {
  private readonly baseUrl: string = environment.apiUrl;

  getAllUrl(page: number, name?: string): string {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (name) {
      params.append('name', name);
    }
    return `${this.baseUrl}/character/?${params.toString()}`;
  }

  getOneUrl(id: number): string {
    return `${this.baseUrl}/character/${id}`;
  }
}
