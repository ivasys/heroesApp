import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino:string = '';
  
  heroes : Heroe[] = [];

  heroeSeleccionado! : Heroe;

  constructor(private HeroesService:HeroesService) {}

  ngOnInit(): void {
    console.log(this.heroes);
  }

  buscando(){
    this.HeroesService.getSugerencias(this.termino.trim()).subscribe(heroes => this.heroes=heroes);
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
    if(event.option.value){
        const heroe:Heroe = event.option.value;
        this.termino = heroe.superhero;
        console.log(heroe);

        this.heroeSeleccionado = heroe;
    }
  }

}
