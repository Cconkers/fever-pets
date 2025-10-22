import { Component, inject, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { HealthTier, PetWithHealth } from "../../models/pet.models";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { HealthCalculator } from "../../pets-utils/pets-utils";
import { PetFavoritesService } from "../../services/pets-favorites.service";
import { I18nService } from "../../../../shared/services/i18n.service";
import { Router } from '@angular/router';

@Component({
  selector: 'pet-card',
  standalone: true,
  imports: [MatCardModule, MatButton, MatIcon, NgClass],
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.scss',
})
export class PetCard {
  private favorites = inject(PetFavoritesService);
  private router = inject(Router);
  public i18n = inject(I18nService);

  @Input() pet!: PetWithHealth;

  getClassHealth(healthTier: HealthTier): string {
    return HealthCalculator.getPetHealthClass(healthTier);
  }

  get isFavorite(): boolean {
    return this.favorites.favorite()?.id === this.pet.id;
  }

  get isLocked(): boolean {
    return this.favorites.isLocked();
  }

  toggleFavorite(pet: PetWithHealth): void {
    if (this.isLocked) {
      this.favorites.showLockToast();
      return
    };
    this.favorites.selectFavorite(pet);
  }

  goToDetail(pet: PetWithHealth, event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.router.navigate(['/pets', pet.id]);
  }

}
