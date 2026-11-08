import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AlumnosapiService } from '../alumnosapi.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar.html'
})
export class Editar implements OnInit {
  formulario!: FormGroup;
  matricula: string = '';

  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: AlumnosapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      matricula: [{ value: '', disabled: true }],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    this.matricula = this.route.snapshot.paramMap.get('id') || '';

    if (this.matricula && this.matricula !== 'undefined') {
      this.alumnosUtl.getAlumno(this.matricula).subscribe({
        next: (response) => {
          const datos = response.alumno || response;
          this.formulario.patchValue({
            matricula: datos.matricula || this.matricula,
            nombre: datos.nombre || '',
            apaterno: datos.apaterno || datos['apellido paterno'] || '',
            amaterno: datos.amaterno || datos['apellido materno'] || '',
            correo: datos.correo || ''
          });
        },
        error: (error) => {
          console.error('Error al consultar el alumno:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.invalid) return;

    const alumno = this.formulario.getRawValue();

    this.alumnosUtl.modificarAlumno(this.matricula, alumno).subscribe({
      next: (response) => {
        alert('Alumno actualizado correctamente');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Ocurrió un error al actualizar el alumno');
      }
    });
  }
}