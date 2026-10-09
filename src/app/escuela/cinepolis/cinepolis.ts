import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from 'angular/forms';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-cinepolis',
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})
export class Cinepolis {
  formulario!: FormGroup;

  nombreCliente: string='';
  valorPagar: number= 0;
  mensajeError: string ='';

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadCompradores: new FormControl(1),
      tarjetaCineco: new FormControl('no'),
      cantidadBoletas: new FormControl(1),

    })
  }
}
