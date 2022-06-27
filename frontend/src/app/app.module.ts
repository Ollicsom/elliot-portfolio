import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ShopComponent } from './shop/shop.component';
import { LegalsComponent } from './legals/legals.component';
import { BackOfficeComponent } from './back-office/back-office.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GalleryComponent,
    ShopComponent,
    LegalsComponent,
    BackOfficeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    })
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],

})
export class AppModule { }
