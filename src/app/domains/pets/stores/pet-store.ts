import { Injectable, signal, inject, effect } from '@angular/core';
import { PetsApi } from './pets-api';
import { PetWithHealth } from '../models/pet.models';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';


@Injectable({ providedIn: 'root' })
export class PetsStore {
  private api = inject(PetsApi);

  // ?? Estado reactivo

  petOfTheDay = signal<PetWithHealth | null>(null);
  page = signal(1);
  perPage = 10;
  isLoading = signal(false);
  hasMore = signal(true);

  // Convertimos el Observable de la API a signal reactivo
  pets = toSignal(
    this.api.pets$().pipe(map((pets) => pets || [])),
    { initialValue: [] as PetWithHealth[] }
  );

  constructor() {
    // recalcular pet of the day cada vez que cambia la lista
    effect(() => {
      const pets = this.pets();
      if (pets.length) {
        const daySeed = new Date().getDate();
        this.petOfTheDay.set(pets[daySeed % pets.length]);
      }
    });
  }

  /**
   * Selecciona la mascota del día de forma determinista
   */
  setPetOfTheDay(): void {
    const list = this.pets();
    if (!list.length) return;
    const daySeed = new Date().getDate();
    const index = daySeed % list.length;
    this.petOfTheDay.set(list[index]);
  }

}
