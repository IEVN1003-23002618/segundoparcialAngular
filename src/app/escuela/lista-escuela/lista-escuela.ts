import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IAlumno} from '../alumno';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'lista-escuela',
  styleUrl: './lista-escuela.css',
  templateUrl: './lista-escuela.html',
})
export class ListaEscuela implements OnInit {
  formulario!:FormGroup
  alumnos:IAlumno[]=[]
  
  nuevoAlumno:IAlumno={
    matricula:'',
    nombre:'',
    correo:'',
    materia:'',
  }

  ngOnInit():void{
    this.cargarAlumnos()

    this.formulario=new FormGroup ({
      matricula:new FormControl(''),
      nombre:new FormControl(''),
      correo:new FormControl(''),
      materia:new FormControl(''),
    })

  }
  agregarAlumno():void{
    if (
      this.nuevoAlumno.matricula == '' ||
      this.nuevoAlumno.nombre == '' ||
      this.nuevoAlumno.correo == '' ||
      this.nuevoAlumno.materia == ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
    this.alumnos.push({...this.nuevoAlumno})
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    )
  }


  muestraAlumno():void{
    this.nuevoAlumno.matricula=this.formulario.value.matricula
    this.nuevoAlumno.nombre=this.formulario.value.nombre
    this.nuevoAlumno.correo=this.formulario.value.correo
    this.nuevoAlumno.materia=this.formulario.value.materia
    this.agregarAlumno()
  }

  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');

    if (datos){
      this.alumnos = JSON.parse(datos);
    }
  }
}