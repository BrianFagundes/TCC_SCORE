import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean {
    if (!localStorage.getItem('ID')) {
      this.router.navigate(['/login']); // Redireciona para a tela de login
      return false;
    }
    return true;
  }
}
