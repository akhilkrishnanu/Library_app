import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor  {

  constructor(private injector:Injector) { }
  intercept(req:any,nxt:any)
    {
      let userservice = this.injector.get(UserService);
      let tokenizedreq = req.clone(
        {
          setHeaders:{
            Authorization: `Authorization token ${userservice.getUserToken()}`
          }
        }
      );
      return nxt.handle(tokenizedreq);
    }
}
