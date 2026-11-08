import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaestrosUTL } from './maestrosUTL';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaestrosapiService {
  private apiUrl = 'http://127.0.0.1:5000/api/maestros/';

  constructor(private http: HttpClient) {}

  public getMaestros(): Observable<MaestrosUTL[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (Array.isArray(response)) return response;
        if (response.maestros && Array.isArray(response.maestros)) return response.maestros;
        if (response.data && Array.isArray(response.data)) return response.data;
        return [];
      })
    );
  }

  public getMaestro(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }

  public agregarNuevoMaestro(datos: MaestrosUTL): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }

  public modificarMaestro(id: number, datos: MaestrosUTL): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, datos);
  }

  public eliminaMaestro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}