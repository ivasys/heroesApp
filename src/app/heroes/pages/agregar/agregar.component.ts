import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
      img{
        width: 100%;
        border-radius: 20px;
      }
  `]
})

export class AgregarComponent implements OnInit {

  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero:'naiden',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_img:''
  }

  constructor(private HeroesService:HeroesService,
              private ActivatedRoute:ActivatedRoute,
              private Router:Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if( !this.Router.url.includes('editar')){
        return;
    }

    this.ActivatedRoute.params
      .pipe(
        switchMap( ({id}) => this.HeroesService.getHeroePorId(id))
      )
      .subscribe( heroe => this.heroe = heroe );
  }

  guardar(){

    if(this.heroe.superhero.trim().length===0){
      return;
    }

    if(this.heroe.id){

        this.HeroesService.actualizarHeroe(this.heroe)
          .subscribe( heroe => this.mostrarSnakBar('Registro Actualizado') );

      }else{

        console.log(this.heroe);
      
        this.HeroesService.agregarHeroe(this.heroe)
        .subscribe( resp => this.Router.navigate(['/heroes/editar', resp.id]) )
        this.mostrarSnakBar('Registro creado')  
      }
  }

  borrarHeroe(){

    const dialog = this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data: this.heroe
    });

    dialog.afterClosed()
          .subscribe(
            (result) => {
              if(result){
                     this.HeroesService.borrarHeroe( this.heroe.id! )
                        .subscribe( resp => this.Router.navigate(['/heroes']) );
              }
            }
          )

  }

  mostrarSnakBar(mensaje:string){
    this._snackBar.open(mensaje, 'ok!',{
      duration:2500
    })
  }


}
