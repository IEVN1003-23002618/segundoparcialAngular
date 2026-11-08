import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnosUTL } from './alumnosUTL';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnosapiService {
  private apiUrl = 'http://127.0.0.1:5000/api/alumnos/';

  constructor(private http: HttpClient) {}

  public getAlumnos(): Observable<AlumnosUTL[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (Array.isArray(response)) return response;
        if (response.alumnos && Array.isArray(response.alumnos)) return response.alumnos;
        if (response.data && Array.isArray(response.data)) return response.data;
        return [];
      })
    );
  }

  public getAlumno(matricula: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${matricula}`);
  }

  public agregarNuevoAlumno(datos: AlumnosUTL): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }

  public modificarAlumno(matricula: string, datos: AlumnosUTL): Observable<any> {
    return this.http.put(`${this.apiUrl}${matricula}`, datos);
  }

  public eliminaAlumno(matricula: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${matricula}`);
  }
}