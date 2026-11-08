import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MaestrosUTL } from '../maestrosUTL';
import { MaestrosapiService } from '../maestrosapi.service';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eliminar.html'
})
export class Eliminar implements OnInit {
  id: string = '';
  regMaestro: MaestrosUTL = {
    idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    public maestrosUtl: MaestrosapiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id && this.id !== 'undefined') {
      this.maestrosUtl.getMaestro(this.id).subscribe({
        next: (response) => {
          const datos = response.maestro || response;
          this.regMaestro = {
            idmaestro: datos.idmaestro || datos.id || parseInt(this.id, 10),
            nombre: datos.nombre || '',
            apaterno: datos.apaterno || datos['apellido paterno'] || '',
            amaterno: datos.amaterno || datos['apellido materno'] || '',
            correo: datos.correo || ''
          };
        },
        error: (error) => {
          console.error('Error al consultar el maestro:', error);
        }
      });
    }
  }

  eliminar(): void {
    const idNumero = parseInt(this.id, 10);
    if (isNaN(idNumero)) {
      alert('Error: ID no válido');
      return;
    }

    if (confirm(`¿Seguro que deseas eliminar al maestro ${this.regMaestro.nombre}?`)) {
      this.maestrosUtl.eliminaMaestro(idNumero).subscribe({
        next: () => {
          alert('Maestro eliminado correctamente');
          this.router.navigate(['/utl/maestros']);
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Ocurrió un error al eliminar el maestro');
        }
      });
    }
  }
}