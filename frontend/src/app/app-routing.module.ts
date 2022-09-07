import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office/back-office.component';
import { EditFormComponent } from './back-office/components/edit-form/edit-form.component';
import { AllGalleriesComponent } from './gallery/components/all-galleries/all-galleries.component';
import { GalleryComponent } from './gallery/gallery.component';
import { isLogged } from './guards/isLogged.guard copy';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { LegalsComponent } from './legals/legals.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: 'home', component: HomeComponent},
  { path: 'back-office', children: [
    { path: "", redirectTo: "/back-office/login", pathMatch: "full" },
    { path: 'login', component: LoginComponent, canActivate: [isLogged]},
    { path: 'edit',  component: BackOfficeComponent, canActivate: [LoginGuard]},
  ]},
  { path: 'gallery', component: AllGalleriesComponent},
  { path: 'gallery/:id', component: GalleryComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'legals', component: LegalsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
