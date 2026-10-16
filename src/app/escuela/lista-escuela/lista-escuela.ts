import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Alumno {
  matricula: string;
  nombre: string;
  correo: string;
  materia: string;
}

@Component({
  selector: 'app-lista-escuela',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-escuela.html',
  styleUrl: './lista-escuela.css'
})
export class ListaEscuela implements OnInit {
  alumnos: Alumno[] = [];
  IndiceEdicion: number = -1;
  formulario!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      materia: ['']
    });

    this.cargarAlumnos();
  }

  muestraAlumno(): void {
    if (this.formulario.invalid) return;

    const datosAlumno: Alumno = this.formulario.value;

    if (this.IndiceEdicion !== -1) {
      // Actualiza la fila existente en el índice seleccionado
      this.alumnos[this.IndiceEdicion] = datosAlumno;
    } else {
      // Agrega un nuevo alumno
      this.alumnos.push(datosAlumno);
    }

    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
    this.limpiarCampos();
  }

  editarAlumno(index: number): void {
    const alumno = this.alumnos[index];
    this.IndiceEdicion = index;

    // Setea los valores en los campos del formulario
    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    });
  }

  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');
    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
  }

  eliminarAlumno(index: number): void {
    this.alumnos.splice(index, 1);
    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));

    if (this.IndiceEdicion === index) {
      this.limpiarCampos();
    }
  }

  limpiarCampos(): void {
    this.formulario.reset({
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    });
    this.IndiceEdicion = -1;
  }
}