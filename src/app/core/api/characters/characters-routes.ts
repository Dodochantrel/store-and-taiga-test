import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "../../../../environments/environment";

export class CharactersRoutes {
    private readonly httpcClient: HttpClient = inject(HttpClient);
    private readonly baseUrl: string = environment.apiUrl;

    getAllUrl(page: number, name?: string): string {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        if (name) {
            params.append('name', name);
        }
        // return `${this.baseUrl}/characters/?${params.toString()}`;
        return `${this.baseUrl}/character`;
    }
}