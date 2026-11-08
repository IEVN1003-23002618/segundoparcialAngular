import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MaestrosUTL } from '../maestrosUTL';
import { Router, RouterLink } from '@angular/router';
import { MaestrosapiService } from '../maestrosapi.service';

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
    public maestrosUtl: MaestrosapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const datos: MaestrosUTL = this.formGroup.getRawValue();

    this.maestrosUtl.agregarNuevoMaestro(datos).subscribe({
      next: () => {
        alert('Maestro registrado correctamente');
        this.formGroup.reset();
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al registrar maestro:', error);
        alert(error.error?.mensaje || 'Ocurrió un error al registrar el maestro');
      }
    });
  }
}