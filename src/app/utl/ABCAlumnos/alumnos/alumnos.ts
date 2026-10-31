import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlumnosUTL } from '../alumnosUTL';
import { AlumnosapiService } from '../alumnosapi.service';
import { AlumnoFilterPipe } from '../alumnos-filter.pipe';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule, RouterLink, AlumnoFilterPipe, CommonModule],
  templateUrl: './alumnos.html'
})
export class Alumnos implements OnInit {
  listFilter: string = '';
  alumnoTitle!: string;
  dataSource: AlumnosUTL[] = [];


  alumnosIric: AlumnosUTL[] = [
    {
      matricula: 1234,
      nombre: 'pedro',
      apaterno: 'lopez',
      amaterno: 'muñoz',
      correo: 'pedro@gmail.com',
    }
  ];

  constructor(public alumnosUTL: AlumnosapiService, private router: Router) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosUTL.getAlumnos().subscribe({
      next: (response: AlumnosUTL[]) => {
        console.log('Datos recibidos del API:', response);
        this.dataSource = response;
      },
      error: (error) => {
        console.error('Error al consultar la API. Cargando datos de respaldo:', error);
        
        this.dataSource = this.alumnosIric;
      },
      complete: () => {
        console.log('Carga de alumnos finalizada');
      }
    });
  }
}