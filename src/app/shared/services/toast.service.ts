import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private snackbar = inject(MatSnackBar);

  show(message: string, duration = 4000): void {
    this.snackbar.open(message, undefined, {
      duration,
      panelClass: ['toast-message'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
