import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnosUTL } from './alumnosUTL'; // Corregido a AlumnosUTL
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlumnosapiService {

    constructor(private http: HttpClient) {}

    public getAlumnos(): Observable<AlumnosUTL[]> {
        return this.http.get<any>('http://127.0.0.1:5000/api/alumnos/').pipe(
            map((response) => response.alumnos)
        );
    }

    agregarNuevoAlumno(datos: AlumnosUTL) {
        return this.http.post('http://127.0.0.1:5000/api/alumnos/', datos);
    }
}