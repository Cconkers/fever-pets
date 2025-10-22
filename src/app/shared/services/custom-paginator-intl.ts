import { Injectable, effect, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { I18nService } from './i18n.service';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  private i18n = inject(I18nService);

  constructor() {
    super();

    effect(() => {
      this.updateLabels(this.i18n.currentLang());
    });
  }

  private updateLabels(lang: string) {
    if (lang === 'es') {
      this.itemsPerPageLabel = 'Elementos por página';
      this.nextPageLabel = 'Siguiente página';
      this.previousPageLabel = 'Página anterior';
      this.firstPageLabel = 'Primera página';
      this.lastPageLabel = '�ltima página';
      this.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0) return '0 de 0';
        const start = page * pageSize + 1;
        const end = Math.min((page + 1) * pageSize, length);
        return `${start} - ${end} de ${length}`;
      };
    } else {
      this.itemsPerPageLabel = 'Items per page';
      this.nextPageLabel = 'Next page';
      this.previousPageLabel = 'Previous page';
      this.firstPageLabel = 'First page';
      this.lastPageLabel = 'Last page';
      this.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0) return '0 of 0';
        const start = page * pageSize + 1;
        const end = Math.min((page + 1) * pageSize, length);
        return `${start} - ${end} of ${length}`;
      };
    }

    this.changes.next();
  }
}
