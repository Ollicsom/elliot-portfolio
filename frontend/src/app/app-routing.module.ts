import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './components/back-office/back-office.component';
import { AllGalleriesComponent } from './components/back-office/components/gallery/components/all-galleries/all-galleries.component';
import { GalleryComponent } from './components/back-office/components/gallery/gallery.component';
import { HomeComponent } from './components/home/home.component';
import { LegalsComponent } from './components/legals/legals.component';
import { LoginComponent } from './components/login/login.component';
import { ShopComponent } from './components/shop/shop.component';
import { isLogged } from './shared/guards/isLogged.guard copy';
import { LoginGuard } from './shared/guards/login.guard';

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
