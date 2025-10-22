import { inject, Injectable, signal } from '@angular/core';
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import { SafeStorageService } from '../../core/services/safe-storage.service';

type Lang = 'en' | 'es';
type Translations = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private translations: Record<Lang, Translations> = { en, es };
  private safeStorage = inject(SafeStorageService);
  currentLang = signal<Lang>('en');

  readonly languages: Lang[] = [
    'en',
    'es'
  ];

  t(key: string, params?: Record<string, string | number>): string {
    const lang = this.currentLang();
    let text = this.translations[lang][key] ?? key;

    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  }

  setLang(lang: Lang) {
    this.currentLang.set(lang);
    this.safeStorage.setItem('lang', lang);
  }

  restoreLang() {
    const saved = this.safeStorage.getItem('lang') as Lang | null;
    if (saved && (saved === 'en' || saved === 'es')) {
      this.currentLang.set(saved);
    }
  }
}
