import { Injectable, signal, inject } from '@angular/core';
import { PetsApi } from './pets-api';
import { PetSortApi, PetSortDirection, PetSortValue, PetsPagination, PetWithHealth } from '../models/pet.models';
import { SafeStorageService } from '../../../core/services/safe-storage.service';
import { API_CONFIG } from '../../../core/http/api-config';

const PAGINATION_KEY = 'petPagination';

@Injectable({ providedIn: 'root' })
export class PetsStore {
  private apiPets = inject(PetsApi);
  private storageSafe = inject(SafeStorageService);


  isLoadingPets = signal(false);
  pets = signal([] as PetWithHealth[]);
  sortPets = signal<PetSortApi | null>(null);
  paginatedPets = signal<PetsPagination>(
    JSON.parse(this.storageSafe.getItem(PAGINATION_KEY) ?? 'null') ??
    { page: API_CONFIG.PAGINATION.DEFAULT_PAGE, perPage: API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE }
  );
  petsTotal = signal<number>(0);

  updateSort(sortValue: PetSortValue | null, sortDirection: PetSortDirection | null): void {
    this.sortPets.set({ sortValue, sortDirection });
    if (sortValue === null || sortDirection === null) {
      localStorage.removeItem('petSort');
    }
    else {
      localStorage.setItem('petSort', JSON.stringify({ sortValue, sortDirection }));
    }
    this.loadPets();
  }

  updatePagination(page: number, perPage: number): void {
    const newPagination = { page: page + 1, perPage };
    this.paginatedPets.set(newPagination);
    this.storageSafe.setItem(PAGINATION_KEY, JSON.stringify(newPagination));
    this.loadPets();
  }

  getSortLocalStorage(): PetSortApi | null {
    const sort = this.storageSafe.getItem('petSort');
    if (sort) return JSON.parse(sort);
    return null;
  }

  loadPets(): void {
    this.isLoadingPets.set(true);
    const sortLocalStorage = this.getSortLocalStorage();

    this.apiPets.getPets(sortLocalStorage, this.paginatedPets()).subscribe({
      next: (pets) => {
        this.petsTotal.set(pets.total);
        this.pets.set(pets.pets);
        this.isLoadingPets.set(false);
      },
      error: (err) => {
        console.error('Error loading pets', err);
        this.isLoadingPets.set(false);
      }
    });
  }
}
