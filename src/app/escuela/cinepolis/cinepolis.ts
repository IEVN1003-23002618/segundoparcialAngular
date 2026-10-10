import { Component, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ventas} from '../ventas/ventas';

export interface IBoleto {
  nombre: string;
  valorPagar: number;
}

export interface IVenta {
  nombre: string;
  compradores: number;
  boletos: number;
  tarjetaCineco: string;
  valorPagar: number;

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, Ventas],
  selector: 'app-cinepolis',
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})
export class Cinepolis {
  @ViewChild(Ventas) ComponenteVentas!: Ventas;
  formulario!: FormGroup;


  datosBoleto: IBoleto = {
    nombre: '',
    valorPagar: 0
  };

  mensajeError: string = '';

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadCompradores: new FormControl(1),
      tarjetaCineco: new FormControl('no'),
      cantidadBoletos: new FormControl(1),
    });
  }

  procesar(): void {
    this.mensajeError = '';

    const nombre = this.formulario.value.nombre;
    const compradores = Number(this.formulario.value.cantidadCompradores);
    const tarjeta = this.formulario.value.tarjetaCineco;
    const boletos = Number(this.formulario.value.cantidadBoletos);

    // Máximo 7 boletos por comprador
    const maxPermitido = compradores * 7;
    if (boletos > maxPermitido) {
      this.mensajeError = `No se pueden comprar más de 7 boletos por persona (Máximo: ${maxPermitido} boletos).`;
      this.datosBoleto.nombre = '';
      this.datosBoleto.valorPagar = 0;
      return;
    }

    // Cálculo del precio
    let total = boletos * 12;

    // Descuento por cantidad de boletas
    let descuentoBoletos = 0;
    if (boletos > 5) {
      descuentoBoletos = 0.15;
    } else if (boletos >= 3) {
      descuentoBoletos = 0.10;
    }

    total = total - (total * descuentoBoletos);

    // Descuento por Tarjeta Cineco (10%)
    if (tarjeta === 'si') {
      total = total - (total * 0.10);
    }

    this.datosBoleto.nombre = nombre;
    this.datosBoleto.valorPagar = total;

    const nuevaVenta: IVenta = {
      nombre: nombre,
      compradores: compradores,
      boletas: boletos,
      tarjetaCineco: tarjeta,
      valorPagar: total
    };

    const ventasExistentes = JSON.parse(localStorage.getItem('ventas') || '[]');
    ventasExistentes.push(nuevaVenta);
    localStorage.setItem('ventas', JSON.stringify(ventasExistentes));

    // Refrescar la tabla
    if (this.componenteVentas) {
      this.componenteVentas.cargarVentas();
    }
  
  }

  salir(): void {
    this.formulario.reset({
      nombre: '',
      cantidadCompradores: 1,
      tarjetaCineco: 'no',
      cantidadBoletos: 1
    });
    this.datosBoleto.nombre = '';
    this.datosBoleto.valorPagar = 0;
    this.mensajeError = '';
  }
}