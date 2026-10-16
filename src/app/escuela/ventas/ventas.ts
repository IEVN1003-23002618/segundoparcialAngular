import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface IVenta {
  nombre: string;
  compradores: number;
  boletos: number;
  tarjetaCineco: string;
  valorPagar: number;
}

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas implements OnInit {
  ventas: IVenta[] = [];
  mostrarModal: boolean = false;
  formularioEditar!: FormGroup;
  indiceEdicion: number = -1;
  mensajeErrorModal: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  
    this.formularioEditar = this.fb.group({
      nombre: ['', Validators.required],
      compradores: [1, [Validators.required, Validators.min(1)]],
      tarjetaCineco: ['no', Validators.required],
      boletos: [1, [Validators.required, Validators.min(1)]]
    });

    this.cargarVentas();
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventas');
    this.ventas = datos ? JSON.parse(datos) : [];
  }


  abrirModalEditar(index: number): void {
    const venta = this.ventas[index];
    this.indiceEdicion = index;
    this.mensajeErrorModal = '';

    this.formularioEditar.patchValue({
      nombre: venta.nombre,
      compradores: venta.compradores,
      tarjetaCineco: venta.tarjetaCineco,
      boletos: venta.boletos
    });

    this.mostrarModal = true;
  }

 
  guardarEdicion(): void {
    this.mensajeErrorModal = '';

    const { nombre, compradores, tarjetaCineco, boletos } = this.formularioEditar.value;
    const numCompradores = Number(compradores);
    const numBoletos = Number(boletos);

    if (!nombre) {
      this.mensajeErrorModal = 'El nombre es obligatorio.';
      return;
    }

    
    const maxPermitido = numCompradores * 7;
    if (numBoletos > maxPermitido) {
      this.mensajeErrorModal = `Límite superado: Máximo 7 boletos por persona (${maxPermitido} boletos para ${numCompradores} comprador(es)).`;
      return;
    }

  
    let total = numBoletos * 12;

    let descuentoBoletos = 0;
    if (numBoletos > 5) {
      descuentoBoletos = 0.15;
    } else if (numBoletos >= 3) {
      descuentoBoletos = 0.10;
    }

    total = total - (total * descuentoBoletos);

    if (tarjetaCineco === 'si') {
      total = total - (total * 0.10);
    }

    const totalFormateado = Number(total.toFixed(2));

  
    this.ventas[this.indiceEdicion] = {
      nombre,
      compradores: numCompradores,
      boletos: numBoletos,
      tarjetaCineco,
      valorPagar: totalFormateado
    };


    localStorage.setItem('ventas', JSON.stringify(this.ventas));
    this.cerrarModal();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.indiceEdicion = -1;
    this.mensajeErrorModal = '';
  }

  eliminarVenta(index: number): void {
    this.ventas.splice(index, 1);
    localStorage.setItem('ventas', JSON.stringify(this.ventas));
  }

  limpiarTodo(): void {
    this.ventas = [];
    localStorage.removeItem('ventas');
  }
}