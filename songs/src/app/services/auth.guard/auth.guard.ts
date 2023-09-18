// auth-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service/auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedIn = this.authService.isLoggedIn();
    const userRoles = this.authService.getRoles();
    if (loggedIn) {
      const { role } = next.data;
      if (role && !userRoles.includes(role)) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/log-in']);
    return false;
  }


}
