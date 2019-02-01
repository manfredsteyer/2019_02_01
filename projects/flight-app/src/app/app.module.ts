import { EffectsModule } from '@ngrx/effects';
import { DashboardModule } from './dashboard/dashboard.module';
import { FlightCancellingModule } from './flight-booking/flight-cancelling/flight-cancelling.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FlightApiModule} from '@flight-workspace/flight-api';

import {AppComponent} from './app.component';
import {APP_EXTRA_OPTIONS, APP_ROUTES} from './app.routes';
import {BasketComponent} from './basket/basket.component';
import {FlightBookingModule} from './flight-booking/flight-booking.module';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedModule} from './shared/shared.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import { DashboardTileModule } from './dashboard-tile/dashboard-tile.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LookaheadComponent } from './lookahead/lookahead.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './+state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TabsModule } from './shared/tabs/tabs.module';
import { CustomCheckboxModule } from './shared/custom-checkbox/custom-checkbox.module';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,

    CustomCheckboxModule,
    TabsModule,

    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://www.angular.at/api'],
        sendAccessToken: true
      }
    }),

    // FlightBookingModule, // Lazy-Module darf nicht importiert werden!

    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    FlightCancellingModule,
    DashboardModule,
    DashboardTileModule,
    
    FlightApiModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot([...APP_ROUTES], {...APP_EXTRA_OPTIONS}),


    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent,
    LookaheadComponent

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
