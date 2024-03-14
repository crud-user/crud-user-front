import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const dataString = sessionStorage.getItem("data");
    if (dataString ) {
      const { accessToken, role } = JSON.parse(dataString);
      if (accessToken && role) {
        return true;
      } else {
        this.router.navigate(['signin']);
        return false;
      }
    } else {
      this.router.navigate(['signin']);
      return false;
    }
  }
}