import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../models/hero.interface';

@Component({
  selector: 'app-heroes',
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  protected hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
