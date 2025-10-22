import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PetsApi } from '../../stores/pets-api';
import { PetWithHealth } from '../../models/pet.models';
import { I18nService } from '../../../../shared/services/i18n.service';
import { AppLoader } from '../../../../core/layout/app-loader/app-loader';


@Component({
  selector: 'pet-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './pet-detail.html',
  styleUrls: ['./pet-detail.scss'],
})
export class PetDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private petsApi = inject(PetsApi);
  i18n = inject(I18nService);

  pet: PetWithHealth | null = null;
  isLoading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.petsApi.getPetDetail(id).subscribe({
      next: (pet) => {
        console.log(pet);

        this.pet = pet;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading pet detail', err);
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/pets']);
  }
}
