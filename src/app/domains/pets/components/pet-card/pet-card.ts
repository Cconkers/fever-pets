import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { PetWithHealth } from "../../models/pet.models";

@Component({
  selector: 'pet-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.css',
})
export class PetCard {
  @Input() pet!: PetWithHealth;


}
