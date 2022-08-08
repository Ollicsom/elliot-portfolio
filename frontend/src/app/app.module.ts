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
import { GalleryPreviewComponent } from './home/components/gallery-preview/gallery-preview.component';
import { ApiService } from './api.service';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';
import { OpenedGalleryComponent } from './gallery/components/opened-gallery/opened-gallery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AllGalleriesComponent } from './gallery/components/all-galleries/all-galleries.component';

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
    BackOfficeComponent,
    GalleryPreviewComponent,
    OpenedGalleryComponent,
    AllGalleriesComponent
  ],
  imports: [
    MasonryGalleryModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
  ],
  providers: [HttpClient, ApiService],
  bootstrap: [AppComponent],

})
export class AppModule { }
