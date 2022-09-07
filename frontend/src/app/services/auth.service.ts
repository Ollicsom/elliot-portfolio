
import { JwtHelperService } from '@auth0/angular-jwt';

export class AuthService {
  constructor() {}

  getToken(): string {
    return localStorage.getItem('token');
}

    isAuthenticated(): boolean {
        const jwtHelper = new JwtHelperService();
        const token = this.getToken();
        if (token !== undefined && token !== null) {
            return !jwtHelper.isTokenExpired(token);
        }
        return false;
    }

}