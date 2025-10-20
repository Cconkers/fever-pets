import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PetsStore } from '../../../domains/pets/stores/pet-store';
import { AppLoader } from '../app-loader/app-loader';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, AppLoader],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  store = inject(PetsStore);
 }
