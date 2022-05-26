import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe, ...args: unknown[]): string {
    return `assets/heroes/${heroe.id}.jpg`;
  }

}
