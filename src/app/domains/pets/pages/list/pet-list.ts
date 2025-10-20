import { Component, inject, computed, signal, effect } from '@angular/core';
import { PetsStore } from '../../stores/pet-store';
import { PetCard } from '../../components/pet-card/pet-card';

@Component({
  selector: 'pets-list',
  standalone: true,
  imports: [PetCard],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css',
})


export class PetList {

  petStore = inject(PetsStore);
  sort = signal<'name' | 'weight' | 'height' | 'length'>('name');
  pets = computed(() => this.petStore.pets());

  constuctor() {
    effect(() => {
      this.pets();
    });
  }
}

