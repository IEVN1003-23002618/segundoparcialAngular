import { Pipe, PipeTransform } from '@angular/core';
import { MaestrosUTL } from './maestrosUTL';

@Pipe({
  name: 'maestroFilter',
  standalone: true
})
export class MaestroFilterPipe implements PipeTransform {
  transform(value: MaestrosUTL[], filter: string): MaestrosUTL[] {
    if (!value || !Array.isArray(value)) return [];
    if (!filter || filter.trim() === '') return value;

    const query = filter.toLowerCase().trim();

    return value.filter((maestro: any) => {
      const nombre = (maestro.nombre || '').toLowerCase();
      const apaterno = (maestro.apaterno || '').toLowerCase();
      const amaterno = (maestro.amaterno || '').toLowerCase();
      const correo = (maestro.correo || '').toLowerCase();

      return (
        nombre.includes(query) ||
        apaterno.includes(query) ||
        amaterno.includes(query) ||
        correo.includes(query)
      );
    });
  }
}