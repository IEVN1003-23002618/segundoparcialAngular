import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlumnosUTL } from '../alumnosUTL';
import { AlumnosapiService } from '../alumnosapi.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.html'
})
export class Agregar implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public alumnosUtl: AlumnosapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      matricula: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) return;

    const datos: AlumnosUTL = this.formGroup.getRawValue();

    this.alumnosUtl.agregarNuevoAlumno(datos).subscribe({
      next: () => {
        alert('Alumno registrado correctamente');
        this.formGroup.reset();
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al registrar alumno:', error);
        alert(error.error?.mensaje || 'Ocurrió un error al registrar el alumno');
      }
    });
  }
}