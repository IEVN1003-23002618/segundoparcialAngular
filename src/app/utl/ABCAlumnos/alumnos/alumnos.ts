import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  dataSource: AlumnosUTL[] = [];

  constructor(
    public alumnosUTL: AlumnosapiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosUTL.getAlumnos().subscribe({
      next: (response: AlumnosUTL[]) => {
        this.dataSource = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar alumnos:', error);
      }
    });
  }
}