import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosUTL } from './alumnosUTL';

@Pipe({
  name: 'alumnoFilter',
  standalone: true,
  pure: false
})
export class AlumnoFilterPipe implements PipeTransform {
  transform(value: AlumnosUTL[], filter: string): AlumnosUTL[] {
    if (!value || !Array.isArray(value)) return [];
    if (!filter || filter.trim() === '') return value;

    const query = filter.toLowerCase().trim();

    return value.filter((alumno: any) => {
      const matricula = String(alumno.matricula || '').toLowerCase();
      const nombre = (alumno.nombre || '').toLowerCase();
      const apaterno = (alumno.apaterno || alumno['apellido paterno'] || '').toLowerCase();
      const amaterno = (alumno.amaterno || alumno['apellido materno'] || '').toLowerCase();
      const correo = (alumno.correo || '').toLowerCase();

      return (
        matricula.includes(query) ||
        nombre.includes(query) ||
        apaterno.includes(query) ||
        amaterno.includes(query) ||
        correo.includes(query)
      );
    });
  }
}