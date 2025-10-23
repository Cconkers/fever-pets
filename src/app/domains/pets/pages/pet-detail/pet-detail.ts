import { Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { I18nService } from '../../../../shared/services/i18n.service';
import { AppLoader } from '../../../../core/layout/app-loader/app-loader';
import { MatIcon } from '@angular/material/icon';
import { PetsStore } from '../../stores/pet-store';
import { HealthTier } from '../../models/pet.models';
import { HealthCalculator } from '../../pets-utils/pets-utils';
import { ImageFallbackDirective } from "../../../../shared/directives/image-fallback";


@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, AppLoader, MatIcon, ImageFallbackDirective],
  templateUrl: './pet-detail.html',
  styleUrls: ['./pet-detail.scss'],
})
export class PetDetailComponent implements OnInit {
  private router = inject(Router);
  i18n = inject(I18nService);
  petsStore = inject(PetsStore);
  pet = computed(() => this.petsStore.petDetail()!);


  ngOnInit(): void {
    this.petsStore.loadPetDetail();
  }

  goBack() {
    this.router.navigate(['/pets']);
  }

  getClassHealth(healthTier: HealthTier): string {
    return HealthCalculator.getPetHealthClass(healthTier);
  }
}
