import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanLoad, CanActivate {

  constructor(private AuthService:AuthService, private Router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.AuthService.verificaAutenticacion()
                .pipe(
                  tap( estaAutenticado => {
                    if(!estaAutenticado){
                      this.Router.navigate(['./auth/login']);
                    }
                  })
                )
 
/*     if(this.AuthService.auth.id){
        return true;
    }
        console.log('bloqueado por el AuthGuard - CanActivate')
        return false; */
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

      return this.AuthService.verificaAutenticacion()
                .pipe(
                  tap( estaAutenticado => {
                    if(!estaAutenticado){
                      this.Router.navigate(['./auth/login']);
                    }
                  })
                )

      
/*       if(this.AuthService.auth.id){
          return true;
      }
        console.log('bloqueado por el AuthGuard - CanLoad')
          return false; */
  }

}
