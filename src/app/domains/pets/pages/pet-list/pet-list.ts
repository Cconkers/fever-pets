import { Component, inject, computed, OnInit } from '@angular/core';
import { PetsStore } from '../../stores/pet-store';
import { PetCard } from '../../components/pet-card/pet-card';
import { AppLoader } from '../../../../core/layout/app-loader/app-loader';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { I18nService } from '../../../../shared/services/i18n.service';
import { PetSortMenu } from '../../components/pet-sort-menu/pet-sort-menu';
import { PetsPaginator } from '../../components/pets-paginator/pets-paginator';


@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [PetCard, AppLoader, MatSelectModule, FormsModule, MatMenuModule, PetSortMenu, PetsPaginator],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.scss',
})

export class PetList implements OnInit {
  public i18n = inject(I18nService);
  petsStore = inject(PetsStore);
  pets = computed(() => this.petsStore.pets());

  ngOnInit(): void {
    this.petsStore.loadPets();
  }
}

