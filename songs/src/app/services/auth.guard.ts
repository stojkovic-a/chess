// auth-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import your AuthService or authentication service

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is logged in using your authentication service
    if (this.authService.isLoggedIn()) {
      return true; // User is logged in, allow access to the route
    } else {
      // User is not logged in, redirect to the login page or any other route
      this.router.navigate(['/login']);
      return false; // Prevent access to the route
    }
  }
}
