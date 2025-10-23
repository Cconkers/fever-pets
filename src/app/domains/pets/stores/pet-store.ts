import { Injectable, signal, inject } from '@angular/core';
import { PetsApi } from '../pets-api/pets-api';
import { PetSortApi, PetSortDirection, PetSortValue, PetsPagination, PetWithHealth } from '../models/pet.models';
import { SafeStorageService } from '../../../core/services/safe-storage.service';
import { API_CONFIG } from '../../../core/http/api-config';
import { Router } from '@angular/router';


const PAGINATION_KEY = 'petPagination';
const PET_DETAIL_KEY = 'petDetailKey';

@Injectable({ providedIn: 'root' })
export class PetsStore {
  private apiPets = inject(PetsApi);
  private storageSafe = inject(SafeStorageService);
  private router = inject(Router);

  isLoadingPets = signal(false);
  pets = signal([] as PetWithHealth[]);

  petIdSelected = signal<number>(
    Number(this.router.url.split('/').pop())
  );
  petDetail = signal<PetWithHealth | null>(null);

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

  updatePetDetail(petId: number): void {
    this.petIdSelected.set(petId);
    this.storageSafe.setItem(PET_DETAIL_KEY, this.petIdSelected().toString());
    this.loadPetDetail();
  }

  loadPetDetail(): void {
    this.isLoadingPets.set(true);
    const urlId = this.router.url.split('/').pop();

    if (urlId && !isNaN(+urlId)) {
      this.petIdSelected.set(+urlId);
    } else {
      const storedId = this.storageSafe.getItem(PET_DETAIL_KEY);
      if (storedId) {
        this.petIdSelected.set(+storedId);
      } else {
        console.error('No pet id found in storage and url');
        this.router.navigate(['/pets']);
      }
    }

    this.apiPets.getPetDetail(this.petIdSelected()).subscribe({
      next: (pet) => {
        if (pet) {
          this.petDetail.set(pet);
          this.isLoadingPets.set(false);
          this.router.navigate(['/pets', pet.id]);
        } else {
          this.router.navigate(['/pets']);
        }
      },
      error: (err) => {
        console.error('Error loading pet detail', err);
        this.isLoadingPets.set(false);
      }
    });
  }
}
