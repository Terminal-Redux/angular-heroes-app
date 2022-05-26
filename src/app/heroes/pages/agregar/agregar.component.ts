import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroesPorId(id))
    )
    .subscribe(heroe => this.heroe = heroe
    );
  }

  guardar() {
    console.log('HEY!');

    if(this.heroe.superhero.trim().length === 0) {
      return;
    }

    if(this.heroe.id) {
      // Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(resp => {console.log('Respuesta: ', resp)}
      );
    } else {
      // Crear registro
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => this.router.navigate(['/heroes/editar', heroe.id])
      );
    }

  }

}
