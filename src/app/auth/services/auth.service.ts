import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Auth } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _auth : Auth | undefined;

  get auth():Auth{
    return { ...this._auth! };
  }

  constructor(private http:HttpClient) { }

  verificaAutenticacion():Observable<boolean>{
    
      if(!localStorage.getItem('token')){
        return of(false)
      }

      return this.http.get<Auth>('http://localhost:3000/usuarios/1')
                .pipe(
                    map( auth => {this._auth =  auth;
                                  return true;}
                    )
                );

  }

  login(){
      return this.http.get<Auth>('http://localhost:3000/usuarios/1')
        .pipe(
          tap( resp => {this._auth = resp; 
                        localStorage.setItem('token',resp.id)} )
        );
  }

}
