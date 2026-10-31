import { Pipe, PipeTransform } from '@angular/core';
import { MaestrosUTL } from './maestrosUTL';

@Pipe({
  name: 'maestroFilter',
  standalone: true
})
export class MaestroFilterPipe implements PipeTransform {
  transform(value: MaestrosUTL[], filter: string): MaestrosUTL[] {
    filter = filter ? filter.toLocaleLowerCase() : '';
    return filter
      ? value.filter((maestro: MaestrosUTL) => maestro.nombre.toLocaleLowerCase().indexOf(filter) !== -1)
      : value;
  }
}