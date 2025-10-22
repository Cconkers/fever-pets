import { Component, inject, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { HealthTier, PetWithHealth } from "../../models/pet.models";
import { NgClass } from "@angular/common";
import { HealthCalculator } from "../../pets-utils/pets-utils";
import { I18nService } from "../../../../shared/services/i18n.service";
import { PetsStore } from "../../stores/pet-store";
import { PetOfDayButton } from "../pets-of-day-button/pet-of-day-button";

@Component({
  selector: 'pet-card',
  standalone: true,
  imports: [MatCardModule, NgClass, PetOfDayButton],
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.scss',
})
export class PetCard {
  public i18n = inject(I18nService);
  petsStore = inject(PetsStore);

  @Input() pet!: PetWithHealth;

  getClassHealth(healthTier: HealthTier): string {
    return HealthCalculator.getPetHealthClass(healthTier);
  }

  goToDetail(petId: number) {
    // if (event) event.stopPropagation();
    console.log();

    this.petsStore.updatePetDetail(petId);
  }

}
