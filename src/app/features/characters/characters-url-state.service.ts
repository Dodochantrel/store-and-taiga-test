import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

type CharactersQueryParams = {
  currentPage: number;
  searchTerm: string;
};

const defaultQueryParams: CharactersQueryParams = {
  currentPage: 1,
  searchTerm: '',
};

@Injectable({ providedIn: 'root' })
export class CharactersUrlStateService {
  private readonly router = inject(Router);
  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)),
    { initialValue: null },
  );

  private readonly currentPageState = signal(defaultQueryParams.currentPage);
  private readonly searchTermState = signal(defaultQueryParams.searchTerm);

  readonly currentPage = computed(() => this.currentPageState());
  readonly searchTerm = computed(() => this.searchTermState());

  constructor() {
    effect(() => {
      this.navigationEnd();
      this.syncFromUrl();
    });
  }

  setCurrentPage(page: number): void {
    const normalizedPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : defaultQueryParams.currentPage;

    this.updateUrl({ currentPage: normalizedPage });
  }

  setSearchTerm(searchTerm: string): void {
    this.updateUrl({ searchTerm: searchTerm.trim(), currentPage: defaultQueryParams.currentPage }, true);
  }

  private syncFromUrl(): void {
    const tree = this.router.parseUrl(this.router.url);
    const currentPage = this.parsePage(tree.queryParams['page']);
    const searchTerm = this.parseSearchTerm(tree.queryParams['name']);

    this.currentPageState.set(currentPage);
    this.searchTermState.set(searchTerm);
  }

  private updateUrl(queryParams: Partial<CharactersQueryParams>, replaceUrl = false): void {
    const tree = this.router.parseUrl(this.router.url);
    const nextQueryParams = {
      ...tree.queryParams,
    } as Record<string, string>;

    if (queryParams.currentPage !== undefined) {
      nextQueryParams['page'] = String(queryParams.currentPage);
    }

    if (queryParams.searchTerm !== undefined) {
      if (queryParams.searchTerm) {
        nextQueryParams['name'] = queryParams.searchTerm;
      } else {
        delete nextQueryParams['name'];
      }
    }

    tree.queryParams = nextQueryParams;

    void this.router.navigateByUrl(tree, { replaceUrl });
  }

  private parsePage(page: unknown): number {
    const parsedPage = Number(page);

    return Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : defaultQueryParams.currentPage;
  }

  private parseSearchTerm(searchTerm: unknown): string {
    return typeof searchTerm === 'string' ? searchTerm : defaultQueryParams.searchTerm;
  }
}