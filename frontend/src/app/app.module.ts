import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterComponent } from './shared/toaster/toaster.component';
import { ToastComponent } from './shared/toast/toast.component';
import { EditFormComponent } from './components/back-office/components/edit-form/edit-form.component';
import { AllGalleriesComponent } from './components/back-office/components/gallery/components/all-galleries/all-galleries.component';
import { OpenedGalleryComponent } from './components/back-office/components/gallery/components/opened-gallery/opened-gallery.component';
import { GalleryPreviewComponent } from './components/home/components/gallery-preview/gallery-preview.component';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { LegalsComponent } from './components/legals/legals.component';
import { ShopComponent } from './components/shop/shop.component';
import { GalleryComponent } from './components/back-office/components/gallery/gallery.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { saveSerieService } from './shared/services/save-serie.service';
import { AuthService } from './shared/services/auth.service';
import { ToastService } from './shared/services/toast.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
    AllGalleriesComponent,
    EditFormComponent,
    ToastComponent,
    ToasterComponent
  ],
  imports: [
    MasonryGalleryModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
  ],
  providers: [HttpClient, ApiService, saveSerieService, AuthService, ToastService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],

})
export class AppModule { }
