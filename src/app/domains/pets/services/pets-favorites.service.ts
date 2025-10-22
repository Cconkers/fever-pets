// pets-favorites.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { PetWithHealth } from '../models/pet.models';
import { ToastService } from '../../../shared/services/toast.service';
import { SafeStorageService } from '../../../core/services/safe-storage.service';
import { I18nService } from '../../../shared/services/i18n.service';

const FAVORITE_KEY = 'favorite_pet';
const LOCK_DURATION = 24 * 60 * 60 * 1000; // 24h
interface FavoriteData {
  pet: PetWithHealth;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class PetFavoritesService {
  private i18n = inject(I18nService);
  private storageSafe = inject(SafeStorageService);
  private toast = inject(ToastService);

  favorite = signal<PetWithHealth | null>(null);
  isLocked = signal(false);

  constructor() {
    this.restoreFavorite();
  }

  public showLockToast() {
    const baseTime = Date.now();
    const unlockTime = baseTime + LOCK_DURATION;

    const unlockDate = new Date(unlockTime);
    const formattedDate = unlockDate.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    this.toast.show(
      ` ${this.i18n.t('pet.lockToast')} ${formattedDate}`
    );
  }

  private restoreFavorite() {
    const saved = this.storageSafe.getItem(FAVORITE_KEY);
    if (!saved) return;

    const data: FavoriteData = JSON.parse(saved);
    const elapsed = Date.now() - data.timestamp;

    if (elapsed < LOCK_DURATION) {
      this.favorite.set(data.pet);
      this.isLocked.set(true);


      // auto-unlock after 24h
      setTimeout(() => this.isLocked.set(false), LOCK_DURATION - elapsed);
    } else {
      this.clearFavorite();
    }
  }

  selectFavorite(pet: PetWithHealth): boolean {
    if (this.isLocked()) {
      this.showLockToast();
      return false
    };

    const data: FavoriteData = { pet, timestamp: Date.now() };
    this.storageSafe.setItem(FAVORITE_KEY, JSON.stringify(data));

    this.favorite.set(pet);
    this.isLocked.set(true);
    this.showLockToast();

    setTimeout(() => this.isLocked.set(false), LOCK_DURATION);
    return true;
  }

  clearFavorite() {
    this.storageSafe.removeItem(FAVORITE_KEY);
    this.favorite.set(null);
    this.isLocked.set(false);
  }
}
