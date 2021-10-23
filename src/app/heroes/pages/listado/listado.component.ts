import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    mat-card{
      margin-top:0px
    }
  `]
})

export class ListadoComponent implements OnInit {

  constructor(private HeroesService:HeroesService) { }

  heroes: Heroe[] = [];

  ngOnInit(): void {
    this.HeroesService.getHeroes()
      .subscribe( heroes => this.heroes=heroes )
  }

}
