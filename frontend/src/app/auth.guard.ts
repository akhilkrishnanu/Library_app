import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  // constructor(private userservice:UserService, private route:Router){}
  // canActivate():boolean
  // {
  //   if(this.userservice.LoggedIn())
  //   {
  //     return true
  //   }
  //   else
  //   {
  //   this.route.navigate(['login'])
  //     return false;

  //   }
  // }
  
}
