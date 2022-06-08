import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInitService } from './services/app-init.service';
import { LayoutComponent } from './pages/layout/layout.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function initializeApp(appInitService: AppInitService) {
  // @Notes: Use promise, because fetching json is an async process
  return (): Promise<any> => appInitService.init();
}


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbToastModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
