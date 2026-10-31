import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosUTL } from './alumnosUTL';

@Pipe({
  name: 'alumnoFilter',
  standalone: true
})
export class AlumnoFilterPipe implements PipeTransform {
  transform(value: AlumnosUTL[], filter: string): AlumnosUTL[] {
    filter = filter ? filter.toLocaleLowerCase() : '';
    return filter
      ? value.filter((alumno: AlumnosUTL) => alumno.nombre.toLocaleLowerCase().indexOf(filter) !== -1)
      : value;
  }
}