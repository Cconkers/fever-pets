import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private snackbar = inject(MatSnackBar);

  show(message: string, duration = 4000) {
    this.snackbar.open(message, undefined, {
      politeness: 'assertive',
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
