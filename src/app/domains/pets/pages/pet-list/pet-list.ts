import { Component, inject, computed, OnInit } from '@angular/core';
import { PetsStore } from '../../stores/pet-store';
import { PetCard } from '../../components/pet-card/pet-card';
import { AppLoader } from '../../../../core/layout/app-loader/app-loader';
import { MatSelectModule } from '@angular/material/select';
import { PetSort, PetSortDirection, PetSortValue } from '../../models/pet.models';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { I18nService } from '../../../../shared/services/i18n.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'pets-list',
  standalone: true,
  imports: [PetCard, AppLoader, MatSelectModule, FormsModule, MatMenuModule, MatButton, MatPaginator, NgClass],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.scss',
})

export class PetList implements OnInit {
  public i18n = inject(I18nService);
  petsStore = inject(PetsStore);

  pets = computed(() => this.petsStore.pets());
  petSortValue: PetSortValue | null = null;
  petSortDirection: PetSortDirection | null = null;

  petsSort: PetSort[] = [
    { value: 'name', viewValue: 'Name' },
    { value: 'height', viewValue: 'Height' },
    { value: 'weight', viewValue: 'Weight' },
    { value: 'length', viewValue: 'Length' },
    { value: 'kind', viewValue: 'Kind' },
  ];

  ngOnInit(): void {
    this.petsStore.loadPets();
  }

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

  onPageChange(event: any) {
    this.petsStore.updatePagination(event.pageIndex, event.pageSize);
  }

}

