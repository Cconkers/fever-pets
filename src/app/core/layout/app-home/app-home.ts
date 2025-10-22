import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PetsStore } from '../../../domains/pets/stores/pet-store';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { NgClass } from '@angular/common';
import { I18nService } from '../../../shared/services/i18n.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, MatMenuModule, MatMenu, NgClass],
  templateUrl: './app-home.html',
  styleUrl: './app-home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomeComponent {
  petsStore = inject(PetsStore);
  public i18n = inject(I18nService);
}
