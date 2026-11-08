import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AlumnosUTL } from '../alumnosUTL';
import { AlumnosapiService } from '../alumnosapi.service';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eliminar.html'
})
export class Eliminar implements OnInit {
  matricula: string = '';
  regAlumno: AlumnosUTL = {
    matricula: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: AlumnosapiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.matricula = this.route.snapshot.paramMap.get('id') || '';

    if (this.matricula && this.matricula !== 'undefined') {
      this.alumnosUtl.getAlumno(this.matricula).subscribe({
        next: (response) => {
          const datos = response.alumno || response;
          this.regAlumno = {
            matricula: datos.matricula || this.matricula,
            nombre: datos.nombre || '',
            apaterno: datos.apaterno || datos['apellido paterno'] || '',
            amaterno: datos.amaterno || datos['apellido materno'] || '',
            correo: datos.correo || ''
          };
        },
        error: (error) => {
          console.error('Error al consultar el alumno:', error);
        }
      });
    }
  }

  eliminar(): void {
    if (confirm(`¿Seguro que deseas eliminar al alumno ${this.regAlumno.nombre}?`)) {
      this.alumnosUtl.eliminaAlumno(this.matricula).subscribe({
        next: () => {
          alert('Alumno eliminado correctamente');
          this.router.navigate(['/utl/alumnos']);
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Ocurrió un error al eliminar el alumno');
        }
      });
    }
  }
}