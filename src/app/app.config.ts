import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authenticationInterceptor } from './interceptors/authentication/authentication.interceptor';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';

registerLocaleData(fr);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule), provideAnimations(),
    provideToastr({
        timeOut: 5000,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
    }),
    provideHttpClient(withInterceptors([authenticationInterceptor])), provideNzI18n(fr_FR), importProvidersFrom(FormsModule), importProvidersFrom(HttpClientModule), provideAnimations()]
};
