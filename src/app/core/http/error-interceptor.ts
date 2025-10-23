import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';
import { I18nService } from '../../shared/services/i18n.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const i18n = inject(I18nService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = '';

      if (error.error instanceof ErrorEvent) {
        message = i18n.t('networkError', { error: error.error.message });
      } else {
        switch (error.status) {
          case 0:
            message = i18n.t('serverUnreachable');
            break;
          case 404:
            message = i18n.t('resourceNotFound');
            break;
          case 500:
            message = i18n.t('internalServerError');
            break;
          default:
            message = i18n.t('error', { status: error.status, statusText: error.statusText });
        }
      }

      toast.show(message, 3000);
      return throwError(() => error);
    })
  );
};
