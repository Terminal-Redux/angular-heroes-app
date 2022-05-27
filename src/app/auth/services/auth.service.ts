import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';
import { tap, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth():Auth {
    return {...this._auth!};
  }

  verificaAutenticacion(): Observable<boolean> {
    if(!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(`${this._baseUrl}/usuarios/1`)
            .pipe(
              map(auth => {
                this._auth = auth;
                return true;

              })
            );
  }

  constructor(private http: HttpClient) { }

  login() {
    return this.http.get<Auth>(`${this._baseUrl}/usuarios/1`)
                .pipe(
                  tap(auth => this._auth = auth),
                  tap(auth => localStorage.setItem('token', auth.id))
                );
  }

  logout() {
    this._auth = undefined;
  }
}
