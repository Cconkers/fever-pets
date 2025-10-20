import { Component, inject, signal, computed } from "@angular/core";
import { PetsStore } from "../../stores/pet-store";

@Component({
  selector: 'pet-details',
  standalone: true,
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class PetDetail {
  store = inject(PetsStore);
  sort = signal<'name' | 'weight' | 'height' | 'length'>('name');

}
