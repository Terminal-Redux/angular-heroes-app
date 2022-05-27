import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
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
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.router.url.includes('editar')) {
      return;
    } else {
      this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroesPorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);
    }
  }

  guardar() {
    console.log('HEY!');

    if(this.heroe.superhero.trim().length === 0) {
      return;
    }

    if(this.heroe.id) {
      // Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(resp => this.mostrarSnackbar('¡Registro actualizado!')
      );
    } else {
      // Crear registro
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackbar('¡Registro creado!')
      }
      );
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.heroesService.borrarHeroe(this.heroe.id!).subscribe(resp => {
            this.router.navigate(['/heroes']);
            this.mostrarSnackbar('¡Registro borrado!')
          });
        }
      }
    )
  }

  mostrarSnackbar(mensaje: string) {

    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500,
    });
  }

}
