import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaestrosUTL } from './maestrosUTL';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaestrosapiService {

  constructor(private http: HttpClient) {}

  public getMaestros(): Observable<MaestrosUTL[]> {
    return this.http.get<any>('http://127.0.0.1:5000/api/maestros/').pipe(
      map((response) => response.maestros)
    );
  }

  agregarNuevoMaestro(datos: MaestrosUTL) {
    return this.http.post('http://127.0.0.1:5000/api/maestros/', datos);
  }
}