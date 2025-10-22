import { Component, inject } from '@angular/core';
import { PetsStore } from '../../stores/pet-store';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { I18nService } from '../../../../shared/services/i18n.service';


@Component({
  selector: 'pets-paginator',
  standalone: true,
  imports: [MatSelectModule, FormsModule, MatMenuModule, MatPaginator],
  templateUrl: './pets-paginator.html',
  styleUrl: './pets-paginator.scss',
})

export class PetsPaginator {
  public i18n = inject(I18nService);
  petsStore = inject(PetsStore);

  onPageChange(event: any) {
    this.petsStore.updatePagination(event.pageIndex, event.pageSize);
  }

}

