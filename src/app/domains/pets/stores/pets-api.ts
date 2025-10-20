import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pet } from '../models/pet.models';

import { map, catchError, of } from 'rxjs';
import { API_CONFIG } from '../../../core/http/api-config';
import { HealthCalculator } from '../pets-utils/pets-utils';

@Injectable({ providedIn: 'root' })
export class PetsApi {
  private baseUrl = API_CONFIG.BASE_URL;

  private http = inject(HttpClient);

  page = signal(API_CONFIG.PAGINATION.DEFAULT_PAGE);
  perPage = signal(API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE);

  public pets$ = computed(() => {
    const params = new HttpParams()
      .set('_page', this.page())
      .set('_per_page', this.perPage());

    return this.http.get<Pet[]>(`${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.PETS}`, { params }).pipe(
      map((pets) => pets.map((p) => HealthCalculator.withHealth(p))),
      catchError(err => {
        console.error('Error fetching pets:', err);
        return of([]);
      })
    );
  });

  // getPetsById(id: number) {
  //   return this.http.get<Pet>(`${this.baseUrl}/${id}`).toPromise();
  // }
}
