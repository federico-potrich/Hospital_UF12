import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/login/login.service";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  #service = inject(LoginService);
  #router = inject(Router);
  constructor() {}

  canActivate() {
    if(this.#service.logged()){
      return true;
    }
    this.#router.navigate(['login'])
    return false;
  }
}