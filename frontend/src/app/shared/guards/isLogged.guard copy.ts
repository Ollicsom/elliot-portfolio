import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class isLogged implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    /**
     * Used to show or not the login page.
     * If the user is authenticated, returns false, else returns true
     */
    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['back-office/edit']);
            return false;
        } else {
            return true;
        }
    }
}
