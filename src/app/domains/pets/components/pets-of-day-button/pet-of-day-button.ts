import { Component, inject, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { I18nService } from '../../../../shared/services/i18n.service';
import { PetWithHealth } from '../../models/pet.models';
import { PetFavoritesService } from '../../services/pets-favorites.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-pet-of-day-button',
  standalone: true,
  imports: [MatSelectModule, FormsModule, MatMenuModule, MatIcon, MatButton],
  templateUrl: './pet-of-day-button.html',
  styleUrl: './pet-of-day-button.scss',
})

export class PetOfDayButton {
  public i18n = inject(I18nService);
  private favorites = inject(PetFavoritesService);

  @Input() pet!: PetWithHealth;

  get isFavorite(): boolean {
    return this.favorites.favorite()?.id === this.pet.id;
  }

  get isLocked(): boolean {
    return this.favorites.isLocked();
  }

  toggleFavorite(pet: PetWithHealth): void {
    event?.stopPropagation();
    if (this.isLocked) {
      this.favorites.showLockToast();
      return
    };
    this.favorites.selectFavorite(pet);
  }
}

