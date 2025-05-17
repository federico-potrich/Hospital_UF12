import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AFPHospitalAPIService } from './core/services/afphospital-api.service';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { APSS_theme } from '../theme/APSS_theme';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideAppInitializer(() =>
            inject(AFPHospitalAPIService).getListaPazienti()
        ),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: APSS_theme
            }
        })
    ]
};
