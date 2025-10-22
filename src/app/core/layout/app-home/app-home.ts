import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PetsStore } from '../../../domains/pets/stores/pet-store';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './app-home.html',
  styleUrl: './app-home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomeComponent {
  petsStore = inject(PetsStore);
  constructor() {
    effect(() => {
      this.petsStore.isLoadingPets.set(true);
      this.petsStore.loadPets();
    });
  }
}
