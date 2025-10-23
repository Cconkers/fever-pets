import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { PetsApi } from "./pets-api";
import { provideZonelessChangeDetection } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { PetWithHealth } from "../models/pet.models";

describe('PetsApi', () => {
  let service: PetsApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        PetsApi
      ],
    });

    service = TestBed.inject(PetsApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call GET /pets with pagination and sort params', () => {
    const mockPets = [{ id: '1', name: 'Golem', kind: 'Cat' }];

    service.getPets({ sortValue: 'length', sortDirection: 'asc' }, { page: 1, perPage: 10 }).subscribe((res) => {
      expect(res.total).toBe(1);
      expect(res.pets.length).toBe(1);

    });

    const req = httpMock.expectOne(
      (r) =>
        r.method === 'GET' &&
        r.url === 'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets' &&
        r.params.get('_page') === '1' &&
        r.params.get('_limit') === '10' &&
        r.params.get('_sort') === 'length' &&
        r.params.get('_order') === 'asc');

    req.flush(mockPets, {
      headers: { 'X-Total-Count': '1' }
    });
  });


  it('should call GET /pets/:id and return the pet detail', () => {
    const mockPet: PetWithHealth = { id: 1, name: 'Whiskers', kind: 'cat', weight: 10, height: 10, length: 1, photo_url: 'https://pets.com/1.jpg', description: 'Lorem ipsum', number_of_lives: 1, healthScore: 1, healthTier: 'unhealthy' };

    service.getPetDetail(1).subscribe((res) => {
      expect(res).toEqual(mockPet);
    });

    const req = httpMock.expectOne('https://my-json-server.typicode.com/Feverup/fever_pets_data/pets/1');
    expect(req.request.method).toBe('GET');

    req.flush(mockPet);
  });

  it('should handle HTTP errors gracefully and return null', () => {
    const errorMessage = 'Internal server error';

    service.getPetDetail(-1).subscribe({
      next: (res) => {
        expect(res).toEqual(null);
      },
      error: () => fail('should not emit error because catchError handles it'),
    });

    const req = httpMock.expectOne(
      'https://my-json-server.typicode.com/Feverup/fever_pets_data/pets/-1'
    );

    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

});
