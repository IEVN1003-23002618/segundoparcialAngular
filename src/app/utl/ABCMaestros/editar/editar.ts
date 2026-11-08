import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MaestrosapiService } from '../maestrosapi.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar.html'
})
export class Editar implements OnInit {
  formulario!: FormGroup;
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    public maestrosUtl: MaestrosapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [{ value: '', disabled: true }],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id && this.id !== 'undefined') {
      this.maestrosUtl.getMaestro(this.id).subscribe({
        next: (response) => {
          const datos = response.maestro || response;
          this.formulario.patchValue({
            id: datos.idmaestro || datos.id || this.id,
            nombre: datos.nombre || '',
            apaterno: datos.apaterno || datos['apellido paterno'] || '',
            amaterno: datos.amaterno || datos['apellido materno'] || '',
            correo: datos.correo || ''
          });
        },
        error: (error) => {
          console.error('Error al consultar el maestro:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const maestro = this.formulario.getRawValue();
    const idNumero = parseInt(this.id, 10);

    if (isNaN(idNumero)) {
      alert('Error: ID no válido');
      return;
    }

    this.maestrosUtl.modificarMaestro(idNumero, maestro).subscribe({
      next: (response) => {
        alert('Maestro actualizado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Ocurrió un error al actualizar el maestro');
      }
    });
  }
}