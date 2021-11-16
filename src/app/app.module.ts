import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardViewComponent } from './pages/dashboard/dashboard-view/dashboard-view.component';
import { PedidoService } from './pages/dashboard/shared/services/pedido.service';

import { ChartsModule } from 'ng2-charts';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { MaterialModule } from './shared/material/material.module';
registerLocaleData(localePT, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChartsModule,
    MaterialModule
  ],
  providers: [
    PedidoService,
    { provide: LOCALE_ID, useValue: 'pt-br' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
