import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this._baseUrl}/heroes`);
  }

  getHeroesPorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this._baseUrl}/heroes/${id}`,);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this._baseUrl}/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this._baseUrl}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this._baseUrl}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this._baseUrl}/heroes/${id}`);
  }
}
