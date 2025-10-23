import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pet, PetSortApi, PetsPagination, PetWithHealth } from '../models/pet.models';

import { map, catchError, of, Observable } from 'rxjs';
import { API_CONFIG } from '../../../core/http/api-config';
import { HealthCalculator } from '../pets-utils/pets-utils';

@Injectable({ providedIn: 'root' })
export class PetsApi {
  private baseUrl = API_CONFIG.BASE_URL;
  private http = inject(HttpClient);

  getPets(sortApi: PetSortApi | null, petsPagination: PetsPagination): Observable<{ pets: PetWithHealth[]; total: number; }> {
    let params = new HttpParams()
      .set('_page', petsPagination.page)
      .set('_limit', petsPagination.perPage);

    if (sortApi?.sortValue && sortApi?.sortDirection) params = params.set('_sort', sortApi.sortValue).set('_order', sortApi.sortDirection);

    return this.http.get<Pet[]>(`${this.baseUrl}/${API_CONFIG.ENDPOINTS.PETS}`, { params, observe: 'response', })
      .pipe(
        map((response) => {
          const total = Number(response.headers.get('X-Total-Count')) || 0;
          const pets = response.body ?? [];
          return { pets: pets.map(p => HealthCalculator.withHealth(p)), total };
        }),
        catchError(err => {
          console.error('Error fetching pets', err);
          return of({ pets: [], total: 0 });
        })
      );
  }

  getPetDetail(id: number) {
    return this.http.get<PetWithHealth>(`${this.baseUrl}/${API_CONFIG.ENDPOINTS.PETS}/${id}`)
      .pipe(
        map((response) => {
          return HealthCalculator.withHealth(response)
        }),
        catchError(err => {
          console.error('Error fetching pet detail', err);
          return of(null);
        })
      );
  }

}
