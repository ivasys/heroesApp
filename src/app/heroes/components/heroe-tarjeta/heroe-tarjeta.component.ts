import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
    mat-card{
      margin-top:60px
    }
  `]
})
export class HeroeTarjetaComponent implements OnInit {

  constructor() { }

  @Input() heroe!: Heroe;

  ngOnInit(): void {
  }

}
