import { Component, inject } from '@angular/core';
import { PetsStore } from '../../stores/pet-store';
import { MatSelectModule } from '@angular/material/select';
import { PetSort, PetSortDirection, PetSortValue } from '../../models/pet.models';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { I18nService } from '../../../../shared/services/i18n.service';


@Component({
  selector: 'pets-sort-menu',
  standalone: true,
  imports: [MatSelectModule, FormsModule, MatMenuModule, MatButton],
  templateUrl: './pet-sort-menu.html',
  styleUrl: './pet-sort-menu.scss',
})

export class PetSortMenu {
  public i18n = inject(I18nService);
  petsStore = inject(PetsStore);

  petSortValue: PetSortValue | null = null;
  petSortDirection: PetSortDirection | null = null;

  petsSort: PetSort[] = [
    { value: 'name', viewValue: 'Name' },
    { value: 'height', viewValue: 'Height' },
    { value: 'weight', viewValue: 'Weight' },
    { value: 'length', viewValue: 'Length' },
    { value: 'kind', viewValue: 'Kind' },
  ];

  updateSortValue(value: PetSortValue) {
    this.petSortValue = value;
  }

  changeSorting(direction: PetSortDirection) {
    this.petSortDirection = direction;
    this.petsStore.updateSort(this.petSortValue, this.petSortDirection);
  }

  clearSorting() {
    this.petSortValue = null;
    this.petSortDirection = null;
    this.petsStore.updateSort(null, null);
  }

}

