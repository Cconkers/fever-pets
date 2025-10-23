# Frontend Code Challenge

Fever's Code Challenge for Front End job applicants

## Fever Pets - Tech Stack

* Angular 20 (standalone, signals, zoneless)
* Angular Material (Paginator, Snackbar, Menu, Card)
* RxJS / HttpClient
* i18n con JSON (es/en)
* Karma + Jasmine (unit)

### Arquitectura
```
└── 📁src
    └── 📁app
        └── 📁core
            └── 📁http
                ├── api-config.ts
                ├── error-interceptor.ts
            └── 📁layout
                └── 📁app-home
                    ├── app-home.html
                    ├── app-home.scss
                    ├── app-home.ts
                    ├── home.routes.ts
                └── 📁app-loader
                    ├── app-loader.scss
                    ├── app-loader.ts
            └── 📁services
                ├── safe-storage.service.ts
        └── 📁domains
            └── 📁pets
                └── 📁components
                    └── 📁pet-card
                        ├── pet-card.html
                        ├── pet-card.scss
                        ├── pet-card.spec.ts
                        ├── pet-card.ts
                    └── 📁pet-sort-menu
                        ├── pet-sort-menu.html
                        ├── pet-sort-menu.scss
                        ├── pet-sort-menu.ts
                    └── 📁pets-of-day-button
                        ├── pet-of-day-button.html
                        ├── pet-of-day-button.scss
                        ├── pet-of-day-button.ts
                    └── 📁pets-paginator
                        ├── pets-paginator.html
                        ├── pets-paginator.scss
                        ├── pets-paginator.ts
                └── 📁models
                    ├── pet.models.ts
                └── 📁pages
                    └── 📁pet-detail
                        ├── pet-detail.html
                        ├── pet-detail.scss
                        ├── pet-detail.spec.ts
                        ├── pet-detail.ts
                    └── 📁pet-list
                        ├── pet-list.html
                        ├── pet-list.scss
                        ├── pet-list.ts
                └── 📁pets-api
                    ├── pets-api.spec.ts
                    ├── pets-api.ts
                └── 📁pets-utils
                    ├── pets-utils.spec.ts
                    ├── pets-utils.ts
                └── 📁services
                    ├── pets-favorites.service.spec.ts
                    ├── pets-favorites.service.ts
                └── 📁stores
                    ├── pet-store.spec.ts
                    ├── pet-store.ts
        └── 📁shared
            └── 📁components
                └── 📁not-found.ts
                    ├── not-found.ts
            └── 📁directives
                ├── image-fallback.ts
            └── 📁i18n
                ├── en.json
                ├── es.json
            └── 📁services
                ├── custom-paginator-intl.ts
                ├── i18n.service.ts
                ├── toast.service.ts
        ├── app.config.server.ts
        ├── app.config.ts
        ├── app.html
        ├── app.routes.server.ts
        ├── app.routes.ts
        ├── app.scss
        ├── app.spec.ts
        ├── app.ts
    └── 📁assets
        └── 📁images
            ├── background-pets-and-animals.jpg
            ├── favicon.png
            ├── pet-placeholder.png
    └── 📁styles
        ├── _variables.scss
        ├── custom-theme.scss
        ├── pet-styles.scss
        ├── styles.scss
    ├── index.html
    ├── main.server.ts
    ├── main.ts
    └── server.ts
```

### Decisiones clave
* Stores con Signals: estado reactivo simple, SSR-friendly, fácil de testear.
* SafeStorageService: capa que evita acceso directo a localStorage (SSR seguro).
* Persistencia de sort/paginación: vuelve al mismo estado tras navegar a detalle.
* i18n simple: JSON plano + mapping para kind y textos; escalable a más idiomas.
* HTTP: PetsApi hace solo llamadas y mapea health. Interceptor muestra toasts.
* UI/UX: loader centrado, directiva de imagen para pets con fallback.

## Funcionalidad

### Home
Lista de pets con: nombre, tipo (traducido), tamaño/peso, health (score + tier).
Ordenación por weight, height, length, name, kind (asc/desc).
Paginación con MatPaginator, persistencia de página y tamaño.
Pet of the day: fija un favorito por 24h (lock + toast con hora de desbloqueo).
Fallback de imagen si la foto falla.

### Detalle
Imagen grande, toda la información (incluye description).
Cálculo de salud (score/tier) consistente con Home.

### i18n
Idiomas: en, es.
Switcher en el shell (app.ts) para que esté disponible en todas las vistas.
MatPaginatorIntl custom para traducir leyendas del paginador.
kind se traduce vía mapping pet.kind.dog|cat.

### Salud del pet
healthScore = weight / (height * length)

### Tiers:
* unhealthy < 2 o > 5
* very_healthy >= 2 && < 3
* healthy >= 3 && <= 5

Regla especial: Cats con number_of_lives === 1 siempre unhealthy.
Pensado para extender a otros tipos de pets (estrategia abierta).

### Errores y fallos HHTP
Interceptor HTTP:
Mapea errores comunes (0, 404, 500) a mensajes de snackbar.

## Cómo ejecutar
```bash
# instalar deps
pnpm i  # o npm i / yarn

# dev
ng serve

# tests
ng test

# build
ng build
```

 ### Tests
* PetsStore
Guarda/restaura sort en storage seguro.
Actualiza paginación y vuelve a cargar datos.
Propaga total y listado.

### PetsApi
* Llama con _page, _limit, _sort, _order correctos.
* Mapea Pet PetWithHealth con score/tier.
* Maneja pathway de error (propaga HttpErrorResponse).
* PetFavoritesService
* Selección, lock 24h, restore, clear.
* Toast de lock con fecha formateada.
* Ejecuta ng test (Karma + Jasmine) y verifica verde.
* Escalabilidad y rendimiento
* Signals + servicios sin dependencias cruzadas.
* SSR-friendly por diseño (SafeStorageService).
* Carga paginada y ordenada (evita overfetching).
* UI desacoplada de store y de PetsApi.
