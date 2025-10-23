import { TestBed } from '@angular/core/testing';
import { PetsStore } from './pet-store';
import { PetsApi } from '../pets-api/pets-api';
import { SafeStorageService } from '../../../core/services/safe-storage.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { PetWithHealth } from '../models/pet.models';

describe('PetsStore', () => {
  let store: PetsStore;
  let apiMock: jasmine.SpyObj<PetsApi>;
  let storageMock: jasmine.SpyObj<SafeStorageService>;

  const mockPets: PetWithHealth[] = [
    { id: 1, name: 'Toby', kind: 'dog', weight: 1200, height: 30, length: 50, photo_url: '', healthTier: 'healthy', healthScore: 3, description: 'Lorem ipsum acta est qui doloremque' },
  ];

  beforeEach(() => {
    apiMock = jasmine.createSpyObj('PetsApi', ['getPets']);
    apiMock.getPets.and.returnValue(of({ pets: [], total: 0 }));

    storageMock = jasmine.createSpyObj('SafeStorageService', ['getItem', 'setItem']);
    storageMock.getItem.and.returnValue(null);


    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: PetsApi, useValue: apiMock },
        { provide: SafeStorageService, useValue: storageMock },
        PetsStore,
      ],
    });

    store = TestBed.inject(PetsStore);
  });

  it('should create store instance', () => {
    expect(store).toBeTruthy();
  });

  it('should load pets and update signals', () => {
    apiMock.getPets.and.returnValue(of({ pets: mockPets, total: 1 }));

    store.loadPets();

    expect(apiMock.getPets).toHaveBeenCalled();
    expect(store.pets().length).toBe(1);
    expect(store.pets()[0].name).toBe('Toby');
    expect(store.petsTotal()).toBe(1);
  });

  it('should save pagination to storage', () => {
    store.updatePagination(2, 10);
    expect(storageMock.setItem).toHaveBeenCalled();
    expect(apiMock.getPets).toHaveBeenCalled();
  });
});
