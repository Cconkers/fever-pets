import { TestBed } from '@angular/core/testing';
import { ToastService } from '../../../shared/services/toast.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { PetWithHealth } from '../models/pet.models';
import { PetFavoritesService } from './pets-favorites.service';

describe('PetFavoritesService', () => {
  let service: PetFavoritesService;
  let toastSpy: jasmine.SpyObj<ToastService>;

  const mockPet: PetWithHealth = {
    id: 1,
    name: 'Gato',
    kind: 'cat',
    weight: 10,
    height: 10,
    length: 10,
    photo_url: 'https://test.cat',
    description: 'test cat',
    number_of_lives: 7,
    healthScore: 3,
    healthTier: 'healthy',
  };

  beforeEach(() => {
    toastSpy = jasmine.createSpyObj('ToastService', ['show']);
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: ToastService, useValue: toastSpy },
      ],
    });

    service = TestBed.inject(PetFavoritesService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should select a favorite pet and lock it', () => {
    const result = service.selectFavorite(mockPet);

    expect(result).toBeTrue();
    expect(service.favorite()).toEqual(mockPet);
    expect(service.isLocked()).toBeTrue();
    expect(localStorage.getItem('favorite_pet')).toBeTruthy();
    expect(toastSpy.show).toHaveBeenCalled();
  });

  it('should not allow selecting a new pet when locked', () => {
    service.selectFavorite(mockPet);
    const secondPet = { ...mockPet, id: 2, name: 'Dog' };
    const result = service.selectFavorite(secondPet);

    expect(result).toBeFalse();
    expect(service.favorite()).toEqual(mockPet);
  });

  it('should restore favorite from localStorage if not expired', () => {
    const timestamp = Date.now() - 1000;
    localStorage.setItem('favorite_pet', JSON.stringify({ pet: mockPet, timestamp }));

    const newService = TestBed.inject(PetFavoritesService);
    (newService).restoreFavorite();

    expect(newService.favorite()).toEqual(mockPet);
    expect(newService.isLocked()).toBeTrue();
  });

  it('should clear favorite if expired', () => {
    const timestamp = Date.now() - 25 * 60 * 60 * 1000;
    localStorage.setItem('favorite_pet', JSON.stringify({ pet: mockPet, timestamp }));

    const newService = TestBed.inject(PetFavoritesService);
    expect(newService.favorite()).toBeNull();
    expect(newService.isLocked()).toBeFalse();
  });

  it('should show lock toast with correct message', () => {
    service.showLockToast();

    const call = toastSpy.show.calls.mostRecent().args[0];
    expect(call).toContain('Pet of the Day locked until');
  });
});
